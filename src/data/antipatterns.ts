export interface Question {
  id: string;
  text: string;
}

export interface Antipattern {
  id: string;
  name: string;
  questions: Question[];
  expectedAnswers: boolean[];
}

export interface TabData {
  id: string;
  name: string;
  antipatterns: Antipattern[];
}

export interface ManagementAntipattern {
  name: string;
  justification: string;
  relationshipStrength: 'N' | 'P' | 'L' | 'F';
}

export const scrumTabs: TabData[] = [
  {
    id: 'daily',
    name: 'Daily',
    antipatterns: [
      {
        id: 'reporte-estatus',
        name: 'Status report',
        questions: [
          { id: 'reporte-estatus-q1', text: '¿Se usa un formato estructurado (como las 3 preguntas u otro similar) para guiar la reunión?' },
          { id: 'reporte-estatus-q2', text: '¿Se indica que la Daily Scrum se centra en informar avances a una persona específica?' },
          { id: 'reporte-estatus-q3', text: '¿Las actualizaciones en la reunión son repetitivas o predecibles?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'sin-rutina',
        name: 'No routine',
        questions: [
          { id: 'sin-rutina-q1', text: '¿La reunión ocurre siempre en el mismo lugar o plataforma y con un horario definido?' },
          { id: 'sin-rutina-q2', text: '¿La reunión suele omitirse en algunas ocasiones?' },
          { id: 'sin-rutina-q3', text: '¿La estructura de la reunión está definida por pasos o turnos?' }
        ],
        expectedAnswers: [false, true, true]
      },
      {
        id: 'limite-tiempo',
        name: 'Not enforcing the time-box',
        questions: [
          { id: 'limite-tiempo-q1', text: '¿La reunión suele durar más de 15 minutos?' },
          { id: 'limite-tiempo-q2', text: '¿Se menciona que la reunión ha llegado a extenderse por discusiones o problemas?' },
          { id: 'limite-tiempo-q3', text: '¿Se omite cualquier mención al objetivo del Sprint en la descripción de la reunión?' }
        ],
        expectedAnswers: [true, true, true]
      }
    ]
  },
  {
    id: 'product-backlog',
    name: 'Product Backlog',
    antipatterns: [
      {
        id: 'gran-tamano',
        name: 'Over-sized',
        questions: [
          { id: 'gran-tamano-q1', text: '¿El Backlog tiene una gran cantidad de elementos planificados a largo plazo?' },
          { id: 'gran-tamano-q2', text: '¿El equipo refina elementos que luego no se desarrollan?' },
          { id: 'gran-tamano-q3', text: '¿El equipo evita eliminar elementos del Backlog?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'problemas-obsoletos',
        name: 'Outdated issues',
        questions: [
          { id: 'problemas-obsoletos-q1', text: '¿Existen elementos en el Backlog que permanecen mucho tiempo sin ser discutidos?' },
          { id: 'problemas-obsoletos-q2', text: '¿El Product Backlog se revisa regularmente durante el Sprint?' },
          { id: 'problemas-obsoletos-q3', text: '¿Existen elementos del Backlog que dejaron de ser útiles debido a cambios en el proyecto?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: '100-avance',
        name: '100% in advance',
        questions: [
          { id: '100-avance-q1', text: '¿El Backlog abarca casi en su totalidad el proyecto desde un inicio?' },
          { id: '100-avance-q2', text: '¿El Backlog permanece sin cambios durante gran parte del proyecto?' },
          { id: '100-avance-q3', text: '¿El equipo realiza adaptaciones en el Backlog?' }
        ],
        expectedAnswers: [true, true, false]
      }
    ]
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    antipatterns: [
      {
        id: 'planeacion-detallada',
        name: 'Planning too detailed',
        questions: [
          { id: 'planeacion-detallada-q1', text: '¿El equipo planifica todas las tareas del Sprint como un avance?' },
          { id: 'planeacion-detallada-q2', text: '¿El equipo evita realizar cambios en las tareas planificadas?' },
          { id: 'planeacion-detallada-q3', text: '¿Los elementos del Backlog rara vez cambian o emergen a lo largo del Sprint?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'poca-planificacion',
        name: 'Too little planning',
        questions: [
          { id: 'poca-planificacion-q1', text: '¿El equipo se ha saltado la planificación por completo en alguna ocasión?' },
          { id: 'poca-planificacion-q2', text: '¿Existe algún criterio para seleccionar los elementos del backlog?' },
          { id: 'poca-planificacion-q3', text: '¿El equipo inicia el Sprint sin discutir cómo abordarán el trabajo?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: 'sin-objetivo',
        name: 'No business objective, no Sprint Goal, just random stuff',
        questions: [
          { id: 'sin-objetivo-q1', text: '¿Las tareas del Sprint tienen un propósito en común?' },
          { id: 'sin-objetivo-q2', text: '¿El equipo define una meta clara para el Sprint antes de iniciar el trabajo?' },
          { id: 'sin-objetivo-q3', text: '¿Existe una justificación documentada de por qué las tareas fueron incluidas en el Sprint?' }
        ],
        expectedAnswers: [false, false, false]
      },
      {
        id: 'asuntos-pendientes',
        name: 'Unfinished business',
        questions: [
          { id: 'asuntos-pendientes-q1', text: '¿Se han trasladado tareas o historias incompletas de un Sprint al siguiente?' },
          { id: 'asuntos-pendientes-q2', text: '¿Se ajusta la definición o prioridad de una tarea o historia si no se completa en el Sprint anterior?' },
          { id: 'asuntos-pendientes-q3', text: '¿Se documentan las razones por las que una tarea o historia no fue completada en un Sprint?' }
        ],
        expectedAnswers: [true, false, false]
      }
    ]
  },
  {
    id: 'sprint',
    name: 'Sprint',
    antipatterns: [
      {
        id: 'no-entregar-meta',
        name: 'Not delivering the Sprint Goal',
        questions: [
          { id: 'no-entregar-meta-q1', text: '¿El equipo ha incumplido la meta del Sprint en alguna ocasión?' },
          { id: 'no-entregar-meta-q2', text: '¿Se han identificado factores internos o externos que afecten al desarrollo del Sprint?' },
          { id: 'no-entregar-meta-q3', text: '¿Se establecen criterios claros para considerar que se logró la meta del Sprint?' }
        ],
        expectedAnswers: [true, true, false]
      }
    ]
  },
  {
    id: 'sprint-review',
    name: 'Sprint Review',
    antipatterns: [
      {
        id: 'no-sprint-review',
        name: 'No Sprint Review',
        questions: [
          { id: 'no-sprint-review-q1', text: '¿El equipo en alguna ocasión ha omitido el Sprint Review?' },
          { id: 'no-sprint-review-q2', text: '¿El Sprint Review se omite si no se completó todo el trabajo planeado?' },
          { id: 'no-sprint-review-q3', text: '¿Se generan acciones o decisiones a partir del Sprint Review?' }
        ],
        expectedAnswers: [true, true, false]
      },
      {
        id: 'muerte-powerpoint',
        name: 'Death by PowerPoint',
        questions: [
          { id: 'muerte-powerpoint-q1', text: '¿El Sprint Review se describe como una exposición?' },
          { id: 'muerte-powerpoint-q2', text: '¿La retroalimentación del Sprint Review ayuda a adaptar y mejorar el Backlog?' },
          { id: 'muerte-powerpoint-q3', text: '¿Se menciona que las personas externas al equipo participaron activamente durante el Sprint Review?' }
        ],
        expectedAnswers: [true, false, false]
      }
    ]
  },
  {
    id: 'sprint-retrospective',
    name: 'Sprint Retrospective',
    antipatterns: [
      {
        id: 'no-retro',
        name: '#NoRetro',
        questions: [
          { id: 'no-retro-q1', text: '¿El equipo en alguna ocasión ha omitido el Sprint Retrospective?' },
          { id: 'no-retro-q2', text: '¿En la Retrospective se identifican acciones de mejora?' },
          { id: 'no-retro-q3', text: '¿La Retrospective se centra en validar prácticas actuales sin proponer cambios?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: 'no-documentacion',
        name: '#NoDocumentation',
        questions: [
          { id: 'no-documentacion-q1', text: '¿Existe documentación que contenga lo discutido en el Retrospective?' },
          { id: 'no-documentacion-q2', text: '¿Existe alguien designado para tomar notas u otro tipo de evidencia del Retrospective?' },
          { id: 'no-documentacion-q3', text: '¿Se indica dónde queda registrada la información de la Retrospective?' }
        ],
        expectedAnswers: [false, false, false]
      }
    ]
  }
];

export const managementMappings: Record<string, ManagementAntipattern[]> = {
  'reporte-estatus': [
    {
      name: 'Glass Case Plan',
      justification: 'La reunión pierde su valor real, como un plan que se sigue pero que no proporciona un sentido de la visión ni identifica las desviaciones',
      relationshipStrength: 'L'
    }
  ],
  'sin-rutina': [
    {
      name: 'Road to Nowhere',
      justification: 'La falta de consistencia en las reuniones del Daily Scrum, la falta de dirección y planificación provocan confusión y desalineación en el equipo.',
      relationshipStrength: 'P'
    }
  ],
  'limite-tiempo': [
    {
      name: 'Project mismanagement',
      justification: 'La extensión prolongada de la Daily Scrum refleja una incorrecta gestión del tiempo y del foco.',
      relationshipStrength: 'L'
    }
  ],
  'gran-tamano': [
    {
      name: 'Fire Drill',
      justification: 'La acumulación excesiva de ítems implica que se llegará a un punto crítico donde el equipo no podrá manejar la carga de trabajo.',
      relationshipStrength: 'F'
    },
    {
      name: 'Inflexible Plan',
      justification: 'La acumulación excesiva de ítems implica rigidez y caos tal como ocurre cuando no se hacen ajustes en la planificación.',
      relationshipStrength: 'F'
    }
  ],
  'problemas-obsoletos': [
    {
      name: 'Glass Case Plan',
      justification: 'La falta de actualización del backlog implica un plan que no se adapta a las necesidades actuales, como un plan que no se revisa.',
      relationshipStrength: 'L'
    },
    {
      name: 'Road to Nowhere',
      justification: 'La falta de actualización del backlog implica una pérdida de control y una mayor desorientación.',
      relationshipStrength: 'L'
    }
  ],
  '100-avance': [
    {
      name: 'Inflexible Plan',
      justification: 'Formalizar todo el backlog desde el inicio genera falta de adaptabilidad, como un plan rígido.',
      relationshipStrength: 'F'
    }
  ],
  'planeacion-detallada': [
    {
      name: 'Inflexible Plan',
      justification: 'Detallar todo al inicio impide adaptación, tal como un plan que no se flexibiliza según el contexto.',
      relationshipStrength: 'F'
    }
  ],
  'poca-planificacion': [
    {
      name: 'Road to Nowhere',
      justification: 'La falta de planificación útil ocasiona descontrol, dependencia de un plan no revisado e incertidumbre.',
      relationshipStrength: 'F'
    },
    {
      name: 'Glass Case Plan',
      justification: 'La falta de planificación útil genera un plan que no se adapta a las necesidades del equipo, como un plan que no se revisa.',
      relationshipStrength: 'F'
    }
  ],
  'sin-objetivo': [
    {
      name: 'Road to Nowhere',
      justification: 'La falta de propósito en el Sprint muestra la ausencia de visión y objetivos claros.',
      relationshipStrength: 'L'
    }
  ],
  'asuntos-pendientes': [
    {
      name: 'Fire Drill',
      justification: 'La acumulación de trabajo sin cierre ni discusión acabará en descontrol.',
      relationshipStrength: 'L'
    },
    {
      name: 'Project Mismanagement',
      justification: 'La acumulación de trabajo afirma una gestión deficiente, como un proyecto que no se controla adecuadamente.',
      relationshipStrength: 'L'
    }
  ],
  'no-entregar-meta': [
    {
      name: 'Fire Drill',
      justification: 'El no poder entregar el Sprint refleja una gestión reactiva y ausencia de seguimiento.',
      relationshipStrength: 'F'
    },
    {
      name: 'Project Mismanagement',
      justification: 'El no poder entregar el Sprint implica que no se está gestionando adecuadamente el proyecto',
      relationshipStrength: 'F'
    }
  ],
  'no-sprint-review': [
    {
      name: 'Glass Case Plan',
      justification: 'Omitir la revisión impide el generar un plan útil y efectivo.',
      relationshipStrength: 'P'
    },
    {
      name: 'Road to Nowhere',
      justification: 'Omitir la revisión impide el seguimiento y ajuste de rumbo.',
      relationshipStrength: 'P'
    }
  ],
  'muerte-powerpoint': [
    {
      name: 'Project Mismanagement',
      justification: 'Una revisión sin validación ni interacción imposibilita la evaluación del producto.',
      relationshipStrength: 'P'
    }
  ],
  'no-retro': [
    {
      name: 'Glass Case Plan',
      justification: 'La falta de análisis del proceso y mejora continua es equivalente a no actualizar los planes.',
      relationshipStrength: 'L'
    },
    {
      name: 'Road to Nowhere',
      justification: 'La falta de análisis del proceso y mejora continua provoca descontrol y falta de dirección.',
      relationshipStrength: 'L'
    }
  ],
  'no-documentacion': [
    {
      name: 'Glass Case Plan',
      justification: 'La falta de documentación impide que se genere un plan útil y efectivo.',
      relationshipStrength: 'P'
    },
    {
      name: 'Project Mismanagement',
      justification: 'La falta de documentación impide seguimiento, evaluación y trazabilidad.',
      relationshipStrength: 'P'
    }
  ]
};