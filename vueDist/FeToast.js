//
//
//
//
//
//

var script = {
  name: 'fe-toast',
  data: function () {
    return {
      isShow: false,
      tip: ''
    }
  },

  watch: {
    isShow (newVal) {
      const _this = this;
      if (!newVal) {
        window.setTimeout(function () {
          _this.destroyElement();
        }, 1000);
      }
    }
  },

  methods: {
    destroyElement () {
      this.$destroy();
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },

  mounted () {
    const _this = this;
    window.setTimeout(function () {
      _this.isShow = true;
    }, 0);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.isShow
      ? _c("div", { staticClass: "toast tip", attrs: { id: "toast" } }, [
          _vm._v(_vm._s(_vm.tip))
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5b4c01e8_0", { source: ".toast[data-v-5b4c01e8] {\n  box-sizing: border-box;\n  padding: 0 0.2rem;\n  height: 0.6rem;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  z-index: 100;\n  background-color: rgba(0, 0, 0, 0.7);\n  font-size: 0.3rem;\n  line-height: 0.6rem;\n  color: #fff;\n  white-space: nowrap;\n  border-radius: 0.04rem;\n}\n.fade-enter-active[data-v-5b4c01e8], .fade-leave-active[data-v-5b4c01e8] {\n  transition: all 0.5s;\n  transform: translate3d(-50%, -50%, 0);\n}\n.fade-enter[data-v-5b4c01e8], .fade-leave-to[data-v-5b4c01e8] {\n  opacity: 0;\n  transform: translate3d(-50%, 1rem, 0);\n}\n\n/*# sourceMappingURL=FeToast.vue.map */", map: {"version":3,"sources":["/Users/zx/Personal/My_Learning/zx-rollup-learning/vueSrc/FeToast.vue","FeToast.vue"],"names":[],"mappings":"AA8CA;EACA,sBAAA;EACA,iBAAA;EACA,cAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,qCAAA;EACA,YAAA;EACA,oCAAA;EACA,iBAAA;EACA,mBAAA;EACA,WAAA;EACA,mBAAA;EACA,sBAAA;AC7CA;AD+CA;EACA,oBAAA;EACA,qCAAA;AC5CA;AD8CA;EACA,UAAA;EACA,qCAAA;AC3CA;;AAEA,sCAAsC","file":"FeToast.vue","sourcesContent":["<template>\n  <transition name=\"fade\">\n    <div id=\"toast\" class=\"toast tip\" v-if=\"isShow\">{{tip}}</div>\n  </transition>\n</template>\n\n<script>\nexport default {\n  name: 'fe-toast',\n  data: function () {\n    return {\n      isShow: false,\n      tip: ''\n    }\n  },\n\n  watch: {\n    isShow (newVal) {\n      const _this = this\n      if (!newVal) {\n        window.setTimeout(function () {\n          _this.destroyElement()\n        }, 1000)\n      }\n    }\n  },\n\n  methods: {\n    destroyElement () {\n      this.$destroy()\n      if (this.$el.parentNode) {\n        this.$el.parentNode.removeChild(this.$el)\n      }\n    }\n  },\n\n  mounted () {\n    const _this = this\n    window.setTimeout(function () {\n      _this.isShow = true\n    }, 0)\n  }\n}\n</script>\n\n<style lang=\"scss\" scoped>\n.toast{\n  box-sizing: border-box;\n  padding: 0 .2rem;\n  height: .6rem;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%,-50%,0);\n  z-index: 100;\n  background-color: rgba(0,0,0,0.7);\n  font-size: .30rem;\n  line-height: .6rem;\n  color: #fff;\n  white-space: nowrap;\n  border-radius: .04rem;\n}\n.fade-enter-active, .fade-leave-active {\n  transition: all 0.5s;\n  transform: translate3d(-50%,-50%,0);\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n  transform: translate3d(-50%,1rem,0);\n}\n</style>\n",".toast {\n  box-sizing: border-box;\n  padding: 0 0.2rem;\n  height: 0.6rem;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  z-index: 100;\n  background-color: rgba(0, 0, 0, 0.7);\n  font-size: 0.3rem;\n  line-height: 0.6rem;\n  color: #fff;\n  white-space: nowrap;\n  border-radius: 0.04rem;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: all 0.5s;\n  transform: translate3d(-50%, -50%, 0);\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n  transform: translate3d(-50%, 1rem, 0);\n}\n\n/*# sourceMappingURL=FeToast.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5b4c01e8";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var fetoast = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

const Fetoast = {
  install: function (Vue) {
    let ToastConstructor = Vue.extend(fetoast);
    let instance;
    let instances = [];
    Vue.prototype.$Fetoast = function (tip, duration) {
      if (instances.length) { // 当前有显示中的toast 返回
        return false
      }
      let opts = {
        tip: tip || '努力加载中...'
      };
      // 用实例构造方法创建的实例，传入的data会追加和覆盖原有的，但是创建构造函数extend时就具有的data，现在没传也会保留，比如默认的那些data
      instance = new ToastConstructor({
        data: opts
      });
      instance.vm = instance.$mount();
      instance.dom = instance.vm.$el;
      instance.id = 'toast';
      document.body.appendChild(instance.dom);
      instances.push(instance);
      setTimeout(() => {
        Vue.prototype.$Fetoast.close();
      }, duration || 3000);
    };
    Vue.prototype.$Fetoast.close = function (id, afterClose) {
      id = 'toast';
      for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
          instances[i].$set(instances[i].$data, 'isShow', false);
          instances.splice(i, 1);
          break
        }
      }
      setTimeout(function () {
        let toastDom = document.getElementById('toast');
        if (toastDom && toastDom.parentNode) {
          toastDom.parentNode.removeChild(toastDom);
        }
      }, 500);
    };
  }
};

export default Fetoast;
