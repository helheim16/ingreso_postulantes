<?php 
$data = array();
$ruta = '../postulantes/';
$mensajes = '';

// if (!isset($data)) {
//     $mensajes = 'NO SE RECIBIO NINGUN DATO';
// } else {
//     $mensajes = 'LOS DATOS FUERON RECIBIDOS';
// }

// Recibe los datos del nombre
if (isset($_POST['nombre']) && !empty($_POST['nombre'])){
    $data['nombre'] = $_POST['nombre'];
}

// Recibe los datos del apellido
if (isset($_POST['apellido']) && !empty($_POST['apellido'])){
    $data['apellido'] = $_POST['apellido'];
}

// Recibe los datos del tipo de documento
if (isset($_POST['tipo_documento']) && !empty($_POST['tipo_documento'])){
    $data['tipo_documento'] = $_POST['tipo_documento'];
}

// Recibe los datos del numero de documento
if (isset($_POST['nro_documento']) && !empty($_POST['nro_documento'])){
    $data['nro_documento'] = $_POST['nro_documento'];
}

// Recibe los datos del email
if (isset($_POST['email']) && !empty($_POST['email'])){
    $data['email'] = $_POST['email'];
}

// Recibe los datos de la fecha de nacimiento
if (isset($_POST['fnac']) && !empty($_POST['fnac'])){
    $data['fnac'] = $_POST['fnac'];
}

// Recibe los datos del puesto
if (isset($_POST['puesto']) && !empty($_POST['puesto'])){
    $data['puesto'] = $_POST['puesto'];
}

// establece el nombre del archivo y lo agrega a la ruta
$ruta .= $data['tipo_documento'].'_'.$data['nro_documento'].'.json';
// pasa los datos a formato json
$json = json_encode($data);
// crea un archivo con los datos formateados y la ruta establecida previamente
$bytes = file_put_contents($ruta, $json);

echo $json;
exit();
?>