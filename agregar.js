// Seleccionar el formulario de productos
const formProducto = document.getElementById('form-producto');

// Agregar evento de submit al formulario de productos
formProducto.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const codigo = document.getElementById('codigo').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioUSD = parseFloat(document.getElementById('precioUSD').value);
    const precioBS = parseFloat(document.getElementById('precioBS').value);

    // Crear un nuevo producto
    const nuevoProducto = { nombre, codigo, cantidad, precioUSD, precioBS };

    // Obtener los productos almacenados
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Agregar el nuevo producto a la lista
    productos.push(nuevoProducto);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Limpiar el formulario
    formProducto.reset();

    alert('Producto agregado exitosamente');
});

// Seleccionar el formulario de tasa
const formTasa = document.getElementById('form-tasa');

// Agregar evento de submit al formulario de tasa
formTasa.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener la tasa del día
    const tasaDia = parseFloat(document.getElementById('tasaDia').value);

    // Guardar la tasa en localStorage
    localStorage.setItem('tasaDia', tasaDia);

    // Limpiar el formulario
    formTasa.reset();

    alert('Tasa del día agregada exitosamente');
});
