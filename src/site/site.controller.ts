import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { GetSiteFilterDto } from './dto/get-site-filter.dto';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }

  @Get()
  findAll(@Query() filterDto: GetSiteFilterDto) {
    return this.siteService.findAll(filterDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(id, updateSiteDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
