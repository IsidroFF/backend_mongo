# Mongo backend con replica-set

## Programación backend

# Estructura de carpetas

```sh
├── package.json
├── package-lock.json
├── README.md
├── schemaTecNMPlayground.js
└── src
    ├── app.js
    ├── controllers
    │   ├── estudiante.controller.js
    │   └── grupo.controller.js
    ├── database
    │   └── mongo.database.js
    ├── middleware
    │   └── logger.middleware.js
    ├── models
    │   └── grupo.schema.js
    └── routes
        └── grupo.routes.js
```

---

# Código

## src/controllers/estudiante.controller.js

```js
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
```

## src/controllers/grupo.controller.js

```js
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
```

## src/database/mongo.database.js

```js
// /src/config/db.js
const mongoose = require('mongoose'); // Módulo para interactuar con MongoDB
const redis = require('redis'); // Módulo para interactuar con Redis
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Conectado a MongoDB'); // Mensaje de éxito en la conexión
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error); // Mensaje de error en la conexión
    });

// Configuración de Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('error', (err) => {
    console.error('Error en la conexión a Redis:', err); // Mensaje de error en la conexión a Redis
});
redisClient.connect().then(() => {
    console.log('Conectado a Redis');
}).catch((err) => {
    console.error('No se pudo conectar a Redis:', err);
});

// Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
module.exports = { mongoose, redisClient };
```

## src/middleware/logger.middleware.js

```js
// /src/middleware/logger.js
// Importar el módulo 'redis' para interactuar con una base de datos Redis
const redis = require('redis');
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
client.on('error', (err) => {
    console.error('Redis error de conexion:', err);
});
client.connect().then(() => {
    console.log('Conectado-->> Redis');
}).catch((err) => {
    console.error('Error conexion a Redis:', err);
});
module.exports = (req, res, next) => {
    res.on('finish', async () => {
        if (!client.isOpen) {
            console.error('Redis client -->> No conectado.');
            return;
        }
        const key = `${req.method}:${Date.now().toString()}:${req.originalUrl}`;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                data: res.data
            }
        });
        try {
            await client.set(key, logEntry, 'EX', 60 * 60 * 24);
        } catch (err) {
            console.error('Error al salvar:', err);
        }
    });
    next();
};
```

## src/models/grupo.schema.js

```js
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
```

## src/routes/grupo.routes.js

```js
const { Router } = require('express');
const router = Router(); 
const { getQ1, getQ2, getQ3, getQ4, getQ5, getQ6, getQ7, getQ8, getQ9, addGroup } = require('../controllers/grupo.controller.js');
const { addStudentInGroup } = require('../controllers/estudiante.controller.js')

// Get grupo.routes By ID
router.post('/', addGroup);
router.get('/Q1', getQ1);
router.get('/Q2', getQ2);
router.get('/Q3', getQ3);
router.get('/Q4', getQ4);
router.get('/Q5', getQ5);
router.get('/Q6', getQ6);
router.get('/Q7', getQ7);
router.get('/Q8', getQ8);
router.get('/Q9', getQ9);
router.post('/:idGrupo/estudiantes', addStudentInGroup);

module.exports = router
```

## app.js

```js
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger.middleware.js'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./database/mongo.database.js'); // Importamos lasconfiguraciones de MongoDB y Redis

const grupoRouter = require('./routes/grupo.routes.js')
const app = express();

// Middleware Connections
app.use(cors())
app.use(express.json())
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));
// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);

// Routes
app.use('/grupo', grupoRouter);

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})
```

# Docker compose

```yml
version: '3.8'
services:
  mongo-secondary1:
    image: mongo
    container_name: mondongo_sec1
    command: mongod --replSet replica01
    ports:
      - "27018:27017"
    networks:
      backend:
        ipv4_address: 172.50.0.7

  mongo-secondary2:
    image: mongo
    container_name: mondongo_sec2
    command: mongod --replSet replica01
    ports:
      - "27019:27017"
    networks:
      backend:
        ipv4_address: 172.50.0.6

  mongo-secondary3:
    image: mongo
    container_name: mondongo_sec3
    command: mongod --replSet replica01
    ports:
      - "27020:27017"
    networks:
      backend:
        ipv4_address: 172.50.0.5

  mongo-primary:
    image: mongo
    container_name: mondongo_primary
    command: mongod --replSet replica01
    ports:
      - "27017:27017"
    healthcheck:
      test: >
        echo "try { rs.status() } catch (err) { 
          rs.initiate({
            _id: 'replica01', 
            members: [
              { _id: 0, host: '172.50.0.4:27017', priority: 1 },
              { _id: 1, host: '172.50.0.7:27017', priority: 0.5 },
              { _id: 2, host: '172.50.0.6:27017', priority: 0.5 },
              { _id: 3, host: '172.50.0.5:27017', priority: 0.5 }
            ]
          }) 
        }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      retries: 30
    networks:
      backend:
        ipv4_address: 172.50.0.4
    depends_on:
      - mongo-secondary1
      - mongo-secondary2
      - mongo-secondary3

  redis_stack:
    image: redis/redis-stack
    container_name: stack2
    ports:
      - "6379:6379"
      - "8001:8001"
    networks:
      backend:
        ipv4_address: 172.50.0.3
    depends_on:
      - mongo-primary
      - mongo-secondary1
      - mongo-secondary2
      - mongo-secondary3

  backend_app:
    image: isidroitt/node_mongo_api 
    container_name: "node_app"
    ports:
      - "3000:3000"
    networks:
      backend:
        ipv4_address: 172.50.0.2
    environment:
      REDIS_HOST: 172.50.0.3
      REDIS_PORT: 6379
      MONGO_URL: mongodb://172.50.0.4:27017,172.50.0.5:27017,172.50.0.6:27017,172.50.0.7:27017/AvanceAcademicoTecNM?replicaSet=replica01
    depends_on:
      - redis_stack
      - mongo-primary
      - mongo-secondary1
      - mongo-secondary2
      - mongo-secondary3

networks:
  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.50.0.0/24
```

# Dockerfile

```dockerfile
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV MONGO_URL=mongodb://localhost:27017/AvanceAcademicoTecNM
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379
EXPOSE 3000
CMD ["npm","start"]
```