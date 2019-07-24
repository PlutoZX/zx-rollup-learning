// Object去除空键值对
function objNoBlank (obj) {
  if (typeof obj !== 'object') {
    return {}
  }
  var values = obj
  for (let key in values) {
    if (values[key] === undefined || values[key] === null) {
      delete values[key]
    }
  }
  return values
}
export default objNoBlank
