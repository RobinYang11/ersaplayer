
import htmlParser from 'htmlparser2';

// const test = () => {
//   console.log("test")
// }
// var parser = new DOMParser();
// let doc = parser.parseFromString(`<div id='test'><h1>this is a test</h1></div>`, "text/html")
// console.log("#doc", doc);
// document.body = doc;

interface LooseObject {
  [key: string]: any
}


const ErsaPlayer: LooseObject = {
  plugins: [],
  methods: {}
}

interface Plugin {
  name: string,
  render: Function;
  methods: any;
}

class MyPlugin {

  name = "myplugin";

  test() {
    console.log("test")
  }

  methods = {
    test: () => {
      console.log(this)
      console.log(ErsaPlayer)
    },
  }

  render() {
    return `<div>
      <div>
        <div>
          this is header
        </div>
        <div>
          body
          <button onclick="test"> click to </div>
        </div>
        <footer>
          <h1>
            this is footer
          </h1>
      </div>
    <div>
  `
  }
}

var plugin = new MyPlugin()

var arr: Array<any> = [plugin]

arr.forEach((i: Plugin) => {
  console.log("#%%%%%%%%%%*", i)
  console.log(typeof i)
  for (let j in i) {
    console.log(j);
  }
  Object.keys(i.methods).forEach((j: string) => {
    // let test = i.methods[j].bind(ErsaPlayer);
    // ErsaPlayer.methods['test'] = test;
    ErsaPlayer.methods['test'] = i.methods[j];
  })
})


const res = htmlParser.parseDOM(`<div onclick='test'  id="robin"><h1>hell</h1><button>click</button></div>`);
console.log("#res", res)
recursion(res, document.body);


function recursion(dom: Array<Object>, root: HTMLElement) {

  dom.forEach((i: any) => {
    if (i.type === "text") {
      let text: any = document.createTextNode(i.data)
      root.appendChild(text);
    } else {
      let ele: HTMLElement = document.createElement(i.name);
      if (i.attributes) {
        i.attributes.forEach((element: any) => {

          // 如果属性是按on 开头，则说明是 绑定事件 
          if (element.name.match(/^on/)) {
            ele.addEventListener(element.name.replace('on', ''), () => {
              (ErsaPlayer.methods[element.value])();
            })
          } else {
            ele.setAttribute(element.name, element.value);
          }
        });
      }
      let a: HTMLElement = root.appendChild(ele);
      if (i.children) {
        recursion(i.children, a);
      }
    }
  })
}

export default {}