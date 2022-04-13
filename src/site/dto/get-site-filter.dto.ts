import { IsOptional, IsString } from 'class-validator';

export class GetSiteFilterDto {
  @IsOptional()
  @IsString()
  customer?: string;
}
