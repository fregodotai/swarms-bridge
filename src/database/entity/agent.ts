import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Index({ unique: true })
  agentId: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
