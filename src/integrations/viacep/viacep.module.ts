import { Module } from '@nestjs/common';
import { GetCepServiceByViaCep } from './services/get-cep-by-viacep.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GetCepServiceByViaCep],
  exports: [GetCepServiceByViaCep],
})
export class ViaCepModule {}
