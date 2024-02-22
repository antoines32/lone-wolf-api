import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { KaiDiscipline } from 'src/adventure/schemas/kai-discipline.schema';
import { KaiDisciplineService } from 'src/adventure/services/kai-discipline/kai-discipline.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { roleConstants } from 'src/constants/roles.const';
import { Roles } from 'src/custom-decorators/roles.decorator';

@Controller('kai-discipline')
@UseGuards(RolesGuard)
export class KaiDisciplineController {
  constructor(private kaiDisciplineService: KaiDisciplineService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllKai(
    @Res({ passthrough: true }) res: Response,
  ): Promise<KaiDiscipline[]> {
    try {
      return this.kaiDisciplineService.findAll();
    } catch (err) {
      res.send(err.response);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles([roleConstants.admin])
  async createNewDiscipline(
    @Body() kai: KaiDiscipline,
    @Res({ passthrough: true }) res: Response,
  ): Promise<KaiDiscipline> {
    try {
      return this.kaiDisciplineService.create(kai);
    } catch (err) {
      res.send(err.response);
    }
  }
}
