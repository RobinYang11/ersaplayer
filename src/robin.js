import htmlParser from 'htmlparser2';

const html = `
    <div class="ersa-player">
        <div class="player-body">
            <div class="player-wrapper">
              video 
            </div>
            <div class="player-plugins">

            </div>
        </div>
    </div>
`

class Template {
  constructor(props) {
    console.log(props)
    props.rootElement.innerHTML = html;
    console.log(props.rootElement.querySelector('.player-plugins'))
    this.pluginWrapper = props.rootElement.querySelector('.player-plugins');
  }
}

class Player {

  plugins = [];

  name = "rootplayer";

  // template;

  constructor(props) {

    console.log("PRO", props)
    //初始化
    this.dom = props.rootElement

    //装载插件
    if (props.plugins) {
      props.plugins.forEach(plugin => {
        this.plugins.push(plugin)
      })
    }

    this.template = new Template(props);
  }

  mount() {
    this.plugins.forEach(i => {
      console.log(i)
      let virtualDom = htmlParser.parseDOM(i.render())
      console.log(virtualDom);

      this.template.pluginWrapper.innerHTML = i.render();

    })

  }

}


class Plugin {
  name = 'basePlgin';
  render() {

  }
}

class Person extends Plugin {

  name = "person";
  constructor(props) {
    super(props)
    this.player = props.player;
  }

  test() { }
  walk() {
    console.log(player.name)
  }

  render() {
    return `
      <div onclick="walk">
        <span>
          this is a plugin
        </span>
      </div>
    `
  }

}

var player = new Player({
  rootElement: document.getElementById("container"),
  plugins: []
});

var robin = new Person({ player });
player.plugins.push(robin);
player.mount();

export default {}