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
  document.getElementById("about-summary").textContent = profile.summary;
  document.getElementById("email-link").href = `mailto:${profile.contact.email}`;
  document.getElementById("email-link").textContent = profile.contact.email;
  document.getElementById("phone-text").textContent = profile.contact.phone;
  document.getElementById("location-text").textContent = profile.contact.location;
  document.getElementById("linkedin-link").href = profile.contact.linkedin;
  document.getElementById("linkedin-link").textContent = "LinkedIn";

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
        ? `<ul>${item.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
        : "";
      const summary = item.summary ? `<p>${item.summary}</p>` : "";
      return `<li><strong>${item.role}</strong> — ${item.company} (${item.period})${summary}${highlights}</li>`;
    })
    .join("");

  const educationList = document.getElementById("education-list");
  educationList.innerHTML = profile.education
    .map(
      (item) =>
        `<li><strong>${item.institution}</strong> — ${item.program} (${item.period})</li>`
    )
    .join("");

  const certificationsList = document.getElementById("certifications-list");
  certificationsList.innerHTML = profile.certifications
    .map((item) => `<li><strong>${item.name}</strong> — ${item.issuer} (${item.issued})</li>`)
    .join("");
}

function renderProjects(projects) {
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = projects
    .map(
      (project) => `
      <article class="card">
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <p><strong>Stack:</strong> ${project.technologies.join(", ")}</p>
        <p><a href="${project.url}" target="_blank" rel="noopener noreferrer">View project</a></p>
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

async function init() {
  wireMenu();
  document.getElementById("year").textContent = String(new Date().getFullYear());

  try {
    const { profile, projects } = await loadData();
    renderProfile(profile);
    renderProjects(projects);
  } catch (error) {
    document.getElementById("about-summary").textContent =
      "Profile content is currently unavailable.";
    throw error;
  }
}

init();
