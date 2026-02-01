import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';

@Module({
    imports: [],
    controllers: [],
    providers: [PasswordService],
    exports: [PasswordService]
})
export class PasswordModule {}
