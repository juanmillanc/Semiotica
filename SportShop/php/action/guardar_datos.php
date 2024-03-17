<?php

require('conexion.php');

// Verificar que todas las variables POST estén seteadas y no estén vacías
if (
    empty($_POST['Documento']) ||
    empty($_POST['Nombre']) ||
    empty($_POST['Fecha']) ||
    empty($_POST['Genero']) ||
    empty($_POST['Email']) ||
    empty($_POST['Password']) ||
    empty($_POST['ConfirmPassword'])
) {
    echo '
        <script>
            alert("Por favor, complete todos los campos del formulario");
            history.back(); // Regresa a la página anterior
        </script>
    ';
    exit();
}

$Documento = $_POST['Documento'];
$Nombre = $_POST['Nombre'];
$Fecha = $_POST['Fecha'];
$Genero = $_POST['Genero'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$ConfirmPassword = $_POST['ConfirmPassword'];

// Verificar que la contraseña y la confirmación de la contraseña coincidan
if ($Password !== $ConfirmPassword) {
    echo '
        <script>
            alert("La contraseña y la confirmación de la contraseña no coinciden");
            history.back(); // Regresa a la página anterior
        </script>
    ';
    exit();
}

// Verificar que el correo no se repita en la base de datos
$verificar_correo = $database->prepare("SELECT * FROM practica WHERE Email = :Email");
$verificar_correo->bindParam(':Email', $Email);
$verificar_correo->execute();

// Verificar que el usuario no se repita en la base de datos
$verificar_usuario = $database->prepare("SELECT * FROM practica WHERE Nombre = :Nombre");
$verificar_usuario->bindParam(':Nombre', $Nombre);
$verificar_usuario->execute();

// Verificar que el documento no se repita en la base de datos
$verificar_documento = $database->prepare("SELECT * FROM practica WHERE Documento = :Documento");
$verificar_documento->bindParam(':Documento', $Documento);
$verificar_documento->execute();

if ($verificar_documento->rowCount() > 0) {
    echo '
        <script>
            alert("Este DOCUMENTO ya está registrado, intenta con otro diferente");
            history.back(); // Regresa a la página anterior
        </script>
    ';
    exit();
} else if ($verificar_usuario->rowCount() > 0) {
    echo '
        <script>
            alert("Este USUARIO ya está registrado, intenta con otro diferente");
            history.back(); // Regresa a la página anterior
        </script>
    ';
    exit();
} else if ($verificar_correo->rowCount() > 0) {
    echo '
        <script>
            alert("Este CORREO ya está registrado, intenta con otro diferente");
            history.back(); // Regresa a la página anterior
        </script>
    ';
    exit();
} else {
    $query = "INSERT INTO practica VALUES('', :Documento, :Nombre, :Fecha, :Genero, :Email, :Password, '1')";
    $result = $database->prepare($query);

    // Bind parameters
    $result->bindParam(':Documento', $Documento);
    $result->bindParam(':Nombre', $Nombre);
    $result->bindParam(':Fecha', $Fecha);
    $result->bindParam(':Genero', $Genero);
    $result->bindParam(':Email', $Email);
    $result->bindParam(':Password', $Password);

    if ($result->execute()) {
        echo '
            <script>
                alert("Usuario almacenado exitosamente");
                window.location = "../../sportshops.html";
            </script>
        ';
    } else {
        echo '
            <script>
                alert("Error al almacenar el usuario");
                history.back(); // Regresa a la página anterior
            </script>
        ';
    }
}

?>
