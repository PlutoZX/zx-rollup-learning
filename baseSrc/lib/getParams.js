// 获取url参数
function getParams (key, url) {
  var urlText = url || window.location.href
  var match = RegExp('[?&]' + key + '=([^&|#?]*)').exec(urlText)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}
export default getParams
