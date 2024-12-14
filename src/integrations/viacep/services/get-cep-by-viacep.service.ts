import { Injectable } from '@nestjs/common';
import { ViaCepRoutes } from '../types/viacep.routes';
import { BaseViaCepService } from './base-viacep.service';
import { ViaCepDataResponse } from '../response/get-cep.response.dto';

@Injectable()
export class GetCepServiceByViaCep extends BaseViaCepService {
  protected maxRetries = 3;
  private cepRoute: ViaCepRoutes;

  constructor() {
    super();
    this.cepRoute = this.getViaCepRoute();
  }

  protected getViaCepRoute(): ViaCepRoutes {
    return ViaCepRoutes.cep;
  }

  public async perform(cep: string) {
    const formattedUrl = `${this.cepRoute}/${cep}/json`;
    const data = await this.makeRequest<ViaCepDataResponse>(
      'get',
      formattedUrl,
    );
    return data;
  }
}
