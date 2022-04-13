import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SiteRepository } from './site.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetSiteFilterDto } from './dto/get-site-filter.dto';
import { Site } from './entities/site.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(SiteRepository)
    private siteRepository: SiteRepository,
  ) {}
  create(createSiteDto: CreateSiteDto) {
    return this.siteRepository.createSite(createSiteDto);
  }

  findAll(filterDto: GetSiteFilterDto): Promise<Site[]> {
    return this.siteRepository.findAllSites(filterDto);
  }

  async findOne(id: string) {
    const site = await this.siteRepository.findOne(id);

    if (!site) {
      throw new NotFoundException(`Site with ID "${id}" not found`);
    }

    return site;
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return this.siteRepository.updateSite(id, updateSiteDto);
  }

  async remove(id: string) {
    const result = await this.siteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`House with ID ${id} not found`);
    }
  }
}
