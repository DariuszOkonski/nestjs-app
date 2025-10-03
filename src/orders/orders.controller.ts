/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  @Delete('/:id')
  public async deleteByID(@Param('id', new ParseUUIDPipe()) id: string) {
    if (await !this.ordersService.getById(id)) {
      throw new NotFoundException('Order not found');
    }

    await this.ordersService.deleteById(id);

    return { success: true };
  }

  @Post('/')
  public create(@Body() productData: CreateOrderDTO) {
    return this.ordersService.create(productData);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (await !this.ordersService.getById(id)) {
      throw new NotFoundException('Order not found');
    }

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
