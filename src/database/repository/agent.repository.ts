import { AppDataSource } from '../data-source';
import { Agent } from '../entity/agent';

export const AgentRepository = AppDataSource.getRepository(Agent);
