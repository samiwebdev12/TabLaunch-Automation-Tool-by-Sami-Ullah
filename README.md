# TabLaunch — Website

Official download website for **TabLaunch**, the free multi-profile Chrome link
opener for Windows. Design inspired by the [Visual Studio Code download page](https://code.visualstudio.com/download).

## Project structure

```
website/
├── index.html          # Single landing/download page
├── css/
│   └── style.css       # All styling (dark + light theme tokens)
├── js/
│   └── main.js         # Theme init, banner rotation/dismiss, theme toggle
├── assets/
│   ├── logo.ico        # Favicon
│   └── logo.png        # 256x256 logo used around the page
└── downloads/
    └── TabLaunch.zip   # Portable build served to visitors (on button click)
```

## How the download works

- The ZIP is **only referenced by `<a>` links** with the `download` attribute —
  nothing is fetched or preloaded when a visitor loads the page.
- The file is served only **after the user clicks a download button/link**
  (hero/main button, table row, or the bottom CTA).

## Editing

- **Colors / layout:** edit `css/style.css`. Dark theme is the default;
  light theme overrides live under `html[data-theme="light"]`.
- **Copy / links:** edit `index.html`.
- **Behavior (theme toggle, rotating banner):** edit `js/main.js`.
- **New build:** replace `downloads/TabLaunch.zip` — keep the filename and
  update the size shown in `index.html` if it changes.

## Local preview

Open `index.html` in any browser, or serve the folder, e.g.:

```
python -m http.server 8000
```