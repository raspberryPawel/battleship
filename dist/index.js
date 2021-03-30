/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/canvas-confetti/dist/confetti.module.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/canvas-confetti/dist/confetti.module.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "create": () => (/* binding */ create)
/* harmony export */ });
// canvas-confetti v1.4.0 built on 2021-03-10T12:32:33.488Z
var module = {};

// source content
(function main(global, module, isWorker, workerSize) {
  var canUseWorker = !!(
    global.Worker &&
    global.Blob &&
    global.Promise &&
    global.OffscreenCanvas &&
    global.OffscreenCanvasRenderingContext2D &&
    global.HTMLCanvasElement &&
    global.HTMLCanvasElement.prototype.transferControlToOffscreen &&
    global.URL &&
    global.URL.createObjectURL);

  function noop() {}

  // create a promise if it exists, otherwise, just
  // call the function directly
  function promise(func) {
    var ModulePromise = module.exports.Promise;
    var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;

    if (typeof Prom === 'function') {
      return new Prom(func);
    }

    func(noop, noop);

    return null;
  }

  var raf = (function () {
    var TIME = Math.floor(1000 / 60);
    var frame, cancel;
    var frames = {};
    var lastFrameTime = 0;

    if (typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function') {
      frame = function (cb) {
        var id = Math.random();

        frames[id] = requestAnimationFrame(function onFrame(time) {
          if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
            lastFrameTime = time;
            delete frames[id];

            cb();
          } else {
            frames[id] = requestAnimationFrame(onFrame);
          }
        });

        return id;
      };
      cancel = function (id) {
        if (frames[id]) {
          cancelAnimationFrame(frames[id]);
        }
      };
    } else {
      frame = function (cb) {
        return setTimeout(cb, TIME);
      };
      cancel = function (timer) {
        return clearTimeout(timer);
      };
    }

    return { frame: frame, cancel: cancel };
  }());

  var getWorker = (function () {
    var worker;
    var prom;
    var resolves = {};

    function decorate(worker) {
      function execute(options, callback) {
        worker.postMessage({ options: options || {}, callback: callback });
      }
      worker.init = function initWorker(canvas) {
        var offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ canvas: offscreen }, [offscreen]);
      };

      worker.fire = function fireWorker(options, size, done) {
        if (prom) {
          execute(options, null);
          return prom;
        }

        var id = Math.random().toString(36).slice(2);

        prom = promise(function (resolve) {
          function workerDone(msg) {
            if (msg.data.callback !== id) {
              return;
            }

            delete resolves[id];
            worker.removeEventListener('message', workerDone);

            prom = null;
            done();
            resolve();
          }

          worker.addEventListener('message', workerDone);
          execute(options, id);

          resolves[id] = workerDone.bind(null, { data: { callback: id }});
        });

        return prom;
      };

      worker.reset = function resetWorker() {
        worker.postMessage({ reset: true });

        for (var id in resolves) {
          resolves[id]();
          delete resolves[id];
        }
      };
    }

    return function () {
      if (worker) {
        return worker;
      }

      if (!isWorker && canUseWorker) {
        var code = [
          'var CONFETTI, SIZE = {}, module = {};',
          '(' + main.toString() + ')(this, module, true, SIZE);',
          'onmessage = function(msg) {',
          '  if (msg.data.options) {',
          '    CONFETTI(msg.data.options).then(function () {',
          '      if (msg.data.callback) {',
          '        postMessage({ callback: msg.data.callback });',
          '      }',
          '    });',
          '  } else if (msg.data.reset) {',
          '    CONFETTI.reset();',
          '  } else if (msg.data.resize) {',
          '    SIZE.width = msg.data.resize.width;',
          '    SIZE.height = msg.data.resize.height;',
          '  } else if (msg.data.canvas) {',
          '    SIZE.width = msg.data.canvas.width;',
          '    SIZE.height = msg.data.canvas.height;',
          '    CONFETTI = module.exports.create(msg.data.canvas);',
          '  }',
          '}',
        ].join('\n');
        try {
          worker = new Worker(URL.createObjectURL(new Blob([code])));
        } catch (e) {
          // eslint-disable-next-line no-console
          typeof console !== undefined && typeof console.warn === 'function' ? console.warn('🎊 Could not load worker', e) : null;

          return null;
        }

        decorate(worker);
      }

      return worker;
    };
  })();

  var defaults = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    x: 0.5,
    y: 0.5,
    shapes: ['square', 'circle'],
    zIndex: 100,
    colors: [
      '#26ccff',
      '#a25afd',
      '#ff5e7e',
      '#88ff5a',
      '#fcff42',
      '#ffa62d',
      '#ff36ff'
    ],
    // probably should be true, but back-compat
    disableForReducedMotion: false,
    scalar: 1
  };

  function convert(val, transform) {
    return transform ? transform(val) : val;
  }

  function isOk(val) {
    return !(val === null || val === undefined);
  }

  function prop(options, name, transform) {
    return convert(
      options && isOk(options[name]) ? options[name] : defaults[name],
      transform
    );
  }

  function onlyPositiveInt(number){
    return number < 0 ? 0 : Math.floor(number);
  }

  function randomInt(min, max) {
    // [min, max)
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function toDecimal(str) {
    return parseInt(str, 16);
  }

  function colorsToRgb(colors) {
    return colors.map(hexToRgb);
  }

  function hexToRgb(str) {
    var val = String(str).replace(/[^0-9a-f]/gi, '');

    if (val.length < 6) {
        val = val[0]+val[0]+val[1]+val[1]+val[2]+val[2];
    }

    return {
      r: toDecimal(val.substring(0,2)),
      g: toDecimal(val.substring(2,4)),
      b: toDecimal(val.substring(4,6))
    };
  }

  function getOrigin(options) {
    var origin = prop(options, 'origin', Object);
    origin.x = prop(origin, 'x', Number);
    origin.y = prop(origin, 'y', Number);

    return origin;
  }

  function setCanvasWindowSize(canvas) {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  }

  function setCanvasRectSize(canvas) {
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function getCanvas(zIndex) {
    var canvas = document.createElement('canvas');

    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = zIndex;

    return canvas;
  }

  function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(radiusX, radiusY);
    context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
    context.restore();
  }

  function randomPhysics(opts) {
    var radAngle = opts.angle * (Math.PI / 180);
    var radSpread = opts.spread * (Math.PI / 180);

    return {
      x: opts.x,
      y: opts.y,
      wobble: Math.random() * 10,
      velocity: (opts.startVelocity * 0.5) + (Math.random() * opts.startVelocity),
      angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
      tiltAngle: Math.random() * Math.PI,
      color: opts.color,
      shape: opts.shape,
      tick: 0,
      totalTicks: opts.ticks,
      decay: opts.decay,
      drift: opts.drift,
      random: Math.random() + 5,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: opts.gravity * 3,
      ovalScalar: 0.6,
      scalar: opts.scalar
    };
  }

  function updateFetti(context, fetti) {
    fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
    fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
    fetti.wobble += 0.1;
    fetti.velocity *= fetti.decay;
    fetti.tiltAngle += 0.1;
    fetti.tiltSin = Math.sin(fetti.tiltAngle);
    fetti.tiltCos = Math.cos(fetti.tiltAngle);
    fetti.random = Math.random() + 5;
    fetti.wobbleX = fetti.x + ((10 * fetti.scalar) * Math.cos(fetti.wobble));
    fetti.wobbleY = fetti.y + ((10 * fetti.scalar) * Math.sin(fetti.wobble));

    var progress = (fetti.tick++) / fetti.totalTicks;

    var x1 = fetti.x + (fetti.random * fetti.tiltCos);
    var y1 = fetti.y + (fetti.random * fetti.tiltSin);
    var x2 = fetti.wobbleX + (fetti.random * fetti.tiltCos);
    var y2 = fetti.wobbleY + (fetti.random * fetti.tiltSin);

    context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - progress) + ')';
    context.beginPath();

    if (fetti.shape === 'circle') {
      context.ellipse ?
        context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) :
        ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
    } else {
      context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
      context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
      context.lineTo(Math.floor(x2), Math.floor(y2));
      context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
    }

    context.closePath();
    context.fill();

    return fetti.tick < fetti.totalTicks;
  }

  function animate(canvas, fettis, resizer, size, done) {
    var animatingFettis = fettis.slice();
    var context = canvas.getContext('2d');
    var animationFrame;
    var destroy;

    var prom = promise(function (resolve) {
      function onDone() {
        animationFrame = destroy = null;

        context.clearRect(0, 0, size.width, size.height);

        done();
        resolve();
      }

      function update() {
        if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
          size.width = canvas.width = workerSize.width;
          size.height = canvas.height = workerSize.height;
        }

        if (!size.width && !size.height) {
          resizer(canvas);
          size.width = canvas.width;
          size.height = canvas.height;
        }

        context.clearRect(0, 0, size.width, size.height);

        animatingFettis = animatingFettis.filter(function (fetti) {
          return updateFetti(context, fetti);
        });

        if (animatingFettis.length) {
          animationFrame = raf.frame(update);
        } else {
          onDone();
        }
      }

      animationFrame = raf.frame(update);
      destroy = onDone;
    });

    return {
      addFettis: function (fettis) {
        animatingFettis = animatingFettis.concat(fettis);

        return prom;
      },
      canvas: canvas,
      promise: prom,
      reset: function () {
        if (animationFrame) {
          raf.cancel(animationFrame);
        }

        if (destroy) {
          destroy();
        }
      }
    };
  }

  function confettiCannon(canvas, globalOpts) {
    var isLibCanvas = !canvas;
    var allowResize = !!prop(globalOpts || {}, 'resize');
    var globalDisableForReducedMotion = prop(globalOpts, 'disableForReducedMotion', Boolean);
    var shouldUseWorker = canUseWorker && !!prop(globalOpts || {}, 'useWorker');
    var worker = shouldUseWorker ? getWorker() : null;
    var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
    var initialized = (canvas && worker) ? !!canvas.__confetti_initialized : false;
    var preferLessMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion)').matches;
    var animationObj;

    function fireLocal(options, size, done) {
      var particleCount = prop(options, 'particleCount', onlyPositiveInt);
      var angle = prop(options, 'angle', Number);
      var spread = prop(options, 'spread', Number);
      var startVelocity = prop(options, 'startVelocity', Number);
      var decay = prop(options, 'decay', Number);
      var gravity = prop(options, 'gravity', Number);
      var drift = prop(options, 'drift', Number);
      var colors = prop(options, 'colors', colorsToRgb);
      var ticks = prop(options, 'ticks', Number);
      var shapes = prop(options, 'shapes');
      var scalar = prop(options, 'scalar');
      var origin = getOrigin(options);

      var temp = particleCount;
      var fettis = [];

      var startX = canvas.width * origin.x;
      var startY = canvas.height * origin.y;

      while (temp--) {
        fettis.push(
          randomPhysics({
            x: startX,
            y: startY,
            angle: angle,
            spread: spread,
            startVelocity: startVelocity,
            color: colors[temp % colors.length],
            shape: shapes[randomInt(0, shapes.length)],
            ticks: ticks,
            decay: decay,
            gravity: gravity,
            drift: drift,
            scalar: scalar
          })
        );
      }

      // if we have a previous canvas already animating,
      // add to it
      if (animationObj) {
        return animationObj.addFettis(fettis);
      }

      animationObj = animate(canvas, fettis, resizer, size , done);

      return animationObj.promise;
    }

    function fire(options) {
      var disableForReducedMotion = globalDisableForReducedMotion || prop(options, 'disableForReducedMotion', Boolean);
      var zIndex = prop(options, 'zIndex', Number);

      if (disableForReducedMotion && preferLessMotion) {
        return promise(function (resolve) {
          resolve();
        });
      }

      if (isLibCanvas && animationObj) {
        // use existing canvas from in-progress animation
        canvas = animationObj.canvas;
      } else if (isLibCanvas && !canvas) {
        // create and initialize a new canvas
        canvas = getCanvas(zIndex);
        document.body.appendChild(canvas);
      }

      if (allowResize && !initialized) {
        // initialize the size of a user-supplied canvas
        resizer(canvas);
      }

      var size = {
        width: canvas.width,
        height: canvas.height
      };

      if (worker && !initialized) {
        worker.init(canvas);
      }

      initialized = true;

      if (worker) {
        canvas.__confetti_initialized = true;
      }

      function onResize() {
        if (worker) {
          // TODO this really shouldn't be immediate, because it is expensive
          var obj = {
            getBoundingClientRect: function () {
              if (!isLibCanvas) {
                return canvas.getBoundingClientRect();
              }
            }
          };

          resizer(obj);

          worker.postMessage({
            resize: {
              width: obj.width,
              height: obj.height
            }
          });
          return;
        }

        // don't actually query the size here, since this
        // can execute frequently and rapidly
        size.width = size.height = null;
      }

      function done() {
        animationObj = null;

        if (allowResize) {
          global.removeEventListener('resize', onResize);
        }

        if (isLibCanvas && canvas) {
          document.body.removeChild(canvas);
          canvas = null;
          initialized = false;
        }
      }

      if (allowResize) {
        global.addEventListener('resize', onResize, false);
      }

      if (worker) {
        return worker.fire(options, size, done);
      }

      return fireLocal(options, size, done);
    }

    fire.reset = function () {
      if (worker) {
        worker.reset();
      }

      if (animationObj) {
        animationObj.reset();
      }
    };

    return fire;
  }

  module.exports = confettiCannon(null, { useWorker: true, resize: true });
  module.exports.create = confettiCannon;
}((function () {
  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof self !== 'undefined') {
    return self;
  }

  return this || {};
})(), module, false));

// end source content

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (module.exports);
var create = module.exports.create;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_ship_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/ship.svg */ "./src/images/ship.svg");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_ship_svg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n#startScreen {\n  width: 100vw;\n  height: 100vh;\n  max-height: 750px;\n  display: flex;\n  flex-direction: column;\n  padding: 20% 0;\n  justify-content: space-around;\n  align-items: center;\n}\n#startScreen .logoContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n#startScreen .logoContainer strong {\n  width: 100%;\n  display: block;\n  text-transform: uppercase;\n  font-weight: 400;\n  color: white;\n  font-size: 30px;\n  text-align: center;\n}\n#startScreen .logoContainer .logo {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  width: 200px;\n  height: 200px;\n  margin-top: 40px;\n  border-radius: 100px;\n  position: relative;\n}\n#startScreen .logoContainer .logo::before {\n  content: \"\";\n  position: absolute;\n  top: -15px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n#startScreen .btn-play {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  display: flex;\n  margin-top: 25px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n}\n#startScreen .btn-play:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n\n#playgroundScreen .playground-section {\n  display: flex;\n  flex-direction: row;\n}\n@media (max-width: 600px) {\n  #playgroundScreen .playground-section {\n    flex-direction: column;\n    align-items: center;\n  }\n}\n@media (min-width: 601px) {\n  #playgroundScreen .playground-ships {\n    width: auto !important;\n    min-width: 160px;\n  }\n}\n@media (max-width: 600px) {\n  #playgroundScreen .playground-ships {\n    width: 90%;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    margin-bottom: 20px;\n  }\n}\n@media (min-width: 601px) {\n  #playgroundScreen .all-ships-setted {\n    min-width: unset !important;\n  }\n}\n#playgroundScreen .playground-field {\n  margin: 0 0.5px;\n  border: 0.5px solid #fff;\n}\n#playgroundScreen .playground-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#playgroundScreen .ship_container {\n  display: flex;\n  flex-direction: row;\n  justify-content: start;\n  align-items: center;\n  margin: 3px;\n}\n@media (max-width: 600px) {\n  #playgroundScreen .ship_container {\n    margin-right: 10px;\n    margin-top: 10px;\n  }\n}\n#playgroundScreen .ship_field {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  margin: 0 1px;\n  cursor: pointer;\n}\n#playgroundScreen .selected_ship .ship_field {\n  background: #52c234;\n  background: -webkit-linear-gradient(to top left, #061700, #52c234);\n  background: linear-gradient(to top left, #061700, #52c234);\n}\n#playgroundScreen .field-with-gradient {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n}\n#playgroundScreen .field-with-error-gradient {\n  background-color: pink;\n}\n#playgroundScreen .btn-play,\n#playgroundScreen .btn-randomize,\n#playgroundScreen .btn-rotate {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  display: flex;\n  margin-top: 25px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n}\n#playgroundScreen .btn-play:hover,\n#playgroundScreen .btn-randomize:hover,\n#playgroundScreen .btn-rotate:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n#playgroundScreen .btn-play {\n  display: none;\n}\n\n.confettiCanvas {\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n#playGameScreen {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n@media (max-width: 600px) {\n  #playGameScreen {\n    flex-direction: column;\n  }\n}\n@media (min-width: 601px) {\n  #playGameScreen {\n    flex-direction: row;\n  }\n}\n#playGameScreen .playground-field {\n  margin: 0 0.5px;\n  border: 0.5px solid #fff;\n}\n#playGameScreen .player-playground-container .playground,\n#playGameScreen .computer-playground-container .playground {\n  margin-top: 10px;\n}\n#playGameScreen .player-playground-container strong,\n#playGameScreen .computer-playground-container strong {\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  color: #fff;\n}\n#playGameScreen .player-playground-container {\n  margin-top: 20px;\n}\n@media (min-width: 601px) {\n  #playGameScreen .computer-playground-container {\n    margin: 0 30px;\n  }\n}\n#playGameScreen .playground-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#playGameScreen .ship_container {\n  display: flex;\n  flex-direction: row;\n  justify-content: start;\n  align-items: center;\n  margin: 3px;\n}\n#playGameScreen .ship_field {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  margin: 0 1.5px;\n  cursor: pointer;\n}\n#playGameScreen .field-with-gradient {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n}\n#playGameScreen .field-with-error-gradient {\n  background-color: pink;\n}\n#playGameScreen .btn-play {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  display: flex;\n  margin-top: 25px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n  display: none;\n}\n#playGameScreen .btn-play:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n#playGameScreen .hit_field {\n  position: relative;\n}\n#playGameScreen .hit_field::after {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  content: \"✕\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  color: white;\n  font-family: \"Roboto\", sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#playGameScreen .misplaced_field {\n  position: relative;\n}\n#playGameScreen .misplaced_field::after {\n  content: \"•\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  font-family: \"Roboto\", sans-serif;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-container .modal-window {\n  position: fixed;\n  background-color: rgba(255, 255, 255, 0.1);\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 999;\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none;\n  transition: all 0.3s;\n}\n.modal-container .modal-window:target {\n  visibility: visible;\n  opacity: 1;\n  pointer-events: auto;\n}\n.modal-container .modal-window > div {\n  width: 80%;\n  max-width: 400px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding: 2em;\n  background: white;\n}\n.modal-container .modal-window header {\n  font-weight: bold;\n}\n.modal-container .modal-window h1 {\n  font-size: 150%;\n  margin: 0 0 15px;\n}\n.modal-container .modal-close {\n  color: #aaa;\n  line-height: 50px;\n  font-size: 80%;\n  position: absolute;\n  right: 0;\n  text-align: center;\n  top: 0;\n  width: 70px;\n  text-decoration: none;\n}\n.modal-container .modal-close:hover {\n  color: black;\n}\n.modal-container .modal-window > div {\n  border-radius: 1rem;\n}\n.modal-container .btn-play-again {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  display: flex;\n  margin-top: 25px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n  float: right;\n}\n.modal-container .btn-play-again:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: #14142d;\n  background: #0f0c29;\n  background: -webkit-linear-gradient(to right, #1f1f35, #262350, #0a081d);\n  background: linear-gradient(to right, #1f1f35, #262350, #0a081d);\n  user-select: none;\n  font-family: \"Roboto\", sans-serif;\n}\nbody main {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n}", "",{"version":3,"sources":["webpack://./src/styles/index.scss","webpack://./src/styles/StartScreen.scss","webpack://./src/styles/variables.scss","webpack://./src/styles/PlaygroundScreen.scss","webpack://./src/styles/PlayGameScreen.scss","webpack://./src/styles/Modal.scss"],"names":[],"mappings":"AAAA,gBAAgB;ACEhB;EACC,YAAA;EACA,aAAA;EACA,iBAAA;EAEA,aAAA;EACA,sBAAA;EACA,cAAA;EACA,6BAAA;EACA,mBAAA;ADAD;ACEC;EACC,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;ADAF;ACEE;EACC,WAAA;EACA,cAAA;EACA,yBAAA;EACA,gBAAA;EAEA,YAAA;EACA,eAAA;EACA,kBAAA;ADDH;ACIE;EC7BD,mBAAA;EACA,kEAAA;EACA,0DAAA;ED8BE,YAAA;EACA,aAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;ADDH;ACGG;EACC,WAAA;EACA,kBAAA;EACA,UAAA;EACA,OAAA;EAEA,WAAA;EACA,YAAA;EAEA,yDAAA;EACA,sBAAA;ADHJ;ACQC;ECrDA,mBAAA;EACA,kEAAA;EACA,0DAAA;EAUA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,aAAA;EACA,gBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;AFkCD;AEhCC;EACC,yBAAA;EACA,qBAAA;AFkCF;;AGnEC;EACC,aAAA;EACA,mBAAA;AHsEF;AE/BC;ECzCA;IAKE,sBAAA;IACA,mBAAA;EHuED;AACF;AE/BC;ECrCA;IAEE,sBAAA;IACA,gBAAA;EHsED;AACF;AE3CC;EC/BA;IAOE,UAAA;IAEA,aAAA;IACA,mBAAA;IACA,eAAA;IACA,mBAAA;EHsED;AACF;AE9CC;ECrBA;IAEE,2BAAA;EHqED;AACF;AGlEC;EACC,eAAA;EACA,wBAAA;AHoEF;AGjEC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AHmEF;AGhEC;EACC,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AHkEF;AE1EC;ECGA;IAQE,kBAAA;IACA,gBAAA;EHmED;AACF;AGhEC;ED3DA,mBAAA;EACA,kEAAA;EACA,0DAAA;EC4DC,aAAA;EACA,eAAA;AHmEF;AG/DE;ED7DD,mBAAA;EACA,kEAAA;EACA,0DAAA;AF+HD;AG/DC;EDxEA,mBAAA;EACA,kEAAA;EACA,0DAAA;AF0ID;AGhEC;EACC,sBAAA;AHkEF;AG/DC;;;EDhFA,mBAAA;EACA,kEAAA;EACA,0DAAA;EAUA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,aAAA;EACA,gBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;AFsID;AEpIC;;;EACC,yBAAA;EACA,qBAAA;AFwIF;AGpFC;EACC,aAAA;AHsFF;;AI7KA;EACC,YAAA;EACA,aAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;AJgLD;;AI7KA;EACC,aAAA;EACA,eAAA;EACA,uBAAA;AJgLD;AEjJC;EElCD;IAME,sBAAA;EJiLA;AACF;AEhJC;EExCD;IAUE,mBAAA;EJkLA;AACF;AIhLC;EACC,eAAA;EACA,wBAAA;AJkLF;AI7KE;;EACC,gBAAA;AJgLH;AI7KE;;EACC,iCAAA;EACA,gBAAA;EACA,eAAA;EACA,WAAA;AJgLH;AI5KC;EACC,gBAAA;AJ8KF;AEvKC;EEJA;IAEE,cAAA;EJ6KD;AACF;AI1KC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AJ4KF;AIzKC;EACC,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AJ2KF;AIxKC;EFlEA,mBAAA;EACA,kEAAA;EACA,0DAAA;EEmEC,eAAA;EACA,eAAA;AJ2KF;AIxKC;EFzEA,mBAAA;EACA,kEAAA;EACA,0DAAA;AFoPD;AIzKC;EACC,sBAAA;AJ2KF;AIxKC;EFjFA,mBAAA;EACA,kEAAA;EACA,0DAAA;EAUA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,aAAA;EACA,gBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;EEsDC,aAAA;AJyLF;AE7OC;EACC,yBAAA;EACA,qBAAA;AF+OF;AI1LC;EACC,kBAAA;AJ4LF;AI1LE;EF3FD,mBAAA;EACA,kEAAA;EACA,0DAAA;EE2FE,YAAA;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,YAAA;EACA,iCAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AJ6LH;AIzLC;EACC,kBAAA;AJ2LF;AIzLE;EACC,YAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,iCAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AJ2LH;;AKvTC;EACC,eAAA;EACA,0CAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;EACA,oBAAA;AL0TF;AKxTE;EACC,mBAAA;EACA,UAAA;EACA,oBAAA;AL0TH;AKxTE;EACC,UAAA;EACA,gBAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,YAAA;EACA,iBAAA;AL0TH;AKxTE;EACC,iBAAA;AL0TH;AKxTE;EACC,eAAA;EACA,gBAAA;AL0TH;AKtTC;EACC,WAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,QAAA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,qBAAA;ALwTF;AKvTE;EACC,YAAA;ALyTH;AKpTE;EACC,mBAAA;ALsTH;AKlTC;EH1DA,mBAAA;EACA,kEAAA;EACA,0DAAA;EAUA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,aAAA;EACA,gBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;EG+BC,YAAA;ALmUF;AEhWC;EACC,yBAAA;EACA,qBAAA;AFkWF;;AAhYA;EACC,SAAA;EACA,UAAA;EACA,yBAAA;EACA,mBAAA;EACA,wEAAA;EACA,gEAAA;EACA,iBAAA;EAEA,iCAAA;AAkYD;AAhYC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;AAkYF","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap\");\r\n@import \"./StartScreen.scss\";\r\n@import \"./PlaygroundScreen.scss\";\r\n@import \"./PlayGameScreen.scss\";\r\n@import \"./Modal.scss\";\r\n\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tbackground-color: #14142d;\r\n\tbackground: #0f0c29;\r\n\tbackground: -webkit-linear-gradient(to right, #1f1f35, #262350, #0a081d);\r\n\tbackground: linear-gradient(to right, #1f1f35, #262350, #0a081d);\r\n\tuser-select: none;\r\n\r\n\tfont-family: \"Roboto\", sans-serif;\r\n\r\n\tmain {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t\twidth: 100%;\r\n\t\theight: 100vh;\r\n\t\toverflow-x: hidden;\r\n\t\toverflow-y: auto;\r\n\t}\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n#startScreen {\r\n\twidth: 100vw;\r\n\theight: 100vh;\r\n\tmax-height: 750px;\r\n\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tpadding: 20% 0;\r\n\tjustify-content: space-around;\r\n\talign-items: center;\r\n\r\n\t.logoContainer {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\r\n\t\tstrong {\r\n\t\t\twidth: 100%;\r\n\t\t\tdisplay: block;\r\n\t\t\ttext-transform: uppercase;\r\n\t\t\tfont-weight: 400;\r\n\r\n\t\t\tcolor: white;\r\n\t\t\tfont-size: 30px;\r\n\t\t\ttext-align: center;\r\n\t\t}\r\n\r\n\t\t.logo {\r\n\t\t\t@include main-gradient();\r\n\r\n\t\t\twidth: 200px;\r\n\t\t\theight: 200px;\r\n\t\t\tmargin-top: 40px;\r\n\t\t\tborder-radius: 100px;\r\n\t\t\tposition: relative;\r\n\r\n\t\t\t&::before {\r\n\t\t\t\tcontent: \"\";\r\n\t\t\t\tposition: absolute;\r\n\t\t\t\ttop: -15px;\r\n\t\t\t\tleft: 0;\r\n\r\n\t\t\t\twidth: 100%;\r\n\t\t\t\theight: 100%;\r\n\r\n\t\t\t\tbackground-image: url(\"../images/ship.svg\");\r\n\t\t\t\tbackground-size: cover;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\t.btn-play {\r\n\t\t@include main-gradient();\r\n\t\t@include button-styles();\r\n\t}\r\n}\r\n","@mixin main-gradient() {\r\n\tbackground: #c31432;\r\n\tbackground: -webkit-linear-gradient(to top left, #240b36, #c31432);\r\n\tbackground: linear-gradient(to top left, #240b36, #c31432);\r\n}\r\n\r\n@mixin green-gradient() {\r\n\tbackground: #52c234;\r\n\tbackground: -webkit-linear-gradient(to top left, #061700, #52c234);\r\n\tbackground: linear-gradient(to top left, #061700, #52c234);\r\n}\r\n\r\n@mixin button-styles {\r\n\tborder: none;\r\n\toutline: none;\r\n\r\n\ttext-transform: uppercase;\r\n\tfont-family: \"Roboto\", sans-serif;\r\n\tfont-weight: 500;\r\n\tfont-size: 0.85rem;\r\n\tcolor: #fff;\r\n\r\n\tdisplay: flex;\r\n\tmargin-top: 25px;\r\n\r\n\t-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\tpadding: 0.7rem 1.5rem 0.5rem;\r\n\r\n\tborder-radius: 10rem;\r\n\r\n\tcursor: pointer;\r\n\ttransition-duration: 0.3s;\r\n\r\n\t&:hover {\r\n\t\ttransition-duration: 0.3s;\r\n\t\ttransform: scale(1.1);\r\n\t}\r\n}\r\n\r\n$mobile-width: 600px;\r\n$desktop-width: 1024px;\r\n\r\n@mixin phone {\r\n\t@media (max-width: #{$mobile-width}) {\r\n\t\t@content;\r\n\t}\r\n}\r\n\r\n@mixin desktop {\r\n\t@media (min-width: #{$mobile-width + 1}) {\r\n\t\t@content;\r\n\t}\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n#playgroundScreen {\r\n\t.playground-section {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\r\n\t\t@include phone {\r\n\t\t\tflex-direction: column;\r\n\t\t\talign-items: center;\r\n\t\t}\r\n\t}\r\n\r\n\t.playground-ships {\r\n\t\t@include desktop {\r\n\t\t\twidth: auto !important;\r\n\t\t\tmin-width: 160px;\r\n\t\t}\r\n\r\n\t\t@include phone {\r\n\t\t\twidth: 90%;\r\n\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex-direction: row;\r\n\t\t\tflex-wrap: wrap;\r\n\t\t\tmargin-bottom: 20px;\r\n\t\t}\r\n\t}\r\n\r\n\t.all-ships-setted {\r\n\t\t@include desktop {\r\n\t\t\tmin-width: unset !important;\r\n\t\t}\r\n\t}\r\n\r\n\t.playground-field {\r\n\t\tmargin: 0 0.5px;\r\n\t\tborder: 0.5px solid #fff;\r\n\t}\r\n\r\n\t.playground-row {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t}\r\n\r\n\t.ship_container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: start;\r\n\t\talign-items: center;\r\n\t\tmargin: 3px;\r\n\r\n\t\t@include phone {\r\n\t\t\tmargin-right: 10px;\r\n\t\t\tmargin-top: 10px;\r\n\t\t}\r\n\t}\r\n\r\n\t.ship_field {\r\n\t\t@include main-gradient();\r\n\r\n\t\tmargin: 0 1px;\r\n\t\tcursor: pointer;\r\n\t}\r\n\r\n\t.selected_ship {\r\n\t\t.ship_field {\r\n\t\t\t@include green-gradient();\r\n\t\t}\r\n\t}\r\n\r\n\t.field-with-gradient {\r\n\t\t@include main-gradient();\r\n\t}\r\n\r\n\t.field-with-error-gradient {\r\n\t\tbackground-color: pink;\r\n\t}\r\n\r\n\t.btn-play,\r\n\t.btn-randomize,\r\n\t.btn-rotate {\r\n\t\t@include main-gradient();\r\n\t\t@include button-styles();\r\n\t}\r\n\r\n\t.btn-play {\r\n\t\tdisplay: none;\r\n\t}\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n.confettiCanvas {\r\n\twidth: 100vw;\r\n\theight: 100vh;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n}\r\n\r\n#playGameScreen {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tjustify-content: center;\r\n\r\n\t@include phone {\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t@include desktop {\r\n\t\tflex-direction: row;\r\n\t}\r\n\r\n\t.playground-field {\r\n\t\tmargin: 0 0.5px;\r\n\t\tborder: 0.5px solid #fff;\r\n\t}\r\n\r\n\t.player-playground-container,\r\n\t.computer-playground-container {\r\n\t\t.playground {\r\n\t\t\tmargin-top: 10px;\r\n\t\t}\r\n\r\n\t\tstrong {\r\n\t\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\t\tfont-weight: 300;\r\n\t\t\tfont-size: 1rem;\r\n\t\t\tcolor: #fff;\r\n\t\t}\r\n\t}\r\n\r\n\t.player-playground-container {\r\n\t\tmargin-top: 20px;\r\n\t}\r\n\r\n\t.computer-playground-container {\r\n\t\t@include desktop {\r\n\t\t\tmargin: 0 30px;\r\n\t\t}\r\n\t}\r\n\r\n\t.playground-row {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t}\r\n\r\n\t.ship_container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: start;\r\n\t\talign-items: center;\r\n\t\tmargin: 3px;\r\n\t}\r\n\r\n\t.ship_field {\r\n\t\t@include main-gradient();\r\n\r\n\t\tmargin: 0 1.5px;\r\n\t\tcursor: pointer;\r\n\t}\r\n\r\n\t.field-with-gradient {\r\n\t\t@include main-gradient();\r\n\t}\r\n\r\n\t.field-with-error-gradient {\r\n\t\tbackground-color: pink;\r\n\t}\r\n\r\n\t.btn-play {\r\n\t\t@include main-gradient();\r\n\t\t@include button-styles();\r\n\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.hit_field {\r\n\t\tposition: relative;\r\n\r\n\t\t&::after {\r\n\t\t\t@include main-gradient();\r\n\t\t\tcontent: \"✕\";\r\n\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: 2;\r\n\t\t\tcolor: white;\r\n\t\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n\r\n\t.misplaced_field {\r\n\t\tposition: relative;\r\n\r\n\t\t&::after {\r\n\t\t\tcontent: \"•\";\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: 2;\r\n\t\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\t\tcolor: white;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n}\r\n",".modal-container {\r\n\t.modal-window {\r\n\t\tposition: fixed;\r\n\t\tbackground-color: rgba(255, 255, 255, 0.1);\r\n\t\ttop: 0;\r\n\t\tright: 0;\r\n\t\tbottom: 0;\r\n\t\tleft: 0;\r\n\t\tz-index: 999;\r\n\t\tvisibility: hidden;\r\n\t\topacity: 0;\r\n\t\tpointer-events: none;\r\n\t\ttransition: all 0.3s;\r\n\r\n\t\t&:target {\r\n\t\t\tvisibility: visible;\r\n\t\t\topacity: 1;\r\n\t\t\tpointer-events: auto;\r\n\t\t}\r\n\t\t& > div {\r\n\t\t\twidth: 80%;\r\n\t\t\tmax-width: 400px;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 50%;\r\n\t\t\tleft: 50%;\r\n\t\t\ttransform: translate(-50%, -50%);\r\n\t\t\tpadding: 2em;\r\n\t\t\tbackground: white;\r\n\t\t}\r\n\t\theader {\r\n\t\t\tfont-weight: bold;\r\n\t\t}\r\n\t\th1 {\r\n\t\t\tfont-size: 150%;\r\n\t\t\tmargin: 0 0 15px;\r\n\t\t}\r\n\t}\r\n\r\n\t.modal-close {\r\n\t\tcolor: #aaa;\r\n\t\tline-height: 50px;\r\n\t\tfont-size: 80%;\r\n\t\tposition: absolute;\r\n\t\tright: 0;\r\n\t\ttext-align: center;\r\n\t\ttop: 0;\r\n\t\twidth: 70px;\r\n\t\ttext-decoration: none;\r\n\t\t&:hover {\r\n\t\t\tcolor: black;\r\n\t\t}\r\n\t}\r\n\r\n\t.modal-window {\r\n\t\t& > div {\r\n\t\t\tborder-radius: 1rem;\r\n\t\t}\r\n\t}\r\n\r\n\t.btn-play-again {\r\n\t\t@include main-gradient();\r\n\t\t@include button-styles();\r\n\t\t\r\n\t\tfloat: right;\r\n\t}\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/interfaces/GameScreen.ts":
/*!**************************************!*\
  !*** ./src/interfaces/GameScreen.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameScreen = void 0;
var GameScreen = (function () {
    function GameScreen(nextScreen) {
        this.nextScreen = null;
        this.nextScreen = nextScreen;
    }
    return GameScreen;
}());
exports.GameScreen = GameScreen;


/***/ }),

/***/ "./src/scripts/EventDispatcher.ts":
/*!****************************************!*\
  !*** ./src/scripts/EventDispatcher.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDispatcher = void 0;
var EventDispatcher = (function () {
    function EventDispatcher() {
    }
    EventDispatcher.dispatch = function (event, data) {
        document.body.dispatchEvent(new CustomEvent(event, { detail: data }));
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;


/***/ }),

/***/ "./src/scripts/Game.ts":
/*!*****************************!*\
  !*** ./src/scripts/Game.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
var EventType_1 = __webpack_require__(/*! ./consts/EventType */ "./src/scripts/consts/EventType.ts");
var MoveType_1 = __webpack_require__(/*! ./consts/MoveType */ "./src/scripts/consts/MoveType.ts");
var PlayerType_1 = __webpack_require__(/*! ./consts/PlayerType */ "./src/scripts/consts/PlayerType.ts");
var GameOptions_1 = __webpack_require__(/*! ./GameOptions */ "./src/scripts/GameOptions.ts");
var EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./src/scripts/EventDispatcher.ts");
var Game = (function () {
    function Game(playerPlayground, computerPlayground, playerMoveStrategy, computerMoveStrategy) {
        var _this = this;
        this.move = MoveType_1.MoveType.playerMove;
        this.playerSunkFields = 0;
        this.computerSunkFields = 0;
        this.resolveMove = function () { };
        this.checkIfFieldHasShip = function (row, column) {
            if (_this.move === MoveType_1.MoveType.computerMove && _this.playerPlayground[row][column] === 1) {
                _this.playerSunkFields++;
            }
            if (_this.move === MoveType_1.MoveType.playerMove && _this.computerPlayground[row][column] === 1) {
                _this.computerSunkFields++;
            }
            return _this.move === MoveType_1.MoveType.computerMove
                ? _this.playerPlayground[row][column] === 1
                : _this.computerPlayground[row][column] === 1;
        };
        this.playerPlayground = playerPlayground;
        this.computerPlayground = computerPlayground;
        this.playerMoveStrategy = playerMoveStrategy;
        this.computerMoveStrategy = computerMoveStrategy;
        this.gameInProgress = true;
        this.shipFieldsCount = GameOptions_1.GameOptions.availableShips.reduce(function (a, b) { return a + b; });
    }
    Game.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.move = MoveType_1.MoveType.playerMove;
                this.game();
                return [2];
            });
        });
    };
    Game.prototype.game = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.gameInProgress) return [3, 2];
                        return [4, new Promise(function (resolve) {
                                _this.resolveMove = resolve;
                                _this.performMove();
                            })];
                    case 1:
                        _a.sent();
                        this.nextMove();
                        this.game();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    Game.prototype.nextMove = function () {
        if (this.computerSunkFields === this.shipFieldsCount) {
            this.gameInProgress = false;
            EventDispatcher_1.EventDispatcher.dispatch(EventType_1.EventType.GAME_END, { win: PlayerType_1.PlayerType.player });
        }
        if (this.playerSunkFields === this.shipFieldsCount) {
            this.gameInProgress = false;
            EventDispatcher_1.EventDispatcher.dispatch(EventType_1.EventType.GAME_END, { win: PlayerType_1.PlayerType.computer });
        }
        this.move = this.move === MoveType_1.MoveType.computerMove ? MoveType_1.MoveType.playerMove : MoveType_1.MoveType.computerMove;
    };
    Game.prototype.performMove = function () {
        this.move === MoveType_1.MoveType.computerMove
            ? this.computerMoveStrategy.performMove(this.checkIfFieldHasShip, this.resolveMove)
            : this.playerMoveStrategy.performMove(this.checkIfFieldHasShip, this.resolveMove);
    };
    return Game;
}());
exports.Game = Game;


/***/ }),

/***/ "./src/scripts/GameOptions.ts":
/*!************************************!*\
  !*** ./src/scripts/GameOptions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameOptions = void 0;
var GameOptions = (function () {
    function GameOptions() {
    }
    GameOptions.prepareScreen = function (screen) {
        screen === null || screen === void 0 ? void 0 : screen.prepareScreen();
        screen === null || screen === void 0 ? void 0 : screen.prepareScreenEvents();
    };
    GameOptions.getMainDOMElement = function () {
        return document.querySelector("main");
    };
    GameOptions.clearMainDOMElement = function () {
        this.getMainDOMElement().innerHTML = "";
    };
    GameOptions.changeScreenContent = function (newContent) {
        this.clearMainDOMElement();
        this.getMainDOMElement().append(newContent);
    };
    GameOptions.playgroundFieldsCount = 10;
    GameOptions.playgroundSize = window.innerWidth > 1200 ? 400 : Math.min(window.innerWidth - 100, 400);
    GameOptions.fieldSize = GameOptions.playgroundSize / GameOptions.playgroundFieldsCount - 4;
    GameOptions.availableShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    GameOptions.currentlySelectedField = null;
    GameOptions.changeScreen = function (nextScreen) {
        var _a;
        if (nextScreen) {
            (_a = GameOptions.currentScreen) === null || _a === void 0 ? void 0 : _a.unregisterScreenEvents();
            GameOptions.prepareScreen(nextScreen);
            GameOptions.currentScreen = nextScreen;
        }
    };
    return GameOptions;
}());
exports.GameOptions = GameOptions;


/***/ }),

/***/ "./src/scripts/Ship.ts":
/*!*****************************!*\
  !*** ./src/scripts/Ship.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ship = void 0;
var GameOptions_1 = __webpack_require__(/*! ./GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ./playground/PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./src/scripts/EventDispatcher.ts");
var ShipDirection_1 = __webpack_require__(/*! ./consts/ShipDirection */ "./src/scripts/consts/ShipDirection.ts");
var EventType_1 = __webpack_require__(/*! ./consts/EventType */ "./src/scripts/consts/EventType.ts");
var Ship = (function () {
    function Ship(shipSize) {
        var _this = this;
        this.shipDirection = ShipDirection_1.ShipDirection.horizontal;
        this.fieldsOnPlayground = [];
        this.shipElement = document.createElement("div");
        this.clickOnShip = function (e) {
            var _a;
            e.stopPropagation();
            document.body.addEventListener("click", _this.unselectShip);
            (_a = GameOptions_1.GameOptions.currentSelectedShipAfterClick) === null || _a === void 0 ? void 0 : _a.shipElement.classList.remove("selected_ship");
            GameOptions_1.GameOptions.currentSelectedShip = _this;
            GameOptions_1.GameOptions.currentSelectedShipAfterClick = _this;
            _this.shipElement.classList.add("selected_ship");
        };
        this.unselectShip = function (e) {
            if (GameOptions_1.GameOptions.currentSelectedShipAfterClick) {
                GameOptions_1.GameOptions.currentSelectedShipAfterClick.shipElement.style.opacity = "1";
                GameOptions_1.GameOptions.currentSelectedShipAfterClick.shipElement.classList.remove("selected_ship");
            }
            GameOptions_1.GameOptions.currentSelectedShip = null;
            GameOptions_1.GameOptions.currentSelectedShipAfterClick = null;
            document.body.removeEventListener("click", _this.unselectShip);
        };
        this.moveShip = function (e) {
            if (_this.shipElement) {
                _this.changeShipPosition(e.clientX, e.clientY);
            }
        };
        this.pressKey = function (e) {
            if (e.key === "r") {
                _this.shipDirection =
                    _this.shipDirection === ShipDirection_1.ShipDirection.vertical ? ShipDirection_1.ShipDirection.horizontal : ShipDirection_1.ShipDirection.vertical;
                EventDispatcher_1.EventDispatcher.dispatch(EventType_1.EventType.ROTATE_SHIP);
            }
        };
        this.changeShipPosition = function (x, y) {
            if (_this.shipElement) {
                var slideX = 20;
                var slideY = 20;
                _this.shipElement.style.position = "absolute";
                _this.shipElement.style.zIndex = "-1";
                _this.shipElement.style.left = x - slideX + "px";
                _this.shipElement.style.top = y - slideY + "px";
            }
        };
        this.dropShip = function () {
            if (_this.shipElement) {
                _this.shipElement.classList.remove("selected_ship");
                _this.shipElement.style.position = "static";
                document.body.removeEventListener("mousemove", _this.moveShip);
                document.body.removeEventListener("mouseup", _this.dropShip);
                document.body.removeEventListener("keydown", _this.pressKey);
                if (GameOptions_1.GameOptions.currentlySelectedField && _this.shipOnPlayground.length > 0) {
                    _this.hideShip();
                    EventDispatcher_1.EventDispatcher.dispatch(EventType_1.EventType.SHIP_WAS_SETTED);
                }
                else
                    _this.showShip();
                GameOptions_1.GameOptions.currentlySelectedField = null;
                GameOptions_1.GameOptions.currentSelectedShip = null;
            }
        };
        this.shipSize = shipSize;
        this.createShipDOMElement();
    }
    Object.defineProperty(Ship.prototype, "size", {
        get: function () {
            return this.shipSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ship.prototype, "direction", {
        get: function () {
            return this.shipDirection;
        },
        set: function (shipDirection) {
            this.shipDirection = shipDirection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ship.prototype, "shipOnPlayground", {
        get: function () {
            return this.fieldsOnPlayground;
        },
        enumerable: false,
        configurable: true
    });
    Ship.prototype.addField = function (field) {
        this.fieldsOnPlayground.push(field);
    };
    Ship.prototype.clearFields = function () {
        this.fieldsOnPlayground.length = 0;
    };
    Ship.prototype.createShipDOMElement = function () {
        var _this = this;
        this.shipElement.className = "ship_container";
        this.shipElement.style.width = GameOptions_1.GameOptions.fieldSize * this.shipSize + this.shipSize * 2 + "px";
        this.shipElement.style.height = GameOptions_1.GameOptions.fieldSize + "px";
        for (var i = 0; i < this.shipSize; i++) {
            var div = document.createElement("div");
            div.className = "ship_field";
            div.style.width = GameOptions_1.GameOptions.fieldSize + "px";
            div.style.height = GameOptions_1.GameOptions.fieldSize + "px";
            this.shipElement.appendChild(div);
        }
        this.shipElement.addEventListener("mousedown", function (e) {
            GameOptions_1.GameOptions.currentSelectedShip = _this;
            document.body.addEventListener("mousemove", _this.moveShip);
            document.body.addEventListener("mouseup", _this.dropShip);
            document.body.addEventListener("keydown", _this.pressKey);
        });
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            this.shipElement.addEventListener("click", this.clickOnShip);
        }
    };
    Ship.rotateCurrentlySelectedShip = function (e) {
        e.stopPropagation();
        if (GameOptions_1.GameOptions.currentSelectedShip) {
            var direction = GameOptions_1.GameOptions.currentSelectedShip.direction === ShipDirection_1.ShipDirection.vertical
                ? ShipDirection_1.ShipDirection.horizontal
                : ShipDirection_1.ShipDirection.vertical;
            GameOptions_1.GameOptions.currentSelectedShip.direction = direction;
            EventDispatcher_1.EventDispatcher.dispatch(EventType_1.EventType.ROTATE_SHIP);
        }
    };
    Ship.prototype.hideShip = function () {
        this.shipElement.style.display = "none";
    };
    Ship.prototype.showShip = function () {
        this.shipElement.style.display = "flex";
        this.shipElement.style.opacity = "1";
        this.shipElement.style.zIndex = "1";
    };
    return Ship;
}());
exports.Ship = Ship;


/***/ }),

/***/ "./src/scripts/consts/EventType.ts":
/*!*****************************************!*\
  !*** ./src/scripts/consts/EventType.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventType = void 0;
var EventType = (function () {
    function EventType() {
    }
    EventType.SHIP_WAS_SETTED = "shipWasSetted";
    EventType.ROTATE_SHIP = "rotateShip";
    EventType.GAME_END = "gameEnd";
    return EventType;
}());
exports.EventType = EventType;


/***/ }),

/***/ "./src/scripts/consts/MoveDirection.ts":
/*!*********************************************!*\
  !*** ./src/scripts/consts/MoveDirection.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveDirection = void 0;
var MoveDirection;
(function (MoveDirection) {
    MoveDirection["Left"] = "Left";
    MoveDirection["Right"] = "Right";
    MoveDirection["Top"] = "Top";
    MoveDirection["Bottom"] = "Bottom";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));


/***/ }),

/***/ "./src/scripts/consts/MoveType.ts":
/*!****************************************!*\
  !*** ./src/scripts/consts/MoveType.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveType = void 0;
var MoveType;
(function (MoveType) {
    MoveType[MoveType["computerMove"] = 0] = "computerMove";
    MoveType[MoveType["playerMove"] = 1] = "playerMove";
})(MoveType = exports.MoveType || (exports.MoveType = {}));


/***/ }),

/***/ "./src/scripts/consts/PlayerType.ts":
/*!******************************************!*\
  !*** ./src/scripts/consts/PlayerType.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerType = void 0;
var PlayerType;
(function (PlayerType) {
    PlayerType["player"] = "Player";
    PlayerType["computer"] = "Computer";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));


/***/ }),

/***/ "./src/scripts/consts/ShipDirection.ts":
/*!*********************************************!*\
  !*** ./src/scripts/consts/ShipDirection.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShipDirection = void 0;
var ShipDirection;
(function (ShipDirection) {
    ShipDirection["vertical"] = "vertical";
    ShipDirection["horizontal"] = "horizontal";
})(ShipDirection = exports.ShipDirection || (exports.ShipDirection = {}));


/***/ }),

/***/ "./src/scripts/moveStrategies/PlayerMoveStrategy.ts":
/*!**********************************************************!*\
  !*** ./src/scripts/moveStrategies/PlayerMoveStrategy.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerMoveStrategy = void 0;
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ../playground/PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var PlayerMoveStrategy = (function () {
    function PlayerMoveStrategy() {
        var _this = this;
        this.checkIfFieldHasShip = function (row, column) { return false; };
        this.resolveMove = function () { };
        this.playerMove = function (e) {
            var field = e.target;
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field.classList[1]), row = _a.row, column = _a.column;
            _this.checkIfFieldHasShip(row, column) ? field.classList.add("hit_field") : field.classList.add("misplaced_field");
            _this.unregisterPlayerMove();
            _this.resolveMove(true);
        };
    }
    PlayerMoveStrategy.prototype.performMove = function (checkIfFieldHasShip, resolveMove) {
        this.checkIfFieldHasShip = checkIfFieldHasShip;
        this.resolveMove = resolveMove;
        var playground = document.querySelector(".computer-playground");
        var fields = playground === null || playground === void 0 ? void 0 : playground.getElementsByClassName("playground-field");
        if (fields && fields.length) {
            for (var i = 0; i < fields.length; i++) {
                var wasHit = fields[i].classList.contains("hit_field") || fields[i].classList.contains("misplaced_field");
                if (!wasHit)
                    fields[i].addEventListener("click", this.playerMove);
            }
        }
    };
    PlayerMoveStrategy.prototype.unregisterPlayerMove = function () {
        var playground = document.querySelector(".computer-playground");
        var fields = playground === null || playground === void 0 ? void 0 : playground.getElementsByClassName("playground-field");
        if (fields && fields.length) {
            for (var i = 0; i < fields.length; i++) {
                fields[i].removeEventListener("click", this.playerMove);
            }
        }
    };
    return PlayerMoveStrategy;
}());
exports.PlayerMoveStrategy = PlayerMoveStrategy;


/***/ }),

/***/ "./src/scripts/moveStrategies/SimpleComputerMoveStrategy.ts":
/*!******************************************************************!*\
  !*** ./src/scripts/moveStrategies/SimpleComputerMoveStrategy.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleComputerMoveStrategy = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ../playground/PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var MoveDirection_1 = __webpack_require__(/*! ../consts/MoveDirection */ "./src/scripts/consts/MoveDirection.ts");
var ShipDirection_1 = __webpack_require__(/*! ../consts/ShipDirection */ "./src/scripts/consts/ShipDirection.ts");
var SimpleComputerMoveStrategy = (function () {
    function SimpleComputerMoveStrategy() {
        this.hitFields = [];
        this.hitsInARow = 0;
        this.shipDirection = ShipDirection_1.ShipDirection.horizontal;
        this.moveDirection = MoveDirection_1.MoveDirection.Right;
        this.firstHitField = null;
        this.availableShips = [];
        this.availableFields = [];
        this.fieldsToCheckAfterHit = [];
        this.availableShips = __spreadArray([], GameOptions_1.GameOptions.availableShips).sort(function (shipA, shipB) { return shipA - shipB; });
        for (var i = 0; i < GameOptions_1.GameOptions.playgroundFieldsCount; i++) {
            var row = [];
            for (var j = 0; j < GameOptions_1.GameOptions.playgroundFieldsCount; j++) {
                row[j] = i + "_" + j;
            }
            this.availableFields.push(row);
        }
    }
    SimpleComputerMoveStrategy.prototype.performMove = function (checkIfFieldHasShip, resolveMove) {
        this.checkIfFieldHasShip = checkIfFieldHasShip;
        this.resolveMove = resolveMove;
        var _a = this.selectFieldToHit(), row = _a.row, column = _a.column;
        var field = document.querySelector(".player-playground-" + row + "_" + column);
        this.checkIFieldHasShip(row, column) ? field.classList.add("hit_field") : field.classList.add("misplaced_field");
        this.removeFieldFromAvailable(row, column);
        this.resolveMove(true);
    };
    SimpleComputerMoveStrategy.prototype.removeFieldFromAvailable = function (row, column) {
        var areRowCorrect = row >= 0 && row < GameOptions_1.GameOptions.playgroundFieldsCount;
        var areColumnCorrect = column >= 0 && column < GameOptions_1.GameOptions.playgroundFieldsCount;
        if (areRowCorrect && areColumnCorrect) {
            var index = this.availableFields[row].indexOf(row + "_" + column);
            if (index !== -1) {
                this.availableFields[row].splice(index, 1);
            }
        }
    };
    SimpleComputerMoveStrategy.prototype.checkIFieldHasShip = function (row, column) {
        var _this = this;
        var hasShip = this.checkIfFieldHasShip(row, column);
        var fieldWasHit = false;
        if (hasShip)
            this.hitFields.push(row + "_" + column);
        if (this.fieldsToCheckAfterHit.length && hasShip) {
            this.hitsInARow += 1;
            this.fieldsToCheckAfterHit.splice(0, 1);
            this.checkIfShipIsVerticalOrHorizontal();
            this.setMoveDirectionBasedOnNextFieldToHit(row, column);
            fieldWasHit = true;
        }
        else if (this.fieldsToCheckAfterHit.length && !hasShip) {
            this.removeFieldsWhereThereIsNoShips(row, column);
        }
        if (!this.fieldsToCheckAfterHit.length && hasShip && !fieldWasHit) {
            this.firstHitField = { row: row, column: column };
            this.setFieldsToCheckAfterHit(row, column);
            this.setMoveDirectionBasedOnNextFieldToHit(row, column);
        }
        var getIndexAndExcludeFieldsWhereThereIsNoShips = function () {
            var indexOfSunkShip = _this.availableShips.indexOf(_this.hitsInARow);
            _this.availableShips.splice(indexOfSunkShip, 1);
            _this.hitsInARow = 0;
            _this.fieldsToCheckAfterHit.length = 0;
            _this.firstHitField = null;
            _this.excludeFieldsWhereThereIsNoShips();
        };
        this.checkIfLongestShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
        this.checkIfSomeShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
        return hasShip;
    };
    SimpleComputerMoveStrategy.prototype.checkIfShipIsVerticalOrHorizontal = function () {
        var isVertical = this.moveDirection === MoveDirection_1.MoveDirection.Top || this.moveDirection === MoveDirection_1.MoveDirection.Bottom;
        var isHorizontal = this.moveDirection === MoveDirection_1.MoveDirection.Left || this.moveDirection === MoveDirection_1.MoveDirection.Right;
        if (this.firstHitField && isHorizontal) {
            this.removeFieldsOnTop(this.firstHitField.row, this.firstHitField.column);
            this.removeFieldsOnBottom(this.firstHitField.row, this.firstHitField.column);
            this.shipDirection = ShipDirection_1.ShipDirection.horizontal;
        }
        else if (this.firstHitField && isVertical) {
            this.shipDirection = ShipDirection_1.ShipDirection.vertical;
        }
    };
    SimpleComputerMoveStrategy.prototype.checkIfLongestShipWasSunk = function (getIndexAndExcludeFieldsWhereThereIsNoShips) {
        if (this.hitsInARow === Math.max.apply(Math, this.availableShips)) {
            getIndexAndExcludeFieldsWhereThereIsNoShips();
        }
    };
    SimpleComputerMoveStrategy.prototype.checkIfSomeShipWasSunk = function (getIndexAndExcludeFieldsWhereThereIsNoShips) {
        if (!this.fieldsToCheckAfterHit.length && this.hitsInARow > 0) {
            getIndexAndExcludeFieldsWhereThereIsNoShips();
        }
    };
    SimpleComputerMoveStrategy.prototype.excludeFieldsWhereThereIsNoShips = function () {
        var _this = this;
        this.hitFields.sort(function (a, b) {
            var rowAndColumnA = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(a);
            var rowAndColumnB = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(b);
            return _this.shipDirection === ShipDirection_1.ShipDirection.vertical
                ? rowAndColumnA.row - rowAndColumnB.row
                : rowAndColumnA.column - rowAndColumnB.column;
        });
        var firstHitField = this.hitFields[0];
        var lastHitField = this.hitFields[this.hitFields.length - 1];
        var firstRowAndColumn = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(firstHitField);
        var lastRowAndColumn = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(lastHitField);
        if (this.shipDirection === ShipDirection_1.ShipDirection.vertical) {
            this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column);
            this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column);
            this.hitFields.forEach(function (field) {
                var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
                var columnLeft = column - 1;
                var columnRight = column + 1;
                _this.removeFieldFromAvailable(row, columnLeft);
                _this.removeFieldFromAvailable(row, columnRight);
            });
            this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column - 1);
            this.removeFieldFromAvailable(firstRowAndColumn.row - 1, firstRowAndColumn.column + 1);
            this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column - 1);
            this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
        }
        else {
            var columnBefore = firstRowAndColumn.column - 1;
            var columnAfter = firstRowAndColumn.column + 1;
            var rowAbove = firstRowAndColumn.row + 1;
            var rowBelow = firstRowAndColumn.row - 1;
            this.removeFieldFromAvailable(rowAbove, columnBefore);
            this.removeFieldFromAvailable(firstRowAndColumn.row, columnBefore);
            this.removeFieldFromAvailable(firstRowAndColumn.row, columnAfter);
            this.removeFieldFromAvailable(rowBelow, columnBefore);
            this.hitFields.forEach(function (field) {
                var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
                var rowAbove = row + 1;
                var rowBelow = row - 1;
                _this.removeFieldFromAvailable(rowAbove, column);
                _this.removeFieldFromAvailable(rowBelow, column);
            });
            this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column - 1);
            this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
            this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column - 1);
            this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column + 1);
        }
        this.hitFields.length = 0;
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsWhereThereIsNoShips = function (currentRow, currentColumn) {
        if (this.moveDirection === MoveDirection_1.MoveDirection.Right) {
            this.removeFieldsOnRight(currentRow, currentColumn);
            return;
        }
        if (this.moveDirection === MoveDirection_1.MoveDirection.Left) {
            this.removeFieldsOnLeft(currentRow, currentColumn);
            return;
        }
        if (this.moveDirection === MoveDirection_1.MoveDirection.Bottom) {
            this.removeFieldsOnBottom(currentRow, currentColumn);
            return;
        }
        if (this.moveDirection === MoveDirection_1.MoveDirection.Top) {
            this.removeFieldsOnTop(currentRow, currentColumn);
            return;
        }
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsOnLeft = function (currentRow, currentColumn) {
        var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
            return row === currentRow && column <= currentColumn;
        });
        this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
        this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsOnRight = function (currentRow, currentColumn) {
        var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
            return row === currentRow && column >= currentColumn;
        });
        this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
        this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsOnBottom = function (currentRow, currentColumn) {
        var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
            return column === currentColumn && row >= currentRow;
        });
        var index = this.fieldsToCheckAfterHit.indexOf(fieldsToRemove[0]);
        if (index !== -1)
            this.fieldsToCheckAfterHit.splice(index, fieldsToRemove.length);
        this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsOnTop = function (currentRow, currentColumn) {
        var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
            return column === currentColumn && row <= currentRow;
        });
        var index = this.fieldsToCheckAfterHit.indexOf(fieldsToRemove[0]);
        if (index !== -1)
            this.fieldsToCheckAfterHit.splice(index, fieldsToRemove.length);
        this.setMoveDirectionBasedOnNextFieldToHit(currentRow, currentColumn);
    };
    SimpleComputerMoveStrategy.prototype.setMoveDirectionBasedOnNextFieldToHit = function (currentRow, currentColumn) {
        var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]), row = _a.row, column = _a.column;
        if (row === -1 && column === -1) {
            this.fieldsToCheckAfterHit.length = 0;
            this.moveDirection = MoveDirection_1.MoveDirection.Right;
            return;
        }
        if (currentRow === row)
            this.moveDirection = column > currentColumn ? MoveDirection_1.MoveDirection.Right : MoveDirection_1.MoveDirection.Left;
        else
            this.moveDirection = row > currentRow ? MoveDirection_1.MoveDirection.Bottom : MoveDirection_1.MoveDirection.Top;
    };
    SimpleComputerMoveStrategy.prototype.setFieldsToCheckAfterHit = function (row, column) {
        this.hitsInARow = 1;
        var longestShipToSink = Math.max.apply(Math, this.availableShips);
        for (var i = column + 1; i < column + longestShipToSink; i++) {
            if (i < GameOptions_1.GameOptions.playgroundFieldsCount && this.availableFields[row].indexOf(row + "_" + i) !== -1)
                this.fieldsToCheckAfterHit.push(row + "_" + i);
            if (this.availableFields[row].indexOf(row + "_" + i) === -1)
                break;
        }
        for (var i = column - 1; i > column - longestShipToSink; i--) {
            if (i >= 0 && this.availableFields[row].indexOf(row + "_" + i) !== -1)
                this.fieldsToCheckAfterHit.push(row + "_" + i);
            if (this.availableFields[row].indexOf(row + "_" + i) === -1)
                break;
        }
        for (var i = row + 1; i < row + longestShipToSink; i++) {
            if (i < GameOptions_1.GameOptions.playgroundFieldsCount && this.availableFields[i].indexOf(i + "_" + column) !== -1)
                this.fieldsToCheckAfterHit.push(i + "_" + column);
            if (i < GameOptions_1.GameOptions.playgroundFieldsCount && this.availableFields[i].indexOf(i + "_" + column) === -1)
                break;
        }
        for (var i = row - 1; i > row - longestShipToSink; i--) {
            if (i >= 0 && this.availableFields[i].indexOf(i + "_" + column) !== -1)
                this.fieldsToCheckAfterHit.push(i + "_" + column);
            if (i >= 0 && this.availableFields[i].indexOf(i + "_" + column) === -1)
                break;
        }
    };
    SimpleComputerMoveStrategy.prototype.selectRandomFieldToHit = function () {
        var availableRowsIndexes = this.getAvailableRowIndexes();
        var selectedIndex = Math.floor(Math.random() * availableRowsIndexes.length);
        var row = this.availableFields[availableRowsIndexes[selectedIndex]];
        var column = row[Math.floor(Math.random() * row.length)];
        return PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(column);
    };
    SimpleComputerMoveStrategy.prototype.selectFieldToHit = function () {
        var longestShip = Math.max.apply(Math, this.availableShips);
        if (this.fieldsToCheckAfterHit.length && this.hitsInARow !== longestShip) {
            return PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]);
        }
        else if (this.fieldsToCheckAfterHit.length && this.hitsInARow > 0 && this.hitsInARow === longestShip) {
            this.availableShips.splice(0, 1);
            this.fieldsToCheckAfterHit.length = 0;
            this.hitsInARow = 0;
        }
        return this.selectRandomFieldToHit();
    };
    SimpleComputerMoveStrategy.prototype.getAvailableRowIndexes = function () {
        return this.availableFields
            .map(function (row, index) {
            return row.length ? index : null;
        })
            .filter(function (index) { return index !== null; });
    };
    return SimpleComputerMoveStrategy;
}());
exports.SimpleComputerMoveStrategy = SimpleComputerMoveStrategy;


/***/ }),

/***/ "./src/scripts/playground/ComputerPlayground.ts":
/*!******************************************************!*\
  !*** ./src/scripts/playground/ComputerPlayground.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputerPlayground = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var Playground_1 = __webpack_require__(/*! ./Playground */ "./src/scripts/playground/Playground.ts");
var Ship_1 = __webpack_require__(/*! ../Ship */ "./src/scripts/Ship.ts");
var ComputerPlayground = (function (_super) {
    __extends(ComputerPlayground, _super);
    function ComputerPlayground() {
        var _this = _super.call(this) || this;
        _this.playgroundShips = [];
        _this.showShipsOnPlayground = false;
        _this.playgroundClassPrefix = "computer-playground";
        _this.randomizeShipsPosition = function () {
            _this.clearPlayground();
            _this.randomizeShipsPositions();
        };
        _this.addListenerOnPlaygroundField = function (div) { };
        _this.prepareComputerShips();
        _this.preparePlaygroundDOMStructure();
        _this.randomizeShipsPosition();
        return _this;
    }
    ComputerPlayground.prototype.prepareComputerShips = function () {
        var _this = this;
        GameOptions_1.GameOptions.availableShips.forEach(function (shipSize) {
            var ship = new Ship_1.Ship(shipSize);
            _this.playgroundShips.push(ship);
        });
    };
    return ComputerPlayground;
}(Playground_1.Playground));
exports.ComputerPlayground = ComputerPlayground;


/***/ }),

/***/ "./src/scripts/playground/PlayerPlayground.ts":
/*!****************************************************!*\
  !*** ./src/scripts/playground/PlayerPlayground.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerPlayground = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var Playground_1 = __webpack_require__(/*! ./Playground */ "./src/scripts/playground/Playground.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ./PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var Ship_1 = __webpack_require__(/*! ../Ship */ "./src/scripts/Ship.ts");
var ShipDirection_1 = __webpack_require__(/*! ../consts/ShipDirection */ "./src/scripts/consts/ShipDirection.ts");
var EventType_1 = __webpack_require__(/*! ../consts/EventType */ "./src/scripts/consts/EventType.ts");
var FieldClassNames;
(function (FieldClassNames) {
    FieldClassNames["hit"] = "field-with-gradient";
    FieldClassNames["missplaced"] = "field-with-error-gradient";
})(FieldClassNames || (FieldClassNames = {}));
var PlayerPlayground = (function (_super) {
    __extends(PlayerPlayground, _super);
    function PlayerPlayground() {
        var _this = _super.call(this) || this;
        _this.tempHighlightedFields = [];
        _this.currentlySelectedField = "";
        _this.playgroundClassPrefix = "player-playground";
        _this.playgroundShips = [];
        _this.randomizeShipsPosition = function () {
            _this.clearPlayground();
            _this.randomizeShipsPositions();
            _this.hideShips();
        };
        _this.addListenerOnPlaygroundField = function (div) {
            if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
                div.addEventListener("click", _this.fieldClick);
            }
            else {
                div.addEventListener("mouseenter", _this.fieldMouseOver);
            }
        };
        _this.onShipRotate = function () {
            _this.highlightFields(_this.currentlySelectedField);
        };
        _this.playgroundMouseOver = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                GameOptions_1.GameOptions.currentSelectedShip.hideShip();
            }
        };
        _this.playgroundMouseLeave = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                GameOptions_1.GameOptions.currentSelectedShip.showShip();
                GameOptions_1.GameOptions.currentlySelectedField = null;
                _this.clearShipFields();
            }
        };
        _this.playgroundTouchEnd = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                GameOptions_1.GameOptions.currentSelectedShip.showShip();
                GameOptions_1.GameOptions.currentSelectedShip.dropShip();
                _this.clearShipFields();
            }
            _this.playgroundDOM.removeEventListener("touchend", _this.playgroundTouchEnd, false);
        };
        _this.fieldMouseOver = function (e) {
            var fieldClassName = e.target.classList[1];
            _this.highlightFields(fieldClassName);
        };
        _this.fieldClick = function (e) {
            var _a;
            var getRowAndColumnNumberFromClassName = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName;
            var fieldClassName = e.target.classList[1];
            var _b = getRowAndColumnNumberFromClassName(fieldClassName), row = _b.row, column = _b.column;
            GameOptions_1.GameOptions.currentlySelectedField = { row: row, column: column };
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                (_a = GameOptions_1.GameOptions.currentSelectedShipAfterClick) === null || _a === void 0 ? void 0 : _a.shipElement.classList.remove("selected_ship");
                GameOptions_1.GameOptions.currentSelectedShipAfterClick = null;
                var wasSetted = _this.setShipOnPlaygroundIfPossible(GameOptions_1.GameOptions.currentSelectedShip, row, column, GameOptions_1.GameOptions.currentSelectedShip.direction);
                if (GameOptions_1.GameOptions.currentSelectedShip) {
                    if (wasSetted)
                        GameOptions_1.GameOptions.currentSelectedShip.hideShip();
                    else
                        GameOptions_1.GameOptions.currentSelectedShip.showShip();
                }
                _this.clearShipFields();
                GameOptions_1.GameOptions.currentSelectedShip = null;
            }
            GameOptions_1.GameOptions.currentSelectedShip;
        };
        _this.fieldTouchMove = function (e) {
            _this.playgroundDOM.removeEventListener("touchend", _this.playgroundTouchEnd, false);
            _this.playgroundDOM.addEventListener("touchend", _this.playgroundTouchEnd, false);
            var selectedField;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            var fields = _this.playgroundDOM.querySelectorAll(".playground-field");
            fields.forEach(function (field) {
                var rect = field.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top)
                    selectedField = field;
            });
            if (selectedField) {
                var fieldClassName = selectedField.classList[1];
                _this.highlightFields(fieldClassName);
            }
        };
        _this.highlightFields = function (fieldClassName) {
            var _a, _b;
            _this.currentlySelectedField = fieldClassName;
            var shipSize = ((_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.size) || -1;
            if (shipSize === 0) {
                return;
            }
            var getRowAndColumnNumberFromClassName = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName;
            var shipDirection = (_b = GameOptions_1.GameOptions.currentSelectedShip) === null || _b === void 0 ? void 0 : _b.direction;
            var rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
            var row = rowAndColumnIndex.row, column = rowAndColumnIndex.column;
            GameOptions_1.GameOptions.currentlySelectedField = rowAndColumnIndex;
            _this.clearShipFields();
            shipDirection === ShipDirection_1.ShipDirection.vertical
                ? _this.setShipVerticallyOnPlayground(shipSize, row, column)
                : _this.setShipHorizontalyOnPlayground(shipSize, row, column);
        };
        _this.preparePlayerShips();
        _this.preparePlaygroundDOMStructure();
        _this.addEventsOnPlayerPlayground();
        return _this;
    }
    PlayerPlayground.prototype.getShipsDOMElements = function () {
        return this.playgroundShips.map(function (ship) { return ship.shipElement; });
    };
    PlayerPlayground.prototype.hideShips = function () {
        this.playgroundShips.forEach(function (ship) { return ship.hideShip(); });
    };
    PlayerPlayground.prototype.preparePlayerShips = function () {
        var _this = this;
        console.log("siemaneczko => ", GameOptions_1.GameOptions.availableShips);
        GameOptions_1.GameOptions.availableShips.forEach(function (shipSize) {
            var ship = new Ship_1.Ship(shipSize);
            _this.playgroundShips.push(ship);
        });
    };
    PlayerPlayground.prototype.addEventsOnPlayerPlayground = function () {
        this.playgroundDOM.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            this.playgroundDOM.addEventListener("touchmove", this.fieldTouchMove, false);
        }
        if (!PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            this.playgroundDOM.addEventListener("mouseover", this.playgroundMouseOver);
            this.playgroundDOM.addEventListener("mouseleave", this.playgroundMouseLeave);
        }
        document.body.addEventListener(EventType_1.EventType.ROTATE_SHIP, this.onShipRotate);
    };
    PlayerPlayground.prototype.removeEventsFromPlayerPlayground = function () {
        _super.prototype.removeEventsFromPlayerPlayground.call(this);
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            this.playgroundDOM.removeEventListener("touchmove", this.fieldTouchMove, false);
        }
        if (!PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            this.playgroundDOM.removeEventListener("mouseover", this.playgroundMouseOver);
            this.playgroundDOM.removeEventListener("mouseleave", this.playgroundMouseLeave);
        }
        document.body.removeEventListener(EventType_1.EventType.ROTATE_SHIP, this.onShipRotate);
    };
    PlayerPlayground.prototype.setShipVerticallyOnPlayground = function (shipSize, row, column) {
        var doesVerticalSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesVerticalSelectedFieldsEmpty, doesVerticalSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesVerticalSelectedNearbyFieldsEmpty;
        if (shipSize + row <= GameOptions_1.GameOptions.playgroundFieldsCount - 1) {
            var data = {
                playground: this.playground,
                currentChecked: column,
                first: row,
                last: shipSize + row,
            };
            if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
                this.highlightVerticalyCorrectShipFields(row, shipSize + row, column);
            }
            else
                this.highlightVerticalIncorrectShipFields(row, shipSize + row, column);
        }
        else {
            var data = {
                playground: this.playground,
                currentChecked: column,
                first: GameOptions_1.GameOptions.playgroundFieldsCount - shipSize,
                last: GameOptions_1.GameOptions.playgroundFieldsCount,
            };
            if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
                this.highlightVerticalyCorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, column);
            }
            else
                this.highlightVerticalIncorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, column);
        }
    };
    PlayerPlayground.prototype.setShipHorizontalyOnPlayground = function (shipSize, row, column) {
        var doesSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty;
        if (shipSize + column <= GameOptions_1.GameOptions.playgroundFieldsCount) {
            var data = {
                playground: this.playground,
                currentChecked: row,
                first: column,
                last: shipSize + column,
            };
            if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
                this.highlightCorrectShipFields(column, shipSize + column, row);
            else
                this.highlightIncorrectShipFields(column, shipSize + column, row);
        }
        else {
            var data = {
                playground: this.playground,
                currentChecked: row,
                first: GameOptions_1.GameOptions.playgroundFieldsCount - shipSize,
                last: GameOptions_1.GameOptions.playgroundFieldsCount,
            };
            if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
                this.highlightCorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, row);
            else
                this.highlightIncorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, row);
        }
    };
    PlayerPlayground.prototype.highlightCorrectShipFields = function (firstIndex, lastIndex, currentRow) {
        var _a;
        for (var i = firstIndex; i < lastIndex; i++) {
            this.playground[currentRow][i] = 1;
            if (this.highlightField(currentRow, i, FieldClassNames.hit)) {
                var className = this.getPlaygroundFieldClassName(currentRow, i);
                (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.addField(className);
            }
        }
    };
    PlayerPlayground.prototype.highlightVerticalyCorrectShipFields = function (firstIndex, lastIndex, currentColumn) {
        var _a;
        for (var i = firstIndex; i < lastIndex; i++) {
            this.playground[i][currentColumn] = 1;
            if (this.highlightField(i, currentColumn, FieldClassNames.hit)) {
                var className = this.getPlaygroundFieldClassName(i, currentColumn);
                (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.addField(className);
            }
        }
    };
    PlayerPlayground.prototype.highlightIncorrectShipFields = function (firstIndex, lastIndex, currentRow) {
        GameOptions_1.GameOptions.currentlySelectedField = null;
        for (var i = firstIndex; i < lastIndex; i++) {
            if (this.highlightField(currentRow, i, FieldClassNames.missplaced)) {
                this.tempHighlightedFields.push(currentRow + "_" + i);
            }
        }
    };
    PlayerPlayground.prototype.highlightVerticalIncorrectShipFields = function (firstIndex, lastIndex, currentColumn) {
        GameOptions_1.GameOptions.currentlySelectedField = null;
        for (var i = firstIndex; i < lastIndex; i++) {
            if (this.highlightField(i, currentColumn, FieldClassNames.missplaced)) {
                this.tempHighlightedFields.push(i + "_" + currentColumn);
            }
        }
    };
    PlayerPlayground.prototype.highlightField = function (row, column, className) {
        var elementClass = this.getPlaygroundFieldClassName(row, column);
        var element = document.querySelector(elementClass);
        if (element) {
            element.classList.add(className);
            return true;
        }
        return false;
    };
    PlayerPlayground.prototype.clearShipFields = function () {
        var _this = this;
        var _a, _b;
        this.clearPlaygroundFields();
        (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.shipOnPlayground.forEach(function (className) {
            var element = document.querySelector(className);
            if (element) {
                element.classList.remove("field-with-gradient");
            }
        });
        this.tempHighlightedFields.forEach(function (className) {
            var element = document.querySelector("." + _this.playgroundClassPrefix + "-" + className);
            if (element) {
                element.classList.remove("field-with-error-gradient");
            }
        });
        this.tempHighlightedFields.length = 0;
        (_b = GameOptions_1.GameOptions.currentSelectedShip) === null || _b === void 0 ? void 0 : _b.clearFields();
    };
    PlayerPlayground.prototype.clearPlaygroundFields = function () {
        var _this = this;
        var _a;
        (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.shipOnPlayground.forEach(function (className) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className), row = _a.row, column = _a.column;
            _this.playground[row][column] = 0;
        });
    };
    return PlayerPlayground;
}(Playground_1.Playground));
exports.PlayerPlayground = PlayerPlayground;


/***/ }),

/***/ "./src/scripts/playground/PlayerPlaygroundUtils.ts":
/*!*********************************************************!*\
  !*** ./src/scripts/playground/PlayerPlaygroundUtils.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerPlaygroundUtils = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlaygroundUtils = (function () {
    function PlayerPlaygroundUtils() {
    }
    PlayerPlaygroundUtils.getCurrentlySelectedShipFields = function () {
        var _a;
        return (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.shipOnPlayground.map(function (className) {
            var _a = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className), row = _a.row, column = _a.column;
            return row + "_" + column;
        });
    };
    PlayerPlaygroundUtils.isMobile = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };
    PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName = function (className) {
        var defaultRowAndColumn = {
            row: -1,
            column: -1,
        };
        try {
            var regex = /[0-9]_[0-9]/g;
            var matches = className.match(regex);
            if (matches === null || matches === void 0 ? void 0 : matches.length) {
                var rowAndColumn = matches[0];
                return {
                    row: parseInt(rowAndColumn[0]),
                    column: parseInt(rowAndColumn[2]),
                };
            }
            return defaultRowAndColumn;
        }
        catch (_a) {
            return defaultRowAndColumn;
        }
    };
    PlayerPlaygroundUtils.doesSelectedFieldsEmpty = function (data) {
        var playground = data.playground, currentChecked = data.currentChecked, first = data.first, last = data.last;
        var doesFieldEmpty = PlayerPlaygroundUtils.doesFieldEmpty, getCurrentlySelectedShipFields = PlayerPlaygroundUtils.getCurrentlySelectedShipFields;
        var fields = getCurrentlySelectedShipFields();
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, currentChecked, i) && !(fields === null || fields === void 0 ? void 0 : fields.includes(currentChecked + "_" + i)))
                return false;
        }
        return true;
    };
    PlayerPlaygroundUtils.doesVerticalSelectedFieldsEmpty = function (data) {
        var playground = data.playground, currentChecked = data.currentChecked, first = data.first, last = data.last;
        var doesFieldEmpty = PlayerPlaygroundUtils.doesFieldEmpty, getCurrentlySelectedShipFields = PlayerPlaygroundUtils.getCurrentlySelectedShipFields;
        var fields = getCurrentlySelectedShipFields();
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, i, currentChecked) && !(fields === null || fields === void 0 ? void 0 : fields.includes(i + "_" + currentChecked)))
                return false;
        }
        return true;
    };
    PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty = function (data) {
        var playground = data.playground, currentChecked = data.currentChecked, first = data.first, last = data.last;
        var doesFieldEmpty = PlayerPlaygroundUtils.doesFieldEmpty;
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, currentChecked - 1, i))
                return false;
        }
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, currentChecked + 1, i))
                return false;
        }
        if (!doesFieldEmpty(playground, currentChecked, first - 1))
            return false;
        if (!doesFieldEmpty(playground, currentChecked + 1, first - 1))
            return false;
        if (!doesFieldEmpty(playground, currentChecked - 1, first - 1))
            return false;
        return true;
    };
    PlayerPlaygroundUtils.doesVerticalSelectedNearbyFieldsEmpty = function (data) {
        var playground = data.playground, currentChecked = data.currentChecked, first = data.first, last = data.last;
        var doesFieldEmpty = PlayerPlaygroundUtils.doesFieldEmpty;
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, i, currentChecked - 1))
                return false;
        }
        for (var i = first; i <= last; i++) {
            if (!doesFieldEmpty(playground, i, currentChecked + 1))
                return false;
        }
        if (!doesFieldEmpty(playground, first - 1, currentChecked))
            return false;
        if (!doesFieldEmpty(playground, last - 1, currentChecked))
            return false;
        if (!doesFieldEmpty(playground, first - 1, currentChecked - 1))
            return false;
        if (!doesFieldEmpty(playground, first - 1, currentChecked + 1))
            return false;
        return true;
    };
    PlayerPlaygroundUtils.doesFieldEmpty = function (playground, row, column) {
        var areRowCorrect = row >= 0 && row < GameOptions_1.GameOptions.playgroundFieldsCount;
        var areColumnCorrect = column >= 0 && column < GameOptions_1.GameOptions.playgroundFieldsCount;
        if (areRowCorrect && areColumnCorrect) {
            if (playground[row][column])
                return false;
            else
                return true;
        }
        return true;
    };
    return PlayerPlaygroundUtils;
}());
exports.PlayerPlaygroundUtils = PlayerPlaygroundUtils;


/***/ }),

/***/ "./src/scripts/playground/Playground.ts":
/*!**********************************************!*\
  !*** ./src/scripts/playground/Playground.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Playground = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var ShipDirection_1 = __webpack_require__(/*! ../consts/ShipDirection */ "./src/scripts/consts/ShipDirection.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ./PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var EventType_1 = __webpack_require__(/*! ../consts/EventType */ "./src/scripts/consts/EventType.ts");
var Playground = (function () {
    function Playground(playgroundSize) {
        var _this = this;
        this.playgroundDOM = document.createElement("div");
        this.playground = [];
        this.playgroundShips = [];
        this.showShipsOnPlayground = true;
        this.shipsOnPlaygrundCount = 0;
        this.shipsWasSetted = function () {
            _this.shipsOnPlaygrundCount++;
        };
        this.changePlaygroundSize = function (playgroundSizeInPx) {
            _this.playgroundSizeInPx = playgroundSizeInPx ? playgroundSizeInPx : GameOptions_1.GameOptions.playgroundSize;
            _this.fieldSizeInPx = playgroundSizeInPx
                ? playgroundSizeInPx / GameOptions_1.GameOptions.playgroundFieldsCount - 4
                : GameOptions_1.GameOptions.fieldSize;
            _this.playgroundDOM.style.width = _this.playgroundSizeInPx + "px";
            _this.playgroundDOM.style.height = _this.playgroundSizeInPx + "px";
            var fields = _this.playgroundDOM.querySelectorAll(".playground-field");
            fields.forEach(function (field) {
                field.style.width = _this.fieldSizeInPx + "px";
                field.style.height = _this.fieldSizeInPx + "px";
                field.style.fontSize = _this.fieldSizeInPx / 2 + "px";
            });
            var rows = _this.playgroundDOM.querySelectorAll(".playground-row");
            rows.forEach(function (row) {
                row.style.height = _this.fieldSizeInPx + 4 + "px";
            });
            _this.playgroundShips.forEach(function (ship) {
                ship.shipElement.style.width = _this.fieldSizeInPx * ship.size + ship.size * 2 + "px";
                ship.shipElement.style.height = _this.fieldSizeInPx + "px";
                var fields = ship.shipElement.querySelectorAll(".ship_field");
                fields.forEach(function (field) {
                    field.style.width = _this.fieldSizeInPx + "px";
                    field.style.height = _this.fieldSizeInPx + "px";
                });
            });
        };
        this.randomizeShipsPositions = function () {
            GameOptions_1.GameOptions.currentlySelectedField = null;
            while (_this.shipsOnPlaygrundCount < _this.playgroundShips.length) {
                var ship = _this.playgroundShips[_this.shipsOnPlaygrundCount];
                var row = Math.floor(Math.random() * 10);
                var column = Math.floor(Math.random() * 10);
                var shipDirections = [ShipDirection_1.ShipDirection.horizontal, ShipDirection_1.ShipDirection.vertical];
                var randomIndex = Math.floor(Math.random() * shipDirections.length - 1) + 1;
                var shipDirection = shipDirections[randomIndex];
                _this.setShipOnPlaygroundIfPossible(ship, row, column, shipDirection);
            }
        };
        this.setShipOnPlaygroundIfPossible = function (ship, row, column, shipDirection) {
            var doesSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty, doesVerticalSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesVerticalSelectedFieldsEmpty, doesVerticalSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesVerticalSelectedNearbyFieldsEmpty;
            GameOptions_1.GameOptions.currentlySelectedField = { row: row, column: column };
            if (shipDirection === ShipDirection_1.ShipDirection.vertical) {
                if (ship.size + row <= GameOptions_1.GameOptions.playgroundFieldsCount) {
                    var data = {
                        playground: _this.playground,
                        currentChecked: column,
                        first: row,
                        last: ship.size + row,
                    };
                    if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
                        _this.setVerticalyShipOnPlayground(row, ship.size + row, column, ship);
                        return true;
                    }
                    else
                        return false;
                }
                else {
                    var data = {
                        playground: _this.playground,
                        currentChecked: column,
                        first: GameOptions_1.GameOptions.playgroundFieldsCount - ship.size,
                        last: GameOptions_1.GameOptions.playgroundFieldsCount,
                    };
                    if (doesVerticalSelectedFieldsEmpty(data) && doesVerticalSelectedNearbyFieldsEmpty(data)) {
                        _this.setVerticalyShipOnPlayground(GameOptions_1.GameOptions.playgroundFieldsCount - ship.size, GameOptions_1.GameOptions.playgroundFieldsCount, column, ship);
                        return true;
                    }
                    else
                        return false;
                }
            }
            else {
                if (ship.size + column <= GameOptions_1.GameOptions.playgroundFieldsCount) {
                    var data = {
                        playground: _this.playground,
                        currentChecked: row,
                        first: column,
                        last: ship.size + column,
                    };
                    if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
                        _this.setShipOnPlayground(column, ship.size + column, row, ship);
                        return true;
                    }
                    else
                        return false;
                }
                else {
                    var data = {
                        playground: _this.playground,
                        currentChecked: row,
                        first: GameOptions_1.GameOptions.playgroundFieldsCount - ship.size,
                        last: GameOptions_1.GameOptions.playgroundFieldsCount,
                    };
                    if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
                        _this.setShipOnPlayground(GameOptions_1.GameOptions.playgroundFieldsCount - ship.size, GameOptions_1.GameOptions.playgroundFieldsCount, row, ship);
                        return true;
                    }
                    else
                        return false;
                }
            }
        };
        this.playgroundSizeInPx = playgroundSize ? playgroundSize : GameOptions_1.GameOptions.playgroundSize;
        this.fieldSizeInPx = playgroundSize
            ? playgroundSize / GameOptions_1.GameOptions.playgroundFieldsCount - 4
            : GameOptions_1.GameOptions.fieldSize;
        this.preparePlayground();
        document.body.addEventListener(EventType_1.EventType.SHIP_WAS_SETTED, this.shipsWasSetted);
    }
    Playground.prototype.removeEventsFromPlayerPlayground = function () {
        document.body.removeEventListener(EventType_1.EventType.SHIP_WAS_SETTED, this.shipsWasSetted);
    };
    Playground.prototype.preparePlayground = function () {
        for (var i = 0; i < GameOptions_1.GameOptions.playgroundFieldsCount; i++) {
            var fields = new Array(GameOptions_1.GameOptions.playgroundFieldsCount).fill(0);
            this.playground.push(fields);
        }
    };
    Playground.prototype.getPlaygroundFieldClassName = function (row, column) {
        return "." + this.playgroundClassPrefix + "-" + row + "_" + column;
    };
    Playground.prototype.preparePlaygroundDOMStructure = function () {
        var _this = this;
        this.playgroundDOM.setAttribute("class", "playground " + this.playgroundClassPrefix);
        this.playgroundDOM.style.width = this.playgroundSizeInPx + "px";
        this.playgroundDOM.style.height = this.playgroundSizeInPx + "px";
        this.playground.forEach(function (row, rowIndex) {
            var rowDiv = document.createElement("div");
            rowDiv.setAttribute("class", "playground-row");
            rowDiv.style.height = _this.fieldSizeInPx + 4 + "px";
            row.forEach(function (field, fieldIndex) {
                var div = document.createElement("div");
                div.style.width = _this.fieldSizeInPx + "px";
                div.style.height = _this.fieldSizeInPx + "px";
                div.style.fontSize = _this.fieldSizeInPx / 2 + "px";
                div.setAttribute("class", "playground-field " + _this.playgroundClassPrefix + "-" + rowIndex + "_" + fieldIndex);
                _this.addListenerOnPlaygroundField(div);
                rowDiv.appendChild(div);
            });
            _this.playgroundDOM.appendChild(rowDiv);
        });
    };
    Playground.prototype.setShipOnPlayground = function (firstIndex, lastIndex, currentRow, ship) {
        for (var i = firstIndex; i < lastIndex; i++) {
            this.playground[currentRow][i] = 1;
            ship.addField(currentRow + "_" + i);
            if (this.showShipsOnPlayground) {
                var field = this.playgroundDOM.querySelector(this.getPlaygroundFieldClassName(currentRow, i));
                if (field) {
                    field.classList.add("field-with-gradient");
                }
            }
        }
        ship.dropShip();
    };
    Playground.prototype.setVerticalyShipOnPlayground = function (firstIndex, lastIndex, currentColumn, ship) {
        for (var i = firstIndex; i < lastIndex; i++) {
            this.playground[i][currentColumn] = 1;
            ship.addField(i + "_" + currentColumn);
            if (this.showShipsOnPlayground) {
                var field = this.playgroundDOM.querySelector(this.getPlaygroundFieldClassName(i, currentColumn));
                if (field) {
                    field.classList.add("field-with-gradient");
                }
            }
        }
        ship.dropShip();
    };
    Playground.prototype.clearPlayground = function () {
        var _this = this;
        this.playground.forEach(function (row, rowIndex) {
            row.forEach(function (field, fieldIndex) {
                field = 0;
                _this.playground[rowIndex][fieldIndex] = 0;
                var div = _this.playgroundDOM.querySelector(_this.getPlaygroundFieldClassName(rowIndex, fieldIndex));
                if (div) {
                    div.classList.remove("field-with-gradient");
                }
            });
        });
        this.playgroundShips.forEach(function (ship) {
            ship.clearFields();
        });
        this.shipsOnPlaygrundCount = 0;
    };
    return Playground;
}());
exports.Playground = Playground;


/***/ }),

/***/ "./src/scripts/screens/PlayGameScreen.ts":
/*!***********************************************!*\
  !*** ./src/scripts/screens/PlayGameScreen.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayGameScreen = void 0;
var GameScreen_1 = __webpack_require__(/*! ../../interfaces/GameScreen */ "./src/interfaces/GameScreen.ts");
var Game_1 = __webpack_require__(/*! ../Game */ "./src/scripts/Game.ts");
var PlayerMoveStrategy_1 = __webpack_require__(/*! ../moveStrategies/PlayerMoveStrategy */ "./src/scripts/moveStrategies/PlayerMoveStrategy.ts");
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var ComputerPlayground_1 = __webpack_require__(/*! ../playground/ComputerPlayground */ "./src/scripts/playground/ComputerPlayground.ts");
var SimpleComputerMoveStrategy_1 = __webpack_require__(/*! ../moveStrategies/SimpleComputerMoveStrategy */ "./src/scripts/moveStrategies/SimpleComputerMoveStrategy.ts");
var canvas_confetti_1 = __importDefault(__webpack_require__(/*! canvas-confetti */ "./node_modules/canvas-confetti/dist/confetti.module.mjs"));
var PlayerType_1 = __webpack_require__(/*! ../consts/PlayerType */ "./src/scripts/consts/PlayerType.ts");
var PlaygroundScreen_1 = __webpack_require__(/*! ./PlaygroundScreen */ "./src/scripts/screens/PlaygroundScreen.ts");
var StartScreen_1 = __webpack_require__(/*! ./StartScreen */ "./src/scripts/screens/StartScreen.ts");
var EventType_1 = __webpack_require__(/*! ../consts/EventType */ "./src/scripts/consts/EventType.ts");
var PlayGameScreen = (function (_super) {
    __extends(PlayGameScreen, _super);
    function PlayGameScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onGameEnd = function (e) {
            var _a;
            var event = e;
            var whoWin = (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.win;
            var modalTitle = document.querySelector(".modal-title");
            if (modalTitle)
                modalTitle.innerText = whoWin === PlayerType_1.PlayerType.player ? "Congratulation you win 👏" : "Ups, you lose.. 😪";
            var message = document.createElement("div");
            var buttonPlayAgain = document.createElement("button");
            buttonPlayAgain.setAttribute("class", "btn-play-again");
            buttonPlayAgain.addEventListener("click", _this.playAgain);
            buttonPlayAgain.innerText = "Play once more!";
            var text = document.createElement("strong");
            text.innerText = whoWin === PlayerType_1.PlayerType.player ? "🎉🎉🎉🎉🎉🎉🎉🎉" : "😥😥😥😥😥😥😥😥";
            message.appendChild(text);
            message.appendChild(buttonPlayAgain);
            var modalMessage = document.querySelector(".modal-message");
            if (modalMessage) {
                modalMessage.innerHTML = "";
                modalMessage.appendChild(message);
            }
            window.location.hash = "open-modal";
            var confettiCanvas = document.createElement("canvas");
            confettiCanvas.classList.add("confettiCanvas");
            document.body.appendChild(confettiCanvas);
            var myConfetti = canvas_confetti_1.default.create(confettiCanvas, {
                resize: true,
                useWorker: true,
            });
            myConfetti({
                particleCount: 150,
                spread: 160,
            });
        };
        _this.playAgain = function () {
            var playGameScreen = new PlayGameScreen(null);
            var playgroundScreen = new PlaygroundScreen_1.PlaygroundScreen(playGameScreen);
            var startScreen = new StartScreen_1.StartScreen(playgroundScreen);
            _this.unregisterScreenEvents();
            window.location.hash = "";
            GameOptions_1.GameOptions.changeScreen(startScreen);
        };
        return _this;
    }
    PlayGameScreen.prototype.prepareScreen = function () {
        var section = document.createElement("section");
        section.setAttribute("id", "playGameScreen");
        var computerPlaygroundText = document.createElement("strong");
        computerPlaygroundText.innerText = "Computer playground: ";
        var playerPlaygroundText = document.createElement("strong");
        playerPlaygroundText.innerText = "Player playground: ";
        GameOptions_1.GameOptions.computerPlayground = new ComputerPlayground_1.ComputerPlayground();
        GameOptions_1.GameOptions.playerPlayground.changePlaygroundSize((GameOptions_1.GameOptions.playgroundSize * 2) / 3);
        var computerSection = document.createElement("section");
        computerSection.classList.add("computer-playground-container");
        var playerSection = document.createElement("section");
        playerSection.classList.add("player-playground-container");
        computerSection.appendChild(computerPlaygroundText);
        computerSection.appendChild(GameOptions_1.GameOptions.computerPlayground.playgroundDOM);
        playerSection.appendChild(playerPlaygroundText);
        playerSection.appendChild(GameOptions_1.GameOptions.playerPlayground.playgroundDOM);
        section.appendChild(computerSection);
        section.appendChild(playerSection);
        var game = new Game_1.Game(GameOptions_1.GameOptions.playerPlayground.playground, GameOptions_1.GameOptions.computerPlayground.playground, new PlayerMoveStrategy_1.PlayerMoveStrategy(), new SimpleComputerMoveStrategy_1.SimpleComputerMoveStrategy());
        GameOptions_1.GameOptions.changeScreenContent(section);
        game.startGame();
    };
    PlayGameScreen.prototype.prepareScreenEvents = function () {
        document.body.addEventListener(EventType_1.EventType.GAME_END, this.onGameEnd);
    };
    PlayGameScreen.prototype.unregisterScreenEvents = function () {
        document.body.removeEventListener(EventType_1.EventType.GAME_END, this.onGameEnd);
        var confettiCanvas = document.querySelector(".confettiCanvas");
        if (confettiCanvas)
            confettiCanvas.remove();
        var buttonPlayAgain = document.querySelector(".btn-play-again");
        if (buttonPlayAgain)
            buttonPlayAgain.removeEventListener("click", this.playAgain);
    };
    return PlayGameScreen;
}(GameScreen_1.GameScreen));
exports.PlayGameScreen = PlayGameScreen;


/***/ }),

/***/ "./src/scripts/screens/PlaygroundScreen.ts":
/*!*************************************************!*\
  !*** ./src/scripts/screens/PlaygroundScreen.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaygroundScreen = void 0;
var GameScreen_1 = __webpack_require__(/*! ../../interfaces/GameScreen */ "./src/interfaces/GameScreen.ts");
var EventType_1 = __webpack_require__(/*! ../consts/EventType */ "./src/scripts/consts/EventType.ts");
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlayground_1 = __webpack_require__(/*! ../playground/PlayerPlayground */ "./src/scripts/playground/PlayerPlayground.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ../playground/PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var Ship_1 = __webpack_require__(/*! ../Ship */ "./src/scripts/Ship.ts");
var PlaygroundScreen = (function (_super) {
    __extends(PlaygroundScreen, _super);
    function PlaygroundScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shipsOnPlaygroundCount = 0;
        _this.randomizeShips = function () {
            _this.shipsOnPlaygroundCount = 0;
            GameOptions_1.GameOptions.playerPlayground.randomizeShipsPosition();
        };
        _this.shipsWasSetted = function () {
            _this.shipsOnPlaygroundCount++;
            if (_this.shipsOnPlaygroundCount === GameOptions_1.GameOptions.availableShips.length) {
                var playButton = document.querySelector(".btn-play");
                if (playButton)
                    playButton.style.display = "block";
                var shipsSections = document.querySelector(".playground-ships");
                shipsSections === null || shipsSections === void 0 ? void 0 : shipsSections.classList.add("all-ships-setted");
            }
        };
        _this.startGame = function () {
            if (_this.shipsOnPlaygroundCount === GameOptions_1.GameOptions.availableShips.length) {
                GameOptions_1.GameOptions.changeScreen(_this.nextScreen);
            }
        };
        return _this;
    }
    PlaygroundScreen.prototype.prepareScreen = function () {
        GameOptions_1.GameOptions.playerPlayground = new PlayerPlayground_1.PlayerPlayground();
        var section = document.createElement("section");
        section.setAttribute("id", "playgroundScreen");
        var playgroundSection = document.createElement("section");
        playgroundSection.classList.add("playground-section");
        var playerShips = GameOptions_1.GameOptions.playerPlayground.getShipsDOMElements();
        var shipsSections = document.createElement("div");
        shipsSections.classList.add("playground-ships");
        shipsSections.style.width = GameOptions_1.GameOptions.playgroundSize + "px";
        playerShips.forEach(function (ship) {
            shipsSections.appendChild(ship);
        });
        var buttonPlay = document.createElement("button");
        buttonPlay.setAttribute("class", "btn-play");
        buttonPlay.innerText = "Start a game!";
        var buttonRandomize = document.createElement("button");
        buttonRandomize.setAttribute("class", "btn-randomize");
        buttonRandomize.innerText = "Randomize ships position!";
        playgroundSection.appendChild(shipsSections);
        playgroundSection.appendChild(GameOptions_1.GameOptions.playerPlayground.playgroundDOM);
        section.appendChild(playgroundSection);
        section.appendChild(buttonPlay);
        section.appendChild(buttonRandomize);
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            var buttonRotate = document.createElement("button");
            buttonRotate.setAttribute("class", "btn-rotate");
            buttonRotate.innerText = "Rotate ship!";
            section.appendChild(buttonRotate);
        }
        GameOptions_1.GameOptions.changeScreenContent(section);
    };
    PlaygroundScreen.prototype.prepareScreenEvents = function () {
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener("click", this.startGame);
        var buttonRandomize = document.querySelector(".btn-randomize");
        buttonRandomize === null || buttonRandomize === void 0 ? void 0 : buttonRandomize.addEventListener("click", this.randomizeShips);
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            var buttonRotate = document.querySelector(".btn-rotate");
            buttonRotate === null || buttonRotate === void 0 ? void 0 : buttonRotate.addEventListener("click", Ship_1.Ship.rotateCurrentlySelectedShip);
        }
        document.body.addEventListener(EventType_1.EventType.SHIP_WAS_SETTED, this.shipsWasSetted);
    };
    PlaygroundScreen.prototype.unregisterScreenEvents = function () {
        GameOptions_1.GameOptions.playerPlayground.removeEventsFromPlayerPlayground();
        document.body.removeEventListener(EventType_1.EventType.SHIP_WAS_SETTED, this.shipsWasSetted);
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.removeEventListener("click", this.startGame);
        var buttonRandomize = document.querySelector(".btn-randomize");
        buttonRandomize === null || buttonRandomize === void 0 ? void 0 : buttonRandomize.removeEventListener("click", this.randomizeShips);
        if (PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.isMobile()) {
            var buttonRotate = document.querySelector(".btn-rotate");
            buttonRotate === null || buttonRotate === void 0 ? void 0 : buttonRotate.removeEventListener("click", Ship_1.Ship.rotateCurrentlySelectedShip);
        }
    };
    return PlaygroundScreen;
}(GameScreen_1.GameScreen));
exports.PlaygroundScreen = PlaygroundScreen;


/***/ }),

/***/ "./src/scripts/screens/StartScreen.ts":
/*!********************************************!*\
  !*** ./src/scripts/screens/StartScreen.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StartScreen = void 0;
var GameScreen_1 = __webpack_require__(/*! ../../interfaces/GameScreen */ "./src/interfaces/GameScreen.ts");
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startGame = function () {
            GameOptions_1.GameOptions.changeScreen(_this.nextScreen);
        };
        return _this;
    }
    StartScreen.prototype.prepareScreen = function () {
        var section = document.createElement("section");
        section.setAttribute("id", "startScreen");
        var logoContainer = document.createElement("div");
        logoContainer.setAttribute("class", "logoContainer");
        var strong = document.createElement("strong");
        strong.innerText = "Battleships";
        var logo = document.createElement("div");
        logo.setAttribute("class", "logo");
        var buttonPlay = document.createElement("button");
        buttonPlay.setAttribute("class", "btn-play");
        buttonPlay.innerText = "Start a game!";
        logoContainer.appendChild(strong);
        logoContainer.appendChild(logo);
        section.appendChild(logoContainer);
        section.appendChild(buttonPlay);
        GameOptions_1.GameOptions.changeScreenContent(section);
    };
    StartScreen.prototype.prepareScreenEvents = function () {
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener("click", this.startGame);
    };
    StartScreen.prototype.unregisterScreenEvents = function () {
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.removeEventListener("click", this.startGame);
    };
    return StartScreen;
}(GameScreen_1.GameScreen));
exports.StartScreen = StartScreen;


/***/ }),

/***/ "./src/images/ship.svg":
/*!*****************************!*\
  !*** ./src/images/ship.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIi8+CjxwYXRoIGQ9Ik0yMzIuNSAwLjkwMDAyM0MyMzEuNCAxLjQwMDAyIDIyOS42IDIuODAwMDIgMjI4LjUgNC4wMDAwMkMyMjYuNiA2LjEwMDAyIDIyNi41IDcuODAwMDIgMjI2LjIgNDMuMUwyMjUuOSA4MEgyMDAuOUMxNzQuMSA4MCAxNzEuNSA4MC40IDE2OC44IDg1LjNDMTY4IDg2LjcgMTY3LjQgOTMuMiAxNjcuMiAxMDMuN0wxNjYuOCAxMTkuOUwxNDkuNCAxMjAuMkwxMzIgMTIwLjVMMTI5LjMgMTIzLjNMMTI2LjUgMTI2TDEyNi4yIDE0Mi45TDEyNS45IDE1OS44TDExNCAxNjAuMkMxMDIuNSAxNjAuNSAxMDEuOSAxNjAuNiA5OS4zIDE2My4zTDk2LjUgMTY2TDk2LjIgMjEwLjhMOTUuOSAyNTUuNUw3Mi4yIDI2OS44QzU5LjIgMjc3LjcgNDcuOCAyODQuNiA0Ni45IDI4NS4zQzQ0LjkgMjg2LjkgNDMgMjkwLjQgNDMgMjkyLjdDNDMgMjk0IDgzLjkgNDMzLjIgOTQuNiA0NjguM0M5NS4xIDQ2OS45IDk0LjkgNDcwIDkzLjMgNDY5LjFDOTIuMiA0NjguNiA4Ni45IDQ2Ny4zIDgxLjQgNDY2LjRDNTcuNiA0NjIuNCAzNy44IDQ2Ny45IDE1LjIgNDg1QzQuOTAwMDEgNDkyLjggMS4zMDAwMSA0OTYuNSAwLjUwMDAwNyA1MDAuMUMtMC40OTk5OTMgNTA0LjQgMS42MDAwMSA1MDguNiA1LjUwMDAxIDUxMC40QzExLjQgNTEzLjIgMTEuNCA1MTMuMyAyNi40IDUwMS45QzQ1LjYgNDg3LjQgNjMuMSA0ODIuMyA3OS4yIDQ4Ni41QzgyLjMgNDg3LjMgODkuMyA0ODkuOSA5NC43IDQ5Mi40QzExMSA0OTkuNyAxMTkuOCA1MDIgMTMzLjUgNTAyLjdDMTQ4LjggNTAzLjQgMTU3IDUwMS41IDE3NC43IDQ5Mi45QzIwOC4zIDQ3Ni44IDIxOC4xIDQ3Ni40IDI0Ny4zIDQ5MC4xQzI3NC40IDUwMi44IDI4Ni42IDUwNS44IDMwMy40IDUwNEMzMTQuMiA1MDIuNyAzMjEuOCA1MDAuMSAzMzcuOSA0OTIuMUMzNTMuNCA0ODQuMyAzNjEuMSA0ODEuNSAzNjkuMiA0ODAuNUMzNzkuMyA0NzkuMiAzOTMuNSA0ODIuNyA0MTAuMSA0OTAuM0M0MzYuMyA1MDIuNCA0NjEuNCA1MDEuOCA0ODMuNSA0ODguNkM0ODkuNCA0ODUuMSA1MDMuMiA0NzQuNSA1MDcuNyA0NzAuMUM1MTMuNSA0NjQuMyA1MTIuOSA0NTYuNiA1MDYuNSA0NTMuNkM1MDAuNCA0NTAuNyA1MDAuMyA0NTAuNyA0ODQuOSA0NjMuMkM0NzUuMyA0NzEgNDY3LjYgNDc1LjQgNDU5LjUgNDc3LjVDNDUyLjggNDc5LjIgNDQyLjYgNDc5LjQgNDM2IDQ3OEM0MjkuMSA0NzYuNCA0MTcgNDcxLjcgNDE3IDQ3MC41QzQxNyA0NjkuOSA0MjguNyA0MzAuMSA0NDMgMzgyQzQ1Ny4zIDMzMy45IDQ2OSAyOTMuNyA0NjkgMjkyLjdDNDY5IDI5MC40IDQ2Ny4xIDI4Ni45IDQ2NS4xIDI4NS4zQzQ2NC4yIDI4NC42IDQ1Mi44IDI3Ny43IDQzOS44IDI2OS44TDQxNi4xIDI1NS41TDQxNS44IDIxMC44TDQxNS41IDE2Nkw0MTIuNyAxNjMuM0M0MTAuMSAxNjAuNiA0MDkuNSAxNjAuNSAzOTggMTYwLjJMMzg2LjEgMTU5LjhMMzg1LjggMTQyLjlMMzg1LjUgMTI2TDM4Mi43IDEyMy4zTDM4MCAxMjAuNUwzNjIuNiAxMjAuMkwzNDUuMiAxMTkuOUwzNDQuOCAxMDMuN0MzNDQuNiA5My4yIDM0NCA4Ni43IDM0My4yIDg1LjNDMzQwLjUgODAuNCAzMzcuOSA4MCAzMTEuMSA4MEgyODYuMUwyODUuOCA0M0wyODUuNSA2LjAwMDAyTDI4Mi43IDMuMzAwMDJMMjgwIDAuNTAwMDIzTDI1Ny4yIDAuMzAwMDIzQzI0NC43IDAuMjAwMDIzIDIzMy42IDAuNTAwMDIzIDIzMi41IDAuOTAwMDIzWk0yNjYgNTBWODBIMjU2SDI0NlY1MFYyMEgyNTZIMjY2VjUwWk0zMjQgMTEwVjEyMEgyNTZIMTg4VjExMFYxMDBIMjU2SDMyNFYxMTBaTTM2NiAxNTBWMTYwSDI1NkgxNDZWMTUwVjE0MEgyNTZIMzY2VjE1MFpNMjE4LjUgMTgwLjlDMjE3LjggMTgxLjUgMTM5LjkgMjI4LjggMTE2LjggMjQyLjdDMTE2LjMgMjQyLjkgMTE2IDIyOC45IDExNiAyMTEuNlYxODBIMTY3LjdDMTk3LjYgMTgwIDIxOSAxODAuNCAyMTguNSAxODAuOVpNMzk2IDIxMS42QzM5NiAyMjguOSAzOTUuNyAyNDIuOSAzOTUuMyAyNDIuN0MzNzIuMSAyMjguOCAyOTQuMiAxODEuNSAyOTMuNiAxODAuOUMyOTMgMTgwLjQgMzE0LjQgMTgwIDM0NC4zIDE4MEgzOTZWMjExLjZaTTI0NiAzMjcuNFY0NjYuOEwyNDEuMiA0NjVDMjI1LjYgNDU5LjEgMjA1LjYgNDU4LjUgMTkwLjIgNDYzLjZDMTg3LjYgNDY0LjUgMTc4LjMgNDY4LjcgMTY5LjUgNDczLjFDMTQ5LjggNDgyLjggMTQxLjQgNDg0LjkgMTI4LjggNDgzLjNDMTI0LjQgNDgyLjcgMTIwLjQgNDgxLjggMTIwIDQ4MS40QzExOSA0ODAuMyA2NC43IDI5OCA2NS4yIDI5Ny40QzY1LjcgMjk3IDI0NS40IDE4OCAyNDUuOCAxODhDMjQ1LjkgMTg4IDI0NiAyNTAuNyAyNDYgMzI3LjRaTTM1OS41IDI0NC40QzQwNy4zIDI3My40IDQ0Ni42IDI5Ny4yIDQ0Ni44IDI5Ny40QzQ0NyAyOTcuNiA0MzYuMSAzMzQuOSA0MjIuNiAzODAuMkM0MDUgNDM5LjUgMzk3LjggNDYyLjQgMzk2LjggNDYyLjFDMzkyIDQ2MC44IDM3OS4xIDQ1OS45IDM3MS41IDQ2MC4zQzM2MC4xIDQ2MC44IDM0OS41IDQ2NC4zIDMyOS43IDQ3NEMzMTIuNSA0ODIuNCAzMDcuMyA0ODQgMjk2LjUgNDg0QzI4Ny4zIDQ4My45IDI4Mi4zIDQ4MyAyNzIuOCA0NzkuNEwyNjYgNDc2LjhWMzMyLjNWMTg3LjhMMjY5LjMgMTg5LjhDMjcxIDE5MC45IDMxMS42IDIxNS41IDM1OS41IDI0NC40WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIxNS41IDIzMy40QzIwOC45IDIzNi4zIDIwOC4zIDI0NS4zIDIxNC40IDI1MC4yQzIxOSAyNTQgMjI3LjkgMjUwLjYgMjI5LjQgMjQ0LjVDMjMwLjMgMjQwLjkgMjI3LjcgMjM1LjQgMjI0LjEgMjMzLjZDMjIwLjUgMjMxLjcgMjE5LjQgMjMxLjcgMjE1LjUgMjMzLjRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTc1LjUgMjU4LjNDMTQyLjYgMjc4LjYgMTE2LjEgMjk1LjYgMTE0LjMgMjk3LjdDMTExLjggMzAwLjMgMTExLjIgMzA1LjcgMTEzIDMwOS4xQzExNC42IDMxMS45IDExOS44IDMxNC4zIDEyMy4yIDMxMy42QzEyNC43IDMxMy4zIDE0MS4xIDMwMy41IDE1OS42IDI5MS45QzE4Ni45IDI3NC43IDE5My41IDI3MC4xIDE5NC43IDI2Ny41QzE5Ni42IDI2My41IDE5NS44IDI1OS44IDE5Mi41IDI1Ni40QzE4OC43IDI1Mi42IDE4My44IDI1My4xIDE3NS41IDI1OC4zWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI5Mi44IDIzNC43QzI4Ny4xIDIzOC4zIDI4Ni41IDI0NC43IDI5MS40IDI0OS42QzI5NS44IDI1NCAyOTkuNyAyNTQuMSAzMDQuMiAyNTAuMUMzMDYuOSAyNDcuNyAzMDcuNSAyNDYuNSAzMDcuNSAyNDNDMzA3LjUgMjM5LjUgMzA2LjkgMjM4LjMgMzA0LjIgMjM1LjlDMzAwLjUgMjMyLjYgMjk2LjggMjMyLjIgMjkyLjggMjM0LjdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzI3LjEgMjU1LjRDMzIxLjMgMjU4LjYgMzIwLjUgMjY1LjQgMzI1LjMgMjcwLjRDMzI4LjcgMjc0IDM4OC43IDMxMS4zIDM5My45IDMxMy4xQzQwMy4yIDMxNi40IDQxMC4yIDMwNC40IDQwMy4zIDI5Ny4xQzQwMS4xIDI5NC44IDM0NSAyNTkuNyAzMzYuMyAyNTUuMUMzMzMuNSAyNTMuNyAzMzAuMSAyNTMuNyAzMjcuMSAyNTUuNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");
var GameOptions_1 = __webpack_require__(/*! ./GameOptions */ "./src/scripts/GameOptions.ts");
var PlaygroundScreen_1 = __webpack_require__(/*! ./screens/PlaygroundScreen */ "./src/scripts/screens/PlaygroundScreen.ts");
var PlayGameScreen_1 = __webpack_require__(/*! ./screens/PlayGameScreen */ "./src/scripts/screens/PlayGameScreen.ts");
var StartScreen_1 = __webpack_require__(/*! ./screens/StartScreen */ "./src/scripts/screens/StartScreen.ts");
document.addEventListener("DOMContentLoaded", function (event) {
    var playGameScreen = new PlayGameScreen_1.PlayGameScreen(null);
    var playgroundScreen = new PlaygroundScreen_1.PlaygroundScreen(playGameScreen);
    var startScreen = new StartScreen_1.StartScreen(playgroundScreen);
    GameOptions_1.GameOptions.changeScreen(startScreen);
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map