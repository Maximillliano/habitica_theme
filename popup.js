// Обновляем состояние кнопок и переключателя в зависимости от сохранённой темы
function updateActiveTheme(selectedTheme) {
    document.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.theme === selectedTheme);
    });
  
    const toggle = document.getElementById("theme-toggle");
    toggle.checked = selectedTheme === "theme4";
  }
  
  // Устанавливаем обработчики для кнопок выбора темы
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
  
      // Сохраняем тему в хранилище
      chrome.storage.sync.set({ selectedTheme: theme }, () => {
        console.log(`Theme ${theme} selected.`);
        updateActiveTheme(theme);
  
        // Обновление активной вкладки
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.reload(tabs[0].id);
        });
      });
    });
  });
  
  // Обработчик переключателя тёмной/светлой темы
  document.getElementById("theme-toggle").addEventListener("change", (event) => {
    const theme = event.target.checked ? "theme4" : "default";
  
    chrome.storage.sync.set({ selectedTheme: theme }, () => {
      console.log(`Toggle theme: ${theme}`);
      updateActiveTheme(theme);
  
      // Обновление активной вкладки
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
  
  // При загрузке попапа восстанавливаем выбранную тему
  chrome.storage.sync.get("selectedTheme", (data) => {
    const selectedTheme = data.selectedTheme || "default";
    updateActiveTheme(selectedTheme);
  });
  