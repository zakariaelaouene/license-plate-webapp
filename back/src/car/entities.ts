/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Car {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  licensePlate: string;
  @ApiProperty({ required: false })
  flag: 'RED' | 'GREEN' | 'YELLOW';
  @ApiProperty({ required: false })
  owner: string;
  @ApiProperty({ required: false })
  createdAt: Date;
}

export class CreateCarDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  licensePlate: string;
  @ApiProperty({ required: true })
  flag: 'RED' | 'GREEN' | 'YELLOW';
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  owner: string;
}

export class UpdateCarDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  licensePlate: string;
  @ApiProperty({ required: false })
  flag: 'RED' | 'GREEN' | 'YELLOW';
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  owner: string;
}

