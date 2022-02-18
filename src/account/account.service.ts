import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const res = await this.db.findById(this.table, id);
    if (!res) {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.db.update(this.table, id, updateAccountDto);
    return this.db.findById(this.table, id);
  }

  async remove(id: string) {
    await this.db.delete(this.table, id);
  }
}
