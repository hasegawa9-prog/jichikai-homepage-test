const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector("#site-menu");
const filterTabs = document.querySelectorAll(".filter-tab");
const newsCards = document.querySelectorAll(".news-card");
const searchForm = document.querySelector(".search-panel");
const searchInput = document.querySelector("#site-search");
const searchMessage = document.createElement("p");

if (searchForm) {
  searchMessage.className = "search-message";
  searchMessage.setAttribute("aria-live", "polite");
  searchForm.append(searchMessage);
}

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

  searchMessage.textContent = "";
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
    searchMessage.textContent = `「${query}」に近い内容へ移動しました。`;
  } else {
    searchMessage.textContent = `「${query}」は見つかりませんでした。回覧板やお知らせも確認してください。`;
  }
});

// Keep local PDF documents inside the site's viewer so visitors can return easily.
document.querySelectorAll('a[href$=".pdf"]').forEach((link) => {
  const rawHref = link.getAttribute("href");
  if (!rawHref || rawHref.startsWith("http") || rawHref.startsWith("//")) return;

  const page = `${window.location.pathname.split("/").pop() || "index.html"}`;
  const label = link.querySelector("strong")?.textContent?.trim() || "回覧板資料";
  link.href = `pdf-viewer.html?file=${encodeURIComponent(rawHref)}&from=${encodeURIComponent(page)}&title=${encodeURIComponent(label)}`;
});
