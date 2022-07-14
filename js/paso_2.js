window.onload = () => {
    const CONTENEDOR = document.querySelector('.contenedor');
    const DROP_AREA = document.querySelector('#drop_area');
    const DROP_TEXTO = DROP_AREA.querySelector('h5');
    const DROP_BTN = DROP_AREA.querySelector('button');
    const INPUT_FILE = document.querySelector('#input_file');
    let imagen;

    //Agrego un evento al BOTON para que realice la accion por defecto de INPUT_FILE
    DROP_BTN.addEventListener('click', (e) => {
        INPUT_FILE.click();
    });

    //Cada vez que se selecciona un archivo lo guarda y muestra
    INPUT_FILE.addEventListener('change', (e) => {
        imagen = INPUT_FILE.files[0];
        console.log(imagen);
        
        if(imagen !== undefined){
            procesarArchivo(imagen);
        }
    });

    DROP_AREA.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Suelte para cargar el archivo';
        CONTENEDOR.classList.remove('bg-light');
        CONTENEDOR.classList.add('bg-danger');
    });

    DROP_AREA.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Arrastre y suelte su foto de perfil';
        CONTENEDOR.classList.add('bg-light');
        CONTENEDOR.classList.remove('bg-danger');
    });

    DROP_AREA.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        DROP_TEXTO.textContent = 'Arrastre y suelte su foto de perfil';
        CONTENEDOR.classList.add('bg-light');
        CONTENEDOR.classList.remove('bg-danger');
        
        imagen = e.dataTransfer.files[0];
        console.log(imagen);
        if(imagen !== undefined){
            procesarArchivo(imagen);
        }
    });
    
    function mostrarArchivo(){

    }

    // Muestra la imagen y la envia
    function procesarArchivo(archivo){
        let tipoArchivo = archivo.type;
        let tamanioArchivo = archivo.size;

        if(tamanioArchivo > 500000){
            alert('El tamaño de la imagen ingresada supera el tamaño permitido')
            return;
        }

        // Comprueba que el tipo de la imagen este permitido
        if(tipoArchivo == 'image/jpeg' || tipoArchivo == 'image/png'){
            /*
                MOSTRAR FOTO
            */

            let formData = new FormData();
            formData.append('nro_documento', localStorage.getItem('nro_documento'));
            formData.append('tipo', tipoArchivo);
            formData.append('imagen', archivo);
            console.log(formData);

            let init = {
                method: 'POST',
                body: formData
            };

            let req = new Request('http://localhost/tp%20promocion%20BOUQUET/ingreso_postulantes/codigo_servidor/registrar_imagen.php', init);
        
            fetch(req)
            .then(recuperar)
            .then(mostrar)
            .then(siguientePaso)
            .catch(error);
        }else{
            alert('El tipo de archivo ingresado no esta permitido');
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
    }

    function error(er){
        alert(er);
        console.log(er);
    }

    function siguientePaso(){
        alert('El envio de la imagen fue exitoso. Sera redirigido al siguiente paso.')
        window.location = "paso_3.html";
    }
}