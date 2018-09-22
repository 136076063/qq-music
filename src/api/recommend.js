import Jsonp from 'common/js/jsonp';

export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp'
    };
    return Jsonp(url, data, {param: 'jsonpCallback'});
}
