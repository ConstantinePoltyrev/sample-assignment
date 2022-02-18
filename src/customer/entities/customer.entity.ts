import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class Customer {
  @ApiProperty()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
