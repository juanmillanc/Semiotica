<main class="container">
 <h2>Productos</h2>

 <div class="row">
    <div class="col-3">
      <h3>Categorías</h3>
      <ul>
        <?php while($categoria = $resultado_categorias->fetch_assoc()): ?>
          <li><a href="productos.php?categoria=<?php echo $categoria['id']; ?>"><?php echo $categoria['nombre']; ?></a></li>
        <?php endwhile; ?>
      </ul>
    </div>

    <div class="col-9">
      <h3>Productos</h3>
      <div class="row">
        <?php while($producto = $resultado_productos->fetch_assoc()): ?>
          <div class="card">
            <img src="<?php echo $producto['imagen']; ?>" class="card-img">
            <h5><?php echo $producto['nombre']; ?></h5>
            <p>$ <small class="precio"><?php echo $producto['precio']; ?></small></p>
            <a href="#" class="button agregar-carrito" data-id="<?php echo $producto['id']; ?>">Comprar</a>
          </div>
        <?php endwhile; ?>
      </div>
    </div>
 </div>
</main>