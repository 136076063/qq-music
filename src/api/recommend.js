import Jsonp from 'common/js/jsonp';
export function getRecommend (params) {
    return Jsonp(params && params.url, params && params.ops, params && params.opts);
}
