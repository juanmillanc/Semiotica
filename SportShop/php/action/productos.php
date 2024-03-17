<?php
 $servername = "localhost:3306";
 $username = "root";
 $password = "";
 $dbname = "formulario";

 // Crear conexión
 $conn = new mysqli($servername, $username, $password, $dbname);

 // Verificar conexión
 if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
 }

 // Obtener categorías
 $sql_categorias = "SELECT * FROM categorias";
 $resultado_categorias = $conn->query($sql_categorias);

 // Obtener productos
 $sql_productos = "SELECT * FROM productos";
 $resultado_productos = $conn->query($sql_productos);
?>