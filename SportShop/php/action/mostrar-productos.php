<?php
 // ...
 // Asegúrate de conectar con la base de datos aquí

 // Recibir el ID de la categoría del formulario
 $categoria_id = $_POST['categoria_id'];

 // Obtener información de los productos por categoría
 $sql_productos = "SELECT * FROM productos WHERE categoria_id = $categoria_id";
 $resultado_productos = $conn->query($sql_productos);

 // Devolver los productos como respuesta JSON
 echo json_encode($resultado_productos->fetch_all(MYSQLI_ASSOC));
?>