const aplayer = document.getElementById('aplayer');

if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);

    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [
            {
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar,
                lrc: dataSong.lyrics
            }
        ],
        autoplay: true
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");
    const avatar2 = document.querySelector(".aplayer .aplayer-pic");

    ap.on('play', function () {
        avatar.style.animationPlayState = 'running';
        avatar2.style.animationPlayState = 'running';

        setTimeout(() => {
            ap.on('ended', function () {
                fetch(`/songs/listen/${dataSong._id}`)
                    .then(res => res.json())
                    .then(data => {
                        if(data.code == 200){
                            const innerNumberListen = document.querySelector(".singer-detail .inner-listen .inner-number");
                            innerNumberListen.innerHTML = data.listen;
                        }
                    })
            });
        }, ap.audio.duration*4/5 * 1000);
    });

    ap.on('pause', function () {
        avatar.style.animationPlayState = 'paused';
        avatar2.style.animationPlayState = 'paused';
    });

}

// Like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click", () => {
        const id = buttonLike.getAttribute("button-like");

        const data = {
            id: id
        };

        if(buttonLike.classList.contains("active")){
            buttonLike.classList.remove("active");
            data.type = "dislike";
        }
        else{
            buttonLike.classList.add("active");
            data.type = "like";
        }

        fetch("/songs/like", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.code == 200){
                    const innerNumber = buttonLike.querySelector(".inner-number");
                    innerNumber.innerHTML = data.updateLike;
                }
            })
    })
}
// End Like

// Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0){
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const id = buttonFavorite.getAttribute("button-favorite");
    
            fetch("/songs/favorite", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id
                })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        if(data.status == "add"){
                            buttonFavorite.classList.add("active");
                        }
                        else {
                            buttonFavorite.classList.remove("active");
                        }
                    }
                })
        })
    })
}
// End favorite

// Search suggest
const boxSearch = document.querySelector(".box-search");
if(boxSearch){
    const inputSearch = boxSearch.querySelector(`input[name=keyword]`);
    inputSearch.addEventListener("keyup", () => {
        const keyword = inputSearch.value;

        fetch(`/songs/search/suggest?keyword=${keyword}`)
            .then(res => res.json())
            .then(data => {
                if(data.code == 200){
                    const htmlSong = data.songs.map(item => `
                        <a class="inner-item" href="/songs/detail/${item.slug}">
                            <div class="inner-image">
                                <img src="${item.avatar}">
                            </div>
                            <div class="inner-info">
                                <div class="inner-title">${item.title}</div>
                                <div class="inner-singer">
                                    <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                                </div>
                            </div>
                        </a>
                    `);

                    const elementInnerSuggest = boxSearch.querySelector(".inner-suggest");
                    const elementInnerList = elementInnerSuggest.querySelector(".inner-list");

                    elementInnerList.innerHTML = htmlSong.join("");

                    if(data.songs.length > 0){
                        elementInnerSuggest.classList.add("show");
                    }
                    else{
                        elementInnerSuggest.classList.remove("show");
                    }
                }
            })
    })
}
// End search suggest