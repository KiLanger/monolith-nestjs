import { Injectable, NotFoundException } from '@nestjs/common';
import { House } from './house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { HouseRepository } from './house.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetHouseFilterDto } from './dto/get-house-filter-dto';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(HouseRepository)
    private houseRepository: HouseRepository,
  ) {}

  getHouses(filterDto: GetHouseFilterDto): Promise<House[]> {
    return this.houseRepository.getHouses(filterDto);
  }

  async getHouseById(id: string): Promise<House> {
    const found = await this.houseRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`House with ID "${id}" not found`);
    }

    return found;
  }

  async createHouse(createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseRepository.createHouse(createHouseDto);
  }

  async deleteHouse(id: string): Promise<void> {
    const result = await this.houseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`House with ID ${id} not found`);
    }
  }

  async updateHouse(
    id: string,
    createHouseDto: CreateHouseDto,
  ): Promise<House> {
    const house = await this.getHouseById(id);
    house.name = createHouseDto.name;
    await this.houseRepository.save(house);
    return house;
  }
}
