/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Capture {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  location: string;
  @ApiProperty({ required: false })
  carId: number;
  @ApiProperty({ required: false })
  createdAt: Date;
}

export class CreateCaptureDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  location: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  carId: number;
}

export class UpdateCaptureDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  location: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  carId: number;
}

