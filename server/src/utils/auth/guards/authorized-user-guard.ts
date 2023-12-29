import { WinstonLogger } from '../../logger';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ErrorInvalidUserToken } from '../errors';
import { env } from '../../../env';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private reflector: Reflector,
    private logger: WinstonLogger,
    private jwtService: JwtService,
  ) {
    this.logger.setScope(__filename);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      this.logger.debug('Unauthorized, Request Header was not set');
      throw new UnauthorizedException();
    }
    try {
      const token = request.headers.authorization.replace('Bearer', '').trim();

      const payload = await this.jwtService.decode(token, {
        json: true,
      });

      if (!payload || !payload.sub) {
        throw new ErrorInvalidUserToken();
      }

      return true;
    } catch (error) {
      this.logger.error(
        `AuthGuard | Error in executing Authorized User Guard.\n Message: ${error.message}`,
        error.code,
      );

      throw new UnauthorizedException(error.message);
    }
  }
}
