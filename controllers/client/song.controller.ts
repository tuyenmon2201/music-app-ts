import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import { Request, Response } from "express";

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