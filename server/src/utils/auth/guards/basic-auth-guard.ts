import { WinstonLogger } from '../../logger';
import { env } from '../../../env';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private reflector: Reflector, private logger: WinstonLogger) {
    this.logger.setScope(__filename); 
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
 
    if (b64auth === '') {
      return false;
    }

    const [username, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

    if (!username || !password) {
      return false;
    }

    return this.isAuthorized(username, password);
  }

  isAuthorized(userName, password): boolean {
    return (
      userName === env.basicAuth.userName && password === env.basicAuth.password
    );
  }
}
