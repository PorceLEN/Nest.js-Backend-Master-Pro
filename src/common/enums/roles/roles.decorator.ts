import { SetMetadata } from '@nestjs/common';
import { ICustomerType } from './customer-type.enum';

export const rolesKey = 'roles';
export const Roles = (...roles: ICustomerType[]) => SetMetadata(rolesKey, roles);
