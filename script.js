/* =========================================================
   Malak Graphic - Site settings
   CHANGE THESE VALUES ONLY to connect real contact channels.
   Example WhatsApp: "970599123456" without +, spaces or dashes.
   ========================================================= */

const SITE = {
  whatsappNumber: "", // Example: "970599123456"
  instagram: "",      // Example: "https://instagram.com/malakgraphic"
  facebook: "",
  tiktok: "",
  behance: "",
  email: ""           // Example: "hello@malakgraphic.com"
};

// ---------- Contact links ----------
function whatsappUrl(message = "") {
  const text = encodeURIComponent(message);
  return SITE.whatsappNumber
    ? `https://wa.me/${SITE.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

function bindContactLinks() {
  document.querySelectorAll(".js-wa").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const message = link.dataset.message || "مرحبا Malak Graphic، أريد الاستفسار عن تصميم.";
      window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    });
  });

  const socials = {
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    tiktok: SITE.tiktok,
    behance: SITE.behance,
    email: SITE.email ? `mailto:${SITE.email}` : ""
  };

  document.querySelectorAll("[data-social]").forEach(link => {
    const key = link.dataset.social;
    const url = socials[key];
    if (url) {
      link.href = url;
      if (key !== "email") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } else {
      link.addEventListener("click", event => {
        event.preventDefault();
        alert(`أضف رابط ${key} داخل ملف script.js أولاً.`);
      });
    }
  });
}

// ---------- Header + mobile menu ----------
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener("click", () => {
  const open = !navPanel.classList.contains("open");
  navPanel.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

navPanel?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.dataset.stagger !== undefined) {
      const siblings = [...el.parentElement.querySelectorAll("[data-stagger]")];
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${Math.min(index * 75, 420)}ms`;
    }

    el.classList.add("in-view");
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ---------- Portfolio filter ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    portfolioCards.forEach((card, index) => {
      const visible = filter === "all" || card.dataset.category === filter;
      if (visible) {
        card.classList.remove("hidden");
        card.animate(
          [
            { opacity: 0, transform: "translateY(12px) scale(.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ],
          { duration: 460, delay: index * 28, easing: "cubic-bezier(.2,.75,.25,1)" }
        );
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ---------- Lightbox ----------
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lightbox-image");
const lbTitle = document.getElementById("lightbox-title");
const lbType = document.getElementById("lightbox-type");
const lbOrder = document.getElementById("lightbox-order");
const lbClose = document.querySelector(".lightbox-close");
const lbPrev = document.querySelector(".lightbox-nav.prev");
const lbNext = document.querySelector(".lightbox-nav.next");

let currentImages = [];
let currentIndex = 0;

function updateLightboxImage() {
  if (!currentImages.length) return;
  lbImage.src = currentImages[currentIndex];
}

function openLightbox(card) {
  currentImages = (card.dataset.images || card.querySelector("img").src)
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
  currentIndex = 0;
  lbTitle.textContent = card.dataset.title || "";
  lbType.textContent = card.dataset.type || "";
  lbImage.alt = card.dataset.title || "معاينة تصميم";
  lbOrder.dataset.message = `مرحبا Malak Graphic، عجبني مشروع "${card.dataset.title}" وبدي تصميم مشابه.`;
  updateLightboxImage();

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

portfolioCards.forEach(card => {
  card.querySelector(".view-project")?.addEventListener("click", () => openLightbox(card));
  card.addEventListener("dblclick", () => openLightbox(card));
});

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
lbPrev?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
});
lbNext?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightboxImage();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lbNext?.click();
  if (e.key === "ArrowRight") lbPrev?.click();
});

// ---------- Before / After ----------
const comparisonRange = document.getElementById("comparison-range");
const comparisonBefore = document.getElementById("comparison-before");
const comparisonDivider = document.getElementById("comparison-divider");

comparisonRange?.addEventListener("input", e => {
  const value = e.target.value;
  comparisonBefore.style.width = `${value}%`;
  comparisonDivider.style.left = `${value}%`;
});

// Keep comparison before image aligned on resize
function syncComparisonImage() {
  const comparison = document.getElementById("comparison");
  const beforeImage = comparisonBefore?.querySelector("img");
  if (!comparison || !beforeImage) return;
  beforeImage.style.width = `${comparison.clientWidth}px`;
}
window.addEventListener("resize", syncComparisonImage);
window.addEventListener("load", syncComparisonImage);

// ---------- Hero subtle parallax ----------
const stage = document.getElementById("parallax-stage");
if (stage && window.matchMedia("(pointer:fine)").matches) {
  stage.addEventListener("mousemove", e => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    stage.querySelectorAll(".parallax-item").forEach(item => {
      const depth = Number(item.dataset.depth || 8);
      const baseRotation = item.classList.contains("card-main") ? 4 :
                           item.classList.contains("card-side") ? -7 : 7;
      item.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(${baseRotation + x * 1.2}deg)`;
    });
  });

  stage.addEventListener("mouseleave", () => {
    stage.querySelectorAll(".parallax-item").forEach(item => item.style.transform = "");
  });
}

// ---------- Cursor glow ----------
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// ---------- Contact form -> WhatsApp ----------
document.getElementById("contact-form")?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("client-name").value.trim();
  const type = document.getElementById("design-type").value.trim();
  const details = document.getElementById("request-details").value.trim();

  const message =
`مرحبا Malak Graphic،
أنا ${name}.
نوع التصميم: ${type}

تفاصيل الطلب:
${details}

أريد معرفة التفاصيل والسعر والوقت المتوقع للتجهيز.`;

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

// ---------- FAQ: keep one item open ----------
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

// ---------- Current year ----------
document.getElementById("year").textContent = new Date().getFullYear();

bindContactLinks();
