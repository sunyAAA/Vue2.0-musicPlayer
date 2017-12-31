import originJSONP from 'jsonp'
// 引入原始jsonp库

//导出一个jsonp promise化方法
export default function (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&')+param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err);
      }
    })
  })
}

// URL 和 data 拼接处理
function param(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : '';
}
