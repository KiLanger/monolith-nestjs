import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
  IsNumberString,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export type ProducerType = 'Solar' | 'Wind' | 'Water';

export class CreateSiteDto {
  @IsNotEmpty()
  @IsMongoId()
  stationId: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  customer: string;
  @IsNotEmpty()
  @IsNumberString()
  peakPower: number;
  @IsNotEmpty()
  @IsNumberString()
  loadPeak: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Producer)
  producers?: Producer[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Consumer)
  consumers?: Consumer[];
}

class Producer {
  @IsNotEmpty()
  connectorId: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  peakPower: number;
  @IsNotEmpty()
  @IsIn(['Solar', 'Wind', 'Water'])
  type: string;
}

class Consumer {
  @IsNotEmpty()
  connectorId: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  peakConsumption: number;
}
