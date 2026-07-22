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
  document.getElementById("github-link").href = profile.contact.github;
  document.getElementById("linkedin-link").href = profile.contact.linkedin;

  const skillsList = document.getElementById("skills-list");
  skillsList.innerHTML = profile.skills
    .map((skill) => `<li>${skill}</li>`)
    .join("");

  const experienceList = document.getElementById("experience-list");
  experienceList.innerHTML = profile.experience
    .map(
      (item) =>
        `<li><strong>${item.role}</strong> — ${item.company} (${item.period})</li>`
    )
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
