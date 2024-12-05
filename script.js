// Fetch data from content.json
fetch('content.json')
  .then((response) => response.json())
  .then((data) => {
    // Populate Articles
    const articlesContainer = document.getElementById('articles-container');
    data.articles.forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
        <h3><a href="${article.link}">${article.title}</a></h3>
        <p>${article.date}</p>
        <p>${article.summary}</p>
      `;
      articlesContainer.appendChild(articleElement);
    });

    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach((project) => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');
      projectElement.innerHTML = `
        <h3><a href="${project.link}">${project.name}</a></h3>
        <p>${project.description}</p>
      `;
      projectsContainer.appendChild(projectElement);
    });
  })
  .catch((error) => console.error('Error fetching content:', error));
