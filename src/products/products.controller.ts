import { Controller, Get } from '@nestjs/common';
import { Product } from 'src/db';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public getAll(): Product[] {
    return this.productsService.getAll();
  }
}

// drugi endpoint
