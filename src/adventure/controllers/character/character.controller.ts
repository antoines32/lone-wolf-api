import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCharacterDto } from 'src/adventure/dto/create-character-dto';
import { UpdateCharacterDto } from 'src/adventure/dto/update-character-dto';
import { CharacterService } from 'src/adventure/services/character/character.service';

@Controller('character')
export class CharacterController {
  constructor(private charService: CharacterService) {}
  @Post()
  async createCharacter(
    @Body() createCharDto: CreateCharacterDto,
    @Res() res: Response,
  ) {
    try {
      const createdChar = await this.charService.create(createCharDto);
      return res.send({ status: 'success', data: createdChar });
    } catch (err) {
      res.send({ status: 'fail', message: err });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const character = this.charService.findById(id);
      return res
        .status(HttpStatus.OK)
        .send({ status: 'success', data: character });
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: 'fail', message: err });
    }
  }

  @Get('/user/:userId')
  async getByUserId(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const foundCharacters = await this.charService.findByUserId(userId);
      return res
        .status(HttpStatus.OK)
        .send({ status: 'success', data: foundCharacters });
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: 'fail', message: err });
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedCharacter = await this.charService.delete(id);
      if (deletedCharacter) {
        res.send({
          status: 'success',
          message: `character successfully deleted`,
        });
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send({ status: 'fail', message: `character not found` });
      }
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: 'fail', message: err });
    }
  }

  @Put(':id/:paragraphNumber')
  async nextParagraph(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Param('paragraphNumber') paragraphNumber: number,
  ) {
    try {
      const updatedCharacter =
        await this.charService.getnextParagraphAndUpdateCharacter(
          id,
          updateCharacterDto,
          paragraphNumber,
        );
      res.send({ status: 'success', data: updatedCharacter });
    } catch (err) {
      console.log(err);
      res
        .status(err.response.statusCode)
        .send({ status: err.response.error, message: err.response.message });
    }
  }
}
