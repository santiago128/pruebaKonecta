import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


export default function Content() {

    const baseUrl = "http://localhost:80/konecta/back/"
    const [datos, setDatos] = useState([])
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [productoSeleccionado, setproductoSeleccionado] = useState({
        id: '',
        nombreProducto: '',
        referencia: '',
        precio: '',
        peso: '',
        categoria: '',
        stock: '',
        fechaCreacion: ''
    });

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setproductoSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(productoSeleccionado);
    }

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setDatos(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async()=>{
        var f = new FormData();
        f.append("id", productoSeleccionado.id);
        f.append("nombreProducto", productoSeleccionado.nombreProducto);
        f.append("referencia", productoSeleccionado.referencia);
        f.append("precio", productoSeleccionado.precio);
        f.append("peso", productoSeleccionado.peso);
        f.append("categoria", productoSeleccionado.categoria);
        f.append("stock", productoSeleccionado.stock);
        f.append("fechaCreacion", productoSeleccionado.fechaCreacion);
        f.append("METHOD", "POST");
        await axios.post("http://localhost:80/konecta/back/", f)
            .then(response => {
                setDatos(datos.concat(response.data));
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        var f = new FormData();
        f.append("nombreProducto", productoSeleccionado.nombreProducto);
        f.append("referencia", productoSeleccionado.referencia);
        f.append("precio", productoSeleccionado.precio);
        f.append("peso", productoSeleccionado.peso);
        f.append("categoria", productoSeleccionado.categoria);
        f.append("stock", productoSeleccionado.stock);
        f.append("fechaCreacion", productoSeleccionado.fechaCreacion);
        f.append("METHOD", "PUT");
        await axios.post(baseUrl, f, { params: { id: productoSeleccionado.id } })
            .then(response => {
                var dataNueva = datos;
                dataNueva.map(productos => {
                    if (productos.id === productoSeleccionado.id) {
                        productos.nombreProducto = productoSeleccionado.nombreProducto;
                        productos.referencia = productoSeleccionado.referencia;
                        productos.precio = productoSeleccionado.precio;
                        productos.peso = productoSeleccionado.peso;
                        productos.categoria = productoSeleccionado.categoria;
                        productos.stock = productoSeleccionado.stock;
                        productos.fechaCreacion = productoSeleccionado.fechaCreacion;
                    }
                });
                setDatos(dataNueva);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }


    const seleccionarFramework = (framework, caso) => {
        setproductoSeleccionado(framework);
        (caso === "Editar") ?
            abrirCerrarModalEditar() :
            abrirCerrarModalEliminar();
    }

    useEffect(() => {
        peticionGet();
    }, [])


    return (

        <div className='container'>

            <div class="container tabla">
            <h2>Productos en Stock</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre del producto</th>
                            <th>Referencia</th>
                            <th>Precio</th>
                            <th>Peso</th>
                            <th>Categoria</th>
                            <th>Stock</th>
                            <th>Fecha de creación</th>
                            <th>Acción</th>

                        </tr>
                    </thead>
                    <tbody>
                            {datos.map(productos=>(
                                <tr key={productos.Id}>
                                    <td> {productos.Id} </td>
                                    <td> {productos.nombreProducto} </td>
                                    <td> {productos.referencia} </td>
                                    <td> {productos.precio} </td>
                                    <td> {productos.peso} </td>
                                    <td> {productos.categoria} </td>
                                    <td> {productos.stock} </td>
                                    <td> {productos.fechaCreacion} </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>seleccionarFramework(productos, "Editar")}>Editar</button>{" "}
                                        <button type="submit" className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>

                            ))}

                    </tbody>
                </table>

            </div>


            <div className='col-5 formulario'>
                <h1>Registro Nuevo Producto</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Id</label>
                        <input type="number" name='id' className="form-control" id="id" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre del producto</label>
                        <input type="text" name='nombreProducto' className="form-control" id="nombreProducto" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Referencia</label>
                        <input type="text" name='referencia' className="form-control" id="referencia" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input type="number" name='precio' className="form-control" id="precio" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Peso</label>
                        <input type="number" name='peso' className="form-control" id="peso" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <input type="text" name='categoria' className="form-control" id="categoria" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input type="number" name='stock' className="form-control" id="stock" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de creación</label>
                        <input type="date" name='fechaCreacion' className="form-control" id="fechaCreacion" onChange={handleChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={()=>peticionPost()}>Registrar nuevo producto</button>
                </form>
            </div>

            <div className='col-3 venta'>
                <h2>Registrar Venta</h2>
                <button type="submit" className="btn btn-success">Registrar Venta</button>
            </div>

            <Modal isOpen={modalEditar}>
            <ModalHeader>Editar Framework</ModalHeader>
            <ModalBody>
            <div className="form-group">
                <label>Nombre: </label>
                <br/>
                <input type="text" name='nombreProducto' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombreProducto}/>
                <br />
                <label>referencia: </label>
                <br/>
                <input type="text" name='referencia' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.referencia}/>
                <br/>
                <label>precio: </label>
                <br/>
                <input type="text" name='precio' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precio}/>
                <br/>
                <label>peso: </label>
                <br/>
                <input type="text" name='peso' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.peso}/>
                <br/>
                <label>categoria: </label>
                <br/>
                <input type="text" name='categoria' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.categoria}/>
                <br/>
                <label>stock: </label>
                <br/>
                <input type="text" name='stock' className="form-control"onChange={handleChange} value={productoSeleccionado && productoSeleccionado.stock}/>
                <br/>
                <label>fechaCreacion: </label>
                <br/>
                <input type="text" name='fechaCreacion' className="form-control" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.fechaCreacion}/>
                <br/>
        </div>
    </ModalBody>
    <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
    </ModalFooter>
    </Modal>

        </div>


    );
}