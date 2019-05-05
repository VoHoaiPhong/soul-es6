import { BaseController } from './base.controller';
import createError from 'http-errors';
import Encryption from '../lib/encrypt';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Users } from '../models';

export class UserController extends BaseController {
  constructor() {
    super();
    this.models = Users;
  }

  create = async (request, response, next) => {
    try {
      request.body.password = Encryption.hashing(request.body.password);
      super.create(request, response, next);
    } catch (error) {
      console.log(error);
      next(createError(500, error.message));
    }
  }

  login = async (request, response, next) => {
    try {
      const query = {
        where: {
          username: request.body.username
        }
      };
      const user = await this.models.findOne(query).catch(error => {
        throw error;
      });
      const match = Encryption.compare(request.body.password, !user ? '' : user.password);

      if(!match) {
        return next(createError(422, 'Username or password is invalid.'));
      } else {
        const { id, username, firstname, lastname } = user;
        const accessToken = await jwt.sign({
          id, username, firstname, lastname
        }, readFileSync(join(process.cwd(), 'key', 'jwtRS256.pub'), 'utf8'), {
          expiresIn: '365d',
          algorithm: 'RS512'
        });

        response.status(200).json({accessToken});
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  }
}