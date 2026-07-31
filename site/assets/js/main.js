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

function renderProfile(profile) {
  const aboutSummary = document.getElementById("about-summary");
  if (aboutSummary) {
    aboutSummary.textContent = profile.summary;
  }

  const heroRole = document.getElementById("hero-role");
  if (heroRole) {
    heroRole.textContent = profile.title;
  }

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = `mailto:${profile.contact.email}`;
    emailLink.textContent = profile.contact.email;
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
  projectsList.innerHTML = projects
    .map(
      (project, index) => `
      <article class="card">
        <p class="card-index">${String(index + 1).padStart(2, "0")}</p>
        <h3>${project.name}</h3>
        <p class="card-summary">${project.summary}</p>
        <p class="card-stack"><strong>Stack:</strong> ${project.technologies.join(", ")}</p>
        <p><a class="secondary-cta" href="${project.url}" target="_blank" rel="noopener noreferrer">View project</a></p>
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

    status.textContent = "Opening your email client...";
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
    renderProfile(profile);
    if (document.getElementById("projects-list")) {
      renderProjects(projects);
    }
    wireContactForm(profile.contact.email);
  } catch (error) {
    const aboutSummary = document.getElementById("about-summary");
    if (aboutSummary) {
      aboutSummary.textContent = "Profile content is currently unavailable.";
    }
    throw error;
  }
}

init();
