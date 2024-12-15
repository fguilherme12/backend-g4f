import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    example: 'Título da notícia',
    description: 'Título da notícia a ser criada.',
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @ApiProperty({
    example: 'Descrição da notícia',
    description: 'Descrição detalhada da notícia.',
  })
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;
}
