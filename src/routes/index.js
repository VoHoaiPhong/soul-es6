import BaseRoute from './base.route';
import LiveRoute from './lives';
import SearchRoute from './search';
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
    this.router.use(LiveRoute.path, LiveRoute.router);
    this.router.use(SearchRoute.path, SearchRoute.router);
    this.router.use(UserRoute.path, UserRoute.router);
  }
}
