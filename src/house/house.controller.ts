import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { House } from './house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { HouseService } from './house.service';
import { GetHouseFilterDto } from './dto/get-house-filter-dto';

@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  getHouses(@Query() filterDto: GetHouseFilterDto): Promise<House[]> {
    return this.houseService.getHouses(filterDto);
  }

  @Post()
  createHouse(@Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.houseService.createHouse(createHouseDto);
  }

  @Get('/:id')
  getHouseById(@Param('id') id: string): Promise<House> {
    return this.houseService.getHouseById(id);
  }

  @Delete('/:id')
  deleteHouse(@Param('id') id: string): Promise<void> {
    return this.houseService.deleteHouse(id);
  }

  @Patch('/:id')
  updateHouse(
    @Param('id') id: string,
    @Body() createHouseDto: CreateHouseDto,
  ): Promise<House> {
    return this.houseService.updateHouse(id, createHouseDto);
  }
}
