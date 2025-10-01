/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { db, Product } from 'src/db';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((p) => p.id === id);
  }

  public deleteById(id: Product['id']): { success: boolean } {
    const product = db.products.find((p) => p.id === id);

    if (!product) {
      return { success: false };
    }

    db.products = db.products.filter((p) => p.id !== id);

    return { success: true };
  }
}
