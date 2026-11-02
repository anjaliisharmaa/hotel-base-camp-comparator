const DEFAULT_BUDGET = 100000;

const places = [
  { id: "P_MUSEUM", name: "Civic History Museum", type: "attraction", importance: 5, x: 25, y: 28 },
  { id: "P_GALLERY", name: "Northlight Gallery", type: "attraction", importance: 4, x: 42, y: 18 },
  { id: "P_PARK", name: "Founders Park", type: "attraction", importance: 3, x: 62, y: 25 },
  { id: "P_AQUARIUM", name: "Bluewater Aquarium", type: "attraction", importance: 2, x: 78, y: 38 },
  { id: "P_THEATER", name: "Grand Avenue Theater", type: "attraction", importance: 4, x: 54, y: 45 },
  { id: "P_MARKET", name: "Sunrise Market", type: "food", importance: 5, x: 23, y: 57 },
  { id: "P_BAKERY", name: "Lantern Bakery", type: "food", importance: 3, x: 39, y: 68 },
  { id: "P_NOODLES", name: "Canal Noodle House", type: "food", importance: 2, x: 68, y: 67 },
  { id: "P_ROOFTOP", name: "Skyline Rooftop", type: "food", importance: 4, x: 82, y: 58 },
  { id: "P_TAVERN", name: "Old Bell Tavern", type: "food", importance: 3, x: 53, y: 80 },
  { id: "P_STADIUM", name: "Union Stadium", type: "attraction", importance: 5, x: 12, y: 35 },
  { id: "P_LIBRARY", name: "Central Library", type: "attraction", importance: 2, x: 17, y: 78 },
  { id: "P_GARDENS", name: "Glasshouse Gardens", type: "attraction", importance: 4, x: 34, y: 72 },
  { id: "P_COURTYARD", name: "Cedar Courtyard", type: "food", importance: 3, x: 72, y: 88 },
  { id: "P_FESTIVAL", name: "Riverside Festival Grounds", type: "attraction", importance: 5, x: 90, y: 74 },
];

const ORIGINAL_IMPORTANCE_MAP = new Map(
  places.map((place) => [place.id, place.importance]),
);
let inspectionEnabled = false;

const hotels = [
  {
    id: "H_CITADEL",
    name: "Citadel Grand Hotel",
    stay_cost: 180000,
    x: 47, y: 50,
    round_trip_minutes: {
      P_MUSEUM: 10, P_GALLERY: 10, P_PARK: 10, P_AQUARIUM: 10, P_THEATER: 10,
      P_MARKET: 10, P_BAKERY: 10, P_NOODLES: 10, P_ROOFTOP: 10, P_TAVERN: 10,
      P_STADIUM: 10, P_LIBRARY: 10, P_GARDENS: 10, P_COURTYARD: 10, P_FESTIVAL: 10,
    },
  },
  {
    id: "H_RIVERSIDE",
    name: "Riverside House",
    stay_cost: 60000,
    x: 48, y: 58,
    round_trip_minutes: {
      P_MUSEUM: 60, P_GALLERY: 62, P_PARK: 64, P_AQUARIUM: 66, P_THEATER: 68,
      P_MARKET: 60, P_BAKERY: 62, P_NOODLES: 64, P_ROOFTOP: 66, P_TAVERN: 68,
      P_STADIUM: 60, P_LIBRARY: 62, P_GARDENS: 64, P_COURTYARD: 66, P_FESTIVAL: 69,
    },
  },
  {
    id: "H_MARKET",
    name: "Market Square Inn",
    stay_cost: 30000,
    x: 35, y: 52,
    round_trip_minutes: {
      P_MUSEUM: 100, P_GALLERY: 102, P_PARK: 104, P_AQUARIUM: 106, P_THEATER: 108,
      P_MARKET: 100, P_BAKERY: 102, P_NOODLES: 104, P_ROOFTOP: 106, P_TAVERN: 108,
      P_STADIUM: 100, P_LIBRARY: 102, P_GARDENS: 104, P_COURTYARD: 106, P_FESTIVAL: 119,
    },
  },
  {
    id: "H_GARDEN",
    name: "Garden Court Hotel",
    stay_cost: 75000,
    x: 58, y: 55,
    round_trip_minutes: {
      P_MUSEUM: 70, P_GALLERY: 72, P_PARK: 74, P_AQUARIUM: 76, P_THEATER: 78,
      P_MARKET: 70, P_BAKERY: 72, P_NOODLES: 74, P_ROOFTOP: 76, P_TAVERN: 78,
      P_STADIUM: 70, P_LIBRARY: 72, P_GARDENS: 74, P_COURTYARD: 76, P_FESTIVAL: 79,
    },
  },
  {
    id: "H_HARBOR",
    name: "Harbor Lantern Hotel",
    stay_cost: 90000,
    x: 62, y: 48,
    round_trip_minutes: {
      P_MUSEUM: 80, P_GALLERY: 82, P_PARK: 84, P_AQUARIUM: 86, P_THEATER: 88,
      P_MARKET: 80, P_BAKERY: 82, P_NOODLES: 84, P_ROOFTOP: 86, P_TAVERN: 88,
      P_STADIUM: 80, P_LIBRARY: 82, P_GARDENS: 84, P_COURTYARD: 86, P_FESTIVAL: 89,
    },
  },
  {
    id: "H_STATION",
    name: "Station Exchange Hotel",
    stay_cost: 100000,
    x: 44, y: 42,
    round_trip_minutes: {
      P_MUSEUM: 86, P_GALLERY: 88, P_PARK: 90, P_AQUARIUM: 88, P_THEATER: 86,
      P_MARKET: 88, P_BAKERY: 90, P_NOODLES: 88, P_ROOFTOP: 86, P_TAVERN: 88,
      P_STADIUM: 90, P_LIBRARY: 88, P_GARDENS: 86, P_COURTYARD: 88, P_FESTIVAL: 90,
    },
  },
  {
    id: "H_HILLSIDE",
    name: "Hillside Lodge",
    stay_cost: 125000,
    x: 24, y: 44,
    round_trip_minutes: {
      P_MUSEUM: 130, P_GALLERY: 132, P_PARK: 134, P_AQUARIUM: 136, P_THEATER: 138,
      P_MARKET: 130, P_BAKERY: 132, P_NOODLES: 134, P_ROOFTOP: 136, P_TAVERN: 138,
      P_STADIUM: 130, P_LIBRARY: 132, P_GARDENS: 134, P_COURTYARD: 136, P_FESTIVAL: 149,
    },
  },
  {
    id: "H_AIRPORT",
    name: "Airport Meridian",
    stay_cost: 160000,
    x: 76, y: 46,
    round_trip_minutes: {
      P_MUSEUM: 150, P_GALLERY: 152, P_PARK: 154, P_AQUARIUM: 156, P_THEATER: 158,
      P_MARKET: 150, P_BAKERY: 152, P_NOODLES: 154, P_ROOFTOP: 156, P_TAVERN: 158,
      P_STADIUM: 150, P_LIBRARY: 152, P_GARDENS: 154, P_COURTYARD: 156, P_FESTIVAL: 169,
    },
  },
  {
    id: "H_UNIVERSITY",
    name: "University Commons",
    stay_cost: 220000,
    x: 73, y: 33,
    round_trip_minutes: {
      P_MUSEUM: 180, P_GALLERY: 182, P_PARK: 184, P_AQUARIUM: 186, P_THEATER: 188,
      P_MARKET: 180, P_BAKERY: 182, P_NOODLES: 184, P_ROOFTOP: 186, P_TAVERN: 188,
      P_STADIUM: 180, P_LIBRARY: 182, P_GARDENS: 184, P_COURTYARD: 186, P_FESTIVAL: 199,
    },
  },
  {
    id: "H_OLD_TOWN",
    name: "Old Town Residence",
    stay_cost: 110000,
    x: 37, y: 38,
    round_trip_minutes: {
      P_MUSEUM: 110, P_GALLERY: 112, P_PARK: 114, P_AQUARIUM: 116, P_THEATER: 118,
      P_MARKET: 110, P_BAKERY: 112, P_NOODLES: 114, P_ROOFTOP: 116, P_TAVERN: 118,
      P_STADIUM: 110, P_LIBRARY: 112, P_GARDENS: 114, P_COURTYARD: 116, P_FESTIVAL: 129,
    },
  },
];

function calculateContribution(hotel, place) {
  return place.importance * hotel.round_trip_minutes[place.id];
}

function calculateHotelStats(hotel, placesToEvaluate, budget) {
  const importanceTotal = placesToEvaluate.reduce(
    (total, place) => total + place.importance,
    0,
  );
  const weightedTravelTotal = placesToEvaluate.reduce(
    (total, place) => total + calculateContribution(hotel, place),
    0,
  );
  const roundedTenths = Math.floor(
    (20 * weightedTravelTotal + importanceTotal) / (2 * importanceTotal),
  );

  return {
    importance_total: importanceTotal,
    weighted_travel_total: weightedTravelTotal,
    remaining_budget: budget - hotel.stay_cost,
    is_affordable: hotel.stay_cost <= budget,
    weighted_average_minutes: roundedTenths / 10,
  };
}

function rankHotels(hotelsToRank, placesToEvaluate, currentBudget) {
  const evaluatedHotels = hotelsToRank.map((hotel) => ({
    ...hotel,
    ...calculateHotelStats(hotel, placesToEvaluate, currentBudget),
  }));
  const affordableHotels = evaluatedHotels
    .filter((hotel) => hotel.is_affordable)
    .sort((hotelA, hotelB) => (
      hotelA.weighted_travel_total - hotelB.weighted_travel_total
      || hotelA.stay_cost - hotelB.stay_cost
      || (hotelA.id < hotelB.id ? -1 : hotelA.id > hotelB.id ? 1 : 0)
    ));
  const overBudgetHotels = evaluatedHotels.filter((hotel) => !hotel.is_affordable);
  const rankedAffordableHotels = affordableHotels.map((hotel, index) => ({
    ...hotel,
    rank: index + 1,
    is_recommended: index === 0,
    is_over_budget: false,
    budget_status: "Affordable",
  }));
  const unrankedOverBudgetHotels = overBudgetHotels.map((hotel) => {
    const overBudgetBy = Math.abs(hotel.remaining_budget);

    return {
      ...hotel,
      rank: null,
      is_recommended: false,
      is_over_budget: true,
      over_budget_by: overBudgetBy,
      budget_status: `Over budget by ${overBudgetBy}`,
    };
  });
  const results = [...rankedAffordableHotels, ...unrankedOverBudgetHotels];

  results.status = affordableHotels.length === 0
    ? "NO_AFFORDABLE_HOTEL"
    : "AFFORDABLE_HOTELS_FOUND";
  results.state = results.status;
  results.no_affordable_hotel = affordableHotels.length === 0;

  return results;
}

function validateScenario(hotelsToValidate, placesToValidate, currentBudget) {
  const invalid = (errorMessage) => ({
    is_valid: false,
    error_message: errorMessage,
  });

  if (!Array.isArray(hotelsToValidate) || hotelsToValidate.length !== 10) {
    return invalid("Scenario must contain exactly 10 hotels.");
  }
  if (!Array.isArray(placesToValidate) || placesToValidate.length !== 15) {
    return invalid("Scenario must contain exactly 15 places.");
  }

  const idPattern = /^[A-Z][A-Z0-9_-]{0,15}$/;
  const placeIds = new Set();
  for (const place of placesToValidate) {
    if (typeof place.id !== "string" || !idPattern.test(place.id)) {
      return invalid(`Place ID "${place.id ?? ""}" must match the required format.`);
    }
    if (placeIds.has(place.id)) {
      return invalid(`Place ID "${place.id}" is duplicated.`);
    }
    placeIds.add(place.id);
  }

  const hotelIds = new Set();
  for (const hotel of hotelsToValidate) {
    if (typeof hotel.id !== "string" || !idPattern.test(hotel.id)) {
      return invalid(`Hotel ID "${hotel.id ?? ""}" must match the required format.`);
    }
    if (hotelIds.has(hotel.id)) {
      return invalid(`Hotel ID "${hotel.id}" is duplicated.`);
    }
    hotelIds.add(hotel.id);
  }

  for (const place of placesToValidate) {
    if (typeof place.name !== "string" || place.name.replace(/\s/g, "").length === 0) {
      return invalid(`Place "${place.id}" must have a non-empty name.`);
    }
  }
  for (const hotel of hotelsToValidate) {
    if (typeof hotel.name !== "string" || hotel.name.replace(/\s/g, "").length === 0) {
      return invalid(`Hotel "${hotel.id}" must have a non-empty name.`);
    }
  }

  const supportedTypes = new Set(["attraction", "food"]);
  const typeCounts = { attraction: 0, food: 0 };
  for (const place of placesToValidate) {
    if (!supportedTypes.has(place.type)) {
      return invalid(`Place "${place.id}" has unsupported type "${place.type}".`);
    }
    typeCounts[place.type] += 1;
  }
  if (typeCounts.attraction < 3 || typeCounts.food < 3) {
    return invalid("Scenario must contain at least 3 attractions and 3 food places.");
  }

  const importanceValues = new Set();
  for (const place of placesToValidate) {
    if (!Number.isInteger(place.importance) || place.importance < 1 || place.importance > 5) {
      return invalid(`Place "${place.id}" importance must be a whole number from 1 to 5.`);
    }
    importanceValues.add(place.importance);
  }
  if (importanceValues.size < 3) {
    return invalid("Scenario must contain at least 3 distinct place importance values.");
  }

  if (!Number.isInteger(currentBudget) || currentBudget < 0 || currentBudget > 1000000) {
    return invalid("Current budget must be a whole number from 0 to 1000000.");
  }

  for (const hotel of hotelsToValidate) {
    if (!Number.isInteger(hotel.stay_cost) || hotel.stay_cost < 1 || hotel.stay_cost > 1000000) {
      return invalid(`Hotel "${hotel.id}" stay cost must be a whole number from 1 to 1000000.`);
    }
    if (
      hotel.round_trip_minutes === null
      || typeof hotel.round_trip_minutes !== "object"
      || Array.isArray(hotel.round_trip_minutes)
    ) {
      return invalid(`Hotel "${hotel.id}" must provide a round-trip mapping.`);
    }

    const travelPlaceIds = Object.keys(hotel.round_trip_minutes);
    if (travelPlaceIds.length !== 15) {
      return invalid(`Hotel "${hotel.id}" must map exactly 15 place IDs.`);
    }
    for (const placeId of travelPlaceIds) {
      if (!placeIds.has(placeId)) {
        return invalid(`Hotel "${hotel.id}" maps unknown place ID "${placeId}".`);
      }
      const travelMinutes = hotel.round_trip_minutes[placeId];
      if (
        !Number.isInteger(travelMinutes)
        || travelMinutes < 1
        || travelMinutes > 600
      ) {
        return invalid(`Hotel "${hotel.id}" travel time for "${placeId}" must be a whole number from 1 to 600.`);
      }
    }
  }

  return {
    is_valid: true,
    error_message: null,
  };
}

function processRankingRequest(hotelsToProcess, placesToProcess, currentBudget) {
  const validation = validateScenario(hotelsToProcess, placesToProcess, currentBudget);

  if (!validation.is_valid) {
    return {
      status: "INVALID_SCENARIO",
      error_message: validation.error_message,
      clear_stale_state: true,
      clear_instructions: [
        "Clear all hotel ranks.",
        "Clear the recommended hotel.",
        "Clear all place contribution values.",
        "Clear all map highlights.",
      ],
    };
  }

  return rankHotels(hotelsToProcess, placesToProcess, currentBudget);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderImportanceControls() {
  const controls = document.querySelector("#importance-controls");

  if (!controls) {
    return;
  }

  controls.innerHTML = places.map((place) => `
    <div class="importance-control">
      <label for="importance-${escapeHTML(place.id)}">${escapeHTML(place.name)}</label>
      <output id="importance-value-${escapeHTML(place.id)}" for="importance-${escapeHTML(place.id)}">${place.importance}</output>
      <input
        id="importance-${escapeHTML(place.id)}"
        data-place-id="${escapeHTML(place.id)}"
        type="range"
        min="1"
        max="5"
        step="1"
        value="${place.importance}"
        aria-label="Importance of ${escapeHTML(place.name)}"
      />
    </div>
  `).join("");
}

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });
  return element;
}

function renderMapMarkers() {
  const map = document.querySelector("#city-map");

  if (!map) {
    return;
  }

  map.innerHTML = "";
  const markerLayer = createSvgElement("g", { class: "marker-layer" });

  hotels.forEach((hotel) => {
    const marker = createSvgElement("g", {
      class: "map-marker hotel-marker",
      "data-hotel-id": hotel.id,
      transform: `translate(${hotel.x} ${hotel.y})`,
    });
    marker.appendChild(createSvgElement("circle", {
      class: "hotel-marker-shape",
      r: 2.2,
    }));
    const label = createSvgElement("text", {
      class: "map-marker-label",
      x: 3,
      y: 0.7,
    });
    label.textContent = hotel.name;
    marker.appendChild(label);
    marker.addEventListener("click", () => {
      inspectHotel(hotel.id);
      focusHotelCard(hotel.id, true);
    });
    markerLayer.appendChild(marker);
  });

  places.forEach((place) => {
    const marker = createSvgElement("g", {
      class: "map-marker place-marker",
      "data-place-id": place.id,
      transform: `translate(${place.x} ${place.y})`,
    });
    marker.appendChild(createSvgElement("circle", {
      class: `place-marker-shape ${place.type}`,
      r: 1.6,
    }));
    const label = createSvgElement("text", {
      class: "map-marker-label",
      x: 2.5,
      y: 0.6,
    });
    label.textContent = place.name;
    marker.appendChild(label);
    markerLayer.appendChild(marker);
  });

  map.appendChild(markerLayer);
}

function clearMapInspection() {
  const map = document.querySelector("#city-map");
  const results = document.querySelector("#hotel-results");
  const details = document.querySelector("#calculation-details");

  if (!map) {
    if (details) {
      details.innerHTML = "";
    }
    return;
  }

  map.querySelector(".comparison-layer")?.remove();
  map.querySelectorAll(".map-marker.inspected").forEach((marker) => {
    marker.classList.remove("inspected");
  });
  results?.querySelectorAll(".active-inspection").forEach((card) => {
    card.classList.remove("active-inspection");
  });
  if (details) {
    details.innerHTML = "";
  }
}

function focusHotelCard(hotelId, shouldScroll = false) {
  const results = document.querySelector("#hotel-results");
  const card = results?.querySelector(`[data-hotel-id="${hotelId}"]`);

  results?.querySelectorAll(".active-inspection").forEach((activeCard) => {
    activeCard.classList.remove("active-inspection");
  });
  if (card) {
    card.classList.add("active-inspection");
    if (shouldScroll) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}

function renderCalculationDetails(hotel) {
  const details = document.querySelector("#calculation-details");

  if (!details) {
    return;
  }

  const stats = calculateHotelStats(hotel, places, DEFAULT_BUDGET);
  const rows = places.map((place) => {
    const travelMinutes = hotel.round_trip_minutes[place.id];
    const contribution = calculateContribution(hotel, place);

    return `
      <tr>
        <td>${escapeHTML(place.name)}</td>
        <td>${place.importance}</td>
        <td>${travelMinutes} minutes</td>
        <td>${contribution}</td>
      </tr>
    `;
  }).join("");

  details.innerHTML = `
    <h3 class="details-title">${escapeHTML(hotel.name)} by-place calculation</h3>
    <div class="details-table-wrapper">
      <table class="details-table">
        <thead>
          <tr>
            <th scope="col">Place</th>
            <th scope="col">Importance</th>
            <th scope="col">Round-trip time</th>
            <th scope="col">Weighted contribution</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="formula">
      <code>weighted_travel_total = ${places.map((place) => `${place.importance} × ${hotel.round_trip_minutes[place.id]}`).join(" + ")} = ${stats.weighted_travel_total}</code>
    </p>
    <p class="formula">
      <code>rounded_tenths = floor((20 × ${stats.weighted_travel_total} + ${stats.importance_total}) / (2 × ${stats.importance_total})) = ${Math.round(stats.weighted_average_minutes * 10)}</code>;
      <code>weighted_average_minutes = ${Math.round(stats.weighted_average_minutes * 10)} / 10 = ${stats.weighted_average_minutes.toFixed(1)}</code>
    </p>
  `;
}

function inspectHotel(hotelId) {
  const map = document.querySelector("#city-map");
  const hotel = hotels.find((candidate) => candidate.id === hotelId);

  clearMapInspection();
  if (!inspectionEnabled || !map || !hotel) {
    return;
  }

  const comparisonLayer = createSvgElement("g", { class: "comparison-layer" });
  const hotelMarker = map.querySelector(`[data-hotel-id="${hotel.id}"]`);
  hotelMarker?.classList.add("inspected");
  focusHotelCard(hotel.id);

  places.forEach((place) => {
    const line = createSvgElement("line", {
      class: "comparison-line",
      x1: hotel.x,
      y1: hotel.y,
      x2: place.x,
      y2: place.y,
    });
    const label = createSvgElement("text", {
      class: "comparison-label",
      x: (hotel.x + place.x) / 2,
      y: (hotel.y + place.y) / 2 - 0.8,
    });
    label.textContent = `${hotel.round_trip_minutes[place.id]}m · ${calculateContribution(hotel, place)}`;
    comparisonLayer.appendChild(line);
    comparisonLayer.appendChild(label);
  });

  map.insertBefore(comparisonLayer, map.querySelector(".marker-layer"));
  renderCalculationDetails(hotel);
}

function renderHotelCard(hotel) {
  const isOverBudget = hotel.is_over_budget;
  const cardClass = isOverBudget
    ? "hotel-card over-budget"
    : `hotel-card${hotel.is_recommended ? " recommended" : ""}`;
  const headingLabel = isOverBudget
    ? `<span class="over-budget-label">${escapeHTML(hotel.budget_status)}</span>`
    : `<span class="rank-label">Rank ${hotel.rank}</span>`;
  const recommendationLabel = hotel.is_recommended
    ? '<span class="recommendation-label">Recommended</span>'
    : "";
  const detail = isOverBudget
    ? `<div><span class="over-budget-label">${escapeHTML(hotel.budget_status)}</span></div>`
    : `
      <div>Stay cost<strong>$${hotel.stay_cost.toLocaleString()}</strong></div>
      <div>Weighted average<strong>${hotel.weighted_average_minutes.toFixed(1)} minutes</strong></div>
    `;

  return `
    <article class="${cardClass}" data-hotel-id="${escapeHTML(hotel.id)}" tabindex="0">
      <div class="hotel-card-header">
        <div>
          ${headingLabel}
          <h3>${escapeHTML(hotel.name)}</h3>
        </div>
        ${recommendationLabel}
      </div>
      <div class="hotel-details">
        ${detail}
      </div>
    </article>
  `;
}

function renderUI() {
  const budgetInput = document.querySelector("#budget-input");
  const controls = document.querySelectorAll("[data-place-id]");
  const errorBanner = document.querySelector("#error-banner");
  const results = document.querySelector("#hotel-results");
  const summary = document.querySelector("#data-summary");

  if (!budgetInput || !errorBanner || !results) {
    return;
  }

  controls.forEach((control) => {
    const place = places.find((candidate) => candidate.id === control.dataset.placeId);
    const value = Number(control.value);

    if (place && Number.isInteger(value)) {
      place.importance = value;
      const output = document.querySelector(`#importance-value-${place.id}`);
      if (output) {
        output.value = String(value);
        output.textContent = String(value);
      }
    }
  });

  const currentBudget = Number(budgetInput.value);
  const rankingResult = processRankingRequest(hotels, places, currentBudget);

  if (summary) {
    summary.textContent = `${places.length} places · ${hotels.length} hotels`;
  }

  if (rankingResult.status === "INVALID_SCENARIO") {
    inspectionEnabled = false;
    clearMapInspection();
    errorBanner.hidden = false;
    errorBanner.textContent = rankingResult.error_message;
    results.innerHTML = "";
    return;
  }

  errorBanner.hidden = true;
  errorBanner.textContent = "";

  if (rankingResult.status === "NO_AFFORDABLE_HOTEL") {
    inspectionEnabled = false;
    clearMapInspection();
    results.innerHTML = `
      <div class="empty-results">
        <strong>NO AFFORDABLE HOTELS</strong>
        No hotels meet the current budget. The over-budget options are listed below.
      </div>
      ${rankingResult.map(renderHotelCard).join("")}
    `;
    return;
  }

  inspectionEnabled = true;
  results.innerHTML = rankingResult.map(renderHotelCard).join("");
  inspectHotel(rankingResult[0].id);
}

function resetScenario() {
  const budgetInput = document.querySelector("#budget-input");

  if (budgetInput) {
    budgetInput.value = String(DEFAULT_BUDGET);
  }

  places.forEach((place) => {
    const originalImportance = ORIGINAL_IMPORTANCE_MAP.get(place.id);
    if (originalImportance === undefined) {
      return;
    }

    place.importance = originalImportance;
    const control = document.querySelector(`#importance-${place.id}`);
    const output = document.querySelector(`#importance-value-${place.id}`);
    if (control) {
      control.value = String(originalImportance);
    }
    if (output) {
      output.value = String(originalImportance);
      output.textContent = String(originalImportance);
    }
  });

  renderUI();
}

function attachUIListeners() {
  const budgetInput = document.querySelector("#budget-input");
  const controls = document.querySelectorAll("[data-place-id]");
  const resetButton = document.querySelector("#reset-btn");

  if (budgetInput) {
    budgetInput.addEventListener("input", renderUI);
  }
  controls.forEach((control) => {
    control.addEventListener("input", renderUI);
  });
  resetButton?.addEventListener("click", resetScenario);

  const results = document.querySelector("#hotel-results");
  if (results) {
    results.addEventListener("click", (event) => {
      const card = event.target.closest("[data-hotel-id]");
      if (card) {
        inspectHotel(card.dataset.hotelId);
        focusHotelCard(card.dataset.hotelId);
      }
    });
    results.addEventListener("mouseover", (event) => {
      const card = event.target.closest("[data-hotel-id]");
      if (card) {
        inspectHotel(card.dataset.hotelId);
        focusHotelCard(card.dataset.hotelId);
      }
    });
    results.addEventListener("focusin", (event) => {
      const card = event.target.closest("[data-hotel-id]");
      if (card) {
        inspectHotel(card.dataset.hotelId);
        focusHotelCard(card.dataset.hotelId);
      }
    });
  }
}

const budgetInput = document.querySelector("#budget-input");
if (budgetInput) {
  budgetInput.value = String(DEFAULT_BUDGET);
  renderImportanceControls();
  renderMapMarkers();
  attachUIListeners();
  renderUI();
}
