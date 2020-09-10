import { Controller, Get, Param, Post, HttpCode, Body, HttpException, HttpStatus, Patch, Delete } from '@nestjs/common';
import { readFileSync, writeFile } from 'fs';
import { Serializer } from 'jsonapi-serializer';
import { Character } from './dto/characters';

const CHARACTERS_MOCK_PATH: string = './characters.json';

const file = readFileSync(CHARACTERS_MOCK_PATH, 'utf8');
const blob = JSON.parse(file);
const serializationKeys = Object.keys(blob[0]);
const UserSerializer = new Serializer('characters', {
  attributes: serializationKeys,
});

@Controller('characters')
export class CharactersController {

    private getCharactersIds(): Character[] {
        console.log(UserSerializer.serialize(blob));
        return UserSerializer.serialize(blob);
    }

    private getCharacter(id: number): Character[] {
        return UserSerializer.serialize([blob.find((character: Character) => character.id === id)]);
    }

    private getCharacterIndexById(id: number): number {
        return UserSerializer.serialize(blob.findIndex((character: Character) => character.id === id));
    }

    private writeCharactersToFile(newCharacters: Character[]) {
        const stringifiedCharacters: string = JSON.stringify(newCharacters);

        writeFile(CHARACTERS_MOCK_PATH, stringifiedCharacters, 'utf8', (err) => {
            if (err) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: err.message,
                }, 500);
            }
        });
    }

    @Get()
    findAll(): Character[] {
        return this.getCharactersIds();
    }

    @Get(':id')
    findCharacter(@Param('id') id: number): Character[] {
        return this.getCharacter(Number(id));
    }

    @Post()
    @HttpCode(204)
    createCharacter(@Body() character: Character): void {
        const newCharacters: Character[] = [...blob, character];
        this.writeCharactersToFile(newCharacters);
    }

    @Patch(':id')
    updateCharacter(@Param('id') id: number, @Body() characterParams: Partial<Character>): void {
        const characterForUpdate: Character = this.getCharacter(id)[0];
        const updatedCharacter: Character = {...characterForUpdate, ...characterParams};
        const charactersForUpdate = [...blob];
        const characterForUpdateIndex = this.getCharacterIndexById(id);
        charactersForUpdate.splice(characterForUpdateIndex, 1, updatedCharacter);
        this.writeCharactersToFile(charactersForUpdate);
    }

    @Delete(':id')
    deleteCharacter(@Param('id') id: number): void {
        const characterIndex = this.getCharacterIndexById(id);
        const charactersForUpdate = [...blob];
        charactersForUpdate.splice(characterIndex, 1);
        this.writeCharactersToFile(charactersForUpdate);
    }
}
