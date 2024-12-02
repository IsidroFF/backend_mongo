const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subesquema para el expediente académico de los estudiantes
const ExpedienteSchema = new Schema({
  materia: { type: String, required: true },
  calificacion: { type: Number, required: true },
  avance: { type: String, required: true }
}, {_id: false});

// Subesquema para los estudiantes
const EstudianteSchema = new Schema({
  ID_curp: { type: String, required: true },
  nctrl: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Tecnológico: { type: String, required: true },
  "Expediente académico": [{ type: ExpedienteSchema }]
}, {_id:false});

// Subesquema para la materia
const MateriaSchema = new Schema({
  ID: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Descripción: { type: String, required: true },
  "Plan de estudios": [{ type: String }]
}, {_id:false});

// Subesquema para el docente
const DocenteSchema = new Schema({
  ID_RFC: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Tecnológico: { type: String, required: true },
  "Materias impartidas": [{ type: String }]
}, {_id:false});

// Subesquema para el aula
const AulaSchema = new Schema({
  IDaula: { type: String, required: true },
  Edificio: { type: String, required: true },
  "Grupos atendidos": [{ type: String }],
  "Descripción de equipamiento": { type: String, required: true }
}, {_id: false});

// Esquema principal
const GrupoSchema = new Schema({
  ID_grupo: { type: String, required: true },
  Materia: MateriaSchema,
  Docente: DocenteSchema,
  Estudiantes: [{type: EstudianteSchema}],
  Aula: AulaSchema,
  Horario: { type: String, required: true }
});

// Creación del modelo
const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;