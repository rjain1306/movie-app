
import { Injectable } from '@nestjs/common';
import { WinstonLogger } from '../../utils/logger';

@Injectable()
export class AppSeeder {
  constructor(
   
    private logger: WinstonLogger,

  ) {}

  async seed(): Promise<void> {
    this.logger.info(`Executing Seed Method at: ${new Date().toUTCString()}`);

    // seed movie data.

    this.logger.info(
      `Successfully executed Seed Method at: ${new Date().toUTCString()}`,
    );
  }
}
