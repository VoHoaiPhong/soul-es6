import { Router } from 'express';
import Validator from '../validators';

export default class BaseRoute {
  static path = '/api/v1';
  router = Router();
  validator = new Validator().validate;

  constructor(controller) {
    this.controller = controller;
  }
}
