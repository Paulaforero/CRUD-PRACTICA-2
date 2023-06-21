const { Router } = require("express");
const pool = require("../db");
const {
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
} = require("../controllers/crud.controller");

const router = Router();

router.get("/crud-estudents", getAllEstudents);
router.get("/crud-schools", getAllSchools);
router.get("/crud-schools/:cod_escuela", getSingleSchools);

router.get("/crud-estudents/:id_estudiante", getSingleEstudents);

router.post("/crud-estudents", createEstudent);
router.post("/crud-schools", createSchools);

router.delete("/crud-estudents/:id_estudiante", deleteEstudent);
router.delete("/crud-schools/:cod_escuela", deleteSchools);

router.put("/crud-estudents/:id_estudiante", updateEstudent);
router.put("/crud-schools/:cod_escuela_", updateSchools);

module.exports = router;
