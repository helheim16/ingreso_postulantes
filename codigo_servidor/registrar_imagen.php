<?php 

$data = array();
$carpetaImagen = '../postulantes/fotos/';
$ruta;

// Recibe los datos de la imagen
if (isset($_FILES['imagen']) && !empty($_FILES['imagen'])){
    $data['imagen'] = $_FILES['imagen'];
    $data['exito'] = true;
}else{
    $data['exito'] = false;
}

// Recibe los datos del numero de documento
if (isset($_POST['nro_documento']) && !empty($_POST['nro_documento'])){
    $data['nro_documento'] = $_POST['nro_documento'];
}

// Recibe los datos del tipo de archivo
if (isset($_POST['tipo']) && !empty($_POST['tipo'])){
    $data['tipo'] = $_POST['tipo'];
}

// cambia la ruta segun la extension del archivo
if ($data['tipo'] == 'image/jpeg') {
    $ruta = $carpetaImagen.'foto_'.$data['nro_documento'].'.jpeg';
}else{
    $ruta = $carpetaImagen.'foto_'.$data['nro_documento'].'.png';
}

$data['ruta'] = $ruta;
// Guarda la imagen
$r = move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta);
// $result = file_put_contents($ruta, $data['imagen']);
$data['AAA'] = $r;

echo json_encode($data);
exit();
?>