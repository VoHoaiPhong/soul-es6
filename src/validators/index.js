import validator from 'is-my-json-valid';
import * as schemas from './schemas';

export default class Validator {
  static get validates() {
    if(!Validator._validate) {
      Validator._validate = {};
      Object.keys(schemas).forEach(key => {
        Validator._validate[key] = {};
        Object.keys(schemas[key]).forEach(action => {
          Validator._validate[key][action] = validator(schemas[key][action]);
        });
      });
    }
    return Validator._validate;
  }

  validate(request, response, next) {
    // get from baseUrl. Exp: /api/v1/users
    let key = request.baseUrl.replace(/\/api\/v1\//i, '');
    const path = request.route.path;
    const validate = Validator.validates[key]['[' + request.method + ']' + path];
    if (validate === undefined || validate(request.body)) {
      next();
    } else {
      throw new Error(validate.error);
    }
  }
}