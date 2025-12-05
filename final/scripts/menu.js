import { menuList } from "../data/menuData.mjs";
import { menuDialogs } from "../data/dialogData.mjs";


const menuContainer = document.getElementById("menu");
const dialogContainer = document.getElementById("dialog");


function normalizeKey(name = "") {
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")           
    .replace(/[^\w']/g, "")     
    .replace(/\s+/g, "");         
}

const dialogMap = {};
Object.keys(menuDialogs).forEach(key => {
  dialogMap[normalizeKey(key)] = menuDialogs[key];
});

function getDialogForItem(name) {
  if (!name) return null;

  if (menuDialogs[name]) return menuDialogs[name];

  const n = normalizeKey(name);
  return dialogMap[n] || null;
}


function createMenu() {

  menuContainer.innerHTML = "";

  menuList.menu.forEach(section => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";

    const title = document.createElement("h2");
    title.className = "menu-category";
    title.textContent = section.category;
    sectionEl.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "menu-items";

    section.items.forEach(item => {
      const card = document.createElement("article");
      card.className = "menu-card";


      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";
        img.className = "menu-card-img";
        card.appendChild(img);
      }


      const nameEl = document.createElement("h3");
      nameEl.className = "menu-item-name";
      nameEl.textContent = item.name;
      card.appendChild(nameEl);

      if (item.price) {
        const priceEl = document.createElement("p");
        priceEl.className = "menu-item-price";
        priceEl.textContent = item.price;
        card.appendChild(priceEl);
      }

      if (item.short) {
        const shortEl = document.createElement("p");
        shortEl.className = "menu-item-short";
        shortEl.textContent = item.short;
        card.appendChild(shortEl);
      }


      const dialogData = getDialogForItem(item.name);
      if (dialogData) {
        const btn = document.createElement("button");
        btn.className = "menu-item-btn";
        btn.textContent = "View Details";
        btn.addEventListener("click", () => openDialog(item.name, dialogData));
        card.appendChild(btn);
      } else {

        if (item.dialog) {
          const btn2 = document.createElement("button");
          btn2.className = "menu-item-btn";
          btn2.textContent = "View Details";
          btn2.addEventListener("click", () => openDialog(item.name, item.dialog));
          card.appendChild(btn2);
        }
      }

      grid.appendChild(card);
    });

    sectionEl.appendChild(grid);
    menuContainer.appendChild(sectionEl);
  });
}


function openDialog(itemName, dialogData) {
  dialogContainer.innerHTML = "";
  dialogContainer.style.display = "flex";

  const box = document.createElement("div");
  box.className = "dialog-box";

  const title = document.createElement("h3");
  title.className = "dialog-title";
  title.textContent = dialogData.title || itemName;
  box.appendChild(title);

  if (dialogData.body) {
    const body = document.createElement("p");
    body.className = "dialog-body";
    body.textContent = dialogData.body;
    box.appendChild(body);
  }

  Object.entries(dialogData).forEach(([key, value]) => {
    if (key === "title" || key === "body") return;
    const wrap = document.createElement("div");
    wrap.className = "dialog-prop";

    const label = document.createElement("strong");

    label.textContent =
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^./, s => s.toUpperCase()) + ": ";
    wrap.appendChild(label);

    const span = document.createElement("span");
    span.textContent = Array.isArray(value) ? value.join(", ") : String(value);
    wrap.appendChild(span);

    box.appendChild(wrap);
  });

  const close = document.createElement("button");
  close.className = "dialog-close";
  close.textContent = "Close";
  close.addEventListener("click", closeDialog);

  box.appendChild(close);
  dialogContainer.appendChild(box);
}

function closeDialog() {
  dialogContainer.style.display = "none";
  dialogContainer.innerHTML = "";
}

createMenu();


