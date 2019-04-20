import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';
import createError from 'http-errors';

export default class Authentication {
  static verify = (request, response, next) => {
    try {
      if(!request.headers.authorization) {
        throw new Error('Need authorization.');
      } else {
        const accessToken = request.headers.authorization.split(' ')[1];
        jwt.verify(accessToken, readFileSync(join(process.cwd(), 'key', 'jwtRS256.pub'), 'utf8'), {
          algorithms: ['RS512']
        }, (err, auth) => {
          if(err) {
            throw err;
          } else {
            response.locals.auth = auth;
            next();
          }
        });
      }
    } catch (error) {
      return next(createError(401));
    }
  }
}