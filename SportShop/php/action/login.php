<?php
if (!isset($_SESSION)) {
    session_start();
}

if (empty($_POST['correo'])) {
    $response = array('status' => 'error', 'message' => 'correo invalido');
} else if (empty($_POST['password'])) {
    $response = array('status' => 'error', 'message' => 'Contraseña invalida');
} else if (
    !empty($_POST['correo']) &&
    !empty($_POST['password'])
) {
    // Contiene las variables de configuración para conectar a la base de datos
    include_once "config.php";

    $correo = mysqli_real_escape_string($con, (strip_tags($_POST["correo"], ENT_QUOTES)));
    $password = mysqli_real_escape_string($con, (strip_tags($_POST["password"], ENT_QUOTES)));

    $sql = "SELECT * FROM practica WHERE Email = '" . $correo. "' AND Password = '" . $password . "';";
    $query = mysqli_query($con, $sql);
    $numrows = mysqli_num_rows($query);

    if ($row = mysqli_fetch_array($query)) {
        if ($row['is_active'] > 0) { // Comprobamos que el usuario esté activo
            $_SESSION['user_id'] = $row['id'];

            $response = array('status' => 'success', 'message' => 'Bienvenido ' . $row['Nombre'], 'redirectUrl' => 'sportshops.html');
        } else {
            $response = array('status' => 'error', 'message' => 'El usuario ' . $row['id'] . ' se encuentra inactivo');
        }
    } else {
        $response = array('status' => 'error', 'message' => 'Usuario o contraseña incorrecto');
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
