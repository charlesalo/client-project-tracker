# Client Project Tracker — Koda Frontend Assessment

A frontend-only Client Project Tracker for a digital agency: create, view,
edit, and delete client projects, with search, filtering, and a status
summary dashboard. Built against `REQUIREMENTS.md` and `SUBMISSION.md`
from the assessment repo.

## Tech choices

- **Next.js (App Router) + plain JavaScript** — no TypeScript. Chosen for
  speed within the 2–4 hour budget; the assessment explicitly allows any
  framework/language combination, and the extra type-authoring overhead
  wasn't worth trading against the 75%-weighted Functionality + Code
  Quality + Architecture criteria.
- **Tailwind CSS** for styling — fast to iterate with, no separate CSS
  files to maintain.
- **React state only** (`useState`) — no Redux/Zustand. The app's state
  (one array of projects, a couple of UI flags) doesn't need anything
  heavier at this scale; adding a state library would be over-engineering
  for the problem size.
- **`localStorage`** for persistence — not required by the brief, but
  added so create/edit/delete survive a page refresh, which is closer to
  how a real (if backend-less) product would behave.

## Setup & running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. No environment variables or backend
setup needed — `data/test_data.json` seeds the app on first load.

## Assumptions made

- On first visit, the app seeds itself from `data/test_data.json` and
  immediately persists that seed into `localStorage`. On every later
  visit, `localStorage` is the source of truth — `test_data.json` is
  only ever used as the initial seed, not re-read afterward. Clearing
  the `projects` key in `localStorage` (or DevTools → Application →
  Local Storage) resets the app back to the original 12 sample projects.
- New projects get an `id` of `Math.max(...existing ids) + 1` — no
  backend, so there's no real ID-generation authority; this is a
  reasonable client-side stand-in.
- "Error state" is demonstrated via `localStorage` write failures
  (wrapped in try/catch) since there's no real network/backend call that
  could fail in this scope.

## Features implemented

**Required:** project list (card grid), create, edit (shared form
component for both), delete with a confirmation dialog, full field
validation (including due-date-not-before-start-date), and loading /
empty / error UI states.

**Bonus:** responsive layout, search by client/project name, priority
filter, and a dashboard summary of project counts by status — the
summary cards double as the status filter (clicking a card filters the
list, removing the need for a separate status dropdown).

Sorting and unit tests were not implemented — see the Technical
Reflection below for why.

## Technical Reflection

**1. Why this implementation approach?**
I followed the rubric weighting directly: Functionality, Code Quality,
and Architecture make up 75% of the score, so I built the required CRUD
flow and validation first and treated bonus features as genuinely
optional, only adding them once the core was solid and verified. I used
a single shared `ProjectForm` component for both create and edit (an
optional `project` prop switches the mode) and one centralized
`validateProject()` function rather than scattering validation checks
across components — both decisions aimed squarely at the Code
Quality/Architecture weighting.

**2. What tradeoffs did I make?**
I chose plain JavaScript over TypeScript to protect my time budget,
trading some type-safety signal for speed and lower risk of the
assessment running long on type-fixing rather than features. I also
kept state management to plain `useState`/derived values instead of
`useReducer` or a state library — simpler to read, appropriate for an
app with one core array and a few UI flags, though a larger version of
this app would likely outgrow it.

**3. What would I improve with more time?**
Sorting (by due date or client name) and a handful of unit tests around
`validateProject()` and the `localStorage` helpers — both were on the
brief's bonus list but ranked lowest given the time budget, so I left
them out deliberately rather than rushing them in at the end. I'd also
add a toast/inline confirmation after successful create/edit/delete
actions, since right now the only feedback is the modal closing and the
list updating.

**4. What was the most challenging part?**
Getting the edit flow to correctly pre-fill the date inputs from the
stored ISO date strings — `<input type="date">` is strict about its
value format, and it was an easy spot for a silent off-by-one or blank-
field bug if not tested deliberately after building the form.

**5. AI tools used**
Claude Code for implementation, Claude (chat) for planning and review.
I worked feature-by-feature — one component or concern per prompt,
reviewing every diff before committing — rather than one large prompt
for the whole app. AI scaffolded clean component structure and the
validation logic correctly on the first pass; what I mainly adjusted by
hand was UX sequencing (e.g. defaulting focus to "Cancel" rather than
"Delete" in the confirmation dialog, and keeping the dashboard summary
counts based on the full project list rather than the filtered one, so
the at-a-glance totals stay stable while searching/filtering).
