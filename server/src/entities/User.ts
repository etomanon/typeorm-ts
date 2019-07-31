import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  twitchId: string;

  @Column()
  name: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
