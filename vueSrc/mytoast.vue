<template>
  <transition name="fade">
    <div id="toast" class="toast tip" v-if="isShow">{{tip}}</div>
  </transition>
</template>

<script>
export default {
  name: 'fe-toast',
  data: function () {
    return {
      isShow: false,
      tip: ''
    }
  },

  watch: {
    isShow (newVal) {
      const _this = this
      if (!newVal) {
        window.setTimeout(function () {
          _this.destroyElement()
        }, 1000)
      }
    }
  },

  methods: {
    destroyElement () {
      this.$destroy()
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },

  mounted () {
    const _this = this
    window.setTimeout(function () {
      _this.isShow = true
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.toast{
  box-sizing: border-box;
  padding: 0 .2rem;
  height: .6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  z-index: 100;
  background-color: rgba(0,0,0,0.7);
  font-size: .30rem;
  line-height: .6rem;
  color: #fff;
  white-space: nowrap;
  border-radius: .04rem;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
  transform: translate3d(-50%,-50%,0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translate3d(-50%,1rem,0);
}
</style>
