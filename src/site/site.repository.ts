import { EntityRepository, MongoRepository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { GetSiteFilterDto } from './dto/get-site-filter.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';

@EntityRepository(Site)
export class SiteRepository extends MongoRepository<Site> {
  async createSite(createSiteDto: CreateSiteDto): Promise<Site> {
    const { name, customer, peakPower, producers, consumers } = createSiteDto;

    const site = this.create({ name, customer, peakPower });

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
}
