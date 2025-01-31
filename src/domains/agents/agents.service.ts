import fetch from 'node-fetch';
import { DataSource } from 'typeorm';

import { evaluatedAgentsResponse, RegisterAgentResponse } from './agents.types';
import RegisterAgentRequestDto from './dto/register-agent-request.dto';
import config from '../../config/config';
import { Agent } from '../../database/entity/agent';
import { ApiKey } from '../../database/entity/api-key';
import { Wallet } from '../../database/entity/wallet';
import { AgentRepository } from '../../database/repository/agent.repository';
import createAnchorProvider from '../../utils/create-anchor-provider';
import { ServiceError, ValidationError } from '../../utils/error-handlers';
import generateApiKey from '../../utils/generate-api-key';
import { generateWallet } from '../../utils/generate-wallet';
import { getFxnTokens } from '../../utils/get-fxn-tokens';
import { encryptPrivateKey } from '../../utils/private-key-helpers';
import FxnService from '../fxn/fxn.service';

export default class AgentsService {
  constructor(private dataSource: DataSource) {}

  public async registerAgent({
    id,
    name,
    description,
    restrict_subscriptions,
    capabilities,
    fee,
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
      await getFxnTokens(10, wallet.publicKey);
      const anchorProvider = createAnchorProvider(privateKey);
      const fxnService = new FxnService(anchorProvider);
      const transactionSignature = await fxnService.registerAgent({
        name,
        description,
        restrict_subscriptions,
        capabilities,
        fee,
      });

      return { apiKey: apiKey.apiKey, transactionSignature };
    });
  }

  public async getEvaluatedAgents(): evaluatedAgentsResponse {
    const apiUrl = config.fregoApiUrl;
    try {
      const response = await fetch(`${apiUrl}/agents/evaluated`);
      return (await response.json()) as evaluatedAgentsResponse;
    } catch (error) {
      console.error(error);
      throw new ServiceError(`Failed to fetch evaluated agents`);
    }
  }
}
