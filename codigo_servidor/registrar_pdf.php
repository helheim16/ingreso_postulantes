<?php 

$data = array();
$carpetaPDF = '../postulantes/curriculums/';
$ruta;

// Recibe los datos del PDF
if (isset($_FILES['pdf']) && !empty($_FILES['pdf'])){
    $data['pdf'] = $_FILES['pdf'];
    $data['exito_PDF'] = true;
}else{
    $data['exito_PDF'] = false;
}

// Recibe los datos del numero de documento
if (isset($_POST['nro_documento']) && !empty($_POST['nro_documento'])){
    $data['nro_documento'] = $_POST['nro_documento'];
}

// Recibe los datos del tipo de archivo
if (isset($_POST['tipo']) && !empty($_POST['tipo'])){
    $data['tipo'] = $_POST['tipo'];
}

$ruta = $carpetaPDF.'cv_'.$data['nro_documento'].'.pdf';

$data['ruta'] = $ruta;

// Guarda el archivo
$r = move_uploaded_file($_FILES['pdf']['tmp_name'], $ruta);
// indica si el archivo fue guardado
$data['guardado'] = $r;

echo json_encode($data);
exit();
?>