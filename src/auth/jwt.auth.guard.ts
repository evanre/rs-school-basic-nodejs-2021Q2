import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers: { authorization = '' } = {} } = context
      .switchToHttp()
      .getRequest();
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
