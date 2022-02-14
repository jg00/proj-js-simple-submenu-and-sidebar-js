import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = Array.from(document.querySelectorAll(".link-btn")); // purpose is to hover over button and then display the links
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

// hide/show sidebar
toggleBtn.addEventListener("click", function () {
  sidebarWrapper.classList.add("show");
});

closeBtn.addEventListener("click", function (e) {
  sidebarWrapper.classList.remove("show");
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
    ${links
      .map((link) => {
        return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
      })
      .join("")}
  </div>
  </article>`;
  })
  .join("");

// nav header links
linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();

    const tempPage = sublinks.find(({ page }) => page === text); // match data in data.js to get list of links

    if (tempPage) {
      const { page, links } = tempPage;

      //  Start of centering bubble
      // Get bottom of button and then subtract some pixels so that we can raise the bubble closer to the actual nav text
      const bottom = tempBtn.bottom - 3;

      // Get center of button - idea is get the left start position and right end position of the button and divide by two.
      const center = (tempBtn.left + tempBtn.right) / 2;

      // Now adjust the submenu top and left absolute positions as we hover each nav text and also show.
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`; // place the bubble below the newly calculated bottom
      // End of centering bubble

      // Additional feature to control the number of columns displayed
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }

      // Now we populate the submenu with links
      submenu.innerHTML = `<section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
      ${links
        .map((link) => {
          return `<a href="${link.url}">
          <i class="${link.icon}"></i> ${link.label}
        </a>`;
        })
        .join("")}
      </div>
      </section>`;
      // End of populating submenu links
    }
  });
});

hero.addEventListener("mouseover", function (e) {
  submenu.classList.remove("show");
});

// Within the parent nav check the target we are hovering over
nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
