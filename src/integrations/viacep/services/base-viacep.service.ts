import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ViaCepRoutes } from '../types/viacep.routes';
import { ViaCepHttpMethods } from '../types/viacep.types';
import { Logger } from '@nestjs/common';

export abstract class BaseViaCepService {
  private readonly logger = new Logger(BaseViaCepService.name);
  protected client: AxiosInstance;
  private timeout = 4000;
  protected abstract maxRetries: number;
  protected abstract getViaCepRoute(): ViaCepRoutes;

  constructor() {
    this.client = axios.create({
      // baseURL: `${process.env.VIACEP_BASE_URL}`,
      baseURL: `https://viacep.com.br`,
      timeout: this.timeout,
    });
  }

  protected async makeRequest<T>(
    method: ViaCepHttpMethods,
    url: string,
    retries = 0,
  ): Promise<T> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response: AxiosResponse<T> =
        await this.client.request<T>(axiosConfig);
      return response.data;
    } catch (error) {
      this.logger.error(`Erro ao buscar CEP com ViaCEP: ${error}`);
      if (retries < this.maxRetries) {
        return this.makeRequest(method, url, retries + 1);
      }
      throw new Error();
    }
  }
}
