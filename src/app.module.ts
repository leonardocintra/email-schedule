import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/TypeOrmModuleOptions';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeOrmConfig), SendgridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
