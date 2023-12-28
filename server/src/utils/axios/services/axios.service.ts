import { WinstonLogger } from './../../logger/WinstonLogger';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

@Injectable()
export class AxiosService {
  constructor(private readonly _logger: WinstonLogger) {}

  async get(url: string, headers?: any): Promise<AxiosResponse> {
    try {
      this._logger.info(`Executing get http request with Url: ${url}`);

      const response = await axios.get(url, { headers: headers });

      this._logger.info(
        `Successfully executed get http request with Url: ${url}`,
      );

      return response;
    } catch (ex) {
      this._logger.info(
        `Failed to execute get http request with Url: ${url}, ErrorMessage: ${ex.message}`,
      );
      return ex?.response;
    }
  }

  async post(url: string, data: any, config: any): Promise<AxiosResponse> {
    try {
      this._logger.info(`Executing post http request with Url: ${url}`);

      const response = await axios.post(url, data, config);

      this._logger.info(
        `Successfully executed post http request with Url: ${url}`,
      );

      return response;
    } catch (ex) {
      this._logger.info(
        `Failed to execute post http request with Url: ${url}, ErrorMessage: ${ex.message}`,
      );
      return ex?.response;
    }
  }
}
