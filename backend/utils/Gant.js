function convertToGanttData(pertData) {
    return pertData.map(t => ({
        id: `T${t.id}`,
        name: t.nom,
        start: `Day ${t.TE}`,
        end: `Day ${t.TE + t.duree}`,
        duration: t.duree,
        dependencies: t.precedentes.map(p => `T${p}`),
        critique: t.critique
    }));
}

export default convertToGanttData;