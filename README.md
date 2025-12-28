# Standalone HTML5 DCO Creative

This is a self-contained HTML5 DCO creative built to dynamically display content based on API data.  
The focus is on creating a flexible, modular, and engaging creative, with fully self-contained assets.

---

## Project Structure

- **index.html**  
  Minimal, semantic HTML containing all elements within the creative (images, live text, CSS and JS calls).

- **css/styles.css**  
  Styles and animations for all layout elements.

- **config/brandConfig.json**  
  Dictionary of live text entries for dynamic selection based on API readings.

- **js/script.js**  
  Core JavaScript handling API integrations, fallback logic, and dynamic decisioning.

- **fallback.png**  
  Generic fallback image displayed if any API call fails.

- **api-examples/**  
  Contains mock JSON files representing expected API streams, useful for testing and local development without live endpoints.

---

## Key Features

- **Dynamic Content**: Live text entries and imagery are selected based on API readings.  
- **Fallback Handling**: `fallback.png` ensures graceful degradation if APIs fail.  
- **Animations**: CSS-driven animations for interactive elements.  
- **Modular Structure**: Templates and asset organization allow reuse across similar projects.

---

## Development Notes

- The creative is **modular**, making it easy to replicate or adapt for similar projects.  
- API logic and decisioning are handled in `script.js` with fallback strategies included.  
- Styles and animations are scoped within `styles.css` for maintainability.  

> **Note:** This build can be enhanced using tools like **ViteJS** to bundle complex libraries (e.g., WebGL, Three.js, Lottie) if needed in future projects.  
> CSS preprocessors can be used to better manage styles and target elements, while pseudo-elements (`::before` / `::after`) help reduce DOM clutter.

---


## Usage

1. Run the project using a local server (e.g., `Live Server` in VS Code, Python `http.server`, or similar). JSON/API calls will **not work** if opened directly in the browser.  
2. Open `index.html` in a modern browser via the local server.  
3. The creative will dynamically render content based on `brandConfig.json` and API streams.  
4. Use the `api-examples` folder for testing with mock JSON streams.  
5. If API calls fail, `fallback.png` will display as a default visual.


