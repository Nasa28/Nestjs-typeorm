import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column()
  title: string;

  @Column()
  rating: number;
}
