import express from 'express';
import {
  Controller,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Post,
  Body,
  Get,
  Request,
  Security,
} from 'tsoa';

import { RegisterAgentResponse } from './auth.types';
import { authService } from '../../services';
import RegisterAgentRequestDto from './dto/register-agent-request.dto';
import { createModel } from '../../utils/create-model';
import {
  ErrorResponse,
  IServiceError,
  IValidationError,
} from '../../utils/error-handlers';

@Tags('Auth')
@Route('auth')
export class AuthController extends Controller {
  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/register-agent')
  public async registerAgent(
    @Body() agentData: RegisterAgentRequestDto,
  ): RegisterAgentResponse {
    const model = await createModel(RegisterAgentRequestDto, agentData);

    return await authService.registerAgent(model);
  }

  @SuccessResponse('200')
  @Security('api_key')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/test-api-key')
  public async testApiKey(
    @Request() request: express.Request,
  ): Promise<{ message: string }> {
    return { message: `Received API key for agent ${request.agent?.name}` };
  }
}
