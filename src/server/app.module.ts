import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CharactersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
