import { AppDataSource } from '../database/data-source';
import AuthService from '../domains/auth/auth.service';
import FxnService from '../domains/fxn/fxn.service';

export const fxnService = new FxnService();
export const authService = new AuthService(AppDataSource);
