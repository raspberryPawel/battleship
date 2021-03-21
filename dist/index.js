/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n#startScreen {\n  width: 100vw;\n  height: 100vh;\n  max-height: 750px;\n  display: flex;\n  flex-direction: column;\n  padding: 20% 0;\n  justify-content: space-around;\n  align-items: center;\n}\n#startScreen .logoContainer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n#startScreen .logoContainer strong {\n  width: 100%;\n  display: block;\n  text-transform: uppercase;\n  font-weight: 400;\n  color: white;\n  font-size: 30px;\n  text-align: center;\n}\n#startScreen .logoContainer .logo {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  width: 200px;\n  height: 200px;\n  margin-top: 40px;\n  border-radius: 100px;\n  position: relative;\n}\n#startScreen .logoContainer .logo::before {\n  content: \"\";\n  position: absolute;\n  top: -15px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n#startScreen .btn-play {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n}\n#startScreen .btn-play:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n\n#playgroundScreen .playground-field {\n  margin: 0 0.5px;\n  border: 0.5px solid #fff;\n}\n#playgroundScreen .playground-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#playgroundScreen .ship_container {\n  display: flex;\n  flex-direction: row;\n  justify-content: start;\n  align-items: center;\n  margin: 3px;\n}\n#playgroundScreen .ship_field {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  margin: 0 1px;\n  cursor: pointer;\n}\n#playgroundScreen .field-with-gradient {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n}\n#playgroundScreen .field-with-error-gradient {\n  background-color: pink;\n}\n#playgroundScreen .btn-play {\n  display: none;\n}\n#playgroundScreen .btn-play,\n#playgroundScreen .btn-randomize {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  margin-top: 25px;\n  margin-right: 20px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n}\n#playgroundScreen .btn-play:hover,\n#playgroundScreen .btn-randomize:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n\n#playGameScreen .playground-field {\n  margin: 0 0.5px;\n  border: 0.5px solid #fff;\n}\n#playGameScreen .player-playground {\n  margin-top: 20px;\n}\n#playGameScreen .playground-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#playGameScreen .ship_container {\n  display: flex;\n  flex-direction: row;\n  justify-content: start;\n  align-items: center;\n  margin: 3px;\n}\n#playGameScreen .ship_field {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  margin: 0 1.5px;\n  cursor: pointer;\n}\n#playGameScreen .field-with-gradient {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n}\n#playGameScreen .field-with-error-gradient {\n  background-color: pink;\n}\n#playGameScreen .btn-play {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  border: none;\n  outline: none;\n  text-transform: uppercase;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: 500;\n  font-size: 0.85rem;\n  color: #fff;\n  display: none;\n  margin-top: 25px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n  padding: 0.7rem 1.5rem 0.5rem;\n  border-radius: 10rem;\n  cursor: pointer;\n  transition-duration: 0.3s;\n}\n#playGameScreen .btn-play:hover {\n  transition-duration: 0.3s;\n  transform: scale(1.1);\n}\n#playGameScreen .hit_field {\n  position: relative;\n}\n#playGameScreen .hit_field::after {\n  background: #c31432;\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\n  background: linear-gradient(to top left, #240b36, #c31432);\n  content: \"✕\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  color: white;\n  font-family: \"Roboto\", sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#playGameScreen .misplaced_field {\n  position: relative;\n}\n#playGameScreen .misplaced_field::after {\n  content: \"•\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  font-family: \"Roboto\", sans-serif;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: #14142d;\n  background: #0f0c29;\n  background: -webkit-linear-gradient(to right, #1f1f35, #262350, #0a081d);\n  background: linear-gradient(to right, #1f1f35, #262350, #0a081d);\n  user-select: none;\n  font-family: \"Roboto\", sans-serif;\n}\nbody main {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n}", "",{"version":3,"sources":["webpack://./src/styles/index.scss","webpack://./src/styles/StartScreen.scss","webpack://./src/styles/variables.scss","webpack://./src/styles/PlaygroundScreen.scss","webpack://./src/styles/PlayGameScreen.scss"],"names":[],"mappings":"AAAA,gBAAgB;ACEhB;EACE,YAAA;EACA,aAAA;EACA,iBAAA;EAEA,aAAA;EACA,sBAAA;EACA,cAAA;EACA,6BAAA;EACA,mBAAA;ADAF;ACEE;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;ADAJ;ACEI;EACE,WAAA;EACA,cAAA;EACA,yBAAA;EACA,gBAAA;EAEA,YAAA;EACA,eAAA;EACA,kBAAA;ADDN;ACII;EC7BF,mBAAA;EACA,kEAAA;EACA,0DAAA;ED8BI,YAAA;EACA,aAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;ADDN;ACGM;EACE,WAAA;EACA,kBAAA;EACA,UAAA;EACA,OAAA;EAEA,WAAA;EACA,YAAA;EAEA,yDAAA;EACA,sBAAA;ADHR;ACQE;ECrDA,mBAAA;EACA,kEAAA;EACA,0DAAA;EDsDE,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,mFAAA;EAEA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;ADVJ;ACYI;EACE,yBAAA;EACA,qBAAA;ADVN;;AGjEC;EACC,eAAA;EACA,wBAAA;AHoEF;AGjEC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AHmEF;AGhEC;EACC,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AHkEF;AG/DC;EDtBC,mBAAA;EACA,kEAAA;EACA,0DAAA;ECuBA,aAAA;EACA,eAAA;AHkEF;AG/DC;ED7BC,mBAAA;EACA,kEAAA;EACA,0DAAA;AF+FF;AGhEC;EACC,sBAAA;AHkEF;AG/DC;EACC,aAAA;AHiEF;AG9DC;;EDzCC,mBAAA;EACA,kEAAA;EACA,0DAAA;EC2CA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,gBAAA;EACA,kBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;AH4DF;AG1DE;;EACC,yBAAA;EACA,qBAAA;AH6DH;;AI/HC;EACC,eAAA;EACA,wBAAA;AJkIF;AI/HC;EAEC,gBAAA;AJgIF;AI7HC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;AJ+HF;AI5HC;EACC,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;AJ8HF;AI3HC;EF3BC,mBAAA;EACA,kEAAA;EACA,0DAAA;EE4BA,eAAA;EACA,eAAA;AJ8HF;AI3HC;EFlCC,mBAAA;EACA,kEAAA;EACA,0DAAA;AFgKF;AI5HC;EACC,sBAAA;AJ8HF;AI3HC;EF1CC,mBAAA;EACA,kEAAA;EACA,0DAAA;EE2CA,YAAA;EACA,aAAA;EAEA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EAEA,aAAA;EACA,gBAAA;EAEA,mFAAA;EACA,2EAAA;EACA,6BAAA;EAEA,oBAAA;EAEA,eAAA;EACA,yBAAA;AJyHF;AIvHE;EACC,yBAAA;EACA,qBAAA;AJyHH;AIrHC;EACC,kBAAA;AJuHF;AIrHE;EF3EA,mBAAA;EACA,kEAAA;EACA,0DAAA;EE2EC,YAAA;EAEA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,YAAA;EACA,iCAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AJwHH;AIpHC;EACC,kBAAA;AJsHF;AIpHE;EACC,YAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,iCAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AJsHH;;AA9NA;EACC,SAAA;EACA,UAAA;EACA,yBAAA;EACA,mBAAA;EACA,wEAAA;EACA,gEAAA;EACA,iBAAA;EAEA,iCAAA;AAgOD;AA9NC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;AAgOF","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap\");\r\n@import \"./StartScreen.scss\";\r\n@import \"./PlaygroundScreen.scss\";\r\n@import \"./PlayGameScreen.scss\";\r\n\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tbackground-color: #14142d;\r\n\tbackground: #0f0c29;\r\n\tbackground: -webkit-linear-gradient(to right, #1f1f35, #262350, #0a081d);\r\n\tbackground: linear-gradient(to right, #1f1f35, #262350, #0a081d);\r\n\tuser-select: none;\r\n\r\n\tfont-family: \"Roboto\", sans-serif;\r\n\r\n\tmain {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t\twidth: 100%;\r\n\t\theight: 100vh;\r\n\t\toverflow-x: hidden;\r\n\t\toverflow-y: auto;\r\n\t}\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n#startScreen {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  max-height: 750px;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 20% 0;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n\r\n  .logoContainer {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n\r\n    strong {\r\n      width: 100%;\r\n      display: block;\r\n      text-transform: uppercase;\r\n      font-weight: 400;\r\n\r\n      color: white;\r\n      font-size: 30px;\r\n      text-align: center;\r\n    }\r\n\r\n    .logo {\r\n      @include main-gradient();\r\n\r\n      width: 200px;\r\n      height: 200px;\r\n      margin-top: 40px;\r\n      border-radius: 100px;\r\n      position: relative;\r\n\r\n      &::before {\r\n        content: \"\";\r\n        position: absolute;\r\n        top: -15px;\r\n        left: 0;\r\n\r\n        width: 100%;\r\n        height: 100%;\r\n\r\n        background-image: url(\"../images/ship.svg\");\r\n        background-size: cover;\r\n      }\r\n    }\r\n  }\r\n\r\n  .btn-play {\r\n    @include main-gradient();\r\n    \r\n    border: none;\r\n    outline: none;\r\n\r\n    text-transform: uppercase;\r\n    font-family: \"Roboto\", sans-serif;\r\n    font-weight: 500;\r\n    font-size: 0.85rem;\r\n    color: #fff;\r\n\r\n    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2),\r\n      0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n    padding: 0.7rem 1.5rem 0.5rem ;\r\n    \r\n    border-radius: 10rem;\r\n\r\n    cursor: pointer;\r\n    transition-duration: 0.3s;\r\n\r\n    &:hover {\r\n      transition-duration: 0.3s;\r\n      transform: scale(1.1);\r\n    }\r\n  }\r\n}\r\n","@mixin main-gradient() {\r\n  background: #c31432;\r\n  background: -webkit-linear-gradient(to top left, #240b36, #c31432);\r\n  background: linear-gradient(to top left, #240b36, #c31432);\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n#playgroundScreen {\r\n\t.playground-field {\r\n\t\tmargin: 0 0.5px;\r\n\t\tborder: 0.5px solid #fff;\r\n\t}\r\n\r\n\t.playground-row {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t}\r\n\r\n\t.ship_container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: start;\r\n\t\talign-items: center;\r\n\t\tmargin: 3px;\r\n\t}\r\n\r\n\t.ship_field {\r\n\t\t@include main-gradient();\r\n\r\n\t\tmargin: 0 1px;\r\n\t\tcursor: pointer;\r\n\t}\r\n\r\n\t.field-with-gradient {\r\n\t\t@include main-gradient();\r\n\t}\r\n\r\n\t.field-with-error-gradient {\r\n\t\tbackground-color: pink;\r\n\t}\r\n\r\n\t.btn-play {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.btn-play,\r\n\t.btn-randomize {\r\n\t\t@include main-gradient();\r\n\r\n\t\tborder: none;\r\n\t\toutline: none;\r\n\r\n\t\ttext-transform: uppercase;\r\n\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\tfont-weight: 500;\r\n\t\tfont-size: 0.85rem;\r\n\t\tcolor: #fff;\r\n\r\n\t\tmargin-top: 25px;\r\n\t\tmargin-right: 20px;\r\n\r\n\t\t-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\t\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\t\tpadding: 0.7rem 1.5rem 0.5rem;\r\n\r\n\t\tborder-radius: 10rem;\r\n\r\n\t\tcursor: pointer;\r\n\t\ttransition-duration: 0.3s;\r\n\r\n\t\t&:hover {\r\n\t\t\ttransition-duration: 0.3s;\r\n\t\t\ttransform: scale(1.1);\r\n\t\t}\r\n\t}\r\n}\r\n","@import \"./variables.scss\";\r\n\r\n#playGameScreen {\r\n\t.playground-field {\r\n\t\tmargin: 0 0.5px;\r\n\t\tborder: 0.5px solid #fff;\r\n\t}\r\n\r\n\t.player-playground {\r\n\t\t// transform: scale(0.5);\r\n\t\tmargin-top: 20px;\r\n\t}\r\n\r\n\t.playground-row {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t}\r\n\r\n\t.ship_container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: row;\r\n\t\tjustify-content: start;\r\n\t\talign-items: center;\r\n\t\tmargin: 3px;\r\n\t}\r\n\r\n\t.ship_field {\r\n\t\t@include main-gradient();\r\n\r\n\t\tmargin: 0 1.5px;\r\n\t\tcursor: pointer;\r\n\t}\r\n\r\n\t.field-with-gradient {\r\n\t\t@include main-gradient();\r\n\t}\r\n\r\n\t.field-with-error-gradient {\r\n\t\tbackground-color: pink;\r\n\t}\r\n\r\n\t.btn-play {\r\n\t\t@include main-gradient();\r\n\r\n\t\tborder: none;\r\n\t\toutline: none;\r\n\r\n\t\ttext-transform: uppercase;\r\n\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\tfont-weight: 500;\r\n\t\tfont-size: 0.85rem;\r\n\t\tcolor: #fff;\r\n\r\n\t\tdisplay: none;\r\n\t\tmargin-top: 25px;\r\n\r\n\t\t-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\t\tbox-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\r\n\t\tpadding: 0.7rem 1.5rem 0.5rem;\r\n\r\n\t\tborder-radius: 10rem;\r\n\r\n\t\tcursor: pointer;\r\n\t\ttransition-duration: 0.3s;\r\n\r\n\t\t&:hover {\r\n\t\t\ttransition-duration: 0.3s;\r\n\t\t\ttransform: scale(1.1);\r\n\t\t}\r\n\t}\r\n\r\n\t.hit_field {\r\n\t\tposition: relative;\r\n\r\n\t\t&::after {\r\n\t\t\t@include main-gradient();\r\n\t\t\tcontent: \"✕\";\r\n\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: 2;\r\n\t\t\tcolor: white;\r\n\t\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n\r\n\t.misplaced_field {\r\n\t\tposition: relative;\r\n\r\n\t\t&::after {\r\n\t\t\tcontent: \"•\";\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: 2;\r\n\t\t\tfont-family: \"Roboto\", sans-serif;\r\n\t\t\tcolor: white;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n}\r\n"],"sourceRoot":""}]);
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
var GameOptions_1 = __webpack_require__(/*! ./GameOptions */ "./src/scripts/GameOptions.ts");
var MoveType;
(function (MoveType) {
    MoveType[MoveType["computerMove"] = 0] = "computerMove";
    MoveType[MoveType["playerMove"] = 1] = "playerMove";
})(MoveType || (MoveType = {}));
var Game = (function () {
    function Game(playerPlayground, computerPlayground, playerMoveStrategy, computerMoveStrategy) {
        var _this = this;
        this.move = MoveType.playerMove;
        this.playerSunkFields = 0;
        this.computerSunkFields = 0;
        this.resolveMove = function () { };
        this.checkIfFieldHasShip = function (row, column) {
            if (_this.move === MoveType.computerMove && _this.playerPlayground[row][column] === 1) {
                _this.playerSunkFields++;
            }
            if (_this.move === MoveType.playerMove && _this.computerPlayground[row][column] === 1) {
                _this.computerSunkFields++;
            }
            return _this.move === MoveType.computerMove
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
                this.move = MoveType.playerMove;
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
            alert("player won");
        }
        if (this.playerSunkFields === this.shipFieldsCount) {
            this.gameInProgress = false;
            alert("computer won");
        }
        this.move = this.move === MoveType.computerMove ? MoveType.playerMove : MoveType.computerMove;
    };
    Game.prototype.performMove = function () {
        this.move === MoveType.computerMove
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
    GameOptions.currentScreen = null;
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
var Ship = (function () {
    function Ship(shipSize, addShipToPlayground) {
        var _this = this;
        if (addShipToPlayground === void 0) { addShipToPlayground = function () { }; }
        this.fieldsOnPlayground = [];
        this.shipElement = document.createElement("div");
        this.addShipToPlayground = function () { };
        this.moveShip = function (e) {
            if (_this.shipElement) {
                _this.changeShipPosition(e.clientX, e.clientY);
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
                _this.shipElement.style.border = "none";
                _this.shipElement.style.position = "static";
                document.body.removeEventListener("mousemove", _this.moveShip);
                document.body.removeEventListener("mouseup", _this.dropShip);
                if (GameOptions_1.GameOptions.currentlySelectedField && _this.shipOnPlayground.length > 0) {
                    _this.hideShip();
                    _this.addShipToPlayground();
                }
                _this.shipElement.style.opacity = "1";
                GameOptions_1.GameOptions.currentlySelectedField = null;
                GameOptions_1.GameOptions.currentSelectedShip = null;
            }
        };
        this.shipSize = shipSize;
        this.createShipDOMElement();
        this.addShipToPlayground = addShipToPlayground;
    }
    Object.defineProperty(Ship.prototype, "size", {
        get: function () {
            return this.shipSize;
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
        });
        this.shipElement.addEventListener("click", function (e) {
            GameOptions_1.GameOptions.currentSelectedShip = _this;
            _this.shipElement.style.border = "1px solid red";
        });
    };
    Ship.prototype.hideShip = function () {
        this.shipElement.style.display = "none";
    };
    return Ship;
}());
exports.Ship = Ship;


/***/ }),

/***/ "./src/scripts/moveStrategies/MoveDirection.ts":
/*!*****************************************************!*\
  !*** ./src/scripts/moveStrategies/MoveDirection.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveDirection = void 0;
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Left"] = 0] = "Left";
    MoveDirection[MoveDirection["Right"] = 1] = "Right";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));


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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleComputerMoveStrategy = void 0;
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ../playground/PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var MoveDirection_1 = __webpack_require__(/*! ./MoveDirection */ "./src/scripts/moveStrategies/MoveDirection.ts");
var SimpleComputerMoveStrategy = (function () {
    function SimpleComputerMoveStrategy() {
        this.availableShips = [];
        this.availableFields = [];
        this.hitFields = [];
        this.fieldsToCheckAfterHit = [];
        this.hitsInARow = 0;
        this.moveDirection = MoveDirection_1.MoveDirection.Right;
        this.checkIfFieldHasShip = function (row, column) { return false; };
        this.resolveMove = function () { };
        this.availableShips = GameOptions_1.GameOptions.availableShips.sort(function (shipA, shipB) { return shipA - shipB; });
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
        var index = this.availableFields[row].indexOf(row + "_" + column);
        if (index !== -1)
            this.availableFields[row].splice(index, 1);
    };
    SimpleComputerMoveStrategy.prototype.checkIFieldHasShip = function (row, column) {
        var _this = this;
        var hasShip = this.checkIfFieldHasShip(row, column);
        if (hasShip)
            this.hitFields.push(row + "_" + column);
        if (this.fieldsToCheckAfterHit.length && hasShip) {
            this.hitsInARow += 1;
            this.fieldsToCheckAfterHit.splice(0, 1);
            this.setMoveDirectionBasedOnNextFieldToHit(column);
        }
        else if (this.fieldsToCheckAfterHit.length && !hasShip) {
            this.removeFieldsWhereThereIsNoShips(column);
        }
        if (!this.fieldsToCheckAfterHit.length && hasShip) {
            this.setFieldsToCheckAfterHit(row, column);
            this.setMoveDirectionBasedOnNextFieldToHit(column);
        }
        var getIndexAndExcludeFieldsWhereThereIsNoShips = function () {
            var indexOfSunkShip = _this.availableShips.indexOf(_this.hitsInARow);
            _this.availableShips.splice(indexOfSunkShip, 1);
            _this.hitsInARow = 0;
            _this.fieldsToCheckAfterHit.length = 0;
            _this.excludeFieldsWhereThereIsNoShips();
        };
        this.checkIfLongestShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
        this.checkIfSomeShipWasSunk(getIndexAndExcludeFieldsWhereThereIsNoShips);
        return hasShip;
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
            var columnA = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(a).column;
            var columnB = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(b).column;
            return columnA - columnB;
        });
        var firstHitField = this.hitFields[0];
        var lastHitField = this.hitFields[this.hitFields.length - 1];
        var firstRowAndColumn = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(firstHitField);
        var lastRowAndColumn = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(lastHitField);
        this.hitFields.forEach(function (field) {
            var _a = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field), row = _a.row, column = _a.column;
            var rowAbove = row + 1;
            var rowBelow = row - 1;
            if (rowAbove >= 0 && rowAbove < GameOptions_1.GameOptions.playgroundFieldsCount)
                _this.removeFieldFromAvailable(rowAbove, column);
            if (rowBelow >= 0 && rowBelow < GameOptions_1.GameOptions.playgroundFieldsCount)
                _this.removeFieldFromAvailable(rowBelow, column);
        });
        var columnBefore = firstRowAndColumn.column - 1;
        var rowAbove = firstRowAndColumn.row + 1;
        var rowBelow = firstRowAndColumn.row - 1;
        if (columnBefore >= 0 && columnBefore < GameOptions_1.GameOptions.playgroundFieldsCount) {
            if (rowAbove >= 0 && rowAbove < GameOptions_1.GameOptions.playgroundFieldsCount)
                this.removeFieldFromAvailable(rowAbove, columnBefore);
            if (rowBelow >= 0 && rowBelow < GameOptions_1.GameOptions.playgroundFieldsCount)
                this.removeFieldFromAvailable(rowBelow, columnBefore);
        }
        if (lastRowAndColumn.column + 1 < GameOptions_1.GameOptions.playgroundFieldsCount) {
            if (lastRowAndColumn.row + 1 < GameOptions_1.GameOptions.playgroundFieldsCount) {
                this.removeFieldFromAvailable(lastRowAndColumn.row + 1, lastRowAndColumn.column + 1);
            }
            if (lastRowAndColumn.row - 1 >= 0) {
                this.removeFieldFromAvailable(lastRowAndColumn.row - 1, lastRowAndColumn.column + 1);
            }
        }
        this.hitFields.length = 0;
    };
    SimpleComputerMoveStrategy.prototype.removeFieldsWhereThereIsNoShips = function (currentColumn) {
        if (this.moveDirection === MoveDirection_1.MoveDirection.Right) {
            var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
                var column = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field).column;
                return column >= currentColumn;
            });
            this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
            this.setMoveDirectionBasedOnNextFieldToHit(currentColumn);
            return;
        }
        if (this.moveDirection === MoveDirection_1.MoveDirection.Left) {
            var fieldsToRemove = this.fieldsToCheckAfterHit.filter(function (field) {
                var column = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(field).column;
                return column <= currentColumn;
            });
            this.fieldsToCheckAfterHit.splice(0, fieldsToRemove.length);
            return;
        }
    };
    SimpleComputerMoveStrategy.prototype.setMoveDirectionBasedOnNextFieldToHit = function (currentColumn) {
        var column = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(this.fieldsToCheckAfterHit[0]).column;
        this.moveDirection = column > currentColumn ? MoveDirection_1.MoveDirection.Right : MoveDirection_1.MoveDirection.Left;
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
        _this.addShipToPlayground = function () {
            _this.shipsOnPlaygrundCount++;
        };
        _this.prepareComputerShips();
        _this.preparePlaygroundDOMStructure();
        _this.randomizeShipsPosition();
        return _this;
    }
    ComputerPlayground.prototype.prepareComputerShips = function () {
        var _this = this;
        GameOptions_1.GameOptions.availableShips.forEach(function (shipSize) {
            var ship = new Ship_1.Ship(shipSize, _this.addShipToPlayground);
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
var PlayerPlayground = (function (_super) {
    __extends(PlayerPlayground, _super);
    function PlayerPlayground() {
        var _this = _super.call(this) || this;
        _this.tempHighlightedFields = [];
        _this.playgroundClassPrefix = "player-playground";
        _this.playgroundShips = [];
        _this.randomizeShipsPosition = function () {
            _this.clearPlayground();
            _this.randomizeShipsPositions();
            _this.hideShips();
            _this.showButtonPlay();
        };
        _this.addListenersOnPlaygroundShips = function () {
            _this.playgroundShips.forEach(function (ship) {
                ship;
            });
        };
        _this.addListenerOnPlaygroundField = function (div) {
            div.addEventListener("click", _this.fieldClick);
            div.addEventListener("mouseenter", _this.fieldMouseOver);
        };
        _this.addShipToPlayground = function () {
            _this.shipsOnPlaygrundCount++;
            _this.showButtonPlay();
        };
        _this.showButtonPlay = function () {
            if (_this.arePlaygroundReady()) {
                var playButton = document.querySelector(".btn-play");
                if (playButton)
                    playButton.style.display = "block";
            }
        };
        _this.playgroundMouseOver = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip)
                GameOptions_1.GameOptions.currentSelectedShip.shipElement.style.opacity = "0";
        };
        _this.playgroundMouseLeave = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                GameOptions_1.GameOptions.currentSelectedShip.shipElement.style.opacity = "1";
                GameOptions_1.GameOptions.currentlySelectedField = null;
                _this.clearShipFields();
            }
        };
        _this.playgroundTouchEnd = function () {
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                GameOptions_1.GameOptions.currentSelectedShip.shipElement.style.opacity = "1";
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
            var getRowAndColumnNumberFromClassName = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName;
            var fieldClassName = e.target.classList[1];
            var _a = getRowAndColumnNumberFromClassName(fieldClassName), row = _a.row, column = _a.column;
            GameOptions_1.GameOptions.currentlySelectedField = { row: row, column: column };
            if (GameOptions_1.GameOptions.currentSelectedShip) {
                _this.setShipOnPlaygroundIfPossible(GameOptions_1.GameOptions.currentSelectedShip, row, column);
            }
        };
        _this.fieldTouchMove = function (e) {
            _this.playgroundDOM.removeEventListener("touchend", _this.playgroundTouchEnd, false);
            _this.playgroundDOM.addEventListener("touchend", _this.playgroundTouchEnd, false);
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            var selectedField;
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
            var _a;
            var doesSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty, getRowAndColumnNumberFromClassName = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName;
            var shipSize = ((_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.size) || -1;
            var rowAndColumnIndex = getRowAndColumnNumberFromClassName(fieldClassName);
            var row = rowAndColumnIndex.row, column = rowAndColumnIndex.column;
            GameOptions_1.GameOptions.currentlySelectedField = rowAndColumnIndex;
            _this.clearShipFields();
            if (shipSize > 0) {
                if (shipSize + column <= GameOptions_1.GameOptions.playgroundFieldsCount) {
                    var data = {
                        playground: _this.playground,
                        currentCheckedRow: row,
                        firstColumn: column,
                        lastColumn: shipSize + column,
                    };
                    if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
                        _this.highlightCorrectShipFields(column, shipSize + column, row);
                    else
                        _this.highlightIncorrectShipFields(column, shipSize + column, row);
                }
                else {
                    var data = {
                        playground: _this.playground,
                        currentCheckedRow: row,
                        firstColumn: GameOptions_1.GameOptions.playgroundFieldsCount - shipSize,
                        lastColumn: GameOptions_1.GameOptions.playgroundFieldsCount,
                    };
                    if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data))
                        _this.highlightCorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, row);
                    else
                        _this.highlightIncorrectShipFields(GameOptions_1.GameOptions.playgroundFieldsCount - shipSize, GameOptions_1.GameOptions.playgroundFieldsCount, row);
                }
            }
        };
        _this.preparePlayerShips();
        _this.preparePlaygroundDOMStructure();
        _this.addListenersOnPlaygroundShips();
        _this.addEventsOnPlayerPlayground();
        return _this;
    }
    PlayerPlayground.prototype.arePlaygroundReady = function () {
        return this.shipsOnPlaygrundCount === GameOptions_1.GameOptions.availableShips.length;
    };
    PlayerPlayground.prototype.getShipsDOMElements = function () {
        return this.playgroundShips.map(function (ship) { return ship.shipElement; });
    };
    PlayerPlayground.prototype.hideShips = function () {
        this.playgroundShips.forEach(function (ship) { return ship.hideShip(); });
    };
    PlayerPlayground.prototype.preparePlayerShips = function () {
        var _this = this;
        GameOptions_1.GameOptions.availableShips.forEach(function (shipSize) {
            var ship = new Ship_1.Ship(shipSize, _this.addShipToPlayground);
            _this.playgroundShips.push(ship);
        });
    };
    PlayerPlayground.prototype.addEventsOnPlayerPlayground = function () {
        this.playgroundDOM.addEventListener("mouseover", this.playgroundMouseOver);
        this.playgroundDOM.addEventListener("mouseleave", this.playgroundMouseLeave);
        this.playgroundDOM.addEventListener("touchmove", this.fieldTouchMove, false);
    };
    PlayerPlayground.prototype.removeEventsFromPlayerPlayground = function () {
        this.playgroundDOM.removeEventListener("mouseover", this.playgroundMouseOver);
        this.playgroundDOM.removeEventListener("mouseleave", this.playgroundMouseLeave);
    };
    PlayerPlayground.prototype.highlightCorrectShipFields = function (firstIndex, lastIndex, currentRow) {
        var _a;
        for (var i = firstIndex; i < lastIndex; i++) {
            var className = this.getPlaygroundFieldClassName(currentRow, i);
            this.playground[currentRow][i] = 1;
            var element = document.querySelector(className);
            if (element) {
                element.classList.add("field-with-gradient");
                (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.addField(className);
            }
        }
    };
    PlayerPlayground.prototype.highlightIncorrectShipFields = function (firstIndex, lastIndex, currentRow) {
        GameOptions_1.GameOptions.currentlySelectedField = null;
        for (var i = firstIndex; i < lastIndex; i++) {
            if (this.playground[currentRow][i] !== 1) {
                var className = this.getPlaygroundFieldClassName(currentRow, i);
                var element = document.querySelector(className);
                if (element) {
                    this.tempHighlightedFields.push(currentRow + "_" + i);
                    element.classList.add("field-with-error-gradient");
                }
            }
        }
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
    PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName = function (className) {
        var defaultRowAndColumn = {
            row: 0,
            column: 0,
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
        var _a;
        var playground = data.playground, currentCheckedRow = data.currentCheckedRow, firstColumn = data.firstColumn, lastColumn = data.lastColumn;
        var fields = (_a = GameOptions_1.GameOptions.currentSelectedShip) === null || _a === void 0 ? void 0 : _a.shipOnPlayground.map(function (className) {
            var _a = PlayerPlaygroundUtils.getRowAndColumnNumberFromClassName(className), row = _a.row, column = _a.column;
            return row + "_" + column;
        });
        var row = playground[currentCheckedRow];
        for (var i = firstColumn; i <= lastColumn; i++) {
            if (row[i] === 1 && !(fields === null || fields === void 0 ? void 0 : fields.includes(currentCheckedRow + "_" + i))) {
                return false;
            }
        }
        return true;
    };
    PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty = function (data) {
        var playground = data.playground, currentCheckedRow = data.currentCheckedRow, firstColumn = data.firstColumn, lastColumn = data.lastColumn;
        var row = playground[currentCheckedRow];
        var rowAbove = playground[currentCheckedRow - 1];
        var rowBelow = playground[currentCheckedRow + 1];
        if (rowAbove) {
            for (var i = firstColumn; i <= lastColumn; i++) {
                if (rowAbove[i] === 1)
                    return false;
            }
        }
        if (rowBelow) {
            for (var i = firstColumn; i <= lastColumn; i++) {
                if (rowBelow[i] === 1)
                    return false;
            }
        }
        if (row && row[firstColumn - 1] && row[firstColumn - 1] === 1)
            return false;
        if (rowAbove && rowAbove[firstColumn - 1] && rowAbove[firstColumn - 1] === 1)
            return false;
        if (rowBelow && rowBelow[firstColumn - 1] && rowBelow[firstColumn - 1] === 1)
            return false;
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
var PlayerPlaygroundUtils_1 = __webpack_require__(/*! ./PlayerPlaygroundUtils */ "./src/scripts/playground/PlayerPlaygroundUtils.ts");
var Playground = (function () {
    function Playground(playgroundSize) {
        var _this = this;
        this.playgroundDOM = document.createElement("div");
        this.playground = [];
        this.playgroundShips = [];
        this.showShipsOnPlayground = true;
        this.shipsOnPlaygrundCount = 0;
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
                _this.setShipOnPlaygroundIfPossible(ship, row, column);
            }
        };
        this.setShipOnPlaygroundIfPossible = function (ship, row, column) {
            var doesSelectedFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedFieldsEmpty, doesSelectedNearbyFieldsEmpty = PlayerPlaygroundUtils_1.PlayerPlaygroundUtils.doesSelectedNearbyFieldsEmpty;
            GameOptions_1.GameOptions.currentlySelectedField = { row: row, column: column };
            if (ship.size + column <= GameOptions_1.GameOptions.playgroundFieldsCount) {
                var data = {
                    playground: _this.playground,
                    currentCheckedRow: row,
                    firstColumn: column,
                    lastColumn: ship.size + column,
                };
                if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
                    _this.setShipOnPlayground(column, ship.size + column, row, ship);
                }
            }
            else {
                var data = {
                    playground: _this.playground,
                    currentCheckedRow: row,
                    firstColumn: GameOptions_1.GameOptions.playgroundFieldsCount - ship.size,
                    lastColumn: GameOptions_1.GameOptions.playgroundFieldsCount,
                    ship: ship,
                };
                if (doesSelectedFieldsEmpty(data) && doesSelectedNearbyFieldsEmpty(data)) {
                    _this.setShipOnPlayground(GameOptions_1.GameOptions.playgroundFieldsCount - ship.size, GameOptions_1.GameOptions.playgroundFieldsCount, row, ship);
                }
            }
        };
        this.playgroundSizeInPx = playgroundSize ? playgroundSize : GameOptions_1.GameOptions.playgroundSize;
        this.fieldSizeInPx = playgroundSize
            ? playgroundSize / GameOptions_1.GameOptions.playgroundFieldsCount - 4
            : GameOptions_1.GameOptions.fieldSize;
        this.preparePlayground();
    }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayGameScreen = void 0;
var GameScreen_1 = __webpack_require__(/*! ../../interfaces/GameScreen */ "./src/interfaces/GameScreen.ts");
var Game_1 = __webpack_require__(/*! ../Game */ "./src/scripts/Game.ts");
var PlayerMoveStrategy_1 = __webpack_require__(/*! ../moveStrategies/PlayerMoveStrategy */ "./src/scripts/moveStrategies/PlayerMoveStrategy.ts");
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var ComputerPlayground_1 = __webpack_require__(/*! ../playground/ComputerPlayground */ "./src/scripts/playground/ComputerPlayground.ts");
var SimpleComputerMoveStrategy_1 = __webpack_require__(/*! ../moveStrategies/SimpleComputerMoveStrategy */ "./src/scripts/moveStrategies/SimpleComputerMoveStrategy.ts");
var PlayGameScreen = (function (_super) {
    __extends(PlayGameScreen, _super);
    function PlayGameScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayGameScreen.prototype.prepareScreen = function () {
        var section = document.createElement("section");
        section.setAttribute("id", "playGameScreen");
        GameOptions_1.GameOptions.computerPlayground = new ComputerPlayground_1.ComputerPlayground();
        GameOptions_1.GameOptions.playerPlayground.changePlaygroundSize(GameOptions_1.GameOptions.playgroundSize / 2);
        section.appendChild(GameOptions_1.GameOptions.computerPlayground.playgroundDOM);
        section.appendChild(GameOptions_1.GameOptions.playerPlayground.playgroundDOM);
        var game = new Game_1.Game(GameOptions_1.GameOptions.playerPlayground.playground, GameOptions_1.GameOptions.computerPlayground.playground, new PlayerMoveStrategy_1.PlayerMoveStrategy(), new SimpleComputerMoveStrategy_1.SimpleComputerMoveStrategy());
        GameOptions_1.GameOptions.changeScreenContent(section);
        game.startGame();
    };
    PlayGameScreen.prototype.prepareScreenEvents = function () {
    };
    PlayGameScreen.prototype.startGame = function () {
    };
    PlayGameScreen.prototype.unregisterScreenEvents = function () {
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
var GameOptions_1 = __webpack_require__(/*! ../GameOptions */ "./src/scripts/GameOptions.ts");
var PlayerPlayground_1 = __webpack_require__(/*! ../playground/PlayerPlayground */ "./src/scripts/playground/PlayerPlayground.ts");
var PlaygroundScreen = (function (_super) {
    __extends(PlaygroundScreen, _super);
    function PlaygroundScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startGame = function () {
            if (GameOptions_1.GameOptions.playerPlayground.arePlaygroundReady()) {
                GameOptions_1.GameOptions.changeScreen(_this.nextScreen);
            }
        };
        return _this;
    }
    PlaygroundScreen.prototype.prepareScreen = function () {
        GameOptions_1.GameOptions.playerPlayground = new PlayerPlayground_1.PlayerPlayground();
        var section = document.createElement("section");
        section.setAttribute("id", "playgroundScreen");
        var playerShips = GameOptions_1.GameOptions.playerPlayground.getShipsDOMElements();
        var shipsSections = document.createElement("div");
        playerShips.forEach(function (ship) {
            shipsSections.appendChild(ship);
        });
        var buttonPlay = document.createElement("button");
        buttonPlay.setAttribute("class", "btn-play");
        buttonPlay.innerText = "Start a game!";
        var buttonRandomize = document.createElement("button");
        buttonRandomize.setAttribute("class", "btn-randomize");
        buttonRandomize.innerText = "Randomize ships position!";
        section.appendChild(shipsSections);
        section.appendChild(GameOptions_1.GameOptions.playerPlayground.playgroundDOM);
        section.appendChild(buttonPlay);
        section.appendChild(buttonRandomize);
        GameOptions_1.GameOptions.changeScreenContent(section);
    };
    PlaygroundScreen.prototype.prepareScreenEvents = function () {
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener("click", this.startGame);
        var buttonRandomize = document.querySelector(".btn-randomize");
        buttonRandomize === null || buttonRandomize === void 0 ? void 0 : buttonRandomize.addEventListener("click", GameOptions_1.GameOptions.playerPlayground.randomizeShipsPosition);
    };
    PlaygroundScreen.prototype.unregisterScreenEvents = function () {
        GameOptions_1.GameOptions.playerPlayground.removeEventsFromPlayerPlayground();
        var playButton = document.querySelector(".btn-play");
        playButton === null || playButton === void 0 ? void 0 : playButton.removeEventListener("click", this.startGame);
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