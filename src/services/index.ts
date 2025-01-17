import { AppDataSource } from '../database/data-source';
import AuthService from '../domains/agents/agents.service';

export const agentsService = new AuthService(AppDataSource);
