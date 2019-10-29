import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { isObjectFull } from '@nestjsx/util';
import * as deepmerge from 'deepmerge';

import { CrudGlobalConfig } from '../interfaces';

export class CrudConfigService {
  static config: CrudGlobalConfig = {
    query: {
      alwaysPaginate: true,
    },
    routes: {
      getManyBase: { interceptors: [], decorators: [] },
      getOneBase: { interceptors: [], decorators: [] },
      createOneBase: { interceptors: [], decorators: [] },
      createManyBase: { interceptors: [], decorators: [] },
      updateOneBase: { interceptors: [], decorators: [], allowParamsOverride: false },
      replaceOneBase: { interceptors: [], decorators: [], allowParamsOverride: false },
      deleteOneBase: { interceptors: [], decorators: [], returnDeleted: false },
    },
    params: {
      id: {
        field: 'id',
        type: 'number',
        primary: true,
      },
    },
  };

  static load(config: CrudGlobalConfig = {}) {
    if (isObjectFull(config.queryParser)) {
      RequestQueryBuilder.setOptions(config.queryParser);
    }

    const query = isObjectFull(config.query) ? config.query : {};
    const routes = isObjectFull(config.routes) ? config.routes : {};
    const params = isObjectFull(config.params) ? config.params : {};

    CrudConfigService.config = deepmerge(
      CrudConfigService.config,
      { query, routes, params },
      { arrayMerge: (a, b, c) => b },
    );
  }
}
