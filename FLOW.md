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
4. Defined exactly 15 deterministic places, including 10 attractions and 5 food locations, with importance values of 2, 3, 4, and 5.
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
