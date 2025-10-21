import { components } from './api-contract';

export type ErrorResponseDTO = components['schemas']['ErrorResponseSchema'];
export type ApiConfiguration = {
  baseUrl: string;
  accessToken?: string;
};