import { Module } from '@nestjs/common';
import { GetCepServiceByViaCep } from './services/get-cep.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GetCepServiceByViaCep],
  exports: [GetCepServiceByViaCep],
})
export class ViaCepModule {}
