/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Violation {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  carId: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateViolationDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  carId: number;
}

export class UpdateViolationDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  carId: number;
}

