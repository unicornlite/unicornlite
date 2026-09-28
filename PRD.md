# Product Requirements Document (PRD)
**Project Name:** Monochrome 8-Bit Profile README
**Target User:** `unicornlite`
**Document Status:** Final

---

## 1. Project Overview
- **Objective:** Membuat GitHub Profile README yang berfokus pada visual/art. Menonjolkan identitas sebagai Web Developer (*Coder Vibe*) dengan estetika *creepy, dark, 8-bit*.
- **Vibe/Atmosphere:** Gelap, retro, 8-bit/pixelated, creepy coder.

## 2. Design & Visual Specifications
- **Color Palette (STRICTLY MONOCHROME):**
  - Background: `#000000` (Pure Black)
  - Text & Accents: `#FFFFFF` (Pure White) & `#888888` (Grey untuk dimensi)
- **Imagery:**
  - Header SVG *custom* dengan teks "UNICORNLITE".
  - Desain SVG berfokus pada estetika creepy, 8-bit, glitchy, murni Hitam Putih.

## 3. Content Architecture (Top to Bottom)
1. **Header Section:**
   - Centered layout.
   - Custom SVG image ("UNICORNLITE" 8-bit glitch/creepy).
2. **About Me (Coder Vibe):**
   - Teks bergaya kode/terminal. 
   - Contoh: `> int main() { return void; } // Just a coder in the dark...`
3. **Tech Stack (Centered, Grouped Layout):**
   - Menggunakan SVG badges (Shields.io) dengan parameter hitam putih (`color=black&logoColor=white`).
   - **Frontend:** HTML, CSS, JavaScript, React, Tailwind CSS, Astro.
   - **Backend:** PHP, Laravel, Node.js, Express.
   - **Tools/Database:** MySQL, Git.
4. **GitHub Analytics (Monochrome Theme):**
   - **GitHub Readme Stats Card:** Menampilkan statistik umum (custom theme: bg hitam, teks putih, border abu/putih).
   - **Top Languages Card (Rekomendasi):** Menampilkan persentase bahasa pemrograman yang sering dipakai (tema senada dengan Stats Card).
   - **GitHub Snake Animation:** Animasi kontribusi mode gelap (warna *dot* gradasi abu-abu ke putih dengan background hitam).
5. **Contact:**
   - Placeholder URL (`#`) untuk LinkedIn, Twitter/X, Portfolio, Email, dll.
   - Menggunakan icon monokrom.

## 4. Technical Requirements
- **Format:** `README.md` menggunakan GitHub Flavored Markdown (GFM).
- **Layouting:** Memanfaatkan HTML tag dasar (`<div align="center">`).
- **Custom Assets:** Pembuatan file `.svg` statis murni via kode (hitam putih) untuk header.
- **External Services:** 
  - `anuraghazra/github-readme-stats` untuk statistik & Top Languages.
  - `Platane/snk` untuk animasi kontribusi.
- **Automation (GitHub Actions):** 
  - `.github/workflows/snake.yml` untuk men-generate file SVG animasi snake secara otomatis.
