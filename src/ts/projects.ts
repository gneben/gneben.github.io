interface Project {
  title: string;
  stack: string[];
  description: string;
  url?: string;
}

const projects: Project[] = [
  {
    title: "Currency price tracker",
    stack: ["Python"],
    description:
      "Real-time price aggregator that streams cryptocurrency prices from Binance via WebSocket and forex rates from yfinance over HTTPS. Uses Tornado to manage multiple concurrent connections, converts prices across currencies, and compares rates between platforms. Built from scratch as a first project with no prior coding experience.",
  },
];

function renderProjects(container: HTMLElement, data: Project[]): void {
  container.innerHTML = "";

  for (const project of data) {
    const card = document.createElement("div");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    if (project.url) {
      const link = document.createElement("a");
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = project.title;
      title.textContent = "";
      title.appendChild(link);
    }

    const meta = document.createElement("div");
    meta.className = "project-card-meta";
    for (const tech of project.stack) {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = tech;
      meta.appendChild(pill);
    }
    card.appendChild(meta);

    const desc = document.createElement("p");
    desc.textContent = project.description;
    card.appendChild(desc);

    container.appendChild(card);
  }
}

(() => {
  const grid = document.querySelector<HTMLElement>(".projects-grid");
  if (grid) {
    renderProjects(grid, projects);
  }
})();
