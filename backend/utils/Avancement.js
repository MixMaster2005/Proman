function avancementProjetPondere(taches) {
    const totalDuree = taches.reduce((sum, t) => sum + t.duree, 0);
    const dureeTerminee = taches
        .filter(t => t.statut === 1)
        .reduce((sum, t) => sum + t.duree, 0);

    return totalDuree === 0 ? 0 : Math.round((dureeTerminee / totalDuree) * 100);
}

export default avancementProjetPondere;