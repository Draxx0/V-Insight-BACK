import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    AccountModule,
    UserPreferencesModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class CoreModule {}
