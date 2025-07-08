<!-- 🌐 API FETCH STORE – Aesthetic Banner -->
<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&pause=1000&color=F78CBC&center=true&vCenter=true&width=450&lines=API+Fetch+Store;+Fetch+.+Display+.+Slay" alt="Typing SVG" />
</p>

# 🛍️ API Fetch Store

A super cute, minimalist web app that **fetches data from an API** and displays it in styled cards—all with plain HTML, CSS & JS 💖.

---

## 🧩 Project Overview

- **`index.html`** – Defines the page structure and placeholder containers for dynamic content  
- **`style1.css`** – Applies ʀᴇᴀʟ ly glassmorphic style with pinkish tones  
- **`script2.js`** – Contains `fetch()` logic to get data, handle loading/errors, and render the items

---

## 🚀 How It Works

1. On page load, `script2.js` runs:
   ```js
   fetch('<YOUR_API_ENDPOINT>')
     .then(res => res.json())
     .then(data => render cards)
     .catch(error => show error message)
