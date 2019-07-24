// 操作cookie
var docCookies = {
  getItem: function getItem(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }

    var sExpires = "";

    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;

        case String:
          sExpires = "; expires=" + vEnd;
          break;

        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }

    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }

    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function hasItem(sKey) {
    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
  }
};

// 获取url参数
function getParams(key, url) {
  var urlText = url || window.location.href;
  var match = RegExp('[?&]' + key + '=([^&|#?]*)').exec(urlText);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

// Object去除空键值对
function objNoBlank(obj) {
  if (_typeof(obj) !== 'object') {
    return {};
  }

  var values = obj;

  for (var key in values) {
    if (values[key] === undefined || values[key] === null) {
      delete values[key];
    }
  }

  return values;
}

// 弹窗固定body
var fixedBody = {
  lastTop: 0,
  fixed: function fixed() {
    this.lastTop = document.documentElement.scrollTop || document.body.scrollTop;
    document.body.setAttribute('style', 'overflow: hidden; position: fixed');
  },
  unfixed: function unfixed() {
    document.body.setAttribute('style', 'overflow: auto; position: relative');
    document.documentElement.scrollTop = document.body.scrollTop = this.lastTop;
    this.lastTop = 0;
  }
};

// 格式化日期
function formatDate(format, time) {
  var t = time != undefined ? new Date(time) : new Date();

  var tf = function tf(i) {
    return (i < 10 ? '0' : '') + i;
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
  });
}

// 金额格式化
function thousandBitSeparator(s) {
  if (!/^(-?\d+)(\.\d*)?$/.test(s)) {
    return 'invalid value';
  }

  var sign = '';
  s = Number(s);

  if (s < 0) {
    sign = '-';
  } else {
    sign = '';
  }

  s = Math.abs(s);

  if (/^\d+$/.test(s)) {
    return sign + (s + '').replace(/\B(?=(\d{3})+$)/g, ',') + '.00';
  }

  if (/^(\d+)\.(\d+)$/.test(s)) {
    s = s + '0';
    var v = s.split('.');
    var f = (v[0] + '').replace(/\B(?=(\d{3})+$)/g, ',');
    var h = v[1].substring(0, 2);
    return sign + f + '.' + h;
  }
}

function getParams$1(key) {
  var match = RegExp('[?&]' + key + '=([^&|#?]*)').exec(window.location.href);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getLatLng(timeout, flag) {
  var res = {};
  return new Promise(function (resolve, reject) {
    if (flag !== false) {
      if (getParams$1('lat') && getParams$1('lng')) {
        res = {
          success: true,
          lat: getParams$1('lat'),
          lng: getParams$1('lng'),
          message: '通过URL里的lat&lng参数获取地理位置成功'
        };
        resolve(res);
        return;
      } else if (getParams$1('latitude') && getParams$1('longitude')) {
        res = {
          success: true,
          lat: getParams$1('latitude'),
          lng: getParams$1('longitude'),
          message: '通过URL里的latitude&longitude参数获取地理位置成功'
        };
        resolve(res);
        return;
      }
    }

    window.navigator.geolocation.getCurrentPosition(function (pos) {
      res = {
        success: true,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        message: 'H5定位获取地理位置成功'
      };
      resolve(res);
      console.log('H5获取地理位置成功');
      return;
    }, function (err) {
      res = {
        success: false,
        message: 'H5未获取到地理位置'
      };
      resolve(res);
      console.log('H5未获取到地理位置');
      return;
    }, {
      enableHighAccuracy: true,
      timeout: timeout || 4000,
      maximumAge: 0
    });
  });
}

export { docCookies, fixedBody, formatDate, getLatLng, getParams, objNoBlank, thousandBitSeparator };
