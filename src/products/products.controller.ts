/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public getAll() {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);

    if (!prod) {
      throw new NotFoundException('Product not found');
    }

    return prod;
  }

  @Delete('/:id')
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (await !this.productsService.getById(id)) {
      throw new NotFoundException('Product not found');
    }

    await this.productsService.deleteById(id);

    return { success: true };
  }

  @Post('/')
  public create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (await !this.productsService.getById(id)) {
      throw new NotFoundException('Product not found');
    }

    await this.productsService.updateById(id, productData);
    return { success: true };
  }
}
