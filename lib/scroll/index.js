(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mobui"] = factory();
	else
		root["mobui"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "d048");
/******/ })
/************************************************************************/
/******/ ({

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "85f5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9b20":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scroll2_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85f5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scroll2_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scroll2_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_scroll2_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d048":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"566d03fc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/scroll/src/scroll2.vue?vue&type=template&id=52272117&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"scroll-container"},[(_vm.canPullDown)?_c('div',{ref:"reload",staticClass:"scroll-reload",style:({top: _vm.reloadTop + 'px'})},[_c('span',[_vm._v(_vm._s(_vm.reloadText))])]):_vm._e(),_c('div',{ref:"wrapper",class:['scroll-wrapper', _vm.isBounce ? 'transition' : ''],style:({transform: 'translate3d(0,' + _vm.top + 'px, 0)'})},[_c('div',{ref:"top",staticClass:"scroll-wrapper-top"}),_vm._t("default"),(_vm.canPullUp)?_c('div',{ref:"bottom",staticClass:"scroll-load"},[_c('span',[_vm._v(_vm._s(_vm.stateText))])]):_vm._e()],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/scroll/src/scroll2.vue?vue&type=template&id=52272117&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/scroll/src/scroll2.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var scroll2vue_type_script_lang_js_ = ({
  name: 'MobScroll',
  props: {
    canPullUp: {
      // 是否开启上拉加载功能
      type: Boolean,
      default: false
    },
    canPullDown: {
      // 是否开启下拉刷新功能
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      parent: null,
      loadState: 1,
      // 1 加载更多 2 等待手松开 3 加载中 3 到底了
      startY: 0,
      diff: 0,
      top: 0,
      isPullUp: false,
      isBounce: false,
      observer: null,
      // intersection observer
      firstToBottom: true,
      // 是否第一次触底
      pullUp: false,
      // 是否可以上拉
      pullDown: false,
      // 是否可以下拉
      reloadState: 1,
      // 1 继续下拉 2 释放刷新 3 加载中
      firstToTop: true,
      // 是否第一次到顶部
      reloadTop: -60,
      reloadHeight: 0
    };
  },
  computed: {
    stateText: function stateText() {
      switch (this.loadState) {
        case 1:
          return '上拉加载更多';

        case 2:
          return '松开加载更多';

        case 3:
          return '加载中...';

        case 4:
          return '到底啦';

        default:
          return '';
      }
    },
    reloadText: function reloadText() {
      switch (this.reloadState) {
        case 1:
          return '继续下拉';

        case 2:
          return '释放刷新';

        case 3:
          return '刷新中...';

        default:
          return '';
      }
    }
  },
  watch: {
    canPullUp: {
      handler: function handler(val) {
        var _this = this;

        this.$nextTick(function () {
          _this.observer.observe(_this.$refs.top);

          _this.observer.observe(_this.$refs.bottom);
        });
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    this.parent = this.$refs.container.parentNode;
    this.reloadHeight = this.$refs.reload.offsetHeight;
    this.reloadTop = -this.reloadHeight;
    this.$refs.wrapper.addEventListener('touchstart', this.touchStart);
    this.$refs.wrapper.addEventListener('touchmove', this.touchMove);
    this.$refs.wrapper.addEventListener('touchend', this.touchEnd); // 创建一个intersection observer,在监测的元素完全可见以及完全不可见时触发回调

    this.observer = new IntersectionObserver(this.observerCb, {
      root: this.parent,
      threshold: [0, 0.99]
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.wrapper.removeEventListener('touchmove', this.touchMove);
    this.$refs.wrapper.removeEventListener('touchend', this.touchEnd);
  },
  methods: {
    observerCb: function observerCb(entries) {
      var _this2 = this;

      entries.forEach(function (item) {
        // console.log(item.target, item.intersectionRatio)
        if (item.target === _this2.$refs.top) {
          if (item.intersectionRatio > 0) {
            _this2.pullDown = true;
            _this2.firstToTop = true;
          } else if (item.intersectionRatio === 0) {
            _this2.pullDown = false;
          }
        } else if (item.target === _this2.$refs.bottom) {
          if (item.intersectionRatio > 0.99) {
            if (_this2.pullUp) return;
            _this2.firstToBottom = true;
            _this2.pullUp = true;
          } else if (item.intersectionRatio === 0) {
            _this2.pullUp = false;
          }
        }
      });
    },
    loadEnd: function loadEnd() {
      var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (end) {
        this.loadState = 4;
      } else {
        this.loadState = 1;
      }
    },
    reloadEnd: function reloadEnd() {
      var _this3 = this;

      this.isBounce = true;
      this.reloadState = 1;
      this.reloadTop = -this.reloadHeight;
      this.top = 0;
      setTimeout(function () {
        _this3.isBounce = false;
      }, 300);
    },
    touchStart: function touchStart(e) {
      this.startY = e.touches[0].clientY;
    },
    touchMove: function touchMove(e) {
      if (!this.pullUp && !this.pullDown) return;
      var posY = e.touches[0].clientY;
      if (this.pullDown && posY < this.startY) return;
      if (this.pullUp && posY > this.startY) return;
      e.preventDefault();

      if (this.pullDown) {
        this.parent.scrollTop = 0;
        if (this.reloadState === 3) return;

        if (this.firstToTop) {
          this.startY = e.touches[0].clientY;
          this.firstToTop = false;
        }

        this.diff = posY - this.startY;
        this.top = Math.pow(this.diff, 0.82);
        this.reloadTop = this.top - this.reloadHeight;

        if (this.top >= this.reloadHeight) {
          this.reloadTop = 0;
          this.reloadState = 2;
        }
      } else if (this.pullUp) {
        if (this.firstToBottom) {
          this.startY = e.touches[0].clientY;
          this.firstToBottom = false;
        }

        this.diff = this.startY - e.touches[0].clientY;
        this.top = -Math.pow(this.diff, 0.82);
        if (this.loadState === 3 || this.loadState === 4) return;

        if (this.diff > 60) {
          this.loadState = 2;
        }
      }
    },
    touchEnd: function touchEnd(e) {
      var _this4 = this;

      if (this.pullUp) {
        this.isBounce = true;
        this.top = 0;
        this.pullUp = false;

        if (this.loadState === 2) {
          this.loadState = 3;
          this.$emit('load');
        }

        setTimeout(function () {
          _this4.isBounce = false;
        }, 300);
      } else if (this.pullDown) {
        this.isBounce = true;

        if (this.reloadState === 2) {
          this.top = this.reloadHeight;
          this.reloadTop = 0;
          this.reloadState = 3;
          this.$emit('reload');
        } else {
          this.reloadTop = -this.reloadHeight;
          this.top = 0;
        }

        setTimeout(function () {
          _this4.isBounce = false;
        }, 300);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/scroll/src/scroll2.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_scroll2vue_type_script_lang_js_ = (scroll2vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/scroll/src/scroll2.vue?vue&type=style&index=0&lang=stylus&
var scroll2vue_type_style_index_0_lang_stylus_ = __webpack_require__("9b20");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/scroll/src/scroll2.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_scroll2vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var scroll2 = (component.exports);
// CONCATENATED MODULE: ./packages/scroll/index.js


scroll2.install = function (Vue) {
  Vue.component(scroll2.name, scroll2);
};

/* harmony default export */ var packages_scroll = __webpack_exports__["default"] = (scroll2);

/***/ })

/******/ });
});