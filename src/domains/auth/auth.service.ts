import { DataSource } from 'typeorm';

import { RegisterAgentResponse } from './auth.types';
import RegisterAgentRequestDto from './dto/register-agent-request.dto';
import { Agent } from '../../database/entity/agent';
import { ApiKey } from '../../database/entity/api-key';
import { AgentRepository } from '../../database/repository/agent.repository';
import { ApiKeyRepository } from '../../database/repository/api-key.repository';
import { ValidationError } from '../../utils/error-handlers';
import generateApiKey from '../../utils/generate-api-key';

export default class AuthService {
  constructor(private dataSource: DataSource) {}

  public async registerAgent({
    id,
    name,
  }: RegisterAgentRequestDto): RegisterAgentResponse {
    const agentExists = await AgentRepository.findOneBy({ agentId: id });

    if (agentExists) {
      throw new ValidationError(`Agent with id ${id} already exists`);
    }

    return this.dataSource.transaction(async manager => {
      const agentRepository = manager.withRepository(AgentRepository);
      const apiKeyRepository = manager.withRepository(ApiKeyRepository);

      const agent = new Agent();
      agent.agentId = id;
      agent.name = name;

      await agentRepository.save(agent);

      const apiKey = new ApiKey();
      apiKey.apiKey = generateApiKey();
      apiKey.agent = agent;

      await apiKeyRepository.save(apiKey);

      return { apiKey: apiKey.apiKey };
    });
  }
}
