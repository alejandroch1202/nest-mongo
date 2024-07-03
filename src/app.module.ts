import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { envConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => envConfiguration()],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.DATABASE_URL),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
