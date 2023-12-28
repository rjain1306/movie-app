import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorInvalidUserToken } from '../errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async use(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.headers && req.headers.authorization) { 
        const authToken: string = req.headers.authorization.toString();

        if (authToken.toLowerCase().startsWith('basic')) {
          const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
 
          if (b64auth !== '') {
            const [username] = Buffer.from(b64auth, 'base64')
              .toString()
              .split(':');

            req.user = {
              sub: username,
            };
          }
        } else {
          const token = req.headers.authorization.replace('Bearer', '').trim();
          const payload = await this.jwtService.decode(token, {
            json: true,
          });
          if (!payload) {
            throw new ErrorInvalidUserToken();
          }
          payload['token'] = token;
          req.user = payload;
        }
      } 

      next();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
