
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.querySelector("#formContacto");

    const pagina = window.location.pathname.split("/").pop() || "index.html";

    const enlaces = document.querySelectorAll(".navbar-nav .nav-link");

    enlaces.forEach(function(enlace) {
        if (enlace.getAttribute("href") === pagina) {
            enlace.setAttribute("aria-current", "page");
        }
    });

    if (formulario === null) {
        return;
    }

    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const telefono = document.querySelector("#telefono");
    const servicio = document.querySelector("#servicio");
    const presupuesto = document.querySelector("#presupuesto");
    const fecha = document.querySelector("#fecha");
    const mensaje = document.querySelector("#mensaje");
    const contador = document.querySelector("#contador");
    const resultado = document.querySelector("#resultadoFormulario");

    if (fecha) {
        const hoy = new Date();
        const fechaActual = new Date(
            hoy.getTime() - hoy.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        fecha.min = fechaActual;
    }

    mensaje.addEventListener("input", function() {
        contador.textContent = mensaje.value.length;
    });

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let valido = true;
        let textoError = "";

        if (nombre.value.trim().length < 3) {
            valido = false;
            textoError = "Escribe tu nombre con al menos 3 caracteres.";
        }

        else if (!correo.checkValidity() || correo.value.trim() === "") {
            valido = false;
            textoError = "Escribe un correo electrónico válido.";
        }

        else if (telefono.value.trim() !== "" && !telefono.checkValidity()) {
            valido = false;
            textoError = "Revisa el formato de tu teléfono.";
        }

        else if (servicio.value === "") {
            valido = false;
            textoError = "Selecciona el servicio que necesitas.";
        }

        else if (presupuesto.value === "") {
            valido = false;
            textoError = "Selecciona un presupuesto.";
        }

        else if (fecha.value !== "" && !fecha.checkValidity()) {
            valido = false;
            textoError = "Selecciona una fecha válida.";
        }

        else if (mensaje.value.trim().length < 15) {
            valido = false;
            textoError = "Describe tu proyecto con al menos 15 caracteres.";
        }

        else if (!formulario.checkValidity()) {
            valido = false;
            textoError = "Completa todos los campos obligatorios.";
        }

        if (valido === false) {
            resultado.hidden = false;
            resultado.classList.remove("success");
            resultado.classList.add("error");
            resultado.textContent = textoError;

            if (window.Swal) {
                Swal.fire({
                    icon: "warning",
                    title: "Revisa tus datos",
                    text: textoError,
                    confirmButtonColor: "#e50914"
                });
            }

            return;
        }

        const solicitud = {
            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            telefono: telefono.value.trim(),
            servicio: servicio.value,
            presupuesto: presupuesto.value,
            fecha: fecha.value,
            mensaje: mensaje.value.trim()
        };

        let solicitudes = JSON.parse(
            localStorage.getItem("maloproductionSolicitudes") || "[]"
        );

        solicitudes.push(solicitud);

        localStorage.setItem(
            "maloproductionSolicitudes",
            JSON.stringify(solicitudes)
        );

        resultado.hidden = false;
        resultado.classList.remove("error");
        resultado.classList.add("success");
        resultado.textContent = "¡Gracias, " + solicitud.nombre +
            "! Tus datos se guardaron en esta demostración.";

        if (window.Swal) {
            Swal.fire({
                icon: "success",
                title: "¡Solicitud registrada!",
                text: "Los datos se guardaron en este navegador.",
                confirmButtonColor: "#e50914"
            });
        }

        formulario.reset();
        contador.textContent = "0";
    });

});
