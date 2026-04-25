
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomRequest } from '../../../types/CustomRequest.type';

@Injectable()
export class GuestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if (request.isAuthenticated()) {
      throw new UnauthorizedException("Un compte est déjà connecté !")
    }

    return true;
  }
}