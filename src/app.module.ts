import { Module } from '@nestjs/common';
import { ViaCepModule } from './integrations/viacep/viacep.module';
import { CepModule } from './modules/cep/cep.module';

@Module({
  imports: [ViaCepModule, CepModule],
})
export class AppModule {}
