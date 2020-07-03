import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '../infra/typeorm/entities/Order';
import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Order | undefined> {
    const order = await this.ordersRepository.findById(id);

    console.log(order);

    return order;

    // if (!order) {
    //   throw new AppError('Pedido não encontrado!');
    // }

    // const findCostumer = await this.customersRepository.findById(
    //   order.customer_id,
    // );

    // if (!findCostumer) {
    //   throw new AppError('Cliente não encontrado!');
    // }

    // const findProducts = await this.productsRepository.findAllById(
    //   order.order_products,
    // );

    // if (findProducts.length !== order.order_products.length) {
    //   throw new AppError('Produto não encontrado!');
    // }

    // const customer: Customer = {} as Customer;

    // customer.id = findCostumer.id;
    // customer.name = findCostumer.name;
    // customer.email = findCostumer.email;
    // customer.created_at = findCostumer.created_at;
    // customer.updated_at = findCostumer.updated_at;

    // let order_products: OrdersProducts[] = [];

    // order_products = order.order_products.map(orderProduct => ({
    //   id: orderProduct.id,
    //   order: orderProduct.order,
    //   order_id: orderProduct.order_id,
    //   product: orderProduct.product,
    //   product_id: orderProduct.product_id,
    //   price: orderProduct.product.price,
    //   quantity: orderProduct.product.quantity,
    //   created_at: orderProduct.created_at,
    //   updated_at: orderProduct.updated_at,
    // }));

    // return {
    //   id: order.id,
    //   customer_id: order.customer_id,
    //   customer: order.customer,
    //   order_products: order.order_products,
    //   created_at: order.created_at,
    //   updated_at: order.updated_at,
    // };
  }
}

export default FindOrderService;
