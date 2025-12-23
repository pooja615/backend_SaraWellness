// =========================
// CONFIG
// =========================
const API_BASE = "http://localhost:5000/api"; 
// change to your deployed backend URL later

// =========================
// PAGE NAVIGATION (SPA)
// =========================
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link) return;

  const pageId = link.getAttribute("data-page");
  if (!pageId) return;

  e.preventDefault();
  showPage(pageId);
});

// If user loads URL with #hash
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) showPage(hash);
});

// =========================
// HELPERS
// =========================
function setStatus(el, msg, ok = true) {
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok ? "green" : "crimson";
}

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { message: text }; }
}

// =========================
// CONTACT FORM => POST /contacts
// =========================
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus(contactStatus, "Sending...", true);

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await safeJson(res);

      if (!res.ok) {
        return setStatus(contactStatus, data.message || "Failed to send", false);
      }

      setStatus(contactStatus, data.message || "Message sent successfully!", true);
      contactForm.reset();
    } catch (err) {
      setStatus(contactStatus, "Network error. Please try again.", false);
    }
  });
}

// =========================
// APPOINTMENT MODAL + FORM => POST /appointments
// =========================
const modal = document.getElementById("appointment-modal");
const openBtn1 = document.getElementById("open-appointment");
const openBtn2 = document.getElementById("open-appointment-2");
const closeBtn = document.getElementById("close-appointment");

function openModal() { if (modal) modal.style.display = "block"; }
function closeModal() { if (modal) modal.style.display = "none"; }

openBtn1?.addEventListener("click", openModal);
openBtn2?.addEventListener("click", openModal);
closeBtn?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

const appointmentForm = document.getElementById("appointment-form");
const appointmentStatus = document.getElementById("appointment-status");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus(appointmentStatus, "Booking...", true);

    const formData = new FormData(appointmentForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await safeJson(res);

      if (!res.ok) {
        return setStatus(appointmentStatus, data.message || "Failed to book appointment", false);
      }

      setStatus(appointmentStatus, data.message || "Appointment booked successfully!", true);
      appointmentForm.reset();
      setTimeout(closeModal, 1200);
    } catch (err) {
      setStatus(appointmentStatus, "Network error. Please try again.", false);
    }
  });
}

// =========================
// LOAD BLOGS => GET /blog (published)
// =========================
const blogGrid = document.getElementById("blog-grid");
const blogStatus = document.getElementById("blog-status");

async function loadBlogs() {
  if (!blogGrid) return;

  blogGrid.innerHTML = "";
  setStatus(blogStatus, "Loading blog posts...", true);

  try {
    const res = await fetch(`${API_BASE}/blog`);
    const data = await safeJson(res);

    if (!res.ok) {
      blogGrid.innerHTML = "";
      return setStatus(blogStatus, data.message || "Failed to load blogs", false);
    }

    if (!Array.isArray(data) || data.length === 0) {
      blogGrid.innerHTML = "";
      return setStatus(blogStatus, "No blog posts found.", true);
    }

    blogGrid.innerHTML = data.map((b) => {
      const img = b.image ? `http://localhost:5000${b.image}` : "";
      const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "";
      const title = b.title || "Untitled";
      const category = b.category || "Wellness";
      const excerpt = b.excerpt || b.content?.slice(0, 120) || "";

      return `
        <div class="blog-card">
          <div class="blog-img" style="background-image:url('${img || "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80"}')"></div>
          <div class="blog-content">
            <div class="blog-meta">${date} | ${category}</div>
            <h3>${title}</h3>
            <p>${excerpt}</p>
          </div>
        </div>
      `;
    }).join("");

    setStatus(blogStatus, "", true);
  } catch (err) {
    setStatus(blogStatus, "Network error while loading blogs.", false);
  }
}

// =========================
// LOAD TESTIMONIALS => GET /testimonials
// =========================
const testimonialGrid = document.getElementById("testimonial-grid");

async function loadTestimonials() {
  if (!testimonialGrid) return;

  testimonialGrid.innerHTML = "";

  try {
    const res = await fetch(`${API_BASE}/testimonials`);
    const data = await safeJson(res);

    if (!res.ok) {
      testimonialGrid.innerHTML = "";
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      testimonialGrid.innerHTML = `<p>No testimonials yet.</p>`;
      return;
    }

    testimonialGrid.innerHTML = data.map((t) => {
      const img = t.image ? `http://localhost:5000${t.image}` : "https://randomuser.me/api/portraits/lego/1.jpg";
      const name = t.name || "Anonymous";
      const service = t.service || "Service";
      const message = t.message || t.text || "";

      return `
        <div class="testimonial-card">
          <div class="testimonial-text">
            <p>"${message}"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-img">
              <img src="${img}" alt="${name}">
            </div>
            <div class="author-info">
              <h4>${name}</h4>
              <p>${service}</p>
            </div>
          </div>
        </div>
      `;
    }).join("");

  } catch (err) {
    // silent fail
  }
}

// =========================
// TESTIMONIAL SUBMIT => POST /testimonials (multipart)
// =========================
const testimonialForm = document.getElementById("testimonial-form");
const testimonialStatus = document.getElementById("testimonial-status");

if (testimonialForm) {
  testimonialForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus(testimonialStatus, "Submitting...", true);

    try {
      const formData = new FormData(testimonialForm);

      const res = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        body: formData // multipart
      });

      const data = await safeJson(res);

      if (!res.ok) {
        return setStatus(testimonialStatus, data.message || "Failed to submit testimonial", false);
      }

      setStatus(testimonialStatus, "Submitted! (Pending approval)", true);
      testimonialForm.reset();
      // Approved testimonials only show after admin approves
    } catch (err) {
      setStatus(testimonialStatus, "Network error. Please try again.", false);
    }
  });
}

// =========================
// Initial loads
// =========================
window.addEventListener("load", async () => {
  await loadBlogs();
  await loadTestimonials();
});


  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;

      const API_BASE = "http://localhost:5000"; // optional, not required here

      function getToken() {
        return localStorage.getItem("token");
      }
      function getUser() {
        try { return JSON.parse(localStorage.getItem("user") || "null"); }
        catch { return null; }
      }
      function isAdmin() {
        const u = getUser();
        return (u?.role || "").toLowerCase() === "admin";
      }

      // ✅ Auth-aware nav toggle + role link
      const token = getToken();
      const guest1 = document.getElementById("nav-auth-guest");
      const guest2 = document.getElementById("nav-auth-guest-2");
      const userNav = document.getElementById("nav-auth-user");
      const roleLi = document.getElementById("nav-role-link");

      if (token) {
        if (guest1) guest1.style.display = "none";
        if (guest2) guest2.style.display = "none";
        if (userNav) userNav.style.display = "inline-block";

        // Role-based quick link
        if (roleLi) {
          roleLi.style.display = "inline-block";
          roleLi.innerHTML = isAdmin()
            ? `<a href="dashboard.html" data-nav="dashboard"><i class="fa-solid fa-gauge" style="margin-right:8px;"></i>Dashboard</a>`
            : `<a href="profile.html" data-nav="profile"><i class="fa-solid fa-user" style="margin-right:8px;"></i>Profile</a>`;
        }
      } else {
        if (guest1) guest1.style.display = "inline-block";
        if (guest2) guest2.style.display = "inline-block";
        if (userNav) userNav.style.display = "none";
        if (roleLi) roleLi.style.display = "none";
      }

      // ✅ Logout
      const logoutLink = document.getElementById("logout-link");
      if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "login.html";
        });
      }

      // ✅ Active menu highlighting
      // Uses current page filename like "blog.html"
      const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

      // map file -> data-nav key used in header
      const map = {
        "index.html": "home",
        "services.html": "services",
        "about.html": "about",
        "testimonials.html": "testimonials",
        "blog.html": "blog",
        "contact.html": "contact",
        "login.html": "login",
        "register.html": "register",
        "profile.html": "profile",
        "dashboard.html": "dashboard"
      };

      const key = map[current];

      if (key) {
        const activeLink = document.querySelector(`.sw-nav a[data-nav="${key}"]`);
        if (activeLink) activeLink.classList.add("active");
      }

      // ✅ Mobile hamburger menu
      const burger = document.getElementById("sw-burger");
      const nav = document.getElementById("sw-nav");

      if (burger && nav) {
        const closeMenu = () => {
          nav.classList.remove("open");
          burger.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        };

        burger.addEventListener("click", () => {
          const open = nav.classList.toggle("open");
          burger.classList.toggle("is-open", open);
          burger.setAttribute("aria-expanded", open ? "true" : "false");
        });

        // Close menu when clicking a link (mobile UX)
        nav.addEventListener("click", (e) => {
          const a = e.target.closest("a");
          if (a && window.innerWidth <= 900) closeMenu();
        });

        // Close menu if resizing back to desktop
        window.addEventListener("resize", () => {
          if (window.innerWidth > 900) closeMenu();
        });

        // Close menu when clicking outside nav (optional)
        document.addEventListener("click", (e) => {
          if (window.innerWidth > 900) return;
          if (!nav.classList.contains("open")) return;
          const inside = e.target.closest("#sw-nav") || e.target.closest("#sw-burger");
          if (!inside) closeMenu();
        });
      }
    });
