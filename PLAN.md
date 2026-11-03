## Implementation Plan & Process

To build this application systematically, I followed a strict 4-step plan. 

### 4-Step Ordered Plan & Checkpoints
1. **Data & Structure:** Hardcode the deterministic 10x15 city data and build the HTML shell.
   * *Checkpoint:* Data loads in the console; UI renders without errors.
2. **Core Logic & Gatekeeper:** Build the `validateScenario` function and the pure integer-based math engine for accurate travel sorting.
   * *Checkpoint:* The ranking output perfectly matches my manually calculated expected totals.
3. **Map & UI Synchronization:** Build the custom SVG map and the accessible calculation details table, connecting them for two-way clicks.
   * *Checkpoint:* Clicking a map marker correctly highlights its 15 travel links and updates the math table.
4. **Edge Cases & Timeline:** Implement the budget timeline and inject the tie-breaker test scenario.
   * *Checkpoint:* Clicking "Load Tie-Breaker" successfully proves cost and ASCII tie-breaking rules.

### Changes from the Original Plan
Initially, I planned to let the AI build the logic and UI at the same time. I quickly realized this caused the AI to hallucinate math and mix presentation data with calculation data. I changed my plan to enforce a strict `FLOW.md` audit trail. The AI was forced to document its math and architecture *before* writing any code.

### Trade-offs
* **Prioritized:** Strict mathematical accuracy (using integer-only formulas to avoid floating-point decimal bugs) and a predictable Unidirectional Data Flow.
* **Deferred:** Heavy front-end frameworks (like React) and external map libraries (like Leaflet). For a strict 25-node dataset, vanilla JavaScript and a custom SVG map were much faster, cleaner, and strictly met the "local processing" requirement.

### Test Plan & Edge Case Handling
* **Programmatic Testing:** Used Copilot to write hidden Node.js background scripts that verified exactly 15 places, tested invalid inputs, and checked the mathematical contribution totals.
* **Visual Edge-Case Evidence:** I built a "Load Tie-Breaker Scenario" button directly into the UI. This injects a targeted 5-hotel dataset to visually prove that the app perfectly handles budget equality, 1-unit over-budget exclusions, and complex identical ties (breaking by cost, then by ASCII ID).

### Prompt Template
System Role: You are an expert web developer working on my "Hotel Base-Camp Comparator" project. 

Strict Rule: You must document your plan and file changes in `FLOW.md` FIRST before generating any code. Do not break the unidirectional data flow.

Task: We need to implement [INSERT FEATURE HERE, e.g., a checkbox to filter out hotels that cost more than $50,000].

Implementation Steps required:
1. DATA: [e.g., Add a listener for the new checkbox in index.html].
2. ENGINE: [e.g., Update rankHotels() to filter out hotels over the limit before sorting].
3. UI: [e.g., Update renderUI() to handle the new checkbox state].

Please provide the FLOW.md update first, followed by the exact code changes for app.js and index.html.


### Helper Prompt Template
System Role: You are an expert web developer working on my "Hotel Base-Camp Comparator" project. 

Strict Rule: You must document your plan in `FLOW.md` FIRST before generating any code. 

Task: We need to implement [INSERT THE FEATURE].

I am pasting my current `app.js` below. 
Before writing the final code, analyze my architecture and tell me:
1. Which specific function handles the Data/State for this?
2. Which specific function handles the Math/Engine logic for this?
3. Which specific function handles the UI rendering for this?

Do not break my unidirectional data flow. Provide the FLOW.md plan first, then the code changes.

[PASTE ENTIRE APP.JS]