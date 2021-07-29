import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class CharactersService {
  getCharacters(): Character[] {
    return UserSerializer.serialize(blob);
  }

  getCharacter(id: number): Character[] {
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

  createCharacter(character: Character): void {
    const newCharacters: Character[] = [...blob, character];
    this.writeCharactersToFile(newCharacters);
  }

  updateCharacter(id: number, characterParams: Partial<Character>): void {
    const characterForUpdate: Character = this.getCharacter(id)[0];
    const updatedCharacter: Character = { ...characterForUpdate, ...characterParams };
    const charactersForUpdate = [...blob];
    const characterForUpdateIndex = this.getCharacterIndexById(id);
    charactersForUpdate.splice(characterForUpdateIndex, 1, updatedCharacter);
    this.writeCharactersToFile(charactersForUpdate);
  }

  deleteCharacter(id: number): void {
    const characterIndex = this.getCharacterIndexById(id);
    const charactersForUpdate = [...blob];
    charactersForUpdate.splice(characterIndex, 1);
    this.writeCharactersToFile(charactersForUpdate);
  }
}
