# Classes and assignments

User-authorized scope: Reading & Listening mock test assignments, due dates and whole-class results. Admin assigns a teacher and enrolls students; only the current teacher of a class or an admin can create or manage that class’s work. No Vocab homework, email notifications or automatic assignments.

Use the existing Roboto, Primary Blue #004AAD, Gold #CCA26C, semantic light/dark surfaces, 2px card outlines and restrained shadows. The design-system search suggested a flat, clear education management hierarchy; its marketing showcase, teal palette and new fonts do not fit this established product. Retain Master tokens and apply clear labels, visible assignments and mobile wrapping.

Staff starts on Classes & assignments, with existing Activity & accounts in a second tab. Class cards show roster size, teacher and admin assignment controls. Assignments use a labelled test selector, optional title/instructions and required due date in Vietnam time (UTC+7). Students see assigned work on their Overview and a dedicated Assigned work page. Class results distinguish not started, in progress, submitted and late; zero is a valid score, absent results use a dash. Late work is accepted and labelled. Individual attempts remain available to the class’s current teacher.

Homework attempts are independent of free practice and other assignments, with one immutable submitted attempt per student and assignment. Existing class, account and practice data must remain intact. Apply additive schema before deployment, retain the legacy free-draft index while old server code is live, and retire it only after the new server has deployed.

## Roster controls and searchable choices — 5 November 2026

All visible account codes are uppercase, while canonical usernames remain unchanged. Existing enroll APIs are reused in groups of four requests for multi-select addition, with per-learner failure retention. No search endpoint or UI dependency is added. Names and codes are matched without Vietnamese accents/case, with 250ms debounce and at most ten options. Keyboard focus stays in the combobox; selected learners are removable chips; existing members are disabled. Preserve native select values and change events in single-choice forms and filters. Popup height is bounded at 320px and repositions within the viewport, including dialogs.

Admin can rename classes, remove or move a learner, or add a second class. Class deletion is reversible archival with a restore action. Current classes and usernames with zero-prefixed codes/names remain distinct. Roster removal does not delete accounts or attempts, and reports include learners with historical assigned attempts. Teachers remain restricted to their classes, while admin alone changes roster/class structure. Confirm removals in the product UI.
