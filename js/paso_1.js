window.onload = () => {
    'use strict';

    const FORMULARIO = document.querySelector('#form_primer_paso');
    // const NOMBRE = document.querySelector("#nombre");
    // const APELLIDO = document.querySelector("#apellido");
    const TIPO_DOC = document.querySelector("#tipo_documento");
    const NRO_DOC = document.querySelector("#nro_documento");
    // const EMAIL = document.querySelector("#email");
    // const FNAC = document.querySelector("#fnac");
    // const BTN_ENVIAR = document.querySelector("#btn_enviar");
    // localStorage.setItem('tipo_documento', 0);
    // localStorage.setItem('nro_documento', 0);

    let init = {
        method: 'POST'
    };

    console.log(FORMULARIO);

    FORMULARIO.addEventListener('submit', (e) => {
        e.preventDefault()
        if (camposCompletos()) {
            enviarDatosPostulante();
            console.log('Datos Enviados');
        }else{
            alert('Debe complear todos los campo');
        }
    });

    TIPO_DOC.addEventListener('blur', () => {
        if(TIPO_DOC.value && TIPO_DOC.value != localStorage.getItem('tipo_documento')){
            console.log('BLUR');
            consultarExistencia();
        }
    });

    NRO_DOC.addEventListener('blur', () => {
        if(NRO_DOC.value && NRO_DOC.value != localStorage.getItem('nro_documento')){
            console.log('BLUR');
            consultarExistencia();
        }
    });


    let init_peticion = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    // Consulta si existe un postulante con ese tipo y documento, de se asi llena el formulario
    function consultarExistencia(){
        init.body = JSON.stringify({tipo_doc: TIPO_DOC.options[TIPO_DOC.selectedIndex].text, nro_doc: NRO_DOC.value});
        let req = new Request('http://localhost/tp%20promocion%20BOUQUET/ingreso_postulantes/codigo_servidor/consultar_existencia.php', init)
        fetch(req)
        .then(recuperar)
        .then(guardar)
        .then(completarCampos)
        .catch(error);
    }

    function enviarDatosPostulante(){
        let form = new FormData(FORMULARIO);
        console.log(form);
        init.body = form;
        let req = new Request('http://localhost/tp%20promocion%20BOUQUET/ingreso_postulantes/codigo_servidor/ingreso.php', init);
        fetch(req)
        .then(recuperar)
        .then(guardar)
        .then(mostrar)
        .catch(error);
    }

    function recuperar(rta){
        if(!rta.ok){
            console.log(rta.mensajes)
            throw Error(rta.statusText);
        }
        return rta.json();
    }

    function guardar(rta){
        /*
            Guarda tipo de documento y nro de documento en localstorage, esto se utiliza para evitar que se realize una
            consulta cada vez que cambia el foco del campo nro_documento. Tambien se utiliza en los siguientes pasos para saber si
            sobre que postulante se esta trabajando
        */
        localStorage.setItem('tipo_documento', TIPO_DOC.value);
        localStorage.setItem('nro_documento', NRO_DOC.value);
        return rta;
    }

    function mostrar(rta){
        console.log(rta);
    }

    function error(er){
        alert(er);
        console.log(er);
    }

    // si existen los datos en el serivor completa los campos del formulario
    function completarCampos(rta){
        
        if(rta.existe == true){
            alert('Sus datos ya se encuentran registrados, puede volver a enviarlos si los desea actualizar');
            console.log(rta)
            let datos = rta.datos_postulante;
            FORMULARIO.querySelector("#nombre").value = datos.nombre;
            FORMULARIO.querySelector("#apellido").value = datos.apellido;
            FORMULARIO.querySelector("#puesto").value = datos.puesto;
            FORMULARIO.querySelector("#email").value = datos.email;
            FORMULARIO.querySelector("#fnac").value = datos.fnac;
        }
    }

    // compruba que todos los campos esten cargados
    function camposCompletos(){
        let completos = false;
        if (FORMULARIO.querySelector('#nombre').value && FORMULARIO.querySelector('#apellido').value
         && NRO_DOC.value && FORMULARIO.querySelector('#email').value
         && FORMULARIO.querySelector('#fnac').value) {
            completos = true;
        }
        return completos;
    }

    // function pokeAPI(){
    //     fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    //     .then(res => {
    //         if (res.ok) {
    //             console.log('EXITO');
    //             console.log(res.json());
    //         } else {
    //             console.log('NO TANTO EXITO');
    //         }
    //     })
    // }
}