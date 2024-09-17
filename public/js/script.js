const aplayer = document.getElementById('aplayer');

if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);

    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        audio: [
            {
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar
            }
        ],
        autoplay: true
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");
    const avatar2 = document.querySelector(".aplayer .aplayer-pic");

    ap.on('play', function () {
        avatar.style.animationPlayState = 'running';
        avatar2.style.animationPlayState = 'running';
    });

    ap.on('pause', function () {
        avatar.style.animationPlayState = 'paused';
        avatar2.style.animationPlayState = 'paused';
    });
}