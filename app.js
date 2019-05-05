import express from 'express';
import { createServer } from 'http';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import { join } from 'path';
import { logger } from './extensions';
import * as zlib from 'zlib';
import ApiRoutes from './src/routes';

import { Database } from './src/helpers/database';

export default class Application {
  static bootstrap() {
    return new Application();
  }

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.config();
    this.routes();
    this.app.use(this.catchNotFound);
    this.app.use(this.errorHandler);
  }

  config = () => {
    new Database();
    // new YoutubeAPI();
    this.app.set('views', join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    this.app.use(cookieParser(this.genKey()));
    this.app.use(bodyParser.json({
      limit: '512MB'
    }));
    this.app.use(bodyParser.urlencoded({
      extended: false
    }));
    this.app.use(morgan('common', {
      stream: {
        write: message => logger.info(message.trim())
      }
    }));

    this.app.use('/assets', express.static(join(__dirname, 'public')));

    this.app.use(cors());
    this.app.use(this.pagginator);
    this.app.use(compression({
      chunkSize: 1024,
      strategy: zlib.Z_DEFAULT_STRATEGY
    }));
    this.app.use(helmet({
      Filter: true,
      frameguard: true,
    }));
  }

  genKey = () => {
    const prime_length = 60;
    const diffHell = crypto.createDiffieHellman(prime_length);
    diffHell.generateKeys('base64');
    return diffHell.getPrivateKey('base64');
  }

  pagginator = (request, response, next) => {
    response.locals.pageIndex = request.query.pageIndex || 1;
    response.locals.pageSize = request.query.pageSize || 10;
    next();
  }

  catchNotFound = (request, response, next) => {
    next(createError(404));
  }

  errorHandler = (error, request, response, next) => {
    console.log(error);
    response.status(error.status || 500);
    response.json({error});
    next();
  }

  routes = () => {
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}