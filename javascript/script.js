document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('producto-form');
    const tablaProductos = document.getElementById('tabla-productos').getElementsByTagName('tbody')[0];
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Cargar productos existentes
    actualizarTablaProductos();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const cantidad = document.getElementById('cantidad').value;
        const codigo = document.getElementById('codigo').value;
        const precio = document.getElementById('precio').value;

        agregarProducto(nombre, cantidad, codigo, precio);
        form.reset();
    });

    function agregarProducto(nombre, cantidad, codigo, precio) {
        const producto = {
            nombre,
            cantidad: parseInt(cantidad),
            codigo,
            precio: parseFloat(precio)
        };

        productos.push(producto);
        actualizarTablaProductos();
        guardarProductosEnLocalStorage();
    }

    function actualizarTablaProductos() {
        tablaProductos.innerHTML = '';
        productos.forEach((producto, index) => {
            const row = tablaProductos.insertRow();
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.codigo}</td>
                <td>${producto.precio.toFixed(2)} Bs</td>
                <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
            `;
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                eliminarProducto(index);
            });
        });
    }

    function eliminarProducto(index) {
        productos.splice(index, 1);
        actualizarTablaProductos();
        guardarProductosEnLocalStorage();
    }

    function guardarProductosEnLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(productos));
    }
});