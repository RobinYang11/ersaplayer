import htmlParser from 'htmlparser2';

// const test = () => {
//   console.log("test")
// }
// var parser = new DOMParser();
// let doc = parser.parseFromString(`<div id='test'><h1>this is a test</h1></div>`, "text/html")
// console.log("#doc", doc);
// document.body = doc;

interface Plugin {
  dom: string,
  events: Array<Event>;
}

class MyPlugin extends Plugin {

}

function TestTemplate() {

  const test = (e: Event) => {
    console.log(e.target)
  }

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

const res = htmlParser.parseDOM(`<div onclick='test'  id="robin"><h1>hell</h1><button>click</button></div>`);
console.log("#res", res)
recursion(res, document.body);
// document.body

//  所有的事件 都放到 一个 全局 变量中
const ersaplayer: any = {
  test: () => {
    console.log("test")
  }
}

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
              ersaplayer[element.value]();
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

class DomTemplate {

  private dom: HTMLElement;

  constructor(props: PlayerProps) {
    this.dom = props.rootElement;
    // props.rootElement.innerHTML = "<h1>this is content</h1>";
    // props.rootElement.appendChild(res);
    // res.forEach((i: any) => {
    //   console.log(i)
    //   if (i.c)
    //   // props.rootElement.appendChild(i)
    // })
  }

  private renderTemplate(template: string, pulgins: Array<Object>) {
    this.dom.innerHTML = `
      <div class="ersa-player">
          <div class="ersa-player-header">
              ${this.renderVideo("", "")}
          </div>
          <div class="ersa-player-plugin-holder">
            ${this.generatePlugin(pulgins)}
          </div>
      </div>
    `
  }

  /**
   * 
   * @param type  file extension
   * @param url   file url
   */
  private renderVideo(type: string, url: string): string {
    switch (type) {
      case 'mp4':
        return url
      case 'flv':
        return `<div>${url}</div>`;
      default:
        return `<div>${url}</div>`
    }
  }

  private generatePlugin(pulgins: Array<Object>): string {
    let html = '';
    pulgins.forEach((i: any) => {
      html += `<div>
      ${i.name}
     </div>`
    })
    return html;
  }

}


export default DomTemplate;