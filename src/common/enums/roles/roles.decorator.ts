import { SetMetadata } from '@nestjs/common';
import { ICustomerType } from './customer-type.enum';

export const Roles = (...roles: ICustomerType[]) => SetMetadata("roles", roles);
