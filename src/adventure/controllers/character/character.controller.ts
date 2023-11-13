import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCharacterDto } from 'src/adventure/dto/create-character-dto';
import { CharacterService } from 'src/adventure/services/character/character.service';

@Controller('character')
export class CharacterController {
  constructor(private charService: CharacterService) {}
  @Post()
  async createCharacter(@Body() createCharDto: CreateCharacterDto) {
    return this.charService.create(createCharDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.charService.findById(id);
  }

}
