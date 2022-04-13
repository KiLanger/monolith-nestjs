import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @IsMongoId()
  _id: string;
}
