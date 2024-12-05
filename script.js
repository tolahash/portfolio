// Function to show loading state
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
  }
}

// Function to show error state
function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Function to load content
async function loadContent() {
  // Show loading state for containers
  ["articles-container", "projects-container"].forEach(showLoading);

  try {
    const response = await fetch("content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Populate Articles
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer && data.articles) {
      articlesContainer.innerHTML = ""; // Clear loading state
      data.articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `
                  <h3><a href="${article.link}">${article.title}</a></h3>
                  <p class="date">${article.date}</p>
                  <p class="summary">${article.summary}</p>
              `;
        articlesContainer.appendChild(articleElement);
      });
    }

    // Populate Projects
    const projectsContainer = document.getElementById("projects-container");
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = ""; // Clear loading state
      data.projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerHTML = `
                  <h3><a href="${project.link}">${project.name}</a></h3>
                  <p class="description">${project.description}</p>
              `;
        projectsContainer.appendChild(projectElement);
      });
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    ["articles-container", "projects-container"].forEach((containerId) =>
      showError(containerId, "Failed to load content. Please try again later.")
    );
  }
}

// Add loading styles
const style = document.createElement("style");
style.textContent = `
  .loading {
      padding: 20px;
      text-align: center;
      color: #888;
  }
  
  .error {
      padding: 20px;
      text-align: center;
      color: #ff6f61;
      background: rgba(255, 111, 97, 0.1);
      border-radius: 4px;
  }
  
  .date {
      color: #888;
      font-size: 0.9em;
  }
  
  .summary, .description {
      margin-top: 8px;
  }
`;
document.head.appendChild(style);

// Call loadContent when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadContent);
