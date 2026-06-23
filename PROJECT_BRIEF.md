# PROJECT BRIEF — Client Project Tracker (Koda Frontend Assessment)

> Internal working brief. Reference for all build decisions. Scenario:
> frontend for a digital agency's internal Client Project Tracker.
> No backend — test_data.json is the data source.

---

## Scoring weights (build priority should match this)

| Area                          | Weight |
|--------------------------------|--------|
| Functionality                  | 30%    |
| Code Quality                   | 25%    |
| Architecture                   | 20%    |
| Documentation                  | 10%    |
| Error Handling & Validation    | 10%    |
| Communication                  | 5%     |

**Functionality + Code Quality + Architecture = 75% of the score.**
Bonus features (search, filter, sort, dashboard, tests) are optional —
only build them after the core CRUD flow is solid and validated.

---

## Data model (exact shape — from test_data.json)

```js
/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} clientName
 * @property {string} projectName
 * @property {string} description
 * @property {"Planning"|"In Progress"|"On Hold"|"Completed"} status
 * @property {"Low"|"Medium"|"High"} priority
 * @property {string} startDate - ISO date "YYYY-MM-DD"
 * @property {string} dueDate - ISO date "YYYY-MM-DD"
 */
```

12 sample projects provided. Use these exact status/priority enum values
— don't invent new ones.

---

## Stack

- **Next.js (App Router) + JavaScript + Tailwind CSS**
- No backend. Load test_data.json into React state on init.
- **Persist changes to localStorage** so create/edit/delete survive a
  page refresh — small touch that shows real product thinking beyond
  the literal "no backend required" minimum.
- State management: React state (useState/useReducer) is sufficient at
  this scale — no need for Redux/Zustand, would be over-engineering.

---

## Required features (build in this order)

1. **Project List** — clean layout (table or card grid) showing Client
   Name, Project Name, Status, Priority, Due Date. Status and Priority
   as colored badges (reuse the badge pattern from prior work — teal/
   amber/slate-style color coding by status, red/amber/green by
   priority).
2. **Create Project** — form with all fields.
3. **Edit Project** — same form component, reused for create and edit
   (don't duplicate the form).
4. **Delete Project** — with a confirmation step before removing. Don't
   delete on a single click — that's a real error-handling/UX point.
5. **Form Validation:**
   - Client Name — required
   - Project Name — required
   - Status — required, must be one of the 4 valid values
   - Priority — required, must be one of the 3 valid values
   - Start Date and Due Date — both required; **Due Date cannot be
     earlier than Start Date** (explicit requirement — don't miss this)
6. **UI States:**
   - Loading — brief skeleton/spinner on initial data load
   - Empty — friendly message when no projects exist (e.g. after
     deleting all)
   - Error — wrap state operations in try/catch; show a clear error
     message if something fails (simulate if needed, e.g. localStorage
     write failure)

---

## Bonus features (only if time allows, in this priority order)

1. Responsive mobile design — cheap to do well, strong differentiator
2. Search projects (by client or project name)
3. Filter by Status
4. Filter by Priority
5. Dashboard summary (counts of projects by status)
6. Sorting
7. Unit tests — lowest priority given the 2–4 hour time budget

---

## Architecture notes

- Consistent `Project` object shape used across all components (list,
  form, card) — document expected fields with a JSDoc comment block if
  helpful, but no TS interfaces needed since this is plain JS.
- One shared `ProjectForm` component for both create and edit — pass an
  optional `project` prop; if present, it's edit mode.
- Keep validation logic in one place (a single `validateProject`
  function), not scattered inline checks — improves code quality score.
- Component structure:
  ```
  app/
    page.js              -> main tracker view
  components/
    ProjectList.js
    ProjectCard.js / ProjectRow.js
    ProjectForm.js        (shared create/edit)
    DeleteConfirmDialog.js
    StatusBadge.js
    PriorityBadge.js
    EmptyState.js
    LoadingState.js
    ErrorState.js
  lib/
    validateProject.js
    storage.js            (localStorage read/write helpers)
  data/
    test_data.json
  ```

---

## Submission deliverables (from SUBMISSION.md)

- [ ] Public GitHub repo link
- [ ] README.md — setup instructions, tech choices, how to run, any
      assumptions made
- [ ] **Technical Reflection** (answer directly in README or a separate
      doc):
  1. Why this implementation approach?
  2. What tradeoffs were made?
  3. What would be improved with more time?
  4. What was the most challenging part?
  5. AI tools used — which ones, how, what was kept/changed

## Workflow discipline (mirrors ShiftFlow process — keep doing this)

- Build feature by feature, not one mega-prompt.
- Review every diff, edit/refine by hand where needed.
- Commit after each completed, reviewed feature — sensible, descriptive
  commit messages.
- Keep notes on what AI generated correctly vs. what was changed — feeds
  directly into the required Technical Reflection answers.
