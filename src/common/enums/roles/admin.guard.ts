import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ICustomerType } from './customer-type.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ICustomerType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    console.log('User:', user);
    console.log('Roles:', user?.roles);
    console.log('RequiredRoles:', requiredRoles);

    if (!hasRole) {
      throw new ForbiddenException('admin only access');
    }

    return hasRole;
  }
}
