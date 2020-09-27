'use strict';

var config = {
    supportType: ['mp4', 'flv', 'hsf', 'avi'],
    htmlTemplate: "\n    <div></div>\n  "
};

var DomTemplate = /** @class */ (function () {
    function DomTemplate(props) {
        this.dom = props.root;
    }
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

module.exports = Player;
