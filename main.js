const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let { title, description, price, img, code, stock } = nuevoObjeto;

    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Campos obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("Code must be unike! ");
      return;
    }

    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products.push(newProduct);

    await this.guardarArchivo(this.products);
  }

  getProducts() {
    console.log(this.products);
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.log("Producto no encontrado");
      } else {
        console.log("Encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Error al leer el archivo ", error);
    }
  }

  async leerArchivo() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(data);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo ", error);
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar", error);
    }
  }

  //actualizacion
  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1, productoActualizado);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("no se encontro el producto");
      }
    } catch (error) {
      console.log("error al actualizar el producto", error);
    }
  }

  //borrar productos
  async deleteProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);
        console.log("Producto eliminado correctamente");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

//test

// se agraga un producto

const manage = new ProductManager("./productos.json");

manage.getProducts();

const shoe = {
  title: "nike shoe",
  description: "nike dunk x supreme",
  price: 10000,
  img: "nike.jpg",
  code: "abc123",
  stock: 1,
};

manage.addProduct(shoe);

// no tiene que haber repeticion de id

const pant = {
  title: "Alexander mcqueen jeans",
  description: "till deth collection",
  price: 60000,
  img: "jeans.jpg",
  code: "abc124",
  stock: 2,
};

manage.addProduct(pant);

//repito el codigo

const product = {
  title: "nike shoe",
  description: "nike dunk x supreme",
  price: 10000,
  img: "nike.jpg",
  code: "abc125",
  stock: 1,
};

manage.getProducts();

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testeoBusquedaPorId() {
  const buscado = await manage.getProductById(2);
  console.log(buscado);
}

testeoBusquedaPorId();

//Actualizacion del producto

const cap = {
  id: 1,
  title: "nike cap",
  description: "nike x Yankee",
  price: 300,
  img: "nike.jpg",
  code: "abc122",
  stock: 4,
};

async function testRefresh() {
  await manage.updateProduct(1, cap);
}

testRefresh();

//test eliminar producto

const tee = {
  title: "Bapesta T-shirt",
  description: "longlive Nigo",
  price: 400,
  img: "bapesta.jpg",
  code: "abc129",
  stock: 10,
};

manage.addProduct(tee);

const productIdToDelete = 3;
manage.deleteProductById(productIdToDelete);
