const navToggle = document.querySelector('[aria-controls="primary-nav"]');

const primaryNav = document.querySelector("#primary-nav");

navToggle.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("aria-expanded");

  if (navOpened === "false") {
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Filtering javascript code

const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const noMatches = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name;
  currentFilters[filterType] = e.target.value;

  if (!document.startViewTransition()) {
    filterCards();
    return;
  }
  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;

  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === season;
    const matchesEdible = currentFilters.edible === edible;

    if (
      (matchesEdible || currentFilters.edible === "all") &&
      (matchesSeason || currentFilters.season === "all")
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    noMatches.hidden = hasVisibleCards ? true : false;
  });
}

// if user does not have Javascript enabled, the select tags for filtering will be hidden if they do have Javascript enabled they will be shown and they can filter the cards
function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();

// Pause animations when browser is being resized
const resizeObserver = new ResizeObserver(() => {
  document.body.classList.add("resizing");

  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
});

resizeObserver.observe(document.body);
