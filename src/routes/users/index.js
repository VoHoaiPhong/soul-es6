import BaseRoute from '../base.route';
import { path } from '../../../constants';
import { UserController } from '../../controllers';
import Validator from '../../validators';
// import Authentication from '../../authentication';

export default class UserRoute extends BaseRoute {
  static path = path.users;
  constructor() {
    super(new UserController());
    this.init();
  }

  static get router() {
    if (!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance.router;
  }

  init = () => {
    this.router.post('/', Validator.validate, this.controller.create);
    this.router.post('/login', Validator.validate, this.controller.login);
  }
}
