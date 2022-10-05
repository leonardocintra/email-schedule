import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MailStatusEnum } from './enum/mail-status.enum';

@Entity({ name: 'mails' })
export class MailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'destination_name', nullable: false })
  destinationName: string;

  @Column({ name: 'destination_address', nullable: false })
  destinationAddress: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: false })
  dueDate: string;

  @Column({ name: 'status', default: MailStatusEnum.WAITING })
  status: string;

  @Column({ nullable: false })
  subject: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateddAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @Column({ type: 'text', nullable: false })
  body: string;
}
