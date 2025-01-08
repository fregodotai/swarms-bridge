import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Agent } from './agent';

export enum ApiKeyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @ManyToOne(() => Agent, agent => agent.id, { onDelete: 'CASCADE' })
  agent: Agent;
}
