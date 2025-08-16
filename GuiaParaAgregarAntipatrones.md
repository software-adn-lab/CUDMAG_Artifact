# Guía para cambios en el código

## 1) Visión General

Este proyecto es una aplicación en **React + TypeScript + Vite + Tailwind** que permite evaluar la presencia de **antipatrones de Scrum** a partir de un cuestionario dicotómico (sí/no).  

La lógica principal está en **`src/data/antipatterns.ts`**, mientras que la UI se compone con componentes en `src/components` y páginas en `src/pages`.

---

## 2) Estructura del proyecto

```
src/
 ├─ components/         # Componentes de UI específicos
 │   ├─ AntipatternCard.tsx   # Renderiza un antipatrón con preguntas
 │   ├─ ResultsTab.tsx        # Muestra resultados agrupados por fase
 │   └─ ui/                   # Librería de componentes reutilizables (shadcn/ui)
 │
 ├─ data/
 │   └─ antipatterns.ts # Catálogo de fases, antipatrones, preguntas y mappings
 │
 ├─ hooks/              # Hooks reutilizables (ej: mobile, toast)
 │
 ├─ lib/
 │   └─ utils.ts        # Utilidades comunes
 │
 ├─ pages/
 │   ├─ Index.tsx       # Página principal con tabs y cuestionario
 │   └─ NotFound.tsx    # Página de error 404
 │
 ├─ App.tsx             # Entry point principal de la app
 └─ main.tsx            # Bootstrap con ReactDOM y Providers
```

Archivos raíz importantes:
- `package.json` → dependencias y scripts.
- `tailwind.config.ts` → configuración de Tailwind.
- `vite.config.ts` → configuración de Vite.
- `tsconfig.*.json` → configuración de TypeScript.

---

## 3) Estructuras de datos principales (`src/data/antipatterns.ts`)

### Tipos

```ts
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
```

### Datos

- `scrumTabs: TabData[]` → Lista de fases (Daily, Product Backlog, etc.) y sus antipatrones.
- `managementMappings: Record<string, ManagementAntipattern[]>` → Mapeo de antipatrones de Scrum hacia los antipatrones de gestión.

---

## 4) Flujo de funcionamiento

1. **Render de tabs** (cada fase → `scrumTabs`).
2. Usuario responde **Sí/No** a las preguntas de cada antipatrón.
3. Se comparan respuestas del usuario con `expectedAnswers`.
4. Si coinciden todas → se detecta el antipatrón.
5. Se muestran los antipatrones de gestión relacionados (`managementMappings`).

---

## 5) Cómo añadir **un nuevo antipatrón**

Ejemplo: añadir "Drifting off-topic" a **Daily**.

1. Editar `src/data/antipatterns.ts` y en `scrumTabs`:

```ts
{
  id: 'drifting-off-topic',
  name: 'Drifting off-topic',
  questions: [
    { id: 'drifting-off-topic-q1', text: '¿La Daily suele desviarse del objetivo del Sprint?' },
    { id: 'drifting-off-topic-q2', text: '¿Se suelen discutir soluciones técnicas extensas en la Daily?' },
    { id: 'drifting-off-topic-q3', text: '¿Se posponen acciones fuera de la Daily a espacios separados?' }
  ],
  expectedAnswers: [true, true, false]
}
```

2. En `managementMappings`:

```ts
'drifting-off-topic': [
  {
    name: 'Project Mismanagement',
    justification: 'Las reuniones sin foco muestran carencia de control y disciplina en el proceso.',
    relationshipStrength: 'L'
  }
]
```

3. Guardar y probar en la UI.

---

## 6) Cómo añadir **una nueva fase** (tab)

1. Agregar un nuevo objeto a `scrumTabs`:

```ts
{
  id: 'refinement',
  name: 'Product Backlog Refinement',
  antipatterns: [
    {
      id: 'refine-sin-criterios',
      name: 'Refinement without criteria',
      questions: [
        { id: 'refine-sin-criterios-q1', text: '¿Se refinan ítems sin criterios claros?' },
        { id: 'refine-sin-criterios-q2', text: '¿Cambian los criterios después de empezar el desarrollo?' },
        { id: 'refine-sin-criterios-q3', text: '¿Se revisan criterios con el PO y equipo?' }
      ],
      expectedAnswers: [true, true, false]
    }
  ]
}
```

2. Se mostrará automáticamente en la UI como un tab más.

 ## 7) Aclaración sobre cambios dinámicos

El sistema está diseñado de forma **dinámica**.  

- Si se agrega un nuevo **antipatrón** dentro de una fase existente, o incluso una nueva **fase/actividad de Scrum**, la aplicación se adapta automáticamente:  
  - El número total de preguntas se recalcula en la UI (ejemplo: si había 45 preguntas y se agrega un antipatrón con 3 preguntas, ahora serán 48).  
  - La nueva fase o antipatrón aparecerá en la interfaz de tabs sin necesidad de código adicional.  
  - Los resultados también se verán reflejados en el **tab de resultados** y en la **exportación a PDF**.  

Esto significa que la única acción necesaria para extender la aplicación es **modificar el catálogo en `src/data/antipatterns.ts`**, sin tocar la lógica de presentación o generación de reportes.

