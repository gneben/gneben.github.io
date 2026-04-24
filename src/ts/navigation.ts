(() => {
  const topBtn = document.getElementById("topBtn") as HTMLButtonElement;
  const nav = document.querySelector("nav") as HTMLElement;
  const links = document.querySelectorAll<HTMLAnchorElement>("nav a");
  const sections = document.querySelectorAll<HTMLElement>("section, footer#contact");

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).classList.toggle("visible", entry.isIntersecting);
      }
    },
    { threshold: 0.15 }
  );

  sections.forEach((section: HTMLElement) => observer.observe(section));

  function updateActive(): void {
    const viewHeight: number = window.innerHeight;
    let maxVisible: number = 0;
    let activeSection: string | null = null;

    sections.forEach((section: HTMLElement) => {
      const rect: DOMRect = section.getBoundingClientRect();
      const visibleHeight: number = Math.max(
        0,
        Math.min(viewHeight, rect.bottom) - Math.max(0, rect.top)
      );
      const visiblePercent: number = (visibleHeight / rect.height) * 100;

      if (visiblePercent > maxVisible) {
        maxVisible = visiblePercent;
        activeSection = section.id || "hero";
      }
    });

    links.forEach((link: HTMLAnchorElement) => {
      const href: string | null = link.getAttribute("href");
      link.classList.toggle("active", activeSection === href?.substring(1));
    });
  }

  let scrollTimer: number = 0;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(updateActive, 50);
    topBtn.classList.toggle("show", window.scrollY > window.innerHeight * 0.5);
  });

  links.forEach((link: HTMLAnchorElement) => {
    link.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const href: string | null = link.getAttribute("href");
      if (!href) return;
      const target: HTMLElement | null = document.getElementById(href.substring(1));
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }
    });
  });

  window.addEventListener("load", updateActive);

  function positionTop(): void {
    topBtn.style.top = nav.offsetHeight + 15 + "px";
  }

  positionTop();

  let resizeTimer: number = 0;
  window.addEventListener("resize", () => {
    positionTop();
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      updateActive();
      topBtn.classList.toggle("show", window.scrollY > window.innerHeight * 0.5);
    }, 50);
  });

  topBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
})();
