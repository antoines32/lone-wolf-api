import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RandomItem } from 'src/adventure/schemas/random-item.schema';
import { ItemService } from 'src/adventure/services/item/item.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { roleConstants } from 'src/constants/roles.const';
import { Roles } from 'src/custom-decorators/roles.decorator';

@Controller('item')
@UseGuards(RolesGuard)
export class ItemController {

  constructor(private itemService: ItemService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllRandomItemsByBook(@Res({ passthrough: true }) res: Response, @Query('bookName') bookName: string): Promise<RandomItem[]> {
    try {
      return this.itemService.findByBookName(bookName);
    } catch (err) {
      res.send(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles([roleConstants.admin])
  @Post()
  async createNewRandomItem(@Res({ passthrough: true }) res: Response, @Body() item: RandomItem): Promise<RandomItem> {
    try {
      return this.itemService.create(item);
    } catch (err) {
      res.send(err.response);
    }
  }
}
