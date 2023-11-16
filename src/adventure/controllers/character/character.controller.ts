import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCharacterDto } from 'src/adventure/dto/create-character-dto';
import { UpdateCharacterDto } from 'src/adventure/dto/update-character-dto';
import { Character } from 'src/adventure/schemas/character.schema';
import { CharacterService } from 'src/adventure/services/character/character.service';

@Controller('character')
export class CharacterController {
  constructor(private charService: CharacterService) {}
  @Post()
  async createCharacter(
    @Body() createCharDto: CreateCharacterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Character> {
    try {
      return this.charService.create(createCharDto);
    } catch (err) {
      res.send(err.response);
    }
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Character> {
    try {
      return this.charService.findById(id);
    } catch (err) {
      res.send(err.response);
    }
  }

  @Get('/user/:userId')
  async getByUserId(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Character[]> {
    try {
      return this.charService.findByUserId(userId);
    } catch (err) {
      res.send(err.response);
    }
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Character> {
    try {
      return this.charService.delete(id);
    } catch (err) {
      res.send(err.response);
    }
  }

  @Put(':id/:paragraphNumber')
  async nextParagraph(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Param('paragraphNumber') paragraphNumber: number,
  ): Promise<Character> {
    try {
      return this.charService.getnextParagraphAndUpdateCharacter(
        id,
        updateCharacterDto,
        paragraphNumber,
      );
    } catch (err) {
      res.send(err.response);
    }
  }

  @Get(':id/close-adventure')
  closeAdventure(@Param('id') idChara: string): string {
    return `Félicitation ! L'aventure avec le perso ${idChara} est terminée !`;
  }
}
