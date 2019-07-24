function getParams (key) {
  var match = RegExp('[?&]' + key + '=([^&|#?]*)').exec(window.location.href)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}
function getLatLng (timeout, flag) {
  var res = {}
  return new Promise(function (resolve, reject) {
    if (flag !== false) {
      if (getParams('lat') && getParams('lng')) {
        res = {
          success: true,
          lat: getParams('lat'),
          lng: getParams('lng'),
          message: '通过URL里的lat&lng参数获取地理位置成功',
        }
        resolve(res)
        return
      } else if (getParams('latitude') && getParams('longitude')) {
        res = {
          success: true,
          lat: getParams('latitude'),
          lng: getParams('longitude'),
          message: '通过URL里的latitude&longitude参数获取地理位置成功',
        }
        resolve(res)
        return
      }
    }
    window.navigator.geolocation.getCurrentPosition(
      function (pos) {
        res = {
          success: true,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          message: 'H5定位获取地理位置成功',
        }
        resolve(res)
        console.log('H5获取地理位置成功')
        return
      },
      function (err) {
        res = {
          success: false,
          message: 'H5未获取到地理位置'
        }
        resolve(res)
        console.log('H5未获取到地理位置')
        return
      }, {
        enableHighAccuracy: true,
        timeout: timeout || 4000,
        maximumAge: 0
      }
    )
  })
}
export default getLatLng