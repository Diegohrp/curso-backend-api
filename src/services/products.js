const faker = require('faker');

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
    return this.products;
  }
  findOne(id) {
    return this.products.find((item) => item.id === id);
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
    if (index) {
      const product = this.products[index];
      this.products[index] = { ...product, ...changes };
      return {
        msg: 'Product updated',
        data: this.products[index],
      };
    } else {
      throw new Error();
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
      throw new Error();
    }
  }
}

module.exports = ProductsService;
