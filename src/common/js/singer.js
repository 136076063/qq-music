export default class singer {
    constructor ({data}) {
        this.userName = data.Fsinger_name;
        this.UserId = data.Fsinger_mid;
        this.picUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.Fsinger_mid}.jpg?max_age=2592000`;
    };
};
