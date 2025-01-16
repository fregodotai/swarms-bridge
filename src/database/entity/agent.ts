import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ApiKey } from './api-key';
import { Wallet } from './wallet';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  agentId: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => ApiKey, apiKey => apiKey.agent, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  apiKey: ApiKey;

  @OneToOne(() => Wallet, wallet => wallet.agent, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  wallet: Wallet;

  @CreateDateColumn()
  createdAt: Date;
}
