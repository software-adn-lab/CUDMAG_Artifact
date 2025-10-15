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
          { id: 'reporte-estatus-q1', text: 'Is a structured format (for example the three questions or similar) used to guide the meeting?' },
          { id: 'reporte-estatus-q2', text: 'Is the Daily Scrum presented as a status update to a specific person?' },
          { id: 'reporte-estatus-q3', text: 'Are the updates in the meeting repetitive or predictable?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'sin-rutina',
        name: 'No routine',
        questions: [
          { id: 'sin-rutina-q1', text: 'Does the meeting always happen on the same platform or place and at a defined time?' },
          { id: 'sin-rutina-q2', text: 'Is the meeting sometimes skipped?' },
          { id: 'sin-rutina-q3', text: 'Is the meeting structure defined by steps or speaking turns?' }
        ],
        expectedAnswers: [false, true, true]
      },
      {
        id: 'limite-tiempo',
        name: 'Not enforcing the time-box',
        questions: [
          { id: 'limite-tiempo-q1', text: 'Does the meeting usually last more than 15 minutes?' },
          { id: 'limite-tiempo-q2', text: 'Is it mentioned that the meeting often extends due to discussions or issues?' },
          { id: 'limite-tiempo-q3', text: 'Is any reference to the Sprint Goal omitted when describing the meeting?' }
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
          { id: 'gran-tamano-q1', text: 'Does the Backlog contain a large number of long-term planned items?' },
          { id: 'gran-tamano-q2', text: 'Does the team refine items that are later not implemented?' },
          { id: 'gran-tamano-q3', text: 'Does the team avoid removing items from the Backlog?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'problemas-obsoletos',
        name: 'Outdated issues',
        questions: [
          { id: 'problemas-obsoletos-q1', text: 'Are there Backlog items that have remained undiscussed for a long time?' },
          { id: 'problemas-obsoletos-q2', text: 'Is the Product Backlog reviewed regularly during the Sprint?' },
          { id: 'problemas-obsoletos-q3', text: 'Are there Backlog items that are no longer useful due to project changes?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: '100-avance',
        name: '100% in advance',
        questions: [
          { id: '100-avance-q1', text: 'Does the Backlog cover almost the entire project from the start?' },
          { id: '100-avance-q2', text: 'Does the Backlog remain unchanged for most of the project?' },
          { id: '100-avance-q3', text: 'Does the team make adaptations to the Backlog?' }
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
          { id: 'planeacion-detallada-q1', text: 'Does the team plan every single Sprint task in advance?' },
          { id: 'planeacion-detallada-q2', text: 'Does the team avoid making changes to planned tasks?' },
          { id: 'planeacion-detallada-q3', text: 'Do Backlog items rarely change or emerge during the Sprint?' }
        ],
        expectedAnswers: [true, true, true]
      },
      {
        id: 'poca-planificacion',
        name: 'Too little planning',
        questions: [
          { id: 'poca-planificacion-q1', text: 'Has the team ever skipped planning completely?' },
          { id: 'poca-planificacion-q2', text: 'Is there a clear criterion to select Backlog items?' },
          { id: 'poca-planificacion-q3', text: 'Does the team start the Sprint without discussing how they will approach the work?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: 'sin-objetivo',
        name: 'No business objective, no Sprint Goal, just random stuff',
        questions: [
          { id: 'sin-objetivo-q1', text: 'Do Sprint tasks share a common purpose?' },
          { id: 'sin-objetivo-q2', text: 'Does the team define a clear Sprint Goal before starting the work?' },
          { id: 'sin-objetivo-q3', text: 'Is there documented justification for why tasks were included in the Sprint?' }
        ],
        expectedAnswers: [false, false, false]
      },
      {
        id: 'asuntos-pendientes',
        name: 'Unfinished business',
        questions: [
          { id: 'asuntos-pendientes-q1', text: 'Are incomplete tasks or stories carried over to the next Sprint?' },
          { id: 'asuntos-pendientes-q2', text: 'Is the definition or priority of a task/story adjusted if it was not completed in the previous Sprint?' },
          { id: 'asuntos-pendientes-q3', text: 'Are reasons documented for why a task/story was not completed in a Sprint?' }
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
          { id: 'no-entregar-meta-q1', text: 'Has the team ever failed to achieve the Sprint Goal?' },
          { id: 'no-entregar-meta-q2', text: 'Have internal or external factors been identified that affect Sprint execution?' },
          { id: 'no-entregar-meta-q3', text: 'Are clear criteria set to determine whether the Sprint Goal was achieved?' }
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
          { id: 'no-sprint-review-q1', text: 'Has the team ever skipped the Sprint Review?' },
          { id: 'no-sprint-review-q2', text: 'Is the Sprint Review skipped if not all planned work was completed?' },
          { id: 'no-sprint-review-q3', text: 'Are actions or decisions generated from the Sprint Review?' }
        ],
        expectedAnswers: [true, true, false]
      },
      {
        id: 'muerte-powerpoint',
        name: 'Death by PowerPoint',
        questions: [
          { id: 'muerte-powerpoint-q1', text: 'Is the Sprint Review described as a presentation?' },
          { id: 'muerte-powerpoint-q2', text: 'Does feedback from the Sprint Review help adapt and improve the Backlog?' },
          { id: 'muerte-powerpoint-q3', text: 'Is it mentioned that people outside the team actively participated during the Sprint Review?' }
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
          { id: 'no-retro-q1', text: 'Has the team ever skipped the Sprint Retrospective?' },
          { id: 'no-retro-q2', text: 'Are improvement actions identified during the Retrospective?' },
          { id: 'no-retro-q3', text: 'Does the Retrospective focus on validating current practices without proposing changes?' }
        ],
        expectedAnswers: [true, false, true]
      },
      {
        id: 'no-documentacion',
        name: '#NoDocumentation',
        questions: [
          { id: 'no-documentacion-q1', text: 'Is there documentation that contains what was discussed in the Retrospective?' },
          { id: 'no-documentacion-q2', text: 'Is someone assigned to take notes or other evidence during the Retrospective?' },
          { id: 'no-documentacion-q3', text: 'Is it indicated where Retrospective information is recorded?' }
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
  justification: 'Formalizing the entire backlog from the start causes lack of adaptability, like a rigid plan.',
      relationshipStrength: 'F'
    }
  ],
  'planeacion-detallada': [
    {
      name: 'Inflexible Plan',
  justification: 'Detailing everything at the beginning prevents adaptation, like a plan that is not flexible to context.',
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
  justification: 'The accumulation of work indicates poor management, as a project that is not properly controlled.',
      relationshipStrength: 'L'
    }
  ],
  'no-entregar-meta': [
    {
      name: 'Fire Drill',
  justification: 'Failure to deliver the Sprint reflects reactive management and lack of follow-up.',
      relationshipStrength: 'F'
    },
    {
      name: 'Project Mismanagement',
  justification: 'Not being able to deliver the Sprint implies the project is not being managed properly.',
      relationshipStrength: 'F'
    }
  ],
  'no-sprint-review': [
    {
      name: 'Glass Case Plan',
  justification: 'Skipping the review prevents generating a useful and effective plan.',
      relationshipStrength: 'P'
    },
    {
      name: 'Road to Nowhere',
  justification: 'Skipping the review prevents monitoring and course adjustment.',
      relationshipStrength: 'P'
    }
  ],
  'muerte-powerpoint': [
    {
      name: 'Project Mismanagement',
  justification: 'A review without validation or interaction makes it impossible to properly evaluate the product.',
      relationshipStrength: 'P'
    }
  ],
  'no-retro': [
    {
      name: 'Glass Case Plan',
  justification: 'Lack of process analysis and continuous improvement is equivalent to not updating plans.',
      relationshipStrength: 'L'
    },
    {
      name: 'Road to Nowhere',
  justification: 'Lack of process analysis and continuous improvement causes disorder and lack of direction.',
      relationshipStrength: 'L'
    }
  ],
  'no-documentacion': [
    {
      name: 'Glass Case Plan',
  justification: 'Lack of documentation prevents creating a useful and effective plan.',
      relationshipStrength: 'P'
    },
    {
      name: 'Project Mismanagement',
  justification: 'Lack of documentation prevents tracking, evaluation, and traceability.',
      relationshipStrength: 'P'
    }
  ]
};