function generateDashboard(containerId) {
    const dashboardHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">ProMan</a>
                <button class="btn btn-primary" id="addProjectBtn">+ Ajouter un projet</button>
            </div>
        </nav>
        <div class="container mt-4">
            <h2 class="text-center">Mes Projets</h2>
            <div class="row" id="projectsContainer">
                <!-- Les projets seront affichés ici -->
            </div>
        </div>
    `;

    // Insérer le tableau de bord dans le conteneur spécifié
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = dashboardHTML;
    } else {
        console.error(`Container with ID "${containerId}" not found.`);
    }
}

export default generateDashboard;