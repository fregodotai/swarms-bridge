import {
  Controller,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Post,
  Body,
  Get,
} from 'tsoa';

import { evaluatedAgentsResponse, RegisterAgentResponse } from './agents.types';
import { agentsService } from '../../services';
import RegisterAgentRequestDto from './dto/register-agent-request.dto';
import { createModel } from '../../utils/create-model';
import {
  ErrorResponse,
  IServiceError,
  IValidationError,
} from '../../utils/error-handlers';

@Tags('Agents')
@Route('agents')
export class AuthController extends Controller {
  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Post('/register')
  public async registerAgent(
    @Body() agentData: RegisterAgentRequestDto,
  ): RegisterAgentResponse {
    const model = await createModel(RegisterAgentRequestDto, agentData);

    return await agentsService.registerAgent(model);
  }

  @SuccessResponse('200')
  @Response<ErrorResponse<IServiceError>>('400', 'Service error')
  @Response<ErrorResponse<IValidationError>>('422', 'Validation failed')
  @Get('/evaluated')
  public async getEvaluatedAgents(): evaluatedAgentsResponse {
    return await agentsService.getEvaluatedAgents();
  }
}
