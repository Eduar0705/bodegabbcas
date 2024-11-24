document.addEventListener('DOMContentLoaded', () => {
    const tablaVentas = document.getElementById('tabla-ventas').getElementsByTagName('tbody')[0];
    const btnFinalizarSemana = document.getElementById('finalizar-semana');
    let historialVentas = JSON.parse(localStorage.getItem('historialVentas')) || [];

    function actualizarTablaVentas() {
        tablaVentas.innerHTML = '';
        historialVentas.forEach((venta, index) => {
            const row = tablaVentas.insertRow();
            const productosLista = venta.productos.map(p => `${p.nombre} (${p.cantidadVendida})`).join(', ');
            row.innerHTML = `
                <td>${new Date(venta.fecha).toLocaleString()}</td>
                <td>${venta.comprador}</td>
                <td>
                    <div class="productos-lista">
                        ${productosLista}
                    </div>
                </td>
                <td>${venta.total.toFixed(2)} Bs</td>
                <td><button class="eliminar" data-index="${index}">Eliminar</button></td>
            `;
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                eliminarVenta(index);
            });
        });
    }

    function eliminarVenta(index) {
        historialVentas.splice(index, 1);
        actualizarTablaVentas();
        guardarHistorialEnLocalStorage();
    }

    function guardarHistorialEnLocalStorage() {
        localStorage.setItem('historialVentas', JSON.stringify(historialVentas));
    }

    btnFinalizarSemana.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas borrar todo el historial de ventas?')) {
            historialVentas = [];
            actualizarTablaVentas();
            guardarHistorialEnLocalStorage();
            alert('El historial de ventas ha sido borrado.');
        }
    });

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'historialVentas') {
            historialVentas = JSON.parse(e.newValue) || [];
            actualizarTablaVentas();
        }
    });

    // Inicialización
    actualizarTablaVentas();
});