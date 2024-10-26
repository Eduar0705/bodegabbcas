// Función para mostrar los productos en la tabla
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tabla = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar

    productos.forEach((producto, index) => {
        const row = tabla.insertRow();

        row.insertCell(0).innerText = producto.nombre;
        row.insertCell(1).innerText = producto.codigo;
        row.insertCell(2).innerText = producto.cantidad;
        row.insertCell(3).innerText = producto.precioUSD.toFixed(2);
        row.insertCell(4).innerText = producto.precioBS.toFixed(2);

        // Botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = "Eliminar";
        eliminarBtn.onclick = () => eliminarProducto(index);
        row.insertCell(5).appendChild(eliminarBtn);
    });
}

// Función para eliminar un producto
function eliminarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

// Función para imprimir el contenido del HTML
function imprimir() {
    window.print();
}

// Mostrar los productos al cargar la página
mostrarProductos();
