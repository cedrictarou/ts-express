import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column("text")
  description: string;

  @Column()
  isDone: boolean = false;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  // コンストラクタで初期化
  constructor(title: string, description: string) {
    super();
    this.title = title;
    this.description = description;
  }
}