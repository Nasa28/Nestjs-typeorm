import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const listing = new Listing({ ...createProductDto.listing, rating: 0 });
    const tags = createProductDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const product = this.entityManager.create(Product, {
      ...createProductDto,
      comments: [],
      listing,
      tags,
    });
    await this.entityManager.save(product);
    return product;
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['listing', 'comments', 'tags'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['listing', 'comments', 'tags'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    product.isActive = updateProductDto.isActive;
    const comments = updateProductDto.comments.map(
      (createCommentDto) => new Comment(createCommentDto),
    );
    product.comments = comments;
    await this.entityManager.save(product);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
  }
}
