function calculPert(tachesInput) {
    const taches = {};

    // Étape 1 : transformer en dictionnaire + ajouter champs nécessaires
    for (let t of tachesInput) {
        taches[t.id] = {
            ...t,
            suivantes: [],
            TE: 0,
            TL: Infinity,
            marge: 0,
            critique: false
        };
    }

    // Étape 2 : remplir les suivantes
    for (let t of Object.values(taches)) {
        for (let idPrec of t.precedentes) {
            if (taches[idPrec]) {
                taches[idPrec].suivantes.push(t.id);
            }
        }
    }

    // Étape 3 : calcul TE (temps au plus tôt)
    const calcTE = (id) => {
        const t = taches[id];
        if (t.precedentes.length === 0) {
            t.TE = 0;
        } else {
            t.TE = Math.max(...t.precedentes.map(pid => calcTE(pid) + taches[pid].duree));
        }
        return t.TE;
    };
    Object.keys(taches).forEach(id => calcTE(Number(id)));

    // Étape 4 : calcul TL (temps au plus tard)
    const maxFin = Math.max(...Object.values(taches).map(t => t.TE + t.duree));
    const calcTL = (id) => {
        const t = taches[id];
        if (t.suivantes.length === 0) {
            t.TL = maxFin - t.duree;
        } else {
            t.TL = Math.min(...t.suivantes.map(sid => calcTL(sid) - t.duree));
        }
        return t.TL;
    };
    Object.keys(taches).reverse().forEach(id => calcTL(Number(id)));

    // Étape 5 : calcul de la marge et du chemin critique
    for (let t of Object.values(taches)) {
        t.marge = t.TL - t.TE;
        t.critique = t.marge === 0;
    }

    // Étape 6 : retour des résultats
    return Object.values(taches).map(t => ({
        id: t.id,
        nom: t.nom,
        duree: t.duree,
        precedentes: t.precedentes,
        suivantes: t.suivantes,
        TE: t.TE,
        TL: t.TL,
        marge: t.marge,
        critique: t.critique
    }));
}

export default calculPert;
