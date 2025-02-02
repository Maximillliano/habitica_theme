function applyTheme(theme) {
    const linkId = "habitica-theme";
    let link = document.getElementById(linkId);
  
    if (theme === "default") {
      if (link) {
        link.remove();
      }
      console.log("Default theme applied.");
      return;
    }
  
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    }
  
    const themePath = chrome.runtime.getURL(`styles/${theme}.css`);
    console.log(`Applying theme from: ${themePath}`);
  
    fetch(themePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Theme not found at ${themePath}`);
        }
        link.href = themePath;
      })
      .catch((error) => {
        console.error("Error applying theme:", error);
      });
  }
  
  // Применяем тему при загрузке страницы
  chrome.storage.sync.get("selectedTheme", (data) => {
    const theme = data.selectedTheme || "default";
    console.log(`Applying theme: ${theme}`);
    applyTheme(theme);
  });
  