const translations = {
  en: {
    about: "About", skills: "Skills", projects: "Projects", experience: "Experience",
    education: "Education", certifications: "Certifications", languages: "Languages",
    contact: "Contact", resume: "Resume", heroTitle: "Building reliable digital experiences",
    viewExperience: "View Experience", technologies: "Technologies",
    technologyKicker: "Core tools for software delivery", softSkills: "Soft skills",
    featuredProjects: "Featured projects", projectsKicker: "Ways I create value through engineering",
    contactKicker: "Have a project or opportunity in mind?", sendMessage: "Send a message",
    downloadResume: "Download resume", contactTitle: "Let's build something useful.",
    contactIntro: "Tell me a little about your idea, team, or opportunity. Your email client will open with the message prepared for Santiago.",
    name: "Name", email: "Email", message: "Message", openEmail: "Open email",
    emailDirectly: "Email directly", otherWays: "Other ways to connect",
    languageButton: "Español", openingEmail: "Opening your email client...",
    stack: "Stack:", viewProject: "View project",
  },
  es: {
    about: "Sobre mí", skills: "Habilidades", projects: "Proyectos", experience: "Experiencia",
    education: "Educación", certifications: "Certificaciones", languages: "Idiomas",
    contact: "Contacto", resume: "Hoja de vida", heroTitle: "Construyo experiencias digitales confiables",
    viewExperience: "Ver experiencia", technologies: "Tecnologías",
    technologyKicker: "Herramientas para entregar software", softSkills: "Habilidades blandas",
    featuredProjects: "Proyectos destacados", projectsKicker: "Formas en las que creo valor con ingeniería",
    contactKicker: "¿Tienes un proyecto u oportunidad en mente?", sendMessage: "Enviar un mensaje",
    downloadResume: "Descargar hoja de vida", contactTitle: "Construyamos algo útil.",
    contactIntro: "Cuéntame un poco sobre tu idea, equipo u oportunidad. Tu cliente de correo abrirá un mensaje preparado para Santiago.",
    name: "Nombre", email: "Correo electrónico", message: "Mensaje", openEmail: "Abrir correo",
    emailDirectly: "Enviar correo directamente", otherWays: "Otras formas de contacto",
    languageButton: "English", openingEmail: "Abriendo tu cliente de correo...",
    stack: "Tecnologías:", viewProject: "Ver proyecto",
  },
};

const spanishProfile = {
  title: "Ingeniero de software",
  summary: "Ingeniero de software con más de 6 años de experiencia creando aplicaciones confiables, flujos de datos y automatización de servicios en entornos bancarios, de medios y empresariales.",
};

const resumeFiles = {
  en: "./assets/docs/Santiago%20Arredondo%20CV%20English.pdf",
  es: "./assets/docs/Santiago%20Arredondo%20CV%20Spanish.pdf",
};

function applyResumeDownload(language) {
  const resumeLink = document.querySelector("[data-resume-download]");
  if (resumeLink) {
    resumeLink.href = resumeFiles[language];
  }
}

function applyTranslations(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });
  const toggle = document.getElementById("language-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(language === "es"));
    toggle.setAttribute("aria-label", language === "es" ? "Switch page to English" : "Cambiar la página a español");
    toggle.querySelectorAll("[data-language-option]").forEach((option) => {
      option.classList.toggle("is-active", option.dataset.languageOption === language);
    });
  }
  applyResumeDownload(language);
}

async function loadData() {
  const [profileResponse, projectsResponse] = await Promise.all([
    fetch("./data/profile.json"),
    fetch("./data/projects.json"),
  ]);

  if (!profileResponse.ok || !projectsResponse.ok) {
    throw new Error("Failed to load profile content.");
  }

  const profile = await profileResponse.json();
  const projects = await projectsResponse.json();
  return { profile, projects };
}

let currentLanguage = window.localStorage.getItem("site-language") || "en";

function renderProfile(profile) {
  const aboutSummary = document.getElementById("about-summary");
  if (aboutSummary) {
    aboutSummary.textContent =
      currentLanguage === "es" ? spanishProfile.summary : profile.summary;
  }

  const heroRole = document.getElementById("hero-role");
  if (heroRole) {
    heroRole.textContent =
      currentLanguage === "es" ? spanishProfile.title : profile.title;
  }

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = `mailto:${profile.contact.email}`;
    emailLink.textContent = profile.contact.email;
  }

  const directEmailLink = document.querySelector("[data-direct-email]");
  if (directEmailLink) {
    directEmailLink.href = `mailto:${profile.contact.email}`;
  }

  const githubLink = document.getElementById("github-link");
  if (githubLink) {
    githubLink.href = profile.contact.github;
    githubLink.textContent = "GitHub";
  }

  const locationText = document.getElementById("location-text");
  if (locationText) {
    locationText.textContent = profile.contact.location;
  }

  const linkedinLink = document.getElementById("linkedin-link");
  if (linkedinLink) {
    linkedinLink.href = profile.contact.linkedin;
    linkedinLink.textContent = "LinkedIn";
  }

  if (!document.getElementById("skills-list")) {
    return;
  }

  const skillsList = document.getElementById("skills-list");
  skillsList.innerHTML = profile.technologies
    .map((skill) => `<li>${skill}</li>`)
    .join("");

  const softSkillsList = document.getElementById("soft-skills-list");
  softSkillsList.innerHTML = profile.softSkills
    .map((skill) => `<li>${skill}</li>`)
    .join("");

  const languagesList = document.getElementById("languages-list");
  languagesList.innerHTML = profile.languages
    .map((item) => `<li>${item.name} (${item.level})</li>`)
    .join("");

  const experienceList = document.getElementById("experience-list");
  experienceList.innerHTML = profile.experience
    .map((item) => {
      const highlights = Array.isArray(item.highlights)
        ? `<ul class="timeline-highlights">${item.highlights
            .map((h) => `<li>${h}</li>`)
            .join("")}</ul>`
        : "";
      const summary = item.summary ? `<p>${item.summary}</p>` : "";
      return `<li><div class="timeline-meta">${item.period}</div><h3>${item.role}</h3><p class="timeline-company">${item.company}</p>${summary}${highlights}</li>`;
    })
    .join("");

  const educationList = document.getElementById("education-list");
  educationList.innerHTML = profile.education
    .map(
      (item) =>
        `<li><div class="timeline-meta">${item.period}</div><h3>${item.program}</h3><p class="timeline-company">${item.institution}</p></li>`
    )
    .join("");

  const certificationsList = document.getElementById("certifications-list");
  certificationsList.innerHTML = profile.certifications
    .map(
      (item) =>
        `<li><div class="timeline-meta">${item.issued}</div><h3>${item.name}</h3><p class="timeline-company">${item.issuer}</p></li>`
    )
    .join("");
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  const dictionary = translations[currentLanguage];
  projectsList.innerHTML = projects
    .map(
      (project, index) => `
      <article class="card">
        <p class="card-index">${String(index + 1).padStart(2, "0")}</p>
        <h3>${currentLanguage === "es" && project.nameEs ? project.nameEs : project.name}</h3>
        <p class="card-summary">${currentLanguage === "es" && project.summaryEs ? project.summaryEs : project.summary}</p>
        <p class="card-stack"><strong>${dictionary.stack}</strong> ${project.technologies.join(", ")}</p>
        ${
          project.url
            ? `<p><a class="secondary-cta" href="${project.url}" target="_blank" rel="noopener noreferrer"><span class="cta-icon" aria-hidden="true">↗</span><span>${dictionary.viewProject}</span></a></p>`
            : ""
        }
      </article>
    `
    )
    .join("");
}

function wireMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function wireContactForm(email) {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form || !status) {
    return;
  }

  form.action = `mailto:${email}`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get("name")).trim();
    const senderEmail = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();
    const subject = `Website contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`;

    status.textContent = translations[currentLanguage].openingEmail;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  });
}

async function init() {
  wireMenu();
  document.getElementById("year").textContent = String(new Date().getFullYear());

  try {
    const { profile, projects } = await loadData();
    applyTranslations(currentLanguage);
    renderProfile(profile);
    if (document.getElementById("projects-list")) {
      renderProjects(projects);
    }
    wireContactForm(profile.contact.email);
    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "es" : "en";
        window.localStorage.setItem("site-language", currentLanguage);
        applyTranslations(currentLanguage);
        renderProfile(profile);
        if (document.getElementById("projects-list")) {
          renderProjects(projects);
        }
      });
    }
  } catch (error) {
    const aboutSummary = document.getElementById("about-summary");
    if (aboutSummary) {
      aboutSummary.textContent = "Profile content is currently unavailable.";
    }
    throw error;
  }
}

init();
