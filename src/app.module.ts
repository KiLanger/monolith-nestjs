import { Module } from '@nestjs/common';
import { HouseModule } from './house/house.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './house/house.entity';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { SiteModule } from './site/site.module';
import { Site } from './site/entities/site.entity';

@Module({
  imports: [
    HouseModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [House, User, Site],
    }),
    AuthModule,
    SiteModule,
  ],
})
export class AppModule {}
