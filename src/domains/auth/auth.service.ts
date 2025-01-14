import { DataSource } from 'typeorm';

import { RegisterAgentResponse } from './auth.types';
import RegisterAgentRequestDto from './dto/register-agent-request.dto';
import { Agent } from '../../database/entity/agent';
import { ApiKey } from '../../database/entity/api-key';
import { Wallet } from '../../database/entity/wallet';
import { AgentRepository } from '../../database/repository/agent.repository';
import { ValidationError } from '../../utils/error-handlers';
import generateApiKey from '../../utils/generate-api-key';
import { generateWallet } from '../../utils/generate-wallet';
import { getFxnTokens } from '../../utils/get-fxn-tokens';
import { encryptPrivateKey } from '../../utils/private-key-helpers';

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

      const apiKey = new ApiKey();
      apiKey.apiKey = generateApiKey();

      const wallet = new Wallet();
      const { publicKey, privateKey } = await generateWallet();
      wallet.publicKey = publicKey;
      wallet.encryptedPrivateKey = encryptPrivateKey(privateKey);

      const agent = new Agent();
      agent.agentId = id;
      agent.name = name;
      agent.apiKey = apiKey;
      agent.wallet = wallet;
      await agentRepository.save(agent);

      await getFxnTokens(3, wallet.publicKey);

      return { apiKey: apiKey.apiKey };
    });
  }
}
