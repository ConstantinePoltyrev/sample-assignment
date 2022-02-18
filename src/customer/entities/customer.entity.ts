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
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty({ example: '+6062228834' })
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;
  @ApiProperty({ example: 'jdoe@nowhere.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
