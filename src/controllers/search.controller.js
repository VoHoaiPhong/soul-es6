import { BaseController } from './base.controller';
import { google } from 'googleapis';
import createError from 'http-errors';
import { join } from 'path';
import { readFileSync } from 'fs';

export class SearchController extends BaseController {
  constructor() {
    super();
    this.main = google.youtube('v3');
    this.credentials = JSON.parse(readFileSync(join(process.cwd(), 'key', 'the-living-plus-c6603e05570e.json'), 'utf8'));
    this.jwtToken = new google.auth.JWT(this.credentials.client_email, null, this.credentials.private_key, ['https://www.googleapis.com/auth/youtube'], null);
    this.jwtToken.authorize(err => {
      if (err) {
          console.log(`Google authorization not accorded: `,err);
          return;
      } else {
          console.log(`Google authorization accorded.`);
      }
    });
  }

  search = async (request, response, next) => {
    this.main.search.list({
      part: 'snippet',
      maxResults: 25,
      q: request.query.q,
      auth: this.jwtToken
    }).then(res => {
      response.json([
        ...res.data.items
      ]);
    }).catch(error => {
      next(createError(500, error));
    });
  }
}