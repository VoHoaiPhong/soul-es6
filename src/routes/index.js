import BaseRoute from './base.route';
import UserRoute from './users';

export default class ApiRoutes extends BaseRoute {
  constructor() {
    super();
    this.init();
  }

  static get router() {
    if(!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  init = () => {
    console.log(UserRoute.path);
    this.router.use(UserRoute.path, UserRoute.router);
  }
}
