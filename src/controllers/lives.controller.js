import { BaseController } from './base.controller';
import createError from 'http-errors';
import ytdl from 'ytdl-core';

export class LiveController extends BaseController {
  constructor() {
    super();
    this.models = null;
  }

  lives = async (request, response, next) => {
    try {
      const url = request.query.url;
      ytdl.getInfo(url, (err, i4) => {
        const fm = ytdl.chooseFormat(i4.formats, {
          filter: this.filter
        });

        let fileSize = fm.clen - 0;

        const range = request.headers.range;
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          const chunksize = (end - start) + 1;
          const file = ytdl(url, {
            range: {
              start,
              end
            },
            filter: this.filter
          });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/mp4',
          };

          response.writeHead(206, head);
          file.pipe(response);
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/mp4',
          };
          response.writeHead(200, head);
          const video = ytdl(url, {
            filter: this.filter
          });
          video.pipe(response);
        }
      });
    } catch (error) {
      next(createError(500));
    }
  }

  filter = (format) => format.container === 'm4a'
}