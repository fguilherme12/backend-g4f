import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCepService } from '../services/get-cep.service';
import { ViaCepDataResponse } from 'src/integrations/viacep/response/get-cep.response.dto';
import { ValidCepGuard } from '../guards/valid-cep.guard';

@ApiTags('Cep')
@Controller('cep')
export class GetCepController {
  constructor(private readonly getCepService: GetCepService) {}

  @UseGuards(ValidCepGuard)
  @Get('/:cep')
  @ApiOperation({
    summary: 'Lista detalhes de um endereço via CEP',
  })
  async getCep(@Param('cep') cep: string): Promise<ViaCepDataResponse> {
    return this.getCepService.perform(cep);
  }
}
