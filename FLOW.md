# Change Flow

## Step 1: Project Initialization & Deterministic Data Generation

### Change log

1. Created `FLOW.md` before any application code, as required by the project instructions.
   - **Reason:** This file is the persistent record of every change and the reasoning behind it.
   - **File:** `FLOW.md`
2. Planned a standard static web entry point linking `index.html` to `style.css` and `app.js`.
   - **Reason:** This establishes the vanilla HTML, CSS, and JavaScript foundation without introducing a build system.
   - **Files:** `index.html`, `style.css`, `app.js`
3. Selected `DEFAULT_BUDGET = 100000`.
   - **Reason:** This whole-number budget makes the affordability boundary explicit and allows a controlled mix of affordable and over-budget hotels.
   - **File:** `app.js`
4. Defined exactly 15 deterministic places, including 9 attractions and 6 food locations, with importance values of 2, 3, 4, and 5.
   - **Reason:** The data meets the required type minimums and uses multiple importance levels while remaining stable on every page load.
   - **File:** `app.js`
5. Defined exactly 10 deterministic hotels. Every hotel maps every place ID to an integer round-trip travel time from 1 to 600 minutes.
   - **Reason:** Complete place coverage makes later comparison logic reliable and avoids missing-time fallbacks.
   - **File:** `app.js`
6. Added a minimal page presentation and deterministic dataset summary.
   - **Reason:** The initialized project should load as a usable web page while exposing the fixture counts and budget without duplicating data.
   - **Files:** `index.html`, `style.css`, `app.js`
7. Validated the fixture structure and calibration with a Node.js script that reads the actual `app.js` data.
   - **Reason:** Programmatic validation confirms the exact counts, key coverage, minute bounds, affordability range, ranking constraints, and 90-minute conditions.
   - **Result:** All checks passed with no failures.
   - **File:** `app.js`

### Scenario calibration

The weighted travel-time score is defined as:

`sum(round_trip_minutes[place.id] * place.importance) / sum(place.importance)`

The 15 place importance values, in place-array order, are:

`[5, 4, 3, 2, 4, 5, 3, 2, 4, 3, 5, 2, 4, 3, 5]`

Their total weight is `54`.

The calibrated hotel summary is:

| Hotel | Stay cost | Affordable at 100000? | Weighted minutes |
|---|---:|:---:|---:|
| H_CITADEL | 180000 | No | 10.00 |
| H_RIVERSIDE | 60000 | Yes | 63.87 |
| H_MARKET | 30000 | Yes | 104.80 |
| H_GARDEN | 75000 | Yes | 73.87 |
| H_HARBOR | 90000 | Yes | 83.87 |
| H_STATION | 100000 | Yes | 87.96 |
| H_HILLSIDE | 125000 | No | 134.80 |
| H_AIRPORT | 160000 | No | 154.80 |
| H_UNIVERSITY | 220000 | No | 184.80 |
| H_OLD_TOWN | 110000 | No | 114.80 |

These values satisfy every calibration condition:

- Exactly 5 hotels are affordable (`H_RIVERSIDE`, `H_MARKET`, `H_GARDEN`, `H_HARBOR`, and `H_STATION`), which is within the required range of 4 to 7.
- `H_CITADEL` has the absolute lowest theoretical weighted travel time at `10.00` minutes, but its `180000` stay cost exceeds the `100000` budget.
- Among affordable hotels, `H_RIVERSIDE` is the best at `63.87` weighted minutes, while `H_MARKET` is the cheapest at `30000`; therefore the recommendation is not the cheapest hotel.
- `H_RIVERSIDE` has every round-trip time at or below 90 minutes (its maximum is 69).
- `H_MARKET` is affordable and has round-trip times above 90 minutes (its maximum is 119).

All values are literal deterministic fixtures. No random number generation is used.

## Step 2: The Calculation Engine

1. Added `calculateContribution(hotel, place)` as a pure contribution function.
   - **Reason:** It centralizes the required importance-times-round-trip calculation for every hotel/place pair.
   - **File:** `app.js`
2. Added `calculateHotelStats(hotel, places, budget)` as a pure statistics function.
   - **Reason:** It derives the importance total, weighted travel total, remaining budget, affordability, and one-decimal weighted average from its inputs only.
   - **Math:** The weighted average uses the required integer-only formula: `Math.floor((20 * weighted_travel_total + importance_total) / (2 * importance_total)) / 10`.
   - **File:** `app.js`
3. Added `rankHotels(hotels, places, currentBudget)` as a pure ranking function.
   - **Reason:** It evaluates every hotel, sorts affordable results by weighted total, stay cost, and ASCII hotel ID, then appends unranked over-budget results.
   - **Behavior:** Affordable results receive sequential ranks and only rank 1 is recommended. Over-budget results receive `budget_status: "Over budget by X"` and no numerical rank.
   - **No-affordable state:** The returned array exposes `status` and `state` as `NO_AFFORDABLE_HOTEL`, plus `no_affordable_hotel: true`, when no hotel meets the budget.
   - **File:** `app.js`
4. Validated the calculation engine with deterministic normal, tie-break, and no-affordable scenarios.
   - **Reason:** These checks verify the requested integer-only rounding, result partitioning, sequential ranks, recommendation flag, ASCII ID tie-break, over-budget shortfalls, and explicit empty-affordability state.
   - **Result:** All checks passed with no failures. The calibrated `H_RIVERSIDE` result rounds to `63.9` minutes under the required one-decimal formula.
   - **File:** `app.js`

## Step 3: State Validation and Error Handling

1. Added `validateScenario(hotels, places, currentBudget)` as a pure pre-ranking validation layer.
   - **Reason:** Ranking must never run against malformed or incomplete state.
   - **Rules:** It checks the exact 10-hotel and 15-place counts; duplicate IDs; the `^[A-Z][A-Z0-9_-]{0,15}$` ID format; non-empty names after whitespace removal; supported place types and minimum counts; at least three distinct importance values with every value from 1 through 5; a budget from 0 through 1,000,000; hotel stay costs from 1 through 1,000,000; and exactly 15 known place keys with travel times from 1 through 600 for every hotel.
   - **Result shape:** It returns `{ is_valid: boolean, error_message: string | null }` and stops at the first specific validation failure.
   - **File:** `app.js`
2. Added `processRankingRequest(hotels, places, currentBudget)` as the ranking boundary.
   - **Reason:** Invalid state must produce no partial ranking and must tell the UI to clear all stale derived state.
   - **Invalid result:** Returns an explicit `INVALID_SCENARIO` error state containing the validation message and `clear_stale_state: true` with clear instructions for ranks, recommendations, contributions, and map highlights.
   - **Valid result:** Delegates unchanged to `rankHotels` after validation succeeds.
   - **File:** `app.js`
3. Validation behavior will be tested against the valid fixture and representative failures for counts, IDs, names, types, importance, budget, stay cost, and travel mappings.
   - **Reason:** Each required rule needs evidence that malformed state is rejected before ranking.
   - **File:** `app.js`
4. Executed validation tests covering the valid scenario, every required malformed-state category, invalid request clearing, and a valid no-affordable budget.
   - **Reason:** This confirms invalid data cannot produce a partial ranking and that all stale derived UI state is explicitly marked for clearing.
   - **Result:** All checks passed with no failures.
   - **File:** `app.js`

## Step 4: Base User Interface

1. Replaced the initialization-only page with a sidebar controls area and a main hotel-results area.
   - **Reason:** The interface needs separate, responsive surfaces for scenario inputs and calculated rankings while reserving the visual map for Step 5.
   - **File:** `index.html`
2. Added a budget number input, a dynamically populated importance-control container, a hidden validation banner, and a hotel-card results container.
   - **Reason:** The DOM provides stable targets for the calculation engine without hardcoding 15 repeated controls in HTML.
   - **File:** `index.html`
3. Added layout, control, result-card, recommended-card, over-budget, error, and responsive styles.
   - **Reason:** Affordable, recommended, over-budget, invalid, and no-affordable states must be visually distinguishable and usable on narrow screens.
   - **File:** `style.css`
4. Added `renderImportanceControls()` and `renderUI()` DOM binding logic.
   - **Reason:** Controls are generated from the deterministic `places` data, current importance values are read back into the original place objects, and all ranking output is derived through `processRankingRequest`.
   - **Behavior:** Invalid requests hide no stale results by accident: the error banner shows the exact validation message and results are cleared. Valid no-affordable requests show a clear message followed by over-budget cards. Valid requests render every hotel with ranks or explicit shortfalls.
   - **File:** `app.js`
5. Added input listeners for budget and generated importance sliders, then invoked `renderUI()` on initial load.
   - **Reason:** Results update immediately after any scenario change and are populated on first page load.
   - **File:** `app.js`
6. Ran UI integration checks with lightweight DOM stubs and engine regression checks.
   - **Reason:** This verifies the fixture still validates, the recommended and over-budget card markup is produced, invalid requests retain the clearing contract, and the ranking engine still recommends `H_RIVERSIDE` at `63.9` minutes.
   - **Result:** All checks passed with no failures.
   - **Files:** `index.html`, `style.css`, `app.js`

## Step 5: The Schematic Map

1. Added static `x` and `y` presentation coordinates to all 15 places and 10 hotels.
   - **Reason:** The schematic needs deterministic, visually clustered marker positions while keeping geometry completely separate from travel-time and accessibility calculations.
   - **File:** `app.js`
2. Added an SVG map panel and legend to the page.
   - **Reason:** SVG provides a dependency-free surface for 25 markers, 15 comparison lines, and readable link labels without an external map API.
   - **File:** `index.html`
3. Styled hotel, attraction, and food markers, map labels, comparison lines, inspected hotels, and responsive map sizing.
   - **Reason:** The map must distinguish entity types and make the active inspection visually clear.
   - **File:** `style.css`
4. Added `renderMapMarkers()`, `clearMapInspection()`, and `inspectHotel(hotelId)`.
   - **Reason:** Marker placement is based only on static coordinates. Link labels use the authoritative `round_trip_minutes` data and `calculateContribution(hotel, place)`; no pixel or SVG distance is used for calculations.
   - **Behavior:** Inspection clears prior links and inspected markers, draws exactly 15 hotel-to-place lines, and labels each line with travel minutes and weighted contribution.
   - **File:** `app.js`
5. Synchronized hotel cards and map inspection.
   - **Reason:** Click, hover, and keyboard focus on any hotel card inspect that hotel; successful recalculation automatically inspects the recommended hotel; invalid and no-affordable states clear all map links and inspected markers.
   - **File:** `app.js`
6. Validated map data and synchronization integration.
   - **Reason:** This confirms all 25 coordinates are within the 0-100 SVG viewBox, the scenario remains valid, the recommendation remains `H_RIVERSIDE`, and cards expose hotel IDs for inspection.
   - **Result:** All checks passed with no failures.
   - **Files:** `index.html`, `style.css`, `app.js`

## Step 6: Reset Functionality and Final Polish

1. Added `ORIGINAL_IMPORTANCE_MAP` immediately after deterministic place initialization.
   - **Reason:** The reset operation needs an immutable source of the original importance values without reloading the page or reconstructing data.
   - **File:** `app.js`
2. Added a `Reset Trip` sidebar button and secondary-action styling.
   - **Reason:** Users need an obvious way to recover from what-if budget and importance changes while keeping reset visually distinct from editable controls.
   - **Files:** `index.html`, `style.css`
3. Added `resetScenario()` and connected it to the reset button.
   - **Reason:** Reset restores `DEFAULT_BUDGET`, restores every place importance from the original map, synchronizes all slider values and outputs, and calls `renderUI()` so rankings and the recommended map inspection update without a page reload.
   - **File:** `app.js`
4. Final validation will cover the default recommendation, the 180000 budget boundary, importance mutations, negative-budget error clearing, and reset restoration.
   - **Reason:** These are the required what-if behaviors and confirm reset preserves the deterministic baseline.
   - **Files:** `index.html`, `style.css`, `app.js`
5. Ran the final what-if validation scenarios.
   - **Reason:** This confirms the default recommendation is `H_RIVERSIDE`, the 180000 budget promotes `H_CITADEL`, recalculation responds to importance changes, negative budgets produce the invalid clearing state, and restoring original importances returns `H_RIVERSIDE`.
   - **Result:** All checks passed with no failures.
   - **Files:** `index.html`, `style.css`, `app.js`

## Step 7: Map Interactivity and Calculation Details

1. Added an accessible calculation-details container below the schematic map.
   - **Reason:** The inspected hotel needs a readable, non-geometric explanation of every place contribution and the final weighted result.
   - **File:** `index.html`
2. Added table and formula styles for the calculation-details panel.
   - **Reason:** The 15-place breakdown must remain legible across desktop and narrow layouts while clearly separating inputs, contributions, totals, and rounding math.
   - **File:** `style.css`
3. Added click handling to every SVG hotel marker and active card synchronization.
   - **Reason:** Map-to-list interaction is required in addition to the existing list-to-map interaction. Clicking a marker now inspects its hotel, scrolls the matching card into view, and applies `.active-inspection`.
   - **File:** `app.js`
4. Extended `inspectHotel(hotelId)` to render the full calculation explanation.
   - **Reason:** Each inspected hotel now shows all 15 place names, importance values, stored round-trip minutes, and `calculateContribution` results, followed by the exact weighted-total and integer-rounded-average formulas.
   - **Behavior:** Invalid and `NO_AFFORDABLE_HOTEL` states clear the calculation panel alongside map links and inspected markers.
   - **File:** `app.js`
5. Validated the calculation-details contract and synchronization code paths.
   - **Reason:** This confirms the details view is generated for all 15 places, uses authoritative contribution math, and remains cleared for invalid or no-affordable states.
   - **Result:** Syntax and integration checks passed with no failures. The calibrated `H_RIVERSIDE` breakdown totals `3449` and rounds to `63.9` minutes.
   - **Files:** `index.html`, `style.css`, `app.js`

## Step 8: Edge Case Demonstrations and Budget Timeline

1. Added an explicit `Load Tie-Breaker Scenario` control and a small edge fixture.
   - **Reason:** Interviewers can visually verify budget equality, over-budget exclusion, stay-cost tie-breaking, and ASCII ID tie-breaking without altering the primary 10-hotel/15-place dataset.
   - **Fixture:** One `P_TEST` place and five listed hotels (`H_EXACT_BUDGET`, `H_OVER_BUDGET`, `H_TIE_WINNER`, `H_TIE_LOSER`, and `H_Z_ASCII_LOSER`). The prompt says four hotels but lists five; all five are included so both tie cases are demonstrable.
   - **File:** `app.js`
2. Added an explicit edge-scenario validation mode to `processRankingRequest`.
   - **Reason:** The normal validator must continue requiring exactly 10 hotels and 15 places, while the deliberately tiny demonstration must still be processed through the same ranking boundary rather than bypassing validation.
   - **File:** `app.js`
3. Added `generateTimeline()` and a recommendation timeline below the controls.
   - **Reason:** The timeline programmatically evaluates the active scenario at budget thresholds from zero through the most expensive stay cost and groups contiguous ranges whenever the recommended hotel or no-affordable state changes.
   - **Behavior:** It uses current place importance values, so slider changes regenerate recommendation boundaries; it does not hardcode hotel names or thresholds.
   - **Files:** `index.html`, `app.js`, `style.css`
4. Added active-scenario state switching and reset restoration.
   - **Reason:** The edge fixture must render through the same map, cards, details, validation, and timeline paths, while `Reset Trip` must restore the original deterministic dataset.
   - **Files:** `app.js`
5. Validation will cover the edge equality and tie order, normal-dataset preservation, timeline boundaries, and reset return to the baseline.
   - **Reason:** These checks prove the demonstration is mathematically driven and does not compromise the main scenario.
   - **Files:** `app.js`
6. Ran edge-case and timeline validation.
   - **Reason:** This confirms `H_EXACT_BUDGET` is affordable at equality, `H_OVER_BUDGET` is unranked by exactly 1, the affordable order is `H_EXACT_BUDGET`, `H_TIE_WINNER`, `H_Z_ASCII_LOSER`, `H_TIE_LOSER`, the normal recommendation remains `H_RIVERSIDE`, and the baseline timeline changes at 30000, 60000, and 180000.
   - **Result:** Syntax and behavior checks passed with no failures.
   - **Files:** `index.html`, `style.css`, `app.js`
