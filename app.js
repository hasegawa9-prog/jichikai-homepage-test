const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector("#site-menu");
const filterTabs = document.querySelectorAll(".filter-tab");
const newsCards = document.querySelectorAll(".news-card");
const searchForm = document.querySelector(".search-panel");
const searchInput = document.querySelector("#site-search");

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  siteMenu?.classList.toggle("is-open", !expanded);
});

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    filterTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    newsCards.forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const sections = Array.from(document.querySelectorAll("section"));
  const target = sections.find((section) => section.textContent.includes(query));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.animate(
      [
        { outlineColor: "rgba(182, 50, 42, 0)", outlineWidth: "0" },
        { outlineColor: "rgba(182, 50, 42, 0.55)", outlineWidth: "4px" },
        { outlineColor: "rgba(182, 50, 42, 0)", outlineWidth: "0" },
      ],
      { duration: 1200, easing: "ease-out" },
    );
  }
});
