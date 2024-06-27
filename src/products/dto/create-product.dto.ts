import { CreateListingDto } from './create-listing-dto';
import { CreateTagDto } from './create-tag-dto';
export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  listing: CreateListingDto;
  tags: CreateTagDto[];
}
