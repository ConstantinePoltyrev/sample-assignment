import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Account {
  @ApiProperty()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsString()
  customerId: string;
  @ApiProperty()
  @IsNumber()
  balance: number;
}
