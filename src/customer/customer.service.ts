import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CustomerService {
  table = 'customers';
  constructor(private readonly db: DatabaseService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.db.create(this.table, createCustomerDto);
  }

  findAll() {
    return this.db.find(this.table, {});
  }

  async findOne(id: string) {
    const res = await this.db.findById(this.table, id);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.db.update(this.table, id, updateCustomerDto);
    return this.db.findById(this.table, id);
  }

  async remove(id: string) {
    await this.db.deleteMany('accounts', { customerId: id });
    await this.db.delete(this.table, id);
  }

  getAccounts(id: string) {
    return this.db.find('accounts', { customerId: id });
  }
}
