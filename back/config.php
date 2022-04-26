<?php

header('Access-Control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$pdo=null;
$host="localhost";
$user="root";
$password="";
$bd="pruebakonecta";

function conectar(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        print "Error!: No se pudo conectar a la bd ".$bd."<br/>";
        print "\nError!: ".$e."<br/>";
        die();
    }
}

function desconectar() {
    $GLOBALS['pdo']=null;
}

function metodoGet($query){
    try{
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        desconectar();
        return $sentencia;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function metodoPost($query){
    try{
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $resultado=array_merge($_POST);
        $sentencia->closeCursor();
        desconectar();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}


function metodoPut($query){
    try{
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $resultado=array_merge($_POST);
        $sentencia->closeCursor();
        desconectar();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function metodoDelete($query){
    try{
        conectar();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $sentencia->closeCursor();
        desconectar();
        return $_GET['id'];
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

?>