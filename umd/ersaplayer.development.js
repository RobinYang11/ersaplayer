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

  var res = htmlParser.parseDOM("<div><h1>hell</h1><button>click</button></div>");
  console.log("#res", res);
  var DomTemplate = /** @class */ (function () {
      function DomTemplate(props) {
          this.dom = props.rootElement;
          props.rootElement.innerHTML = "<h1>this is content</h1>";
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
