// Mostrar la tasa del día al cargar la página
window.onload = function() {
    const tasaDia = localStorage.getItem('tasaDia') || 0;
    document.getElementById('tasa-actual').innerText = `1 USD = ${tasaDia} BS`;
};

// Array para el carrito de compras
let carrito = [];

// Función para buscar un producto
function buscarProducto() {
    const codigo = document.getElementById('codigo').value;
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.codigo === codigo);

    if (producto) {
        document.getElementById('producto-encontrado').innerHTML = `
            <p>Nombre: ${producto.nombre}</p>
            <p>Cantidad disponible: ${producto.cantidad}</p>
            <p>Precio: $${producto.precioUSD.toFixed(2)} / ${producto.precioBS.toFixed(2)} BS</p>
            <label for="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" value="1" min="1" max="${producto.cantidad}">
            <button onclick="agregarAlCarrito('${producto.codigo}')">Agregar al Carrito</button>
        `;
    } else {
        document.getElementById('producto-encontrado').innerHTML = '<p>Producto no encontrado</p>';
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(codigo) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos.find(p => p.codigo === codigo);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (producto && cantidad > 0 && cantidad <= producto.cantidad) {
        carrito.push({ ...producto, cantidad });
        mostrarCarrito();
    } else {
        alert('Cantidad no válida');
    }
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const tabla = document.getElementById('carrito-table').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar

    carrito.forEach((item, index) => {
        const row = tabla.insertRow();

        row.insertCell(0).innerText = item.nombre;
        row.insertCell(1).innerText = item.codigo;
        row.insertCell(2).innerText = item.cantidad;
        row.insertCell(3).innerText = item.precioUSD.toFixed(2);
        row.insertCell(4).innerText = item.precioBS.toFixed(2);

        // Botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = "Eliminar";
        eliminarBtn.onclick = () => eliminarDelCarrito(index);
        row.insertCell(5).appendChild(eliminarBtn);
    });

    calcularTotal();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// Función para calcular el total
function calcularTotal() {
    let totalUSD = 0;
    let totalBS = 0;
    const tasaDia = parseFloat(localStorage.getItem('tasaDia')) || 0;

    carrito.forEach(item => {
        totalUSD += item.precioUSD * item.cantidad;
        totalBS += item.precioBS * item.cantidad;
    });

    document.getElementById('total-usd').innerText = totalUSD.toFixed(2);
    document.getElementById('total-bs').innerText = totalBS.toFixed(2);
}

// Función para finalizar la compra
function finalizarCompra() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    carrito.forEach(item => {
        const producto = productos.find(p => p.codigo === item.codigo);
        if (producto) {
            producto.cantidad -= item.cantidad;
        }
    });

    // Guardar los productos actualizados en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Vaciar el carrito
    carrito = [];
    mostrarCarrito();

    alert('Compra finalizada exitosamente');
}
