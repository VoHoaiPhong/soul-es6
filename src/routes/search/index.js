import BaseRoute from '../base.route';
import { path } from '../../../constants';
import { SearchController } from '../../controllers';
import Validator from '../../validators';
import Authentication from '../../authentication';

export default class SearchRoute extends BaseRoute {
  static path = path.search;
  constructor() {
    super(new SearchController());
    this.init();
  }

  static get router() {
    if (!SearchRoute.instance) {
      SearchRoute.instance = new SearchRoute();
    }
    return SearchRoute.instance.router;
  }

  init = () => {
    this.router.get('/', Authentication.verify, Validator.validate, this.controller.search);
  }
}
