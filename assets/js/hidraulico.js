//renderiza a lista de materiais hidráulicos em ordem alfabética no arquivo hidraulico.html

async function loadMateriais(){
      try{
        const res = await fetch('./assets/js/materiais.json');
        if(!res.ok) throw new Error('Falha ao carregar materiais');
        const itens = await res.json();
        const hidraulicos = itens.filter(i => i.categoria && i.categoria.toLowerCase() === 'hidráulico');
        hidraulicos.sort((a, b) => {
          const nameA = String(a.nome || '').toLowerCase();
          const nameB = String(b.nome || '').toLowerCase();
          return nameA.localeCompare(nameB, 'pt-BR', { sensitivity: 'base' });
        });
        const grid = document.getElementById('grid');
        if(hidraulicos.length===0){ grid.innerHTML = '<p class="no-results">Nenhum material encontrado.</p>'; return }
        hidraulicos.forEach(m=>{
          const card = document.createElement('article');
          card.className='card';
          card.innerHTML = `
            <img src="${m.imagem || ''}" alt="${escapeHtml(m.nome || '')}">
            <div class="card-body">
              <h2 class="card-title">${escapeHtml(m.nome || '')}</h2>
              <div class="card-meta"><strong><span>Cód: ${escapeHtml(m.codigo || '')}</span></strong><span>Categoria: ${escapeHtml(m.categoria || '')}</span></div>
              <div class="card-meta"><span>${escapeHtml(m.modalidade || '')}</span><span>${escapeHtml(m.fornecedor || '')}</span></div>
              <div class="card-meta"><span>Preço: R$ ${Number(m.preco || 0).toFixed(2)}</span><span>Qtd: ${m.quantidade || '-'} ${escapeHtml(m.unidade || '')}</span></div>
              <div class="card-link">${m.link ? `<button class="detalhe" onclick="window.location.href='detalhes.html?id=${encodeURIComponent(m.link)}'">Detalhes</button>` : ''}</div>
            </div>`;
          grid.appendChild(card);
        });
      }catch(e){
        document.getElementById('grid').innerHTML = '<p class="no-results">Erro ao carregar dados.</p>';
        console.error(e);
      }
    }
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" }[c])) }
    loadMateriais();