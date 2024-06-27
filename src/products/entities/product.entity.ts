import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './listing.entity';
import { AbstractEntity } from '../../database/abstract.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
