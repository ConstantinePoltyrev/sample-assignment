import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CustomerModule, AccountModule, DatabaseModule],
})
export class AppModule {}
