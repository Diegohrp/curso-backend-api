const faker = require('faker');
const boom = require('@hapi/boom');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const size = 100;
    for (let index = 0; index < size; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.products), 4000);
    });
  }
  findOne(id) {
    const product = this.products.find((item) => item.id === id);

    if (product) {
      return product;
    } else {
      throw boom.notFound('Product not found');
    }
  }
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return {
      msg: 'Product created successfully',
      data: newProduct,
    };
  }
  update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      const product = this.products[index];
      this.products[index] = { ...product, ...changes };
      return {
        msg: 'Product updated',
        data: this.products[index],
      };
    } else {
      throw boom.notFound('Product not found');
    }
  }
  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index) {
      this.products.splice(index, 1);
      return {
        msg: 'Product deleted',
        id,
      };
    } else {
      throw boom.notFound('Product not found');
    }
  }
}

module.exports = ProductsService;
