import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true, // makes sure we don't have to manually tell typeorm where our models are
        synchronize: true, // Only use when developing on development database
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
