import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

import { Agent } from './agent';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  publicKey: string;

  @Column({ type: 'text' })
  encryptedPrivateKey: string;

  @OneToOne(() => Agent, agent => agent.wallet)
  agent: Agent;

  @CreateDateColumn()
  createdAt: Date;
}
