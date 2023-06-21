const pool = require("../db");

const getAllEstudents = async (req, res, next) => {
  try {
    const allEstudents = await pool.query(
      "SELECT * FROM ESTUDIANTES"
    );
    res.json(allEstudents.rows);
  } catch (error) {
    next(error);
  }
};

const getSingleEstudents = async (req, res, next) => {
  try {
    const { id_estudiante } = req.params;
    const result = await pool.query(
      "SELECT * FROM ESTUDIANTES WHERE id_estudiante=$1",
      [id_estudiante]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Estudiante no encontrado",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createEstudent = async (req, res, next) => {
  const {
    cedula,
    nombre,
    cod_escuela,
    telefono,
    direccion,
    fecha_nacimiento,
    status,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO ESTUDIANTES (cedula,nombre,cod_escuela,telefono,direccion,fecha_nacimiento,status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        cedula,
        nombre,
        cod_escuela,
        telefono,
        direccion,
        fecha_nacimiento,
        status,
      ]
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const deleteEstudent = async (req, res, next) => {
  try {
    const { id_estudiante } = req.params;
    const result = await pool.query(
      "DELETE FROM ESTUDIANTES WHERE id_estudiante=$1",
      [id_estudiante]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Estudiante no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateEstudent = async (req, res, next) => {
  try {
    const { id_estudiante } = req.params;
    const {
      cedula,
      nombre,
      cod_escuela,
      telefono,
      direccion,
      fecha_nacimiento,
      status,
    } = req.body;

    const result = await pool.query(
      "UPDATE ESTUDIANTES SET cedula=$1, nombre=$2, cod_escuela=$3, telefono=$4, direccion=$5, fecha_nacimiento=$6, status=$7 WHERE id_estudiante=$8 RETURNING *",
      [
        cedula,
        nombre,
        cod_escuela,
        telefono,
        direccion,
        fecha_nacimiento,
        status,
        id_estudiante,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Estudiante no encontrado",
      });

    // return res.json(result.rows[0]);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getAllSchools = async (req, res, next) => {
  try {
    const allSchools = await pool.query(
      "SELECT * FROM ESCUELAS"
    );
    res.json(allSchools.rows);
  } catch (error) {
    next(error);
  }
};

const getSingleSchools = async (req, res, next) => {
  try {
    const { cod_escuela } = req.params;
    const result = await pool.query(
      "SELECT * FROM ESCUELAS WHERE COD_ESCUELA=$1",
      [cod_escuela]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Escuela no encontrada",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createSchools = async (req, res, next) => {
  const { cod_escuela, nombre_escuela, fecha_creacion } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO ESCUELAS (cod_escuela,nombre_escuela,fecha_creacion) VALUES ($1,$2,$3) RETURNING *",
      [cod_escuela, nombre_escuela, fecha_creacion]
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const deleteSchools = async (req, res, next) => {
  try {
    const { cod_escuela } = req.params;
    const result = await pool.query(
      "DELETE FROM ESCUELAS WHERE cod_escuela=$1",
      [cod_escuela]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Escuela no encontrada",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateSchools = async (req, res, next) => {
  try {
    const { cod_escuela_} = req.params;
    const { nombre_escuela, fecha_creacion,cod_escuela } = req.body;

    const result = await pool.query(
      "UPDATE ESCUELAS SET nombre_escuela=$1, fecha_creacion=$2, cod_escuela=$3 WHERE cod_escuela=$4 RETURNING *",
      [nombre_escuela, fecha_creacion, cod_escuela, cod_escuela_]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Escuela no encontrada",
      });

    // return res.json(result.rows[0]);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEstudents,
  getSingleEstudents,
  createEstudent,
  deleteEstudent,
  updateEstudent,
  getAllSchools,
  getSingleSchools,
  createSchools,
  deleteSchools,
  updateSchools,
};
