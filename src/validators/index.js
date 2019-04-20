import validator from 'is-my-json-valid';
import * as schemas from './schemas';
import createError from 'http-errors';
import { GET } from '../../constants';

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

  static validate(request, response, next) {
    try {
      // get from baseUrl. Exp: /api/v1/users
      let key = request.baseUrl.replace(/\/api\/v1\//i, '');
      const path = request.route.path;
      const validate = Validator.validates[key]['[' + request.method + ']' + path];
      if(validate === undefined) {
        next();
      } else {
        switch (request.method) {
          case GET:
            if(!validate(request.query)) {
              throw validate.error;
            }
            break;
          default:
            if(!validate(request.body)) {
              throw validate.error;
            }
            break;
        }
        next();
      }
    } catch (error) {
      next(createError(422, error));
    }
  }
}