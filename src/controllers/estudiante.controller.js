const Grupo = require('../models/grupo.schema.js')

const addStudentInGroup = async (req, res) => {
    const { idGrupo } = req.params;
    const { ID_curp, nctrl, Nombre, Carrera, Tecnológico, Expediente_académico } = req.body

    try {
        // Buscar el grupo por su ID
        const grupo = await Grupo.findOne({ ID_grupo: idGrupo });
        if (!grupo) {
            return res.status(404).json({ mensaje: 'Grupo no encontrado' });
        }

        const newStudent = { 
            ID_curp, 
            nctrl, 
            Nombre, 
            Carrera, 
            Tecnológico, 
            "Expediente académico": Expediente_académico 
        }

        // Agregar el estudiante al arreglo de estudiantes
        grupo.Estudiantes.push(newStudent);

        // Guardar el grupo actualizado
        await grupo.save();

        res.data = {
            newStudent
        }

        return res.status(200).json({
            message: "Successfull",
            newStudent,
            grupo,
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    addStudentInGroup
}