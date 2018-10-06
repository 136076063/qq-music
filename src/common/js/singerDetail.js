export default class SingerDetail {
    constructor (data) {
        this.songid = data.songid;
        this.songmid = data.songmid;
        this.singer = data.singer;
        this.songname = data.songname;
        this.albumname = data.albumname;
        this.duration = data.albumname;
        this.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`;
        this.musicUrl = `http://ws.stream.qqmusic.qq.com/${data.songid}.m4a?fromtag=46`;
    }
}
