// mock-auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request as expressRequest, NextFunction, Response } from 'express';

export type AuthSession = { user: { id: string } };

interface Request extends expressRequest {
  session?: AuthSession;
}
@Injectable()
export class MockAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userId: string;

    const authHeader = req.headers['authorization'] as string;
    if (authHeader) {
      userId = authHeader.replace(/^Bearer\s+/i, '');
    } else {
      userId = process.env.MOCK_USER_ID || 'default-dev-user';
    }

    req.session = {
      user: { id: userId },
    };

    next();
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.session;
  },
);
