import { AbstractHttpAdapter, ModuleRef } from '@nestjs/core';
import type { AdminModuleOptions } from '@adminjs/nestjs' with { 'resolution-mode': 'require' };
import type { ActionRequest } from 'adminjs' with { 'resolution-mode': 'require' };
import type AdminJS from 'adminjs' with { 'resolution-mode': 'require' };
import { Injectable } from '@nestjs/common';
import { type Express } from 'express';

export type ActionRequestWithResolver = ActionRequest & { resolver: ModuleRef };

export const getAdminJsLoader = async () => {
  const { AbstractLoader } = await import('@adminjs/nestjs');
  const { buildRouter } = await import('@adminjs/express');

  @Injectable()
  class AdminJsLoader extends AbstractLoader {
    public constructor(public readonly moduleRef: ModuleRef) {
      super();
    }

    public register(
      admin: AdminJS,
      httpAdapter: AbstractHttpAdapter,
      options: AdminModuleOptions,
    ) {
      const app = httpAdapter.getInstance<Express>();
      const router = buildRouter(admin, undefined, options.formidableOptions);

      app.use(options.adminJsOptions.rootPath, (req, res, next) => {
        req.resolver = this.moduleRef;

        return router(req, res, next);
      });
    }
  }

  return AdminJsLoader;
};
