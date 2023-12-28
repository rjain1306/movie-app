import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginatedResultDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'asc',
  })
  @IsOptional()
  // eslint-disable-next-line camelcase
  order_by?: string;

  @ApiPropertyOptional({
    default: 0,
    description: 'Number of Pages to skip, Default value : 0',
  })
  @IsOptional()
  @IsNumberString()
  skip?: number | undefined;

  @ApiPropertyOptional({
    default: 10,
    description: 'Number of Records per page, Default value : 10',
  })
  @IsOptional()
  @IsNumberString()
  take?: number | undefined;
}
