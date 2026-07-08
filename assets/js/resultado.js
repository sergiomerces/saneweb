//script que exibe o resultado da pesquisa na tela de resultado.html

const resultsArea = document.getElementById('resultsArea');
    const raw = sessionStorage.getItem('searchResults');
    let results = [];
    try{ results = raw ? JSON.parse(raw) : []; }catch(e){ results = []; }

    if(!results || results.length === 0){
        resultsArea.innerHTML = '<p class="no-results">Nenhum resultado encontrado para a pesquisa.</p>';
    } else {
        const container = document.createElement('div');
        container.className = 'cards';

        results.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';

        const img = document.createElement('img');
        img.alt = item.nome || 'imagem do material';
        img.src = item.imagem && item.imagem.length ? item.imagem : './assets/img/ferramenta.webp';

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h2');
        title.className = 'card-title';
        title.textContent = item.nome || '';

        const desc = document.createElement('p');
        desc.className = 'card-desc';
        desc.textContent = item.descricao || '';

        const meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.innerHTML = `<span>Código: ${item.codigo||''}</span><span>Categoria: ${item.categoria||''}</span>`;

        const meta2 = document.createElement('div');
        meta2.className = 'card-meta';
        meta2.style.marginTop = '0.5rem';
        meta2.innerHTML = `<span>Preço: R$ ${item.preco!=null?item.preco.toFixed(2):'-'}</span><span>Qtd: ${item.quantidade||'-'} ${item.unidade||''}</span>`;

        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(meta);
        body.appendChild(meta2);

        card.appendChild(img);
        card.appendChild(body);
        container.appendChild(card);
        });

        resultsArea.appendChild(container);
    }