class CajaRegistradora {
  constructor(inventario) {
    this.inventario = [];
    for (let i = 0; i < inventario.length; i++) {
      this.inventario[i] = {
        id: inventario[i].id,
        modelo: inventario[i].modelo,
        precioBase: Number(inventario[i].precioBase),
        stock: Number(inventario[i].stock)
      };
    }
  }

  realizarVenta(modelo, cantidad, tieneMembresia) {
    let producto = null;

    for (let i = 0; i < this.inventario.length; i++) {
      if (this.inventario[i].modelo === modelo) {
        producto = this.inventario[i];
        break;
      }
    }

    if (producto === null) {
      return `El modelo "${modelo}" no existe en el inventario.`;
    }

    if (cantidad > producto.stock) {
      return `Stock insuficiente para ${modelo}`;
    }

    producto.stock = producto.stock - cantidad;

    const subtotalSinDescuento = producto.precioBase * cantidad;
    let subtotal;

    if (tieneMembresia === true) {
      subtotal = subtotalSinDescuento * 0.85;
    } else {
      subtotal = subtotalSinDescuento;
    }

    const iva = subtotal * 0.16;
    const totalPagar = subtotal + iva;

    return {
      modelo: modelo,
      cantidad: cantidad,
      subtotal: subtotal,
      iva: iva,
      totalPagar: totalPagar
    };
  }

  obtenerValorTotalAlmacen() {
    let total = 0;

    for (let i = 0; i < this.inventario.length; i++) {
      const item = this.inventario[i];
      total = total + (item.precioBase * item.stock);
    }

    return total;
  }
}

// Ejemplo de prueba
const inventarioInicial = [
  { id: 1, modelo: "Air Max 90", precioBase: 2200, stock: 8 },
  { id: 2, modelo: "Nike Blazer", precioBase: 1800, stock: 5 },
  { id: 3, modelo: "Adidas Superstar", precioBase: 2100, stock: 6 }
];

const caja = new CajaRegistradora(inventarioInicial);

console.log("=== VENTA CON MEMBRESÍA ===");
console.log(caja.realizarVenta("Air Max 90", 2, true));

console.log("\n=== VENTA SIN MEMBRESÍA ===");
console.log(caja.realizarVenta("Nike Blazer", 3, false));

console.log("\n=== INTENTO DE COMPRA SIN STOCK ===");
console.log(caja.realizarVenta("Adidas Superstar", 10, false));

console.log("\n=== VALOR TOTAL DEL ALMACÉN ===");
console.log("Total:", caja.obtenerValorTotalAlmacen());
