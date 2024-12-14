import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ValidCepGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cep = request.params.cep || request.body.cep;

    if (!cep) {
      throw new BadRequestException('CEP é obrigatório');
    }

    await this.validateCep(cep);
    return true;
  }

  private async validateCep(cep: string) {
    if (!/^\d{8}$/.test(cep)) {
      throw new BadRequestException(
        'CEP em formato inválido. Deve ter 8 dígitos',
      );
    }
  }
}
