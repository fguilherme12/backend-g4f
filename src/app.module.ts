import { Module } from '@nestjs/common';
import { ViaCepModule } from './integrations/viacep/viacep.module';
import { CepModule } from './modules/cep/cep.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [ViaCepModule, CepModule, NewsModule],
})
export class AppModule {}
