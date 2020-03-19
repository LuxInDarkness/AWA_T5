const conn = require("../../config/mysql");
const joi = require("joi");

module.exports = (app) => {

    //Endpoint para obtener todos los estudiantes
    app.get("/estudiante", (req, res) => {
        let query = "SELECT id, nombre, direccion, fecha_nacimiento, saldo FROM estudiante";
        conn.query(query, (err, rows, fields) => {
            if (err) res.status(500).send('{"mensaje":"Error al obtener la información de estudiantes"}');
            res.send(rows);
        });
    });
    
    //Endpoint para obtener un estudiante en base a su id
    app.get("/estudiante/:id", (req, res) => {
        let query = `SELECT id, nombre, direccion, fecha_nacimiento, saldo FROM estudiante WHERE id = ${req.params.id}`;
        conn.query(query, (err, rows, fields) => {
            if (err) res.status(500).send('{"mensaje":"No se encontró la información del estudiante."}');
            if (rows) res.send(rows);
            res.send('{"mensaje":"No se encontró el id del estudiante."}');
        });
    });
    

    //Endpoint para agregar un estudiante
    app.post("/estudiante", (req, res) => {
        let schema = joi.object({
            nombre: joi.string().required(),
            direccion: joi.string().required(),
            fecha_nacimiento: joi.string().pattern(new RegExp('^\d{2}/\d{2}/\d{4}$')),
            saldo: joi.number().required()
        });
        let valid = schema.validate(req.body);
        if (valid.error) res.status(400).send('{"mensaje":"Sintaxis inválida."}'); 
        let query = `INSERT INTO estudiante (nombre, direccion, fecha_nacimiento, saldo) VALUES ("${req.body.nombre}", "${req.body.direccion}", "${req.body.fecha_nacimiento}", ${req.body.saldo})`;
        conn.query(query, (err, rows, fields) => {
            if (err) res.status(500).send('{"mensaje":"No se pudo agregar la información del estudiante."}');
            res.send(req.body);
        });
    });
    
    //Endpoint para editar un estudiante
    app.put("/estudiante/:id", (req, res) => {
        let schema = joi.object({
            nombre: joi.string().required()
        });
        let valid = schema.validate(req.body);
        if (valid.error) res.status(400).send('{"mensaje":"Sintaxis inválida, se requiere solamente el nombre del estudiante."}');
        let query = `UPDATE estudiante SET nombre = ${req.body.nombre} WHERE id = ${req.params.id}`;
        conn.query(query, (err, rows, fields) => {
            if (err) res.status(500).send('{"mensaje":"No se pudo actualizar la información del estudiante."}');
            res.send('{"mensaje":"Información actualizada correctamente."}');
        });
    });
    
    //Endpoint para eliminar un estudiante
    app.delete("/estudiante/:id", (req, res) => {
        let query = `DELETE FROM estudiante WHERE id = ${req.params.id}`;
        conn.query(query, (err, rows, fields) => {
            if (err) res.status(500).send('{"mensaje":"No se pudo borrar la información del estudiante."}');
            if (rows) res.send(rows);
            res.send('{"mensaje":"No se encontró el id del estudiante."}');
        });
    });
};