import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

import { Agent } from './agent';

export enum ApiKeyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  apiKey: string;

  @Column({
    type: 'enum',
    enum: ApiKeyStatus,
    default: ApiKeyStatus.ACTIVE,
  })
  status: ApiKeyStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Agent, agent => agent.apiKey)
  agent: Agent;
}
