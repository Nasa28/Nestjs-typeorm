import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Product } from './product.entity';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  tag: string;
}
