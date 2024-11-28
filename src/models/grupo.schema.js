const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subesquema para el expediente académico de los estudiantes
const ExpedienteSchema = new Schema({
  materia: { type: String, required: true },
  calificacion: { type: Number, required: true },
  avance: { type: String, required: true }
});

// Subesquema para los estudiantes
const EstudianteSchema = new Schema({
  ID_curp: { type: String, required: true },
  nctrl: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Tecnológico: { type: String, required: true },
  Expediente_académico: [ExpedienteSchema]
});

// Subesquema para la materia
const MateriaSchema = new Schema({
  ID: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Descripción: { type: String, required: true },
  Plan_de_estudios: [{ type: String }]
});

// Subesquema para el docente
const DocenteSchema = new Schema({
  ID_RFC: { type: String, required: true },
  Nombre: { type: String, required: true },
  Carrera: { type: String, required: true },
  Tecnológico: { type: String, required: true },
  Materias_impartidas: [{ type: String }]
});

// Subesquema para el aula
const AulaSchema = new Schema({
  IDaula: { type: String, required: true },
  Edificio: { type: String, required: true },
  Grupos_atendidos: [{ type: String }],
  Descripción_de_equipamiento: { type: String, required: true }
});

// Esquema principal
const GrupoSchema = new Schema({
  ID_grupo: { type: String, required: true },
  Materia: MateriaSchema,
  Docente: DocenteSchema,
  Estudiantes: [EstudianteSchema],
  Aula: AulaSchema,
  Horario: { type: String, required: true }
});

// Creación del modelo
const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;