


interface Plugin {
  iconClass?: string,
  events?: Array<Event>;
  dom?: HTMLElement;
}

class PlayerPlugin extends Plugin {

  constructor(props: any) {
    super()
  }

}


export default PlayerPlugin;