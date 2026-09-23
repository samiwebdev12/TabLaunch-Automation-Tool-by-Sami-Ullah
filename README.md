# TabLaunch — Website

Official download website for **TabLaunch**, the free multi-profile Chrome link
opener for Windows.

## 🌐 Live

- **Site:** <https://tablaunch.vercel.app>
- **Repo:** <https://github.com/samiwebdev12/TabLunch>

## Project structure

```
website/
├── index.html          # Single landing/download page
├── css/
│   └── style.css       # All styling (dark + light theme tokens)
├── js/
│   └── main.js         # Theme init, banner rotation/dismiss, theme toggle, hamburger menu
├── assets/
│   ├── logo.ico        # Favicon
│   └── logo.png        # 256x256 logo used around the page
├── downloads/
│   └── TabLaunch.zip   # Portable build served to visitors (on button click)
├── robots.txt          # Crawler rules + sitemap reference
├── sitemap.xml         # XML sitemap for search engines
└── README.md
```

## How the download works

- The ZIP is **only referenced by `<a>` links** with the `download` attribute —
  nothing is fetched or preloaded when a visitor loads the page.
- The file is served only **after the user clicks a download button/link**
  (hero/main button, table row, or the bottom CTA).
