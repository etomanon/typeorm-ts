import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum Role {
  admin = "admin",
  user = "user",
  sub = "sub"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  twitchId: string;

  @Column({ type: "enum", enum: Role })
  role: string;

  @Column()
  name: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
