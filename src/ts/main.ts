import "../scss/main.scss";
import "./projects";
import "./navigation";

const themeStorageKey = "theme";
const root = document.documentElement;

function applyTheme(theme: "light" | "dark", button: HTMLButtonElement): void {
  root.dataset.theme = theme;
  button.textContent = theme === "dark" ? "Light mode" : "Night mode";
  button.setAttribute("aria-pressed", String(theme === "light"));
}

const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
themeToggle.type = "button";
themeToggle.setAttribute("aria-label", "Toggle color theme");

const savedTheme = window.localStorage.getItem(themeStorageKey);
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : prefersLight
      ? "light"
      : "dark";

applyTheme(initialTheme, themeToggle);
document.body.appendChild(themeToggle);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme, themeToggle);
  window.localStorage.setItem(themeStorageKey, nextTheme);
});
