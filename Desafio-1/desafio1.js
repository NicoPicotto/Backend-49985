class ProductManager {
	constructor() {
		this.products = [];
		this.id = 0;
	}

	createId() {
		this.id += 1;
		return this.id;
	}

	getProducts() {
		return this.products;
	}

	addProduct(product) {
		if (
			!product.title ||
			!product.description ||
			!product.price ||
			!product.thumbnail ||
			!product.code ||
			!product.stock
		) {
			throw new Error('Todos los campos son obligatorios');
		}

		if (this.products.some((p) => p.code === product.code)) {
			throw new Error('El código del producto ya existe');
		} else {
			const newProduct = {
				id: this.createId(),
				title: product.title,
				description: product.description,
				price: product.price,
				thumbnail: product.thumbnail,
				code: product.code,
				stock: product.stock,
			};

			this.products.push(newProduct);
		}
	}

	getProductById(id) {
		const product = this.products.find((p) => p.id === id);

		if (!product) {
			throw new Error('El producto no se encuentra');
		}

		return product;
	}
}

//Ejemplos de uso
const productManager = new ProductManager();

// Agregamos unas zapatillas Vans
try {
	const newProduct = {
		title: 'Zapas Vans',
		description: 'Zapatillas de tela con suela de goma. Marca Vans.',
		price: 42500,
		thumbnail: 'vans.jpg',
		code: '123',
		stock: 25,
	};

	productManager.addProduct(newProduct);

	console.log(`¡Nuevo producto ${newProduct.title} agregado!`);
	console.log(productManager.getProducts());
} catch (e) {
	console.error(e.message);
}

//Agregamos otro producto y mostramos el nuevo array, el nuevo producto Id: 2
try {
	const newProduct = {
		title: 'Zapas Nike',
		description: 'Zapatillas de tela con suela de goma. Marca Nike.',
		price: 42500,
		thumbnail: 'nike.jpg',
		code: '456',
		stock: 25,
	};

	productManager.addProduct(newProduct);

	console.log(`¡Nuevo producto ${newProduct.title} agregado!`);
	console.log(productManager.getProducts());
} catch (e) {
	console.error(e.message);
}

//Ahora agregamos otro pero uno con código que ya existe
try {
	const newProduct = {
		title: 'Zapas Adidas',
		description: 'Zapatillas de tela con suela de goma. Marca Adidas.',
		price: 45500,
		thumbnail: 'adidas.jpg',
		code: '123',
		stock: 25,
	};

	productManager.addProduct(newProduct);

	console.log(`¡Nuevo producto ${newProduct.title} agregado!`);
	console.log(productManager.getProducts());
} catch (e) {
	console.error(e.message); // Va a msotrar el error
}

// Obtenemos el producto por Id
try {
	console.log(productManager.getProductById(2)); //Va a devolver un objeto con el producto Id: 2 que son las Zapas Nike
} catch (e) {
	console.error(e.message);
}

// Intentamos obtener un producto con id que no existe
try {
	console.log(productManager.getProductById(5));
} catch (e) {
	console.error(e.message); // Va a mostrar 'El producto no se encuentra'
}