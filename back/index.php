<?php

include 'config.php';

header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from productos where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from productos";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $id=$_POST['id'];
    $nombreProducto=$_POST['nombreProducto'];
    $referencia=$_POST['referencia'];
    $precio=$_POST['precio'];
    $peso=$_POST['peso'];
    $categoria=$_POST['categoria'];
    $stock=$_POST['stock'];
    $fechaCreacion=$_POST['fechaCreacion'];
    $query="insert into productos(id, nombreProducto, referencia, precio, peso, categoria, stock, fechaCreacion) values ('$id', '$nombreProducto', '$referencia',
                                                                                                                        '$precio', '$peso', '$categoria', '$stock', '$fechaCreacion')";
    $resultado=metodoPost($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombreProducto=$_POST['nombreProducto'];
    $referencia=$_POST['referencia'];
    $precio=$_POST['precio'];
    $peso=$_POST['peso'];
    $categoria=$_POST['categoria'];
    $stock=$_POST['stock'];
    $fechaCreacion=$_POST['fechaCreacion'];
    $query="UPDATE productos SET nombreProducto='$nombreProducto', referencia='$referencia', precio='$precio', peso='$peso', categoria='$categoria'
                                , stock='$stock', fechaCreacion='$fechaCreacion' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM productos WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>