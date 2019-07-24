// 弹窗固定body
const fixedBody = {
  lastTop: 0,
  fixed: function () {
    this.lastTop = document.documentElement.scrollTop || document.body.scrollTop
    document.body.setAttribute('style', 'overflow: hidden; position: fixed')
  },
  unfixed: function () {
    document.body.setAttribute('style', 'overflow: auto; position: relative')
    document.documentElement.scrollTop = document.body.scrollTop = this.lastTop
    this.lastTop = 0
  }
}
export default fixedBody