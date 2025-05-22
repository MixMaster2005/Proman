function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function convertToCalendarGantt(pertData, startDateStr) {
    const startDate = new Date(startDateStr); // ex: "2025-05-01"
    
    return pertData.map(t => {
        const taskStart = addDays(startDate, t.TE);
        const taskEnd = addDays(taskStart, t.duree);
        
        return {
            id: `T${t.id}`,
            name: t.nom,
            start: taskStart.toISOString().split('T')[0], // yyyy-mm-dd
            end: taskEnd.toISOString().split('T')[0],
            duration: t.duree,
            dependencies: t.precedentes.map(p => `T${p}`),
            critique: t.critique
        };
    });
}

export default convertToCalendarGantt;