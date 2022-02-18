import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AccountService {
  table = 'accounts';
  constructor(private readonly db: DatabaseService) {}

  create(createAccountDto: CreateAccountDto) {
    return this.db.create(this.table, createAccountDto);
  }

  findAll() {
    return this.db.find(this.table, {});
  }

  findOne(id: string) {
    return this.db.findById(this.table, id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.db.update(this.table, id, updateAccountDto);
  }

  remove(id: string) {
    return this.db.delete(this.table, id);
  }
}
