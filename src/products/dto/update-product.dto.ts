import { CreateCommentDto } from './create-comment-dto';

export class UpdateProductDto {
  isActive: boolean;
  description: string;
  comments: CreateCommentDto[];
}
