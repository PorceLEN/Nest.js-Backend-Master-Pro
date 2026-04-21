// import {

//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ICustomerType } from './customer-type.enum';
// import { rolesKey } from './roles.decorator';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<ICustomerType[]>(
//       rolesKey,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!requiredRoles) {
//       return true;
//     }

//     const { user } = context.switchToHttp().getRequest();
//     const hasRole = requiredRoles.some((role) => user.roles.includes(role));

//     console.log('User:', user);
//     console.log('Roles:', user.roles);
//     console.log('RequiredRoles:', requiredRoles);
//     console.log(context.getHandler(), context.getClass(), this.reflector);
//     console.log([context.getHandler(), context.getClass()]);

//     if (!hasRole) {
//       throw new ForbiddenException('admin only access');
//     }

//     return hasRole;
//   }
// }

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ICustomerType } from './customer-type.enum';
import { Reflector } from '@nestjs/core';
import { CustomRequest } from '../../../types/CustomRequest.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {


    const { user } = context.switchToHttp().getRequest<CustomRequest>();
    const requiredRoles = this.reflector.getAllAndOverride<ICustomerType[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException("Seul les administrateurs peuvent accéder à cette page !");
    }

        // DEBUG
    console.log({
      contextHandle: context.getHandler(),
      contextGetClass: context.getClass(),
      contextGetClassAndHandle: [context.getHandler(), context.getClass()],
      hasRole
    });
    //

    return hasRole;
  }
}
