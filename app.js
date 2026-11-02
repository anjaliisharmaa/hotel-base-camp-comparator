const DEFAULT_BUDGET = 100000;

const places = [
  { id: "P_MUSEUM", name: "Civic History Museum", type: "attraction", importance: 5 },
  { id: "P_GALLERY", name: "Northlight Gallery", type: "attraction", importance: 4 },
  { id: "P_PARK", name: "Founders Park", type: "attraction", importance: 3 },
  { id: "P_AQUARIUM", name: "Bluewater Aquarium", type: "attraction", importance: 2 },
  { id: "P_THEATER", name: "Grand Avenue Theater", type: "attraction", importance: 4 },
  { id: "P_MARKET", name: "Sunrise Market", type: "food", importance: 5 },
  { id: "P_BAKERY", name: "Lantern Bakery", type: "food", importance: 3 },
  { id: "P_NOODLES", name: "Canal Noodle House", type: "food", importance: 2 },
  { id: "P_ROOFTOP", name: "Skyline Rooftop", type: "food", importance: 4 },
  { id: "P_TAVERN", name: "Old Bell Tavern", type: "food", importance: 3 },
  { id: "P_STADIUM", name: "Union Stadium", type: "attraction", importance: 5 },
  { id: "P_LIBRARY", name: "Central Library", type: "attraction", importance: 2 },
  { id: "P_GARDENS", name: "Glasshouse Gardens", type: "attraction", importance: 4 },
  { id: "P_COURTYARD", name: "Cedar Courtyard", type: "food", importance: 3 },
  { id: "P_FESTIVAL", name: "Riverside Festival Grounds", type: "attraction", importance: 5 },
];

const hotels = [
  {
    id: "H_CITADEL",
    name: "Citadel Grand Hotel",
    stay_cost: 180000,
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

const summary = document.querySelector("#data-summary");

if (summary) {
  const attractionCount = places.filter((place) => place.type === "attraction").length;
  const foodCount = places.filter((place) => place.type === "food").length;
  const affordableCount = hotels.filter((hotel) => hotel.stay_cost <= DEFAULT_BUDGET).length;

  summary.innerHTML = `
    <div class="summary-card"><strong>${places.length}</strong><span>places (${attractionCount} attractions, ${foodCount} food)</span></div>
    <div class="summary-card"><strong>${hotels.length}</strong><span>deterministic hotels</span></div>
    <div class="summary-card"><strong>${affordableCount}</strong><span>hotels within the ${DEFAULT_BUDGET.toLocaleString()} budget</span></div>
  `;
}
