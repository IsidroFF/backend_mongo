const Grupo = require('../models/grupo.schema.js')

const addGroup = async (req, res) => {
    const { 
        ID_grupo,
        Materia,
        Docente,
        Estudiantes,
        Aula,
        Horario
    } = req.body;

    try {
        // Crear un nuevo objeto de grupo
        const newGroup = new Grupo({ 
            ID_grupo,
            Materia,
            Docente,
            Estudiantes,
            Aula,
            Horario
        });

        // Guardar el nuevo grupo en la base de datos
        await newGroup.save();

        res.data = newGroup;
        
        // Responder con éxito
        return res.status(200).json({
            message: "Successfull",
            newGroup,
        });
    } catch (error) {
        // Manejo de errores
        return res.status(500).send(error.message);
    }
}


const getQ1 = async (req, res) => {
    const { curp } = req.body

    try {
        const Q1 = await Grupo.aggregate([
            { $unwind: "$Estudiantes" },
            { $match: { "Estudiantes.ID_curp": curp } },
            { $project: { "Estudiantes.Expediente académico.materia": 1, _id: 0 } },
            { $limit: 1 }
        ]);

        if (!Q1) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q1;
        res.status(200).json({
            message: "Successfull",
            Q1
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ2 = async (req, res) => {
    const { idGrupo, idMateria } = req.body

    try {
        const Q2 = await Grupo.aggregate([
            { $match: { "ID_grupo": idGrupo } },
            { $unwind: "$Estudiantes" },
            { $match: { "Materia.ID": idMateria } },
            { $project: { "Estudiantes.Nombre": 1, _id:0 } }
        ]);

        if (!Q2) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q2;
        res.status(200).json({
            message: "Successfull",
            Q2
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ3 = async (req, res) => {
    const { curp } = req.body

    try {
        const Q3 = await Grupo.aggregate([
            { $unwind: "$Estudiantes" },
            { $match: { "Estudiantes.ID_curp": curp } },
            { $project: { "Estudiantes.Expediente académico": 1, _id: 0 } },
            { $limit: 1 }
        ]);

        if (!Q3) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q3;
        res.status(200).json({
            message: "Successfull",
            Q3
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ4 = async (req, res) => {
    const { idMateria } = req.body

    try {
        const Q4 = await Grupo.aggregate([
            { $unwind: "$Docente" },
            { $match: { "Materia.ID": idMateria } },
            { $project: { "Docente.Nombre": 1, _id:0 } }
        ]);

        if (!Q4) return res.status(404).json({ message: "No hay datos de la materia" })

        res.data = Q4;
        res.status(200).json({
            message: "Successfull",
            Q4
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ5 = async (req, res) => {
    const { idMateria } = req.body

    try {
        const Q5 = await Grupo.aggregate([
            { $unwind: "$Estudiantes" },
            { $match: { "Materia.ID": idMateria } },
            { $unwind: "$Estudiantes.Expediente académico" },
            { $match: { "Estudiantes.Expediente académico.calificacion": { $gt: 90 } } },
            { $project: { "Estudiantes.Nombre": 1, _id:0 } }
        ]);

        if (!Q5) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q5;
        res.status(200).json({
            message: "Successfull",
            Q5
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ6 = async (req, res) => {
    const { idMateria } = req.body

    try {
        const Q6 = await Grupo.aggregate([
            { $match: { "Materia.ID": idMateria } },
            { $project: { "ID_grupo": 1, _id:0 } }
        ]);

        if (!Q6) return res.status(404).json({ message: "No hay datos de los grupos para la materia" })

        res.data = Q6;
        res.status(200).json({
            message: "Successfull",
            Q6
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ7 = async (req, res) => {
    const { curp } = req.body

    try {
        const Q7 = await Grupo.aggregate([
            { $unwind: "$Estudiantes" },
            { $match: { "Estudiantes.ID_curp": curp } },
            { $project: { "Materia.Nombre": 1, "Horario": 1, _id:0 } }
        ]);

        if (!Q7) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q7;
        res.status(200).json({
            message: "Successfull",
            Q7
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ8 = async (req, res) => {
    const { curp } = req.body

    try {
        const Q8 = await Grupo.aggregate([
            { $unwind: "$Estudiantes" },
            { $match: { "Estudiantes.ID_curp": curp } },
            { $project: { "Estudiantes.Expediente académico.materia": 1, "Materia.Plan de estudios": 1, _id: 0 } },
            {
                $project: {
                    "Faltan por cursar": {
                        $setDifference: ["$Materia.Plan de estudios", "$Estudiantes.Expediente académico.materia"]
                    }
                }
            },
            { $limit: 1 }
        ]);

        if (!Q8) return res.status(404).json({ message: "No hay datos del alumno" })

        res.data = Q8;
        res.status(200).json({
            message: "Successfull",
            Q8
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getQ9 = async (req, res) => {
    const { nombreDocente } = req.body

    try {
        const Q9 = await Grupo.aggregate([
            { $unwind: "$Docente" },
            { $match: { "Docente.Nombre": nombreDocente } },
            { $unwind: "$Materia" },
            { $unwind: "$Estudiantes" },
            {
                $group: {
                    _id: "$Materia.Nombre",
                    Alumnos: { $push: "$Estudiantes.Nombre" }
                }
            }
        ]);

        if (!Q9) return res.status(404).json({ message: "No hay datos del docente" })

        res.data = Q9;
        res.status(200).json({
            message: "Successfull",
            Q9
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    addGroup,
    getQ1,
    getQ2,
    getQ3,
    getQ4,
    getQ5,
    getQ6,
    getQ7,
    getQ8,
    getQ9
}