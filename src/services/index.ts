import { AppDataSource } from '../database/data-source';
import AuthService from '../domains/auth/auth.service';

export const authService = new AuthService(AppDataSource);
