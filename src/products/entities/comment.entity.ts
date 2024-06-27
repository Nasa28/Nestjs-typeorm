import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Product } from './product.entity';
@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  comment: string;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;
}
