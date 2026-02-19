
/**
 * Formata uma string de data no formato "dd de mês de yyyy"
 * usando DateFNS
 * @param {string} dateString - A string de data a ser formatada
 * @returns {string} A data formatada
 */
function formatDate(dateString) {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('pt-BR', options)
}

export { formatDate }
