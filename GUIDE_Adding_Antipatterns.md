# Guide for code changes (English)

## 1) Overview

This project is a React + TypeScript + Vite + Tailwind application that evaluates the presence of Scrum antipatterns using a dichotomous (yes/no) questionnaire.

The main logic is in `src/data/antipatterns.ts`, while the UI is composed of components in `src/components` and pages in `src/pages`.

---

## 2) Project structure

```
src/
 ├─ components/         # UI specific components
 │   ├─ AntipatternCard.tsx   # Renders an antipattern with questions
 │   ├─ ResultsTab.tsx        # Shows results grouped by stage
 │   └─ ui/                   # Reusable UI components (shadcn/ui)
 │
 ├─ data/
 │   └─ antipatterns.ts # Catalog of stages, antipatterns, questions and mappings
 │
 ├─ hooks/              # Reusable hooks (eg: mobile, toast)
 │
 ├─ lib/
 │   └─ utils.ts        # Common utilities
 │
 ├─ pages/
 │   ├─ Index.tsx       # Main page with tabs and questionnaire
 │   └─ NotFound.tsx    # 404 page
 │
 ├─ App.tsx             # Main app entry point
 └─ main.tsx            # Bootstrap with ReactDOM and Providers
```

Important root files:
- `package.json` → dependencies and scripts.
- `tailwind.config.ts` → Tailwind configuration.
- `vite.config.ts` → Vite configuration.
- `tsconfig.*.json` → TypeScript configuration.

---

## 3) Main data structures (`src/data/antipatterns.ts`)

(Types are the same as in the Spanish guide and in the code.)

- `scrumTabs: TabData[]` → List of stages (Daily, Product Backlog, etc.) and their antipatterns.
- `managementMappings: Record<string, ManagementAntipattern[]>` → Mapping from Scrum antipatterns to management antipatterns.

---

## 4) Flow

1. Tabs are rendered from `scrumTabs`.
2. User answers Yes/No questions for each antipattern.
3. Answers are compared to `expectedAnswers`.
4. If all match → the antipattern is detected.
5. Related management antipatterns (`managementMappings`) are shown.

---

## 5) How to add a new antipattern

Example: add "Drifting off-topic" to **Daily**.

1. Edit `src/data/antipatterns.ts` and add a new antipattern in `scrumTabs`:

```ts
{
  id: 'drifting-off-topic',
  name: 'Drifting off-topic',
  questions: [
    { id: 'drifting-off-topic-q1', text: 'Does the Daily often drift away from the Sprint Goal?' },
    { id: 'drifting-off-topic-q2', text: 'Are long technical solutions discussed during the Daily?' },
    { id: 'drifting-off-topic-q3', text: 'Are actions postponed outside the Daily to separate sessions?' }
  ],
  expectedAnswers: [true, true, false]
}
```

2. Add mappings in `managementMappings`:

```ts
'drifting-off-topic': [
  {
    name: 'Project Mismanagement',
    justification: 'Meetings without focus show lack of control and discipline in the process.',
    relationshipStrength: 'L'
  }
]
```

3. Save and test the UI.

---

## 6) How to add a new stage (tab)

1. Add a new object to `scrumTabs` (example: refinement) — it will automatically appear in the UI.

---

## 7) Dynamic changes note

The system is designed dynamically: adding a new antipattern or stage updates the UI and PDF export without changing presentation or report logic. Edit `src/data/antipatterns.ts` to extend the app.
