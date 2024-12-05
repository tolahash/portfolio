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

// Function to create card element
function createCard(data, type) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.classList.add("card-title");
  const titleLink = document.createElement("a");
  titleLink.href = type === "project" ? data.link : `/blog/${data.link}`;
  titleLink.classList.add("highlight");
  titleLink.textContent = type === "project" ? data.name : data.title;
  title.appendChild(titleLink);

  const content = document.createElement("div");
  if (type === "project") {
    content.innerHTML = `
          <p class="card-summary">${data.description}</p>
      `;
  } else {
    content.innerHTML = `
          <p class="card-date">${data.date}</p>
          <p class="card-summary">${data.summary}</p>
      `;
  }

  card.appendChild(title);
  card.appendChild(content);
  return card;
}

// Blog posts data (this could be replaced by a JSON file or an API later)
const blogPosts = [
  { title: "Post 1", slug: "posts/breaking-into-hft.html" },
  { title: "Post 2", slug: "posts/optimizing-fpga-systems.html" },
];

// Load blog posts into the blog container
const blogContainer = document.getElementById("blog-container");

blogPosts.forEach((post) => {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");

  // Create link
  const link = document.createElement("a");
  link.href = `posts/${post.slug}`;
  link.textContent = post.title;

  postElement.appendChild(link);
  blogContainer.appendChild(postElement);
});

// Function to load content
async function loadContent() {
  // Show loading state for containers
  ["featured-card", "articles-container", "projects-container"].forEach(
    showLoading
  );

  try {
    const response = await fetch("content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Populate Featured Content
    const featuredContainer = document.querySelector(".featured-card");
    if (featuredContainer && data.articles && data.articles.length > 0) {
      const featured = data.articles[0];
      featuredContainer.innerHTML = `
              <h3 class="card-title">
                  <a href="/blog/${featured.link}" class="highlight">${featured.title}</a>
              </h3>
              <p class="card-date">${featured.date}</p>
              <p class="card-summary">${featured.summary}</p>
          `;
    }

    // Populate Articles
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer && data.articles) {
      articlesContainer.innerHTML = ""; // Clear loading state
      data.articles.forEach((article) => {
        const articleCard = createCard(article, "article");
        articlesContainer.appendChild(articleCard);
      });
    }

    // Populate Projects
    const projectsContainer = document.getElementById("projects-container");
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = ""; // Clear loading state
      data.projects.forEach((project) => {
        const projectCard = createCard(project, "project");
        projectsContainer.appendChild(projectCard);
      });
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    ["featured-card", "articles-container", "projects-container"].forEach(
      (containerId) =>
        showError(
          containerId,
          "Failed to load content. Please try again later."
        )
    );
  }
}

// Add loading and error styles
const style = document.createElement("style");
style.textContent = `
  .loading {
      padding: 20px;
      text-align: center;
      color: var(--highlight);
  }
  
  .error {
      padding: 20px;
      text-align: center;
      color: var(--highlight);
      background: rgba(255, 107, 107, 0.1);
      border-radius: 4px;
  }
`;
document.head.appendChild(style);

// Call loadContent when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadContent);
