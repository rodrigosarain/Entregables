class ProductManager {
  constructor() {
    this.products = [];
  }

  generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    // Verificar si el código ya existe
    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un producto con el mismo código.");
    }

    const id = this.generateUniqueId();
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.log("Producto no encontrado");
    }
    return product;
  }
}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos
console.log(productManager.getProducts());

// Agregar un nuevo producto
const newProduct = productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Traer productos nuevamente
console.log(productManager.getProducts());

// Agregar otro producto
const anotherProduct = productManager.addProduct({
  title: "Otro producto",
  description: "Descripción del otro producto",
  price: 150,
  thumbnail: "Otra imagen",
  code: "xyz456",
  stock: 20,
});

// Obtener productos después de agregar otro producto
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (error)
try {
  productManager.addProduct({
    title: "producto repetido",
    description: "Este es un producto repetido",
    price: 250,
    thumbnail: "Otra imagen",
    code: "abc123",
    stock: 15,
  });
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por su ID
try {
  const foundProduct = productManager.getProductById(newProduct.id);
  console.log(foundProduct);
} catch (error) {
  console.error(error.message);
}
