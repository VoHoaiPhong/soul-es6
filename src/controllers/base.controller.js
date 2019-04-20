import createError from 'http-errors';
import {
  UPDATE_SUCCESSFULLY, CREATE_SUCCESSFULLY, DELETE_SUCCESSFULLY
} from '../../constants';

export class BaseController {
  async find(request, response, next) {
    try {
      const query = {
        where: request.query
      };
      const data = await this.models.findAll(query).catch(error => {
        throw error;
      });
      if(!data) {
        next(createError(404));
      } else {
        response.status(200).json({data});
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  }

  async create(request, response, next) {
    try {
      const data = await this.models.create(request.body).catch(err => {
        throw err;
      });
      if(!data) {
        next(createError(403));
      } else {
        response.status(200).json({
          msg: CREATE_SUCCESSFULLY
        });
      }
    } catch (error) {
      next(createError(500, error));
    }
  }

  async update(request, response, next) {
    try {
      const query = {
        where: request.params
      };
      const data = await this.models.update(request.locals, query).catch(err => {
        throw err;
      });
      if(!data) {
        next(createError(404));
      } else {
        response.status(201).json({
          msg: UPDATE_SUCCESSFULLY
        });
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  }

  async delete(request, response, next) {
    try {
      const query = {
        where: request.params
      };
      const data = await this.models.update({
        isDeleted: 1
      }, query).catch(err => {
        throw err;
      });
      if(!data) {
        next(createError(404));
      } else {
        response.status(201).json({
          msg: DELETE_SUCCESSFULLY
        });
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  }

  async findOne(request, response, next) {
    try {
      const query = {
        where: request.query
      };
      const data = await this.models.findOne(query).catch(err => {
        throw err;
      });
      if(!data) {
        next(createError(404));
      } else {
        response.status(200).json({data});
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  }
}