/*!
 * ersa-player v1.0.0
 * (c) 2020-2020 robin Yang
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('htmlparser2')) :
  typeof define === 'function' && define.amd ? define(['htmlparser2'], factory) :
  (global = global || self, global.Player = factory(global.htmlParser));
}(this, (function (htmlParser) { 'use strict';

  htmlParser = htmlParser && Object.prototype.hasOwnProperty.call(htmlParser, 'default') ? htmlParser['default'] : htmlParser;

  var config = {
      supportType: ['mp4', 'flv', 'hsf', 'avi'],
      htmlTemplate: "\n    <div></div>\n  "
  };

  // const test = () => {
  //   console.log("test")
  // }
  // var parser = new DOMParser();
  // let doc = parser.parseFromString(`<div id='test'><h1>this is a test</h1></div>`, "text/html")
  // console.log("#doc", doc);
  // document.body = doc;
  var res = htmlParser.parseDOM("<div onclick='test'  id=\"robin\"><h1>hell</h1><button>click</button></div>");
  console.log("#res", res);
  recursion(res, document.body);
  // document.body
  var ersaplayer = {
      test: function () {
          console.log("test");
      }
  };
  function recursion(dom, root) {
      dom.forEach(function (i) {
          if (i.type === "text") {
              var text = document.createTextNode(i.data);
              root.appendChild(text);
          }
          else {
              var ele_1 = document.createElement(i.name);
              if (i.attributes) {
                  i.attributes.forEach(function (element) {
                      // let attr: Attr = document.createAttribute(element.name)
                      // 如果属性是按on 开头，则说明是 绑定事件 
                      if (element.name.match(/^on/)) {
                          ele_1.addEventListener(element.name.replace('on', ''), function () {
                              ersaplayer[element.value]();
                          });
                      }
                      else {
                          ele_1.setAttribute(element.name, element.value);
                      }
                  });
              }
              var a = root.appendChild(ele_1);
              if (i.children) {
                  recursion(i.children, a);
              }
          }
      });
  }
  var DomTemplate = /** @class */ (function () {
      function DomTemplate(props) {
          this.dom = props.rootElement;
          // props.rootElement.innerHTML = "<h1>this is content</h1>";
          // props.rootElement.appendChild(res);
          // res.forEach((i: any) => {
          //   console.log(i)
          //   if (i.c)
          //   // props.rootElement.appendChild(i)
          // })
      }
      DomTemplate.prototype.renderTemplate = function (template, pulgins) {
          this.dom.innerHTML = "\n      <div class=\"ersa-player\">\n          <div class=\"ersa-player-header\">\n              " + this.renderVideo("", "") + "\n          </div>\n          <div class=\"ersa-player-plugin-holder\">\n            " + this.generatePlugin(pulgins) + "\n          </div>\n      </div>\n    ";
      };
      /**
       *
       * @param type  file extension
       * @param url   file url
       */
      DomTemplate.prototype.renderVideo = function (type, url) {
          switch (type) {
              case 'mp4':
                  return url;
              case 'flv':
                  return "<div>" + url + "</div>";
              default:
                  return "<div>" + url + "</div>";
          }
      };
      DomTemplate.prototype.generatePlugin = function (pulgins) {
          var html = '';
          pulgins.forEach(function (i) {
              html += "<div>\n      " + i.name + "\n     </div>";
          });
          return html;
      };
      return DomTemplate;
  }());

  var Player = /** @class */ (function () {
      function Player(props) {
          if (!props.rootElement) {
              throw new Error('rootElement must be a HTMLElement!');
          }
          if (config.supportType.indexOf(props.type) < 0) {
              console.warn(props.type + " file is not supported yet!");
          }
          this.template = new DomTemplate(props);
      }
      return Player;
  }());

  return Player;

})));
