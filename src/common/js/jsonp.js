import originJsonp from 'jsonp';

export default function jsonp (url, params, opts) {
    console.log('url', url);
    console.log('data', params);
    console.log('option', opts);
    url += (url && url.indexOf('?') < 0 ? '?' : '&') + param(params);
    return new Promise((resolve, reject) => {
        originJsonp(url, opts, (err, data) => {
            console.log('PromiseUrl', url);
            console.log('PromiseOption', opts);
            console.log('PromiseErr', err);
            console.log('PromiseData', data);
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

export function param (data) {
    let url = '';
    for (let i in data) {
        let value = data[i] !== undefined ? data[i] : '';
        url += `&${i}=${value}`;
    }
    return url && url.substring(1);
}
