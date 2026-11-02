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
