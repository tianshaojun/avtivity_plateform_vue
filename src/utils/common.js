export function convertVdong(data) {
    let ret = ''
    for (let key in data) {
    ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
    return ret
    }