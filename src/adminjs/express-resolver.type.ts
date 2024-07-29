import { ModuleRef } from '@nestjs/core';

declare global {
  namespace Express {
    interface Request {
      resolver: ModuleRef;
    }
  }
}
