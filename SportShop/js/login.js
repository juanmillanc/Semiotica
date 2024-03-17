$(document).ready(function() {
    $('#login').submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../php/action/login.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                console.log(response);

                if (response.status === 'error') {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else if (response.status === 'success') {
                    Swal.fire({
                        title: 'Éxito',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(function() {
                        // Limpiar los campos de entrada después de hacer clic en "Ok"
                        $('form')[0].reset();
                        window.location.href = response.redirectUrl;
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Respuesta inesperada del servidor',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al procesar la solicitud',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });
});
