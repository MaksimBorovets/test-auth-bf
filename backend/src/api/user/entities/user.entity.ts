import { Column, Entity } from 'typeorm';

import { EnhancedBaseEntity } from '../../../common/entities';

@Entity({ name: 'users' })
export class User extends EnhancedBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isPassword: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  public verificationCode?: string;

  @Column({ unique: true, nullable: true, select: false })
  public google_id?: string;
}
