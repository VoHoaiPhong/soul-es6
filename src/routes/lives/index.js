import BaseRoute from '../base.route';
import { path } from '../../../constants';
import Validator from '../../validators';
import { LiveController } from '../../controllers';

export default class LiveRoute extends BaseRoute {
  static path = path.lives;
  constructor() {
    super(new LiveController());
    this.init();
  }

  static get router() {
    if (!LiveRoute.instance) {
      LiveRoute.instance = new LiveRoute();
    }
    return LiveRoute.instance.router;
  }

  init = () => {
    this.router.get('/', Validator.validate, this.controller.lives);
  }
}
