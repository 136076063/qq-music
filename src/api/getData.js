import Jsonp from 'common/js/jsonp';
import axios from 'axios';
export function getJsonp (params) {
    return Jsonp(params && params.url, params && params.ops, params && params.opts);
}

export function getAxios (params) {
    return axios.get(params && params.url, {
        params: params && params.ops
    }).then((res) => {
        return Promise.resolve(res);
    });
}
