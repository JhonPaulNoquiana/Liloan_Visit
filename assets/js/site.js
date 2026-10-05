(() => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const closeMenu = () => {
    menu?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  };
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("is-open")) {
      closeMenu();
      menu.focus();
    }
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

  const filters = [...document.querySelectorAll("[data-filter]")];
  const search = document.querySelector("#place-search");
  const cards = [...document.querySelectorAll(".directory [data-category]")];
  let category = "All";
  function filterPlaces() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach((card) => {
      const visible =
        (category === "All" || card.dataset.category === category) &&
        card.dataset.name.includes(query);
      card.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector(".result-count").textContent =
      `${count} ${count === 1 ? "place" : "places"} to discover`;
    document.querySelector(".empty-results").hidden = count > 0;
  }
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      filters.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      filterPlaces();
    }),
  );
  search?.addEventListener("input", filterPlaces);

  const gallery = document.querySelector(".gallery-stage");
  if (gallery) {
    const images = [...gallery.querySelectorAll("img")];
    let current = 0;
    const show = (step) => {
      current = (current + step + images.length) % images.length;
      images.forEach((image, index) => {
        image.hidden = index !== current;
      });
      gallery.querySelector(".gallery-count").textContent =
        `${current + 1} / ${images.length}`;
    };
    gallery
      .querySelector("[data-gallery-prev]")
      .addEventListener("click", () => show(-1));
    gallery
      .querySelector("[data-gallery-next]")
      .addEventListener("click", () => show(1));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        show(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
  }

  const key = "liloan-saved-places";
  const validKeys = new Set([
    "bagacay",
    "hills_lataban",
    "fishing_papakits",
    "municipal_hall",
    "titays",
    "stone_arc",
    "golf_course",
    "cave_manmade",
    "apollo",
    "bantayan_sa_hari",
    "church_sanfernando",
    "d'pond",
  ]);
  let saved = [];
  const readSaved = () => {
    saved = [];
    try {
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(stored))
        saved = stored.filter(
          (item) =>
            item && validKeys.has(item.key) && typeof item.title === "string",
        );
    } catch {}
  };
  readSaved();
  const saveButton = document.querySelector("[data-save]");
  const renderSaveButton = () => {
    if (!saveButton) return;
    const active = saved.some((item) => item.key === saveButton.dataset.save);
    saveButton.setAttribute("aria-pressed", String(active));
    saveButton.textContent = active
      ? "✓ Saved to your list"
      : "＋ Save this place";
  };
  saveButton?.addEventListener("click", () => {
    const id = saveButton.dataset.save;
    saved = saved.some((item) => item.key === id)
      ? saved.filter((item) => item.key !== id)
      : [...saved, { key: id, title: saveButton.dataset.title }];
    try {
      localStorage.setItem(key, JSON.stringify(saved));
    } catch {
      saveButton.textContent = "Saving is unavailable in this browser";
      return;
    }
    renderSaveButton();
  });
  renderSaveButton();
  const savedPanel = document.querySelector("#saved-places");
  const renderSavedPanel = () => {
    if (!savedPanel) return;
    if (!saved.length) {
      const empty = document.createElement("p");
      empty.textContent =
        "Tap “Save this place” on any destination to start your list.";
      savedPanel.replaceChildren(empty);
      return;
    }
    savedPanel.replaceChildren(
      ...saved.map((item) => {
        const link = document.createElement("a");
        link.href = `${savedPanel.dataset.root}/pages/attractions/${encodeURIComponent(item.key)}.html`;
        link.textContent = `${item.title} ↗`;
        return link;
      }),
    );
  };
  renderSavedPanel();
  const refreshSaved = () => {
    readSaved();
    renderSaveButton();
    renderSavedPanel();
  };
  window.addEventListener("pageshow", refreshSaved);
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) refreshSaved();
  });

  const dialog = document.querySelector("#film-dialog");
  if (dialog) {
    const video = dialog.querySelector("video");
    document.querySelector("[data-open-film]").addEventListener("click", () => {
      dialog.showModal();
      video.play().catch(() => {});
    });
    dialog
      .querySelector("[data-close-film]")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => video.pause());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();
