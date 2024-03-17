const btnSignIn = document.getElementById("sign-in"),
      btnSignup = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {

    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");

})

btnSignup.addEventListener("click", e => {

    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");

})



$('#Registrarse').click(function(){

    var Documento = Documento.getElementById('Documento').value;
    var Nombre = Nombre.getElementById('Nombre').value;
    var Fecha= Fecha.getElementById('Fecha').value;
    var Genero = Genero.getElementById('Genero').value;
    var Email = Email.getElementById('Email').value;
    

    $.ajax({

        type: 'POST',
        url: '../php/action/guardar_datos.php',
        data: {Documento: Documento, Nombre: Nombre, Fecha: Fecha, Genero: Genero, Email: Email}
        

    }).fail(function(){
        alert('se presento un error')
    })


})


