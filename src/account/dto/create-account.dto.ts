import { Account } from '../entities/account.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateAccountDto extends OmitType(Account, ['_id']) {}
