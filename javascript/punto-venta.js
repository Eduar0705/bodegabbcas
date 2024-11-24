// Simulamos la conexión con el almacén de productos
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Estado de la venta actual
let ventaActual = {
    comprador: '',
    productos: [],
    total: 0
};

const form = document.getElementById('venta-form');
const tablaVenta = document.getElementById('tabla-venta').getElementsByTagName('tbody')[0];
const spanTotal = document.getElementById('total');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombreComprador = document.getElementById('nombre-comprador').value;
    const codigoProducto = document.getElementById('codigo-producto').value;

    if (ventaActual.comprador === '') {
        ventaActual.comprador = nombreComprador;
    }

    const producto = buscarProductoPorCodigo(codigoProducto);
    if (producto) {
        agregarProductoAVenta(producto);
        document.getElementById('codigo-producto').value = '';
    } else {
        alert('Producto no encontrado');
    }
});

function buscarProductoPorCodigo(codigo) {
    return productos.find(p => p.codigo === codigo);
}

function agregarProductoAVenta(producto) {
    if (producto.cantidad > 0) {
        const index = ventaActual.productos.findIndex(p => p.codigo === producto.codigo);
        if (index !== -1) {
            ventaActual.productos[index].cantidadVendida++;
        } else {
            ventaActual.productos.push({ ...producto, cantidadVendida: 1 });
        }
        actualizarTablaVenta();
        actualizarTotal();
    } else {
        alert('Producto agotado');
    }
}

function eliminarProductoDeVenta(index) {
    ventaActual.productos.splice(index, 1);
    actualizarTablaVenta();
    actualizarTotal();
}

function actualizarTablaVenta() {
    tablaVenta.innerHTML = '';
    ventaActual.productos.forEach((producto, index) => {
        const row = tablaVenta.insertRow();
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidadVendida}</td>
            <td>${producto.precio.toFixed(2)} Bs</td>
            <td>${(producto.precio * producto.cantidadVendida).toFixed(2)} Bs</td>
            <td><button class="eliminar" onclick="eliminarProductoDeVenta(${index})">Eliminar</button></td>
        `;
    });
}

function actualizarTotal() {
    ventaActual.total = ventaActual.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidadVendida);
    }, 0);
    spanTotal.textContent = ventaActual.total.toFixed(2);
}

function guardarVentaEnHistorial() {
    const historialVentas = JSON.parse(localStorage.getItem('historialVentas')) || [];
    historialVentas.push({
        fecha: new Date().toISOString(),
        comprador: ventaActual.comprador,
        productos: ventaActual.productos,
        total: ventaActual.total
    });
    localStorage.setItem('historialVentas', JSON.stringify(historialVentas));
}

btnFinalizarCompra.addEventListener('click', () => {
    if (ventaActual.productos.length === 0) {
        alert('No hay productos en la venta');
        return;
    }

    // Actualizar inventario
    ventaActual.productos.forEach(productoVendido => {
        const index = productos.findIndex(p => p.codigo === productoVendido.codigo);
        if (index !== -1) {
            productos[index].cantidad -= productoVendido.cantidadVendida;
        }
    });

    // Guardar cambios en el inventario
    localStorage.setItem('productos', JSON.stringify(productos));

    guardarVentaEnHistorial();

    // Reiniciar la venta
    alert(`Venta finalizada. Total: ${ventaActual.total.toFixed(2)} Bs`);
    ventaActual = { comprador: '', productos: [], total: 0 };
    actualizarTablaVenta();
    actualizarTotal();
    document.getElementById('nombre-comprador').value = '';
});

// Inicialización
actualizarTablaVenta();
actualizarTotal();