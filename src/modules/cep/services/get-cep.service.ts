import { Injectable } from '@nestjs/common';
import { ViaCepDataResponse } from 'src/integrations/viacep/response/get-cep.response.dto';
import { GetCepServiceByViaCep } from 'src/integrations/viacep/services/get-cep-by-viacep.service';

@Injectable()
export class GetCepService {
  constructor(private readonly getCepServiceByViaCep: GetCepServiceByViaCep) {}

  async perform(cep: string): Promise<ViaCepDataResponse> {
    return this.getCepServiceByViaCep.perform(cep);
  }
}
