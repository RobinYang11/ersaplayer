

interface DomTemplateProps {
  root: HTMLElement,
  type: string
}

class DomTemplate {

  dom: HTMLElement;

  constructor(props: any) {
    this.dom = props.root
  }

}


export default DomTemplate;