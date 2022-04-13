import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteRepository } from './site.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SiteRepository])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
