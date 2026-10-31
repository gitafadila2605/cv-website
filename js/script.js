"use strict";

/* ===== Data ===== */
// Urutan dari yang terbaru
const experiences = [
  {
    kategori: "organisasi",
    periode: "2026",
    judul: "Panitia PESMABA 2026",
    tempat: "Universitas Muhammadiyah Malang",
    poin: [
      "Terlibat dalam kepanitiaan PESMABA 2026 dan membantu persiapan serta pelaksanaan kegiatan.",
      "Bekerja sama dengan anggota panitia menjalankan tugas sesuai pembagian yang diberikan.",
      "Membantu memastikan kebutuhan kegiatan dan teknis di lapangan berjalan dengan baik."
    ]
  },
  {
    kategori: "organisasi",
    periode: "2025 - 2026",
    judul: "BEM Fakultas Teknik",
    tempat: "Universitas Muhammadiyah Malang",
    poin: [
      "Aktif mengikuti dan terlibat dalam berbagai kegiatan yang diselenggarakan BEM Fakultas Teknik.",
      "Membantu persiapan dan pelaksanaan program kerja dan kegiatan mahasiswa.",
      "Bekerja sama dengan anggota BEM dalam pembagian tugas dan pelaksanaan kegiatan.",
      "Mendapat pengalaman bekerja dalam tim, berkomunikasi, dan mengatur kegiatan."
    ]
  },
  {
    kategori: "organisasi",
    periode: "2025",
    judul: "Panitia PESMABA 2025",
    tempat: "Universitas Muhammadiyah Malang",
    poin: [
      "Terlibat dalam kepanitiaan PESMABA 2025, dari persiapan hingga acara berlangsung.",
      "Bekerja sama dengan anggota panitia dalam menjalankan tugas dan memastikan kegiatan berjalan baik.",
      "Membantu kebutuhan teknis dan operasional selama kegiatan."
    ]
  },
  {
    kategori: "futsal",
    periode: "2024 - 2025",
    judul: "UKM Futsal",
    tempat: "Universitas Muhammadiyah Malang",
    poin: [
      "Anggota aktif yang rutin mengikuti latihan mingguan untuk meningkatkan keterampilan bermain dan kebugaran.",
      "Selalu hadir dalam latihan, meskipun belum berpartisipasi dalam kompetisi resmi."
    ]
  },
  {
    kategori: "futsal",
    periode: "2021 - 2023",
    judul: "Ekstrakurikuler Futsal",
    tempat: "SMA Negeri 1 Boyolangu",
    poin: [
      "Berpartisipasi aktif dalam latihan rutin dan pertandingan antarsekolah.",
      "Mengembangkan keterampilan teknis, strategi permainan, dan kerja sama tim.",
      "Berkontribusi dalam meraih prestasi di beberapa turnamen tingkat kabupaten."
    ]
  }
];

// Tambahkan proyek lain di sini setelah selesai
const projects = [
  {
    nama: "Website CV",
    deskripsi: "Situs CV pribadi yang responsif, dengan mode gelap, filter pengalaman, form kontak, dan tampilan cetak.",
    stack: "HTML, CSS, JavaScript, PHP",
    link: "https://github.com/USERNAME/cv-website"
  }
];

/* ===== Util ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function store(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* abaikan */ }
}

/* ===== Tema ===== */
const root = document.documentElement;
const themeBtn = $("#themeBtn");

function currentTheme() {
  const set = root.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function syncThemeLabel() {
  themeBtn.textContent = currentTheme() === "dark" ? "Tema terang" : "Tema gelap";
}
themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  store("theme", next);
  syncThemeLabel();
});
syncThemeLabel();

/* ===== Cetak ===== */
$("#printBtn").addEventListener("click", () => window.print());

/* ===== Menu mobile ===== */
const side = $("#atas");
const menuBtn = $("#menuBtn");
function setMenu(open) {
  side.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}
menuBtn.addEventListener("click", () => setMenu(!side.classList.contains("open")));
$(".nav").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ===== Pengalaman + filter ===== */
const expBox = $("#experience");

function renderExperience(filter) {
  const list = filter === "semua" ? experiences : experiences.filter((x) => x.kategori === filter);
  expBox.innerHTML = list.map((item) => `
    <article class="entry">
      <time>${item.periode}</time>
      <div>
        <h3>${item.judul}</h3>
        <p class="where">${item.tempat}</p>
        <ul>${item.poin.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>
    </article>`).join("");
}

$$(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".tab").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    renderExperience(btn.dataset.filter);
  });
});
renderExperience("semua");

/* ===== Proyek ===== */
$("#projects").innerHTML = projects.map((p) => `
  <article class="project">
    <h3>${p.nama}</h3>
    <p>${p.deskripsi}</p>
    <p class="stack">${p.stack}</p>
    <a href="${p.link}" target="_blank" rel="noopener">Lihat kode di GitHub</a>
  </article>`).join("");

/* ===== Menu aktif saat scroll ===== */
const navLinks = $$(".nav a");
const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  sections.forEach((s) => io.observe(s));
}

/* ===== Form kontak ===== */
const EMAIL = "gitafadila2605@gmail.com";
const form = $("#contactForm");
const statusEl = $("#formStatus");

const rules = {
  nama:  (v) => (v.trim().length < 2 ? "Isi nama minimal 2 huruf." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Masukkan alamat email yang valid."),
  pesan: (v) => (v.trim().length < 10 ? "Tulis pesan minimal 10 karakter." : "")
};

function validateField(name) {
  const input = form.elements[name];
  const msg = rules[name](input.value);
  $("#err-" + name).textContent = msg;
  input.closest(".field").classList.toggle("invalid", Boolean(msg));
  input.setAttribute("aria-invalid", String(Boolean(msg)));
  return !msg;
}
Object.keys(rules).forEach((name) => {
  form.elements[name].addEventListener("blur", () => validateField(name));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  const valid = Object.keys(rules).map(validateField).every(Boolean);
  if (!valid) {
    statusEl.textContent = "Periksa kembali isian yang ditandai.";
    return;
  }

  const data = new FormData(form);
  try {
    // Berjalan bila situs dibuka lewat server PHP (misalnya Laragon)
    const res = await fetch("contact.php", { method: "POST", body: data });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.pesan || "gagal");
    statusEl.textContent = "Pesan terkirim. Terima kasih.";
    form.reset();
  } catch (err) {
    // Hosting statis seperti GitHub Pages tidak menjalankan PHP, jadi pakai aplikasi email
    const subject = encodeURIComponent("Pesan dari " + data.get("nama"));
    const body = encodeURIComponent(data.get("pesan") + "\n\nDari: " + data.get("email"));
    statusEl.textContent = "Membuka aplikasi email Anda untuk mengirim pesan.";
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }
});

/* ===== Salin email ===== */
$("#copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    statusEl.textContent = "Email disalin.";
  } catch (err) {
    statusEl.textContent = "Tidak bisa menyalin otomatis. Alamatnya: " + EMAIL;
  }
});

/* ===== Footer ===== */
$("#year").textContent = new Date().getFullYear();
