import { Router } from 'express';
import Validator from '../validators';

export default class BaseRoute {
  static path = '/api/v1';
  constructor(controller) {
    this.controller = controller;
  }

  get router() {
    if(!BaseRoute.router$) {
      BaseRoute.router$ = Router();
    }
    return BaseRoute.router$;
  }

  get validator() {
    if(!this.validator$) {
      this.validator$ = new Validator().validate;
    }
    return this.validator$;
  }
}
