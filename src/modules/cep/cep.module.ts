import { Module } from '@nestjs/common';
import { GetCepController } from './controllers/get-cep.controller';
import { ViaCepModule } from 'src/integrations/viacep/viacep.module';
import { GetCepService } from './services/get-cep.service';
import { ValidCepGuard } from './guards/valid-cep.guard';

@Module({
  imports: [ViaCepModule],
  controllers: [GetCepController],
  exports: [GetCepService],
  providers: [GetCepService, ValidCepGuard],
})
export class CepModule {}
