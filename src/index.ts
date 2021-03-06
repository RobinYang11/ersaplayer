import config from './config';
import DomTemplate from './domTemplate';

class Player {

  /**
   * html element which hold all player stuff
   */
  private template: DomTemplate;

  constructor(props: PlayerProps) {

    if (!props.rootElement) {
      throw new Error('rootElement must be a HTMLElement!')
    }

    if (config.supportType.indexOf(props.type) < 0) {
      console.warn(`${props.type} file is not supported yet!`);
    }

    this.template = new DomTemplate(props);

  }
}

export default Player;