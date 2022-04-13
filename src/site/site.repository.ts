import { NotFoundException } from '@nestjs/common';
import { EntityRepository, MongoRepository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { GetSiteFilterDto } from './dto/get-site-filter.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';

@EntityRepository(Site)
export class SiteRepository extends MongoRepository<Site> {
  async createSite(createSiteDto: CreateSiteDto): Promise<Site> {
    const { stationId, name, customer, peakPower, producers, consumers } =
      createSiteDto;

    const site = this.create({ stationId, name, customer, peakPower });

    if (producers && producers.length) {
      site.producers = producers;
    }
    if (consumers && consumers.length) {
      site.consumers = consumers;
    }
    await this.save(site);
    return site;
  }

  async findAllSites(filterDto: GetSiteFilterDto): Promise<Site[]> {
    const { customer } = filterDto;
    let options = {};
    if (customer) {
      options = {
        where: {
          customer: { $eq: customer },
        },
      };
    }
    const sites = await this.find(options);

    return sites;
  }

  async updateSite(id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const toUpdate = await this.findOne(id);

    if (!toUpdate) {
      throw new NotFoundException(`Site with ID "${id}" not found`);
    }

    const updated = Object.assign(toUpdate, updateSiteDto);
    const site = await this.save(updated);

    return site;
  }
}
