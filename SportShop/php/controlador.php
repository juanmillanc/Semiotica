<?php

if(!empty($_POST["btningresar"])){

    if(!empty($_POST["Email"]) and empaty($_POST["password"])){
        echo '<div class ="alert alert-danger">Los campos estan vacios</div>';
    }else{

    }

}

?>