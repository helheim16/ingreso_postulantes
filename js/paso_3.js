window.onload = () => {
    const DROP_AREA = document.querySelector('#drop_area');
    const DROP_TEXTO = DROP_AREA.querySelector('h2');
    const DROP_BTN = DROP_AREA.querySelector('button');
    const INPUT_FILE = document.querySelector('#input_file');
    let pdf;

    //Agrego un evento al BOTON para que realice la accion por defecto de INPUT_FILE
    DROP_BTN.addEventListener('click', (e) => {
        INPUT_FILE.click();
    });

    //Cada vez que se selecciona un archivo lo guarda y muestra
    INPUT_FILE.addEventListener('change', (e) => {
        pdf = INPUT_FILE.files[0];
        console.log(pdf);
        
        if(pdf !== undefined){
            procesarArchivo(pdf);
        }
    });

    DROP_AREA.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Suelte para cargar el archivo';
    });

    DROP_AREA.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Arrastre y suelte su foto de perfil';
    });

    DROP_AREA.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Arrastre y suelte su foto de perfil';
        pdf = e.dataTransfer.files[0];
        if(pdf !== undefined){
            procesarArchivo(pdf);
        }
    });
    
    function mostrarArchivo(){

    }

    // Muestra la imagen y la envia
    function procesarArchivo(archivo){
        let tipoArchivo = archivo.type;

        // Comprueba que el tipo de la imagen este permitido
        if(tipoArchivo == 'application/pdf'){

            let formData = new FormData();
            formData.append('nro_documento', localStorage.getItem('nro_documento'));
            formData.append('tipo', tipoArchivo);
            formData.append('pdf', archivo);
            console.log(formData);

            let init = {
                method: 'POST',
                body: formData
            };

            let req = new Request('http://localhost/tp%20promocion%20BOUQUET/ingreso_postulantes/codigo_servidor/registrar_pdf.php', init);
        
            fetch(req)
            .then(recuperar)
            .then(mostrar)
            .catch(error);
        }else{
            alert('El tipo de archivo ingresado no esta permitido. El curriculum debe estar en formato PDF');
        }
    }

    function recuperar(rta){
        if(!rta.ok){
            console.log(rta.mensajes)
            throw Error(rta.statusText);
        }
        return rta.json();
    }

    function mostrar(rta){
        console.log(rta);
        alert('El envio fue exitoso. Ha completado la inscripcion.')
    }

    function error(er){
        alert(er);
        console.log(er);
    }
}