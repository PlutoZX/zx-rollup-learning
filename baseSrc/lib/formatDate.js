// 格式化日期
function formatDate (format, time) {
  var t = time != undefined ? new Date(time) : new Date();
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  };
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (match) {
    switch (match) {
      case 'YYYY':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'DD':
        return tf(t.getDate());
        break;
      case 'hh':
        return tf(t.getHours());
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}
export default formatDate 