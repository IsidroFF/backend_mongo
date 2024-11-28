# Mongo backend con replica-set

## Escenario de datos

```js
// Colección
use('AvanceAcademicoTecNM');

const E1 = {
    "ID_curp": "CURP123456789",
    "nctrl": "12345",
    "Nombre": "Juan Pérez",
    "Carrera": "Ingeniería en Sistemas Computacionales",
    "Tecnológico": "TecNM Campus A",
    "Plan de estudios": [
        "Matemáticas Discretas",
        "Algoritmos y Estructuras de Datos",
        "Cálculo Diferencial",
        "Bases de Datos",
        "Redes de Computadoras"
    ],
    "Expediente académico": [
        {
            "materia": "Matemáticas Discretas",
            "calificacion": 95,
            "avance": "Completada"
        },
        {
            "materia": "Algoritmos y Estructuras de Datos",
            "calificacion": 85,
            "avance": "Completada"
        }
    ]
}

const E2 = {
    "ID_curp": "CURP987654321",
    "nctrl": "54321",
    "Nombre": "María López",
    "Carrera": "Ingeniería Civil",
    "Tecnológico": "TecNM Campus B",
    "Plan de estudios": [
        "Resistencia de Materiales",
        "Cálculo Integral",
        "Topografía",
        "Diseño Estructural",
        "Hidráulica"
    ],
    "Expediente académico": [
        {
            "materia": "Resistencia de Materiales",
            "calificacion": 88,
            "avance": "Completada"
        },
        {
            "materia": "Topografía",
            "calificacion": 92,
            "avance": "En progreso"
        }
    ]
}

const E3 = {
    "ID_curp": "CURP112233445",
    "nctrl": "11223",
    "Nombre": "Luis Martínez",
    "Carrera": "Ingeniería Electrónica",
    "Tecnológico": "TecNM Campus C",
    "Plan de estudios": [
        "Circuitos Eléctricos",
        "Electrónica Digital",
        "Sistemas de Control",
        "Instrumentación",
        "Electromagnetismo"
    ],
    "Expediente académico": [
        {
            "materia": "Circuitos Eléctricos",
            "calificacion": 90,
            "avance": "Completada"
        },
        {
            "materia": "Electrónica Digital",
            "calificacion": 78,
            "avance": "Completada"
        }
    ]
}

const E4 = {
    "ID_curp": "CURP556677889",
    "nctrl": "33445",
    "Nombre": "Ana Gómez",
    "Carrera": "Licenciatura en Administración",
    "Tecnológico": "TecNM Campus D",
    "Plan de estudios": [
        "Fundamentos de Economía",
        "Comportamiento Organizacional",
        "Contabilidad Financiera",
        "Marketing Estratégico",
        "Gestión de Proyectos"
    ],
    "Expediente académico": [
        {
            "materia": "Fundamentos de Economía",
            "calificacion": 93,
            "avance": "Completada"
        },
        {
            "materia": "Contabilidad Financiera",
            "calificacion": 88,
            "avance": "En progreso"
        }
    ]
}

const E5 = {
    "ID_curp": "CURP998877665",
    "nctrl": "55678",
    "Nombre": "Carlos Ramírez",
    "Carrera": "Ingeniería Industrial",
    "Tecnológico": "TecNM Campus E",
    "Plan de estudios": [
        "Estadística Industrial",
        "Logística",
        "Ergonomía",
        "Optimización de Procesos",
        "Gestión de Calidad"
    ],
    "Expediente académico": [
        {
            "materia": "Estadística Industrial",
            "calificacion": 89,
            "avance": "Completada"
        },
        {
            "materia": "Logística",
            "calificacion": 84,
            "avance": "Completada"
        }
    ]
}

const E6 = {
    "ID_curp": "CURP223344556",
    "nctrl": "66789",
    "Nombre": "Sofía Hernández",
    "Carrera": "Ingeniería Mecánica",
    "Tecnológico": "TecNM Campus F",
    "Plan de estudios": [
        "Termodinámica",
        "Mecánica de Fluidos",
        "Diseño Mecánico",
        "Materiales Avanzados",
        "Dinámica"
    ],
    "Expediente académico": [
        {
            "materia": "Termodinámica",
            "calificacion": 91,
            "avance": "En progreso"
        },
        {
            "materia": "Diseño Mecánico",
            "calificacion": 87,
            "avance": "Completada"
        }
    ]
}

const E7 = {
    "ID_curp": "CURP334455667",
    "nctrl": "77890",
    "Nombre": "Jorge Torres",
    "Carrera": "Ingeniería en Energías Renovables",
    "Tecnológico": "TecNM Campus G",
    "Plan de estudios": [
        "Energía Solar",
        "Sistemas Fotovoltaicos",
        "Energía Eólica",
        "Termodinámica Aplicada",
        "Diseño Sostenible"
    ],
    "Expediente académico": [
        {
            "materia": "Energía Solar",
            "calificacion": 94,
            "avance": "Completada"
        },
        {
            "materia": "Sistemas Fotovoltaicos",
            "calificacion": 88,
            "avance": "En progreso"
        }
    ]
}

const E8 = {
    "ID_curp": "CURP987654321",
    "nctrl": "54321",
    "Nombre": "María López",
    "Carrera": "Ingeniería Civil",
    "Tecnológico": "TecNM Campus B",
    "Plan de estudios": [
        "Resistencia de Materiales",
        "Topografía",
        "Cálculo Integral",
        "Diseño Estructural",
        "Hidráulica"
    ],
    "Expediente académico": [
        {
            "materia": "Resistencia de Materiales",
            "calificacion": 88,
            "avance": "Completada"
        },
        {
            "materia": "Topografía",
            "calificacion": 92,
            "avance": "En progreso"
        }
    ]
};

const E9 = {
    "ID_curp": "CURP445566778",
    "nctrl": "88901",
    "Nombre": "Daniela Vargas",
    "Carrera": "Ingeniería Química",
    "Tecnológico": "TecNM Campus H",
    "Plan de estudios": [
        "Química Orgánica",
        "Operaciones Unitarias",
        "Balance de Materia y Energía",
        "Procesos Industriales",
        "Análisis Químico"
    ],
    "Expediente académico": [
        {
            "materia": "Química Orgánica",
            "calificacion": 90,
            "avance": "Completada"
        },
        {
            "materia": "Operaciones Unitarias",
            "calificacion": 80,
            "avance": "En progreso"
        }
    ]
}

const E10 = {
    "ID_curp": "CURP556677889",
    "nctrl": "99012",
    "Nombre": "Fernando Ríos",
    "Carrera": "Ingeniería en Software",
    "Tecnológico": "TecNM Campus I",
    "Plan de estudios": [
        "Programación Orientada a Objetos",
        "Bases de Datos Avanzadas",
        "Desarrollo de Aplicaciones Web",
        "Pruebas de Software",
        "Seguridad Informática"
    ],
    "Expediente académico": [
        {
            "materia": "Programación Orientada a Objetos",
            "calificacion": 96,
            "avance": "Completada"
        },
        {
            "materia": "Seguridad Informática",
            "calificacion": 85,
            "avance": "En progreso"
        }
    ]
}

const E11 = {
    "ID_curp": "CURP667788990",
    "nctrl": "10123",
    "Nombre": "Paola Sánchez",
    "Carrera": "Ingeniería Ambiental",
    "Tecnológico": "TecNM Campus J",
    "Plan de estudios": [
        "Impacto Ambiental",
        "Gestión de Residuos",
        "Tecnologías Limpias",
        "Cuidado de Ecosistemas",
        "Química Ambiental"
    ],
    "Expediente académico": [
        {
            "materia": "Impacto Ambiental",
            "calificacion": 89,
            "avance": "Completada"
        },
        {
            "materia": "Gestión de Residuos",
            "calificacion": 83,
            "avance": "En progreso"
        }
    ]
}

const E12 = {
    "ID_curp": "CURP778899001",
    "nctrl": "11234",
    "Nombre": "Roberto Castillo",
    "Carrera": "Licenciatura en Contaduría",
    "Tecnológico": "TecNM Campus K",
    "Plan de estudios": [
        "Auditoría Financiera",
        "Costos y Presupuestos",
        "Fiscalización",
        "Normas de Información Financiera",
        "Análisis Financiero"
    ],
    "Expediente académico": [
        {
            "materia": "Auditoría Financiera",
            "calificacion": 88,
            "avance": "Completada"
        },
        {
            "materia": "Costos y Presupuestos",
            "calificacion": 82,
            "avance": "En progreso"
        }
    ]
}

// Q0. Escenario de datos
db.getCollection('grupos').insertMany([
    {
        "ID_grupo": "G1",
        "Materia": {
            "ID": "MATH101",
            "Nombre": "Matemáticas Discretas",
            "Carrera": "Ingeniería en Sistemas Computacionales",
            "Descripción": "Materia básica de matemáticas discretas.",
            "Plan de estudios": [
                "Teoría de conjuntos",
                "Lógica proposicional",
                "Grafos"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC123456789",
            "Nombre": "Marta García",
            "Carrera": "Ingeniería en Sistemas Computacionales",
            "Tecnológico": "TecNM Campus A",
            "Materias impartidas": [
                "Matemáticas Discretas",
                "Algoritmos y Estructuras de Datos"
            ]
        },
        "Estudiantes": [
            {
                "ID_curp": "CURP123456789",
                "nctrl": "12345",
                "Nombre": "Juan Pérez",
                "Carrera": "Ingeniería en Sistemas Computacionales",
                "Tecnológico": "TecNM Campus A",
                "Expediente académico": [
                    {
                        "materia": "Matemáticas Discretas",
                        "calificacion": 95,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Algoritmos y Estructuras de Datos",
                        "calificacion": 85,
                        "avance": "Completada"
                    }
                ]
            },
            {
                "ID_curp": "CURP0001",
                "nctrl": "10001",
                "Nombre": "Carlos Hernández",
                "Carrera": "Ingeniería en Sistemas Computacionales",
                "Tecnológico": "TecNM Campus A",
                "Expediente académico": [
                    {
                        "materia": "Matemáticas Discretas",
                        "calificacion": 90,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Algoritmos y Estructuras de Datos",
                        "calificacion": 85,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Cálculo Diferencial",
                        "calificacion": 88,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Bases de Datos",
                        "calificacion": 92,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Redes de Computadoras",
                        "calificacion": 80,
                        "avance": "Completada"
                    }
                ]
            },
            {
                "ID_curp": "CURP0004",
                "nctrl": "10004",
                "Nombre": "Laura Gómez",
                "Carrera": "Ingeniería en Software",
                "Tecnológico": "TecNM Campus A",
                "Expediente académico": [
                    {
                        "materia": "Programación Avanzada",
                        "calificacion": 95,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Algoritmos y Estructuras de Datos",
                        "calificacion": 91,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Bases de Datos",
                        "calificacion": 87,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Redes de Computadoras",
                        "calificacion": 92,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Desarrollo Web",
                        "calificacion": 90,
                        "avance": "Completada"
                    }
                ]
            },
            {
                "ID_curp": "CURP0009",
                "nctrl": "10009",
                "Nombre": "Luis Sánchez",
                "Carrera": "Ingeniería Química",
                "Tecnológico": "TecNM Campus A",
                "Expediente académico": [
                    {
                        "materia": "Termodinámica",
                        "calificacion": 92,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Procesos de Separación",
                        "calificacion": 85,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Cálculo Diferencial",
                        "calificacion": 80,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Reacciones Químicas",
                        "calificacion": 90,
                        "avance": "Completada"
                    },
                    {
                        "materia": "Instrumentación y Control",
                        "calificacion": 87,
                        "avance": "Completada"
                    }
                ]
            }
        ],
        "Aula": {
            "IDaula": "A101",
            "Edificio": "Edificio A",
            "Grupos atendidos": [
                "G1"
            ],
            "Descripción de equipamiento": "Proyector, escritorios, aire acondicionado"
        },
        "Horario": "08:00-10:00"
    },
    {
        "ID_grupo": "G2",
        "Materia": {
            "ID": "MATH101",
            "Nombre": "Matemáticas Discretas",
            "Carrera": "Ingeniería en Sistemas Computacionales",
            "Descripción": "Materia básica de matemáticas discretas.",
            "Plan de estudios": [
                "Teoría de conjuntos",
                "Lógica proposicional",
                "Grafos"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC639847109",
            "Nombre": "Gustavo Cerati",
            "Carrera": "Ingeniería en Sistemas Computacionales",
            "Tecnológico": "TecNM Campus A",
            "Materias impartidas": [
                "Matemáticas Discretas",
                "Algoritmos y Estructuras de Datos"
            ]
        },
        "Estudiantes": [
            E1, E2, E3, E4, E5, E6
        ],
        "Aula": {
            "IDaula": "A101",
            "Edificio": "Edificio A",
            "Grupos atendidos": [
                "G1", "G2"
            ],
            "Descripción de equipamiento": "Proyector, escritorios, aire acondicionado"
        },
        "Horario": "10:00-11:00"
    },
    {
        "ID_grupo": "G3",
        "Materia": {
            "ID": "NET101",
            "Nombre": "Redes de Computadoras",
            "Carrera": "ITIC",
            "Descripción": "Introducción a las redes de computadoras.",
            "Plan de estudios": [
                "Modelos OSI",
                "Topologías",
                "Protocolos de red"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC987654321",
            "Nombre": "Luis Fernández",
            "Carrera": "ITIC",
            "Tecnológico": "TecNM Campus B",
            "Materias impartidas": [
                "Redes de Computadoras",
                "Seguridad Informática"
            ]
        },
        "Estudiantes": [
            E4,E5,E6,E7,E8,E2
        ],
        "Aula": {
            "IDaula": "B202",
            "Edificio": "Edificio B",
            "Grupos atendidos": ["G3"],
            "Descripción de equipamiento": "Pizarrón, escritorios, computadora"
        },
        "Horario": "10:00-12:00"
    },
    {
        "ID_grupo": "G4",
        "Materia": {
            "ID": "ELEC201",
            "Nombre": "Electrónica Básica",
            "Carrera": "Ingeniería Electrónica",
            "Descripción": "Fundamentos de componentes electrónicos.",
            "Plan de estudios": [
                "Diodos y transistores",
                "Amplificadores",
                "Filtros"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC123321123",
            "Nombre": "Mario López",
            "Carrera": "Ingeniería Electrónica",
            "Tecnológico": "TecNM Campus D",
            "Materias impartidas": [
                "Electrónica Básica",
                "Sistemas Digitales"
            ]
        },
        "Estudiantes": [
            E8,E9,E10,E11,E12
        ],
        "Aula": {
            "IDaula": "D404",
            "Edificio": "Edificio D",
            "Grupos atendidos": ["G4"],
            "Descripción de equipamiento": "Osciloscopios, protoboards, multímetros"
        },
        "Horario": "08:00-10:00"
    },
    {
        "ID_grupo": "G5",
        "Materia": {
            "ID": "CIV301",
            "Nombre": "Diseño Estructural",
            "Carrera": "Ingeniería Civil",
            "Descripción": "Análisis y diseño de estructuras de concreto y acero.",
            "Plan de estudios": [
                "Fundamentos de diseño",
                "Cargas y esfuerzos",
                "Análisis de estructuras"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC654987321",
            "Nombre": "Clara Domínguez",
            "Carrera": "Ingeniería Civil",
            "Tecnológico": "TecNM Campus E",
            "Materias impartidas": [
                "Diseño Estructural",
                "Mecánica de Suelos"
            ]
        },
        "Estudiantes": [
            E3,E7,E9,E1,E2
        ],
        "Aula": {
            "IDaula": "E505",
            "Edificio": "Edificio E",
            "Grupos atendidos": ["G5"],
            "Descripción de equipamiento": "Escritorios, proyector, maquetas"
        },
        "Horario": "10:00-12:00"
    },
    {
        "ID_grupo": "G6",
        "Materia": {
            "ID": "CHEM401",
            "Nombre": "Reacciones Químicas",
            "Carrera": "Ingeniería Química",
            "Descripción": "Estudio de reacciones químicas industriales.",
            "Plan de estudios": [
                "Cinética química",
                "Catalizadores",
                "Equilibrio químico"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC789456123",
            "Nombre": "Jorge Martínez",
            "Carrera": "Ingeniería Química",
            "Tecnológico": "TecNM Campus F",
            "Materias impartidas": [
                "Reacciones Químicas",
                "Termodinámica"
            ]
        },
        "Estudiantes": [
            E1,E2,E4,E6,E9,E10
        ],
        "Aula": {
            "IDaula": "F606",
            "Edificio": "Edificio F",
            "Grupos atendidos": ["G6"],
            "Descripción de equipamiento": "Equipos de laboratorio, campanas extractoras"
        },
        "Horario": "12:00-14:00"
    },
    {
        "ID_grupo": "G7",
        "Materia": {
            "ID": "SOFT501",
            "Nombre": "Desarrollo Web",
            "Carrera": "Ingeniería en Software",
            "Descripción": "Creación de aplicaciones web modernas.",
            "Plan de estudios": [
                "HTML y CSS",
                "JavaScript",
                "Frameworks web"
            ]
        },
        "Docente": {
            "ID_RFC": "RFC963852741",
            "Nombre": "Laura Pérez",
            "Carrera": "Ingeniería en Software",
            "Tecnológico": "TecNM Campus G",
            "Materias impartidas": [
                "Desarrollo Web",
                "Gestión de Proyectos"
            ]
        },
        "Estudiantes": [
            E1,E3,E4,E8,E10,E12
        ],
        "Aula": {
            "IDaula": "G707",
            "Edificio": "Edificio G",
            "Grupos atendidos": ["G7"],
            "Descripción de equipamiento": "Computadoras, proyector"
        },
        "Horario": "14:00-16:00"
    },    
]);
```

### Querys

```js
// Q1. Listar las materias que un alumno ha cursado
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Estudiantes" },
    { $match: { "Estudiantes.ID_curp": "CURP123456789" } },
    { $project: { "Estudiantes.Expediente académico.materia": 1, _id:0 } },
    { $limit: 1}
]);
```

```js
// Q2. Listar los alumnos que están cursando una materia específica de un grupo específico
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $match: { "ID_grupo": "G1" } },
    { $unwind: "$Estudiantes" },
    { $match: { "Materia.ID": "MATH101" } },
    { $project: { "Estudiantes.Nombre": 1 } }
]);
```

```js
// Q3. Listar las calificaciones de un alumno en todas sus materias cursadas
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Estudiantes" },
    { $match: { "Estudiantes.ID_curp": "CURP123456789" } },
    { $project: { "Estudiantes.Expediente académico": 1, _id:0 } },
    { $limit: 1}
]);
```

```js
// Q4. Listar los docentes que imparten una materia específica
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Docente" },
    { $match: { "Materia.ID": "MATH101" } },
    { $project: { "Docente.Nombre": 1 } }
]);
```

```js
// Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Estudiantes" },
    { $match: { "Materia.ID": "MATH101" } },
    { $unwind: "$Estudiantes.Expediente académico" },
    { $match: { "Estudiantes.Expediente académico.calificacion": { $gt: 90 } } },
    { $project: { "Estudiantes.Nombre": 1 } }
]);
```

```js
// Q6. Listar los grupos que correspondan a una materia específica
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $match: { "Materia.ID": "MATH101" } },
    { $project: { "ID_grupo": 1 } }
]);
```

```js
// Q7. Listar las materias que cursa un alumno en específico (horario)
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Estudiantes" },
    { $match: { "Estudiantes.ID_curp": "CURP123456789" } },
    { $project: { "Materia.Nombre": 1, "Horario": 1 } }
]);
```

```js
// Q8. Listar las materias que faltan por cursar a un alumno en específico
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Estudiantes" },
    { $match: { "Estudiantes.ID_curp": "CURP123456789" } },
    { $project: { "Estudiantes.Expediente académico.materia": 1, "Materia.Plan de estudios": 1, _id:0 } },
    {
        $project: {
            "Faltan por cursar": {
                $setDifference: ["$Materia.Plan de estudios", "$Estudiantes.Expediente académico.materia"]
            }
        }
    },
    { $limit: 1 }
]);
```

```js
// Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias
use('AvanceAcademicoTecNM');
db.grupos.aggregate([
    { $unwind: "$Docente" },
    { $match: { "Docente.Nombre": "Marta García" } },
    { $unwind: "$Materia" },
    { $unwind: "$Estudiantes" },
    {
        $group: {
            _id: "$Materia.Nombre",
            Alumnos: { $push: "$Estudiantes.Nombre" }
        }
    }
]);
```

## Programación backend