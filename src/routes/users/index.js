import BaseRoute from '../base.route';
import { path } from '../../../constants';
// import { UserController } from '../controllers';
// import Authentication from '../authentication';
// import YoutubeAPI from '../googleAPI';

export default class UserRoute extends BaseRoute {
  static path = path.users;
  constructor() {
    super(null);
    this.init();
  }
  

  static get router() {
    if(!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance.router;
  }

  init = () => {
    this.router.get('/', (req, res) => {
      res.json({
        from: 'users'
      });
    });
  }
}
