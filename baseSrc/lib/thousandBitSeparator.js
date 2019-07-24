// 金额格式化
function thousandBitSeparator (s) {
  if (!/^(-?\d+)(\.\d*)?$/.test(s)) {
    return 'invalid value';
  }

  let sign = '';
  s = Number(s);
  if (s < 0) {
    sign = '-';
  } else {
    sign = '';
  }
  s = Math.abs(s);
  if (/^\d+$/.test(s)) {
    return (sign + (s + '').replace(/\B(?=(\d{3})+$)/g, ',') + '.00');
  }
  if (/^(\d+)\.(\d+)$/.test(s)) {
    s = s + '0';
    let v = s.split('.');
    let f = (v[0] + '').replace(/\B(?=(\d{3})+$)/g, ',');
    let h = v[1].substring(0, 2);
    return (sign + f + '.' + h);
  }
}
export default thousandBitSeparator
