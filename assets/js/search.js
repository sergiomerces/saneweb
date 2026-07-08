const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (!searchTerm) {
    alert('Digite um termo para pesquisar');
    return;
  }
  
  try {
    const response = await fetch('./assets/js/materiais.json');
    const materiais = await response.json();
    
    const resultados = materiais.filter(material => {
      const nomeCompleto = material.nome.toLowerCase();
      const primeiraEntrada = searchTerm.split(' ')[0];
      const primeiraMateria = nomeCompleto.split(' ')[0];
      
      return nomeCompleto === searchTerm || primeiraEntrada === primeiraMateria;
    });
    
    sessionStorage.setItem('searchResults', JSON.stringify(resultados));
    window.location.href = './resultado.html';
  } catch (error) {
    console.error('Erro ao buscar materiais:', error);
    alert('Erro ao realizar a busca');
  }
});
