const { response, request } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const {Producto, Usuario} = require("../models");
const path = require('path');
const fs = require('fs');


const cargarArchivo = async(req, res = response) => {

    
    // console.log('req.files >>>', req.files); // eslint-disable-line

    try {
      // const nombre = await subirArchivo(req.files,  ['txt', 'md']);
      const nombre = await subirArchivo(req.files,  undefined, 'fotos');
      res.json({nombre});
    } catch (error) {
      res.status(400).json({error});
    }
}

const actualizarArchivo = async(req = request, res = response) => {

  const {id, coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `El usuario con el id: ${id} no existe`
          });
        } 
    break;
    case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `El producto con el id: ${id} no existe`
          });
        } 
    break;
    default:
      return res.status(500).json({msg: 'Esto node validó'});
  }
  try {
    if(modelo.img){
      const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error en el servidor'
    });
  }
  const nombre = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombre;
  await modelo.save();
  return res.json({
    modelo
  });
};


const mostrarImagen = async(req, res = response) => {

  const {id, coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `El usuario con el id: ${id} no existe`
          });
        } 
    break;
    case 'productos':
        modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({
            msg: `El producto con el id: ${id} no existe`
          });
        } 
    break;
    default:
      return res.status(500).json({msg: 'Esto node validó'});
  }
  try {
    if(modelo.img){
      const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
      console.log(__dirname,pathImage)
      if(fs.existsSync(pathImage)){
        return res.sendFile(pathImage);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error en el servidor'
    });
  }

  
    const pathImage = path.join(__dirname, '../assets', 'no-imag.jpg' );
    res.sendFile(pathImage, (error) => {
      console.log(error);
      console.log(typeof error);
      return res.status(400).json({msg: 'Error en el servidor'});
    });
  
};


module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen
}