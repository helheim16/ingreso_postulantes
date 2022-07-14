<?php 
$jsondata = array();

$json = file_get_contents('php://input');
$data = json_decode($json);
$ruta = '../postulantes/';
$nombreArchivo = '';
$mensajes = '';
$carpeta = scandir($ruta);

if (!isset($data)) {
    $mensajes = 'NO SE RECIBIO NINGUN DATO';
} else {
    $mensajes = 'LOS DATOS FUERON RECIBIDOS';
}

if (isset($data->tipo_doc) && !empty($data->tipo_doc)){
    $nombreArchivo .= $data->tipo_doc.'_';
    $jsondata['tipo_documento'] = $data->tipo_doc;
}

if (isset($data->nro_doc) && !empty($data->nro_doc)){
    $nombreArchivo .= $data->nro_doc.'.json';
    $jsondata['nro_documento'] = $data->nro_doc;
}

// $nombreArchivo = 'dni_43091341.json';
if(is_file($ruta.$nombreArchivo)){
    $jsondata['existe'] = true;
    $datos_postulante = json_decode(file_get_contents($ruta.$nombreArchivo));
    $jsondata['datos_postulante'] = $datos_postulante;
}
else{
    $jsondata['existe'] = false;
}

$jsondata['ruta_archivo'] = $ruta.$nombreArchivo;
$jsondata['mensajes'] = $mensajes;
echo json_encode($jsondata);

exit();
?>