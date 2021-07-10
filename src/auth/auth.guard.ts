import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { OPEN_ENDPOINTS } from '../configure.root';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers: { authorization = '' } = {}, url } = context
      .switchToHttp()
      .getRequest();
    if (OPEN_ENDPOINTS.includes(url)) {
      return true;
    }

    try {
      const [type, token] = authorization.split(' ');
      if (
        !type ||
        type !== 'Bearer' ||
        !token ||
        !this.jwtService.verify(token)
      ) {
        throw new Error();
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}
