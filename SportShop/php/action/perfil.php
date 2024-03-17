<?php
// perfil.php

require('conexion.php');

// Obtener el ID del usuario de la URL
$usuario_id = $_GET['usuario_id'];

// Consultar la base de datos para obtener los detalles del usuario
$query = "SELECT * FROM practica WHERE id = :usuario_id";
$resultado = $database->prepare($query);
$resultado->bindParam(':usuario_id', $usuario_id);
$resultado->execute();

if ($resultado->rowCount() > 0) {
    $usuario = $resultado->fetch(PDO::FETCH_ASSOC);
    // Ahora, puedes utilizar $usuario para mostrar los detalles del usuario en la página
} else {
    echo "Usuario no encontrado";
}
?>
