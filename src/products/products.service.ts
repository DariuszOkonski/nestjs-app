import { Injectable } from '@nestjs/common';
import { db, Product } from 'src/db';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }
}
