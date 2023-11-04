const fs = require('fs').promises;

class ProductManager {
	constructor(path) {
		this.products = [];
		this.id = 0;
		this.path = path;
		this.loadProductsFromFile();
	}

	createId() {
		this.id += 1;
		return this.id;
	}

	async loadProductsFromFile() {
		try {
			const data = await fs.readFile(this.path, 'utf-8');
			this.products = JSON.parse(data);
		} catch (err) {
			if (err.code === 'ENOENT') {
				await this.saveProductsToFile();
			} else {
				throw err;
			}
		}
	}

	async getProducts() {
		await this.loadProductsFromFile();
		return this.products;
	}

	async addProduct(product) {
		await this.loadProductsFromFile();
		const newProduct = {
			id: Math.max(0, ...this.products.map((p) => p.id)) + 1,
			...product,
		};

		this.products.push(newProduct);
		await this.saveProductsToFile();
	}

	async updateProduct(id, updatedProduct) {
		await this.loadProductsFromFile();

		const productIndex = this.products.findIndex((p) => p.id === id);

		if (productIndex === -1) {
			throw new Error('El producto no se encuentra');
		}

		this.products[productIndex] = {
			...this.products[productIndex],
			...updatedProduct,
		};
		await this.saveProductsToFile();
	}

	async deleteProduct(id) {
		await this.loadProductsFromFile();

		const productIndex = this.products.findIndex((p) => p.id === id);

		if (productIndex === -1) {
			throw new Error('El producto no se encuentra');
		}

		this.products.splice(productIndex, 1);
		await this.saveProductsToFile();
	}

	async getProductById(id) {
		await this.loadProductsFromFile();
		const product = this.products.find((p) => p.id === id);

		if (!product) {
			throw new Error('El producto no se encuentra');
		}

		return product;
	}

	async saveProductsToFile() {
		await fs.writeFile(this.path, JSON.stringify(this.products));
	}
}

//Uso de los métodos para probar el código (Se puede ir descomentando y probando cada uno)

const productManager = new ProductManager('./products.json');

/*
productManager.addProduct({
	title: 'Zapas Vans',
	description: 'Zapatillas de tela con suela de goma. Marca Vans.',
	price: 42500,
	thumbnail: 'vans.jpg',
	code: '123',
	stock: 25,
});

productManager.addProduct({
	title: 'Zapas Nike',
	description: 'Zapatillas de tela con suela de goma. Marca Nike.',
	price: 42500,
	thumbnail: 'nike.jpg',
	code: '456',
	stock: 25,
});

productManager.addProduct({
	title: 'Zapas Adidas',
	description: 'Zapatillas de tela con suela de goma. Marca Adidas.',
	price: 45500,
	thumbnail: 'adidas.jpg',
	code: '789',
	stock: 25,
});
*/

/*
productManager.deleteProduct(2).then(() => {
	console.log('Producto eliminado');
});
*/

/*
productManager.updateProduct(1, { price: 50000 }).then(() => {
	console.log('Producto actualizado');
});
*/

/*
productManager.getProductById(3).then((product) => {
	console.log(product);
});
*/

/*
productManager.getProducts().then((products) => {
	console.log(products);
});
*/

/*productManager.addProduct({
	title: 'Zapas Purpuras',
	description: 'Zapatillas de tela con suela de goma. Marca Nike.',
	price: 42500,
	thumbnail: 'nike.jpg',
	code: '5baa',
	stock: 25,
});*/
