import "./styles.css";

type ProjectCategory = "platform" | "monitoring" | "systems";

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  summary: string;
  tags: string[];
  challenge: string;
  outcome: string;
  stats: Array<{ value: string; label: string }>;
}

const projectImages = {
  networkMitra: "./project-images/network-mitra.png",
  expenseTracker: "./project-images/expense-tracker.png",
  automationApis: "./project-images/automation-apis.png",
  monitoringLab: "./project-images/monitoring-lab.png",
  backendArchitecture: "./project-images/backend-architecture.png",
  smartKnob: "./project-images/smart-knob.png"
};

const projects: Project[] = [
  {
    id: "network-mitra",
    title: "Network Mitra",
    category: "monitoring",
    image: projectImages.networkMitra,
    summary: "A full-stack network monitoring system with SNMP discovery, polling engines, and real-time metrics.",
    tags: ["Java", "Spring Boot", "Angular", "SNMP"],
    challenge: "Network operations need reliable device discovery, vendor-aware profiling, and live resource visibility without brittle manual tracking.",
    outcome: "Built modular backend services for polling and metadata handling, plus Angular dashboards with auto-refresh and structured device pages.",
    stats: [
      { value: "SNMP", label: "device polling" },
      { value: "Live", label: "metrics UI" },
      { value: "2025", label: "active build" }
    ]
  },
  {
    id: "expense-tracker",
    title: "Enterprise Expense Tracker",
    category: "platform",
    image: projectImages.expenseTracker,
    summary: "A workflow-driven expense management platform with approval hierarchies, audit trails, and Excel exports.",
    tags: ["Spring Security", "JWT", "Angular", "PostgreSQL"],
    challenge: "Expense workflows required secure authentication, role-aware approvals, backend validation, and traceable audit history.",
    outcome: "Implemented JWT refresh-token handling, RBAC, responsive Angular forms, approval flows, and export-ready reporting.",
    stats: [
      { value: "RBAC", label: "authorization" },
      { value: "Excel", label: "exports" },
      { value: "Audit", label: "trail support" }
    ]
  },
  {
    id: "automation-workflows",
    title: "Enterprise Automation APIs",
    category: "platform",
    image: projectImages.automationApis,
    summary: "Spring Boot APIs and Angular interfaces for enterprise automation workflows at AutomationEdge.",
    tags: ["Spring Boot", "REST APIs", "Angular", "Banking"],
    challenge: "Enterprise automation modules needed reliable APIs, responsive UI enhancements, and defect fixes across production workflows.",
    outcome: "Developed RESTful APIs, improved Angular usability, optimized existing modules, and contributed to Aadhaar data masking use cases.",
    stats: [
      { value: "2021", label: "started" },
      { value: "REST", label: "API layer" },
      { value: "Banking", label: "use cases" }
    ]
  },
  {
    id: "monitoring-lab",
    title: "Security Monitoring Lab",
    category: "systems",
    image: projectImages.monitoringLab,
    summary: "Lab evaluation and configuration of Zabbix, Wazuh, and Suricata for monitoring and security exposure.",
    tags: ["Zabbix", "Wazuh", "Suricata", "Linux"],
    challenge: "Monitoring and security tools needed practical evaluation in controlled environments before real deployment decisions.",
    outcome: "Configured toolchains, studied runtime behavior, and connected observations back to backend logging and infrastructure design.",
    stats: [
      { value: "3", label: "tools evaluated" },
      { value: "Linux", label: "runtime base" },
      { value: "Logs", label: "observability" }
    ]
  },
  {
    id: "backend-architecture",
    title: "Spring Boot Backend Architecture",
    category: "systems",
    image: projectImages.backendArchitecture,
    summary: "Layered Java backend patterns with DTO data flow, validation, exception handling, logging, and auditing.",
    tags: ["Java 17/21", "Spring MVC", "JPA", "Logback"],
    challenge: "Production services needed maintainable boundaries, secure validation, and consistent error handling across modules.",
    outcome: "Applied layered architecture, DTO contracts, Spring AOP auditing, centralized exceptions, and query/schema optimization.",
    stats: [
      { value: "DTO", label: "API contracts" },
      { value: "AOP", label: "audit logging" },
      { value: "JPA", label: "data access" }
    ]
  },
  {
    id: "smart-knob",
    title: "Smart Knob",
    category: "systems",
    image: projectImages.smartKnob,
    summary: "An IoT prototype for monitoring gas stove usage remotely with low-cost hardware and web monitoring concepts.",
    tags: ["IoT", "Embedded", "Web Monitoring"],
    challenge: "The prototype needed to prove remote monitoring value using constrained hardware and simple web-based visibility.",
    outcome: "Created an early embedded systems project connecting appliance usage signals to monitoring-oriented software ideas.",
    stats: [
      { value: "2017", label: "prototype" },
      { value: "IoT", label: "domain" },
      { value: "Web", label: "monitoring" }
    ]
  }
];

const projectGrid = document.querySelector<HTMLElement>("[data-project-grid]");
const searchInput = document.querySelector<HTMLInputElement>("[data-project-search]");
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mobileNav = document.querySelector<HTMLElement>("[data-nav-links]");
const modal = document.querySelector<HTMLDialogElement>("[data-project-modal]");
const modalContent = document.querySelector<HTMLElement>("[data-modal-content]");
const closeModal = document.querySelector<HTMLButtonElement>("[data-close-modal]");
const contactForm = document.querySelector<HTMLFormElement>("[data-contact-form]");
const formStatus = document.querySelector<HTMLElement>("[data-form-status]");
const contactSubmit = contactForm?.querySelector<HTMLButtonElement>('button[type="submit"]');
const contactEndpoint =
  "https://script.google.com/macros/s/AKfycbw79xjXeoK2D_WZLaxgZOg34sF0l2Wg89Aid_gLLixlh5IhO4UKWixUv461192tpLUoBg/exec";

let activeFilter: "all" | ProjectCategory = "all";

function renderProjects(): void {
  if (!projectGrid) return;

  const query = searchInput?.value.trim().toLowerCase() ?? "";
  const filtered = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const searchText = [project.title, project.summary, project.category, ...project.tags].join(" ").toLowerCase();
    return matchesFilter && searchText.includes(query);
  });

  projectGrid.innerHTML = filtered.length
    ? filtered.map(createProjectCard).join("")
    : '<div class="project-empty glass-panel">No projects match that filter yet.</div>';
}

function createProjectCard(project: Project): string {
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <article class="project-card glass-panel">
      <img src="${project.image}" alt="${project.title} preview" loading="lazy" />
      <div class="project-body">
        <span class="tag">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <div class="project-tags">${tags}</div>
        <!-- <button class="button button-ghost" type="button" data-open-project="${project.id}">Inspect Project</button> -->
      </div>
    </article>
  `;
}

function setFilter(nextFilter: "all" | ProjectCategory): void {
  activeFilter = nextFilter;
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === nextFilter);
  });
  renderProjects();
}

function openProject(projectId: string): void {
  const project = projects.find((item) => item.id === projectId);
  if (!project || !modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-content">
      <img src="${project.image}" alt="${project.title} large preview" />
      <span class="tag">${project.category}</span>
      <h2>${project.title}</h2>
      <p>${project.summary}</p>
      <div class="modal-stats">
        ${project.stats
          .map(
            (stat) => `
          <div>
            <strong>${stat.value}</strong>
            <span>${stat.label}</span>
          </div>
        `
          )
          .join("")}
      </div>
      <div>
        <span class="eyebrow">Challenge</span>
        <p>${project.challenge}</p>
      </div>
      <div>
        <span class="eyebrow">Outcome</span>
        <p>${project.outcome}</p>
      </div>
    </div>
  `;

  modal.showModal();
  document.body.classList.add("modal-open");
}

function closeProject(): void {
  modal?.close();
  document.body.classList.remove("modal-open");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextFilter = button.dataset.filter as "all" | ProjectCategory;
    setFilter(nextFilter);
  });
});

searchInput?.addEventListener("input", renderProjects);

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const opener = target.closest<HTMLElement>("[data-open-project]");
  if (opener?.dataset.openProject) {
    openProject(opener.dataset.openProject);
  }
});

closeModal?.addEventListener("click", closeProject);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProject();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.open) {
    closeProject();
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).matches("a")) {
    mobileNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const observedSections = navLinks
  .map((link) => document.querySelector<HTMLElement>(link.hash))
  .filter((section): section is HTMLElement => Boolean(section));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

observedSections.forEach((section) => sectionObserver.observe(section));

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const payload = {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    subject: String(data.get("subject") ?? "").trim(),
    message: String(data.get("message") ?? "").trim()
  };

  if (formStatus) {
    formStatus.textContent = "// Transmitting message...";
  }
  if (contactSubmit) {
    contactSubmit.disabled = true;
    contactSubmit.textContent = "Transmitting";
  }

  try {
    await fetch(contactEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (formStatus) {
      formStatus.textContent = `// Message sent. Thanks, ${payload.name || "there"}.`;
    }
    contactForm.reset();
  } catch {
    if (formStatus) {
      formStatus.textContent = "// Transmission failed. Please email me directly.";
    }
  } finally {
    if (contactSubmit) {
      contactSubmit.disabled = false;
      contactSubmit.textContent = "Send Transmission";
    }
  }
});

renderProjects();
