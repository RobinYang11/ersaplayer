import htmlParser from 'htmlparser2';

const res = htmlParser.parseDOM("<div><h1>hell</h1><button>click</button></div>")
console.log("#res", res)

class DomTemplate {

  private dom: HTMLElement;

  constructor(props: PlayerProps) {
    this.dom = props.rootElement;
    props.rootElement.innerHTML = "<h1>this is content</h1>";
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