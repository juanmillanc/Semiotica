class Carrito {
    //Añadir el producto al carrito
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement;
            this.leerDatosProducto(producto);
            //console.log(producto);            
        }
    }

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: parseInt(producto.querySelector('.quantity').value, 10)
        };
    
        let productosLS = this.obtenerProductosLocalStorage();
        let productoExistente = productosLS.find(p => p.id === infoProducto.id);
    
        if (productoExistente) {
            // El producto ya está en el carrito, incrementa la cantidad
            productoExistente.cantidad += infoProducto.cantidad;
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                text: 'Cantidad actualizada en el carrito',
                timer: 2500,
                showConfirmButton: false
            });
        } else {
            // El producto no está en el carrito, agrégalo
            productosLS.push(infoProducto);
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                timer: 2500,
                showConfirmButton: false
            });
        }
    
        this.insertarCarrito(infoProducto);
        this.guardarProductosLocalStorage(productosLS);
    }

    
    

    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
        <a href="#" class="borrar-producto fa-solid fa-trash-can fa-xl" style="color: #ff0000;" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }


    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
            Swal.fire({
                icon: 'info',
                title: 'Eliminado',
                timer: 2500,
                showConfirmButton: false
            })
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
            Swal.fire({
                icon: 'info',
                title: 'Carrito Vacío',
                timer: 2500,
                showConfirmButton: false
            })
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage() {
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
            <a href="#" class="borrar-producto fa-solid fa-trash-can fa-xl" style="color: #ff0000;" data-id="${producto.id}"></a>
            </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td>
            <a href="#" class="borrar-producto fa-solid fa-trash-can fa-xl" style="color: #ff0000;" data-id="${producto.id}"></a>
            </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    vaciarLocalStorage() {
        localStorage.clear();
    }

    procesarPedido(e) {
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0) {
            //console.log('El carrito está vacío, agrega algún producto');
            Swal.fire({
                icon: 'error',
                title: 'El carrito está vacío, agrega un producto',
                timer: 2500,
                showConfirmButton: false
            })
        }
        else {
            location.href = "carrito.html";
        }
    }

    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total - igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('igv').innerHTML = "$ " + igv;
        document.getElementById('total').value = "$ " + total.toFixed(2);
    }



}