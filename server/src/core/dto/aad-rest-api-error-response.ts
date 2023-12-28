import { ApiProperty } from '@nestjs/swagger';
export class AadRestApiErrorResponse {
  @ApiProperty({ example: 'string' })
  version: string;

  @ApiProperty({ example: 'string' })
  status: number;

  @ApiProperty({ example: 'string' })
  code: string;

  @ApiProperty({ example: 'string' })
  userMessage: string;

  @ApiProperty({ example: 'string' })
  developerMessage: string;

  /**
   *
   */
  constructor(
    version: string,
    status: number,
    code: string,
    userMessage: string,
    developerMessage: string,
  ) {
    this.version = version;
    this.status = status;
    this.code = code;
    this.userMessage = userMessage;
    this.developerMessage = developerMessage;
  }
}
