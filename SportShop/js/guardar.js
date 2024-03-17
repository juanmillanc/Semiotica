$('#guardar').click(function(){

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