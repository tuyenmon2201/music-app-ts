import FavoriteSong from "../../models/favorite-song.model";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import { Request, Response } from "express";
import unidecode from 'unidecode';

export const list = async (req: Request, res: Response) => {
    const slugTopic: string = req.params.slugTopic;

    const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    });

    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select("title avatar singerId like slug");

    for (const item of songs) {
        const singerInfo = await Singer.findOne({
            _id: item.singerId
        }).select("fullName");

        item["singerFullName"] = singerInfo["fullName"];
    }

    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
}

export const detail = async (req: Request, res: Response) => {
    const slugSong: string = req.params.slugSong;

    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });

    const singer = await Singer.findOne({
        _id: song.singerId
    }).select("fullName");

    const topic = await Topic.findOne({
        _id: song.topicId
    }).select("title");

    const existSongInFavorite = await FavoriteSong.findOne({
        // userId: res.locals.user.id,
        songId: song.id
    });

    if(existSongInFavorite){
        song["isFavorite"] = true;
    }

    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
}

export const like = async (req: Request, res: Response) => {
    const { id, type } = req.body;

    const song = await Song.findOne({
        _id: id,
        status: "active",
        deleted: false
    });

    let updateLike = song.like;

    if(type == "like"){
        updateLike += 1;
    }
    else if (type == "dislike"){
        updateLike -= 1;
    }

    await Song.updateOne({
        _id: id,
        status: "active",
        deleted: false
    }, {
        like: updateLike
    });

    res.json({
        code: 200,
        updateLike: updateLike,
        message: "Cập nhật thành công!"
    });

}

export const favoritePatch = async (req: Request, res: Response) => {
    const { id } = req.body;

    const data = {
        songId: id
    }

    const existSongInFavorite = await FavoriteSong.findOne(data);

    let status = "";

    if(existSongInFavorite){
        await FavoriteSong.deleteOne(data);
    }
    else {
        const record = new FavoriteSong(data);
        await record.save();
        status = "add"
    }

    res.json({
        code: 200,
        status: status
    });

}

export const favorite = async (req: Request, res: Response) => {
    const songs = await FavoriteSong.find({
        // userId: res.locals.user.id
    });

    for (const song of songs) {
        const infoSong = await Song.findOne({
            _id: song.songId
        }).select("title avatar singerId slug");

        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId
        }).select("fullName");

        song["infoSong"] = infoSong;
        song["infoSinger"] = infoSinger;

    }
    res.render("client/pages/songs/favorite", {
        pageTitle: "Bài hát yêu thích",
        songs: songs
    });
}

export const search = async (req: Request, res: Response) => {
    const type = req.params.type;

    const keyword = `${req.query.keyword}`;

    let songsFinal = [];

    if(keyword){
        let keywordSlug = keyword.trim();

        keywordSlug = keywordSlug.replace(/\s/g, "-");
        keywordSlug = keywordSlug.replace(/-+/g, "-");
        keywordSlug = unidecode(keywordSlug);

        const regexKeyword = new RegExp(keyword, "i");
        const regexKeywordSlug = new RegExp(keywordSlug, "i");

        const songs = await Song.find({
            $or: [
                { title: regexKeyword },
                { slug: regexKeywordSlug }
            ],
            deleted: false,
            status: "active"
        }).select("title avatar singerId like slug");

        for (const item of songs) {
            const singerInfo = await Singer.findOne({
                _id: item.singerId
            }).select("fullName");
    
            const itemFinal = {
                title: item.title,
                avatar: item.avatar,
                singerId: item.singerId,
                like: item.like,
                slug: item.slug,
                singerFullName: singerInfo["fullName"]
            };

            songsFinal.push(itemFinal);
        }

    }

    if(type == "result"){
        res.render("client/pages/songs/list", {
            pageTitle: "Kết quả tìm kiếm: " + keyword,
            keyword: keyword,
            songs: songsFinal
        });
    }
    else if (type == "suggest"){
        res.json({
            code: 200,
            songs: songsFinal
        });
    }
    else{
        res.json({
            code: 400
        })
    }
}

export const listen = async (req: Request, res: Response) => {
    const id = req.params.id;

    const song = await Song.findOne({
        _id: id,
        status: "active",
        deleted: false
    });

    const updateListen = song.listen + 1;

    await Song.updateOne({
        _id: id,
        status: "active",
        deleted: false
    }, {
        listen: updateListen
    });

    res.json({
        code: 200,
        listen: updateListen
    });
}