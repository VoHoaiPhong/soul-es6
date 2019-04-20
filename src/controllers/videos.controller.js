import { BaseController } from './base.controller';
// import createError from 'http-errors';
import { Videos } from '../models';

export class VideoController extends BaseController {
  constructor() {
    super();
    this.models = Videos;
  }
}