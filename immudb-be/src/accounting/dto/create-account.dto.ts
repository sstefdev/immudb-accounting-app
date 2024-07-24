import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

enum AccountType {
  SENDING = 'sending',
  RECEIVING = 'receiving',
}

export class CreateAccountDto {
  @ApiProperty({ example: '123456789', description: 'Unique account number' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the account holder',
  })
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @ApiProperty({
    example: 'GB29NWBK60161331926819',
    description: 'IBAN of the account',
  })
  @IsString()
  @IsNotEmpty()
  iban: string;

  @ApiProperty({
    example: '123 Main St, City, Country',
    description: 'Address associated with the account',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 1000.5,
    description: 'Current balance of the account',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    enum: AccountType,
    example: 'sending',
    description: 'Type of the account',
  })
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;
}
