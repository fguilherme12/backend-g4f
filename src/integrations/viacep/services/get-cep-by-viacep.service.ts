import { Injectable } from '@nestjs/common';
import { BaseViaCepService } from './base-viacep.service';
import { ViaCepDataResponse } from '../response/get-cep.response.dto';

@Injectable()
export class GetCepServiceByViaCep extends BaseViaCepService {
  protected maxRetries = 3;

  constructor() {
    super();
  }

  public async perform(cep: string) {
    const formattedUrl = `ws/${cep}/json`;
    const data = await this.makeRequest<ViaCepDataResponse>(
      'get',
      formattedUrl,
    );
    return data;
  }
}
