import { Controller, Get, Param, Post, HttpCode, Body, Patch, Delete } from '@nestjs/common';
import { Character } from './dto/characters';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get(':id')
  findCharacter(@Param('id') id: number): Character[] {
    return this.charactersService.getCharacter(Number(id));
  }

  @Get()
  getAllCharacters(): Character[] {
    return this.charactersService.getCharacters();
  }

  @Post()
  @HttpCode(204)
  createCharacter(@Body() character: Character): void {
    this.charactersService.createCharacter(character);
  }

  @Patch(':id')
  updateCharacter(@Param('id') id: number, @Body() characterParams: Partial<Character>): void {
    this.charactersService.updateCharacter(id, characterParams);
  }

  @Delete(':id')
  deleteCharacter(@Param('id') id: number): void {
    this.charactersService.deleteCharacter(id);
  }
}
