/* ==========================================================================
   FÁBRICA DE DESCULPAS PERFEITAS — SCRIPT
   Organização: Dados > Utilidades > Menu > Roleta > Gerador > Biblioteca >
                Contadores > FAQ > Scroll Reveal > Hero Terminal > Diversos
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. BANCO DE DADOS DE DESCULPAS
     ============================================================ */
  const bancoDeDesculpas = {
    "Trânsito": [
      "Peguei um congestionamento gigantesco na avenida principal, os carros literalmente não se moveram por 20 minutos.",
      "Houve um acidente na via e o trânsito ficou completamente parado, estou tentando encontrar um caminho alternativo."
    ],
    "Chuva": [
      "Está caindo uma chuva forte demais aqui, as ruas alagaram e não consigo sair de casa com segurança.",
      "A tempestade derrubou uma árvore perto da minha rua e o caminho ficou bloqueado."
    ],
    "Médico": [
      "Tive uma consulta médica que se estendeu bem mais do que o previsto e não consegui sair a tempo.",
      "Precisei ir a um atendimento médico de urgência e só agora estou conseguindo me organizar."
    ],
    "Cachorro passou mal": [
      "Meu cachorro passou mal de repente e precisei levá-lo correndo ao veterinário mais próximo.",
      "Meu pet teve uma crise inesperada e não pude deixá-lo sozinho nesse momento."
    ],
    "Internet caiu": [
      "Minha internet caiu completamente e o provedor informou que só normaliza em algumas horas.",
      "Houve uma instabilidade geral na minha região e fiquei sem conexão para me conectar a tempo."
    ],
    "Problema no carro": [
      "Meu carro não quis ligar de jeito nenhum hoje, acredito que seja a bateria.",
      "Furei um pneu no meio do caminho e precisei chamar o guincho."
    ],
    "Reunião inesperada": [
      "Fui chamado(a) para uma reunião de última hora que não pude recusar.",
      "Surgiu um compromisso interno inesperado que tomou todo o meu horário."
    ],
    "Emergência Familiar": [
      "Tive uma emergência familiar que precisou da minha atenção imediata.",
      "Um familiar próximo passou por um imprevisto e precisei ajudar rapidamente."
    ],
    "Transporte Público": [
      "O ônibus que eu pego atrasou quase uma hora sem nenhum aviso.",
      "Houve uma falha no sistema de transporte público e as linhas ficaram paralisadas."
    ],
    "Faculdade": [
      "Tive uma atividade acadêmica inesperada que precisei resolver com urgência.",
      "Meu professor remarcou uma avaliação em cima da hora e isso bagunçou minha agenda."
    ],
    "Trabalho": [
      "Surgiu uma demanda urgente de outro setor que precisei resolver antes de sair.",
      "Tive um imprevisto com um sistema interno do trabalho que travou minha saída."
    ],
    "Outro": [
      "Aconteceu um imprevisto totalmente fora do meu controle bem na hora de sair.",
      "Tive um contratempo pessoal de última hora que precisei resolver com urgência."
    ]
  };

  const categoriasRoleta = Object.keys(bancoDeDesculpas);

  // Textos-base para o gerador completo (combinam contexto + tom)
  const abrePorTom = {
    "Formal": "Prezado(a), venho por meio desta informar que",
    "Casual": "Opa, tudo bem? Só passando pra avisar que",
    "Engraçado": "Ok, antes de você surtar, deixa eu explicar:",
    "Dramático": "Eu sinto muitíssimo por isso, mas preciso contar que",
    "Educado": "Peço desculpas desde já, mas preciso avisar que"
  };

  const situacoesPorCompromisso = {
    "Trabalho": ["um imprevisto no trajeto", "um problema técnico urgente", "uma emergência de última hora"],
    "Faculdade": ["um contratempo antes da aula", "um imprevisto com o transporte", "uma urgência pessoal"],
    "Escola": ["um imprevisto com meu filho(a)", "um problema de última hora em casa", "um contratempo no trajeto"],
    "Família": ["uma emergência familiar", "um imprevisto em casa", "um compromisso que surgiu de repente"],
    "Amigos": ["um imprevisto de última hora", "um perrengue inesperado", "uma urgência que surgiu do nada"],
    "Namoro": ["um imprevisto chato", "uma urgência de última hora", "um perrengue inesperado"],
    "Médico": ["um imprevisto no trajeto até a clínica", "uma urgência pessoal", "um problema de última hora"]
  };

  const fechoPorUrgencia = (urgencia) => {
    const n = Number(urgencia);
    if (n <= 3) return "Sem grandes problemas, consigo resolver isso com tranquilidade.";
    if (n <= 6) return "Estou tentando resolver o quanto antes para não atrapalhar mais ninguém.";
    if (n <= 8) return "Peço um pouco de compreensão, pois a situação é mais urgente do que parece.";
    return "É uma situação bem delicada e estou fazendo o possível para contornar agora mesmo.";
  };

  /* ============================================================
     2. UTILIDADES
     ============================================================ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];

  /* ============================================================
     3. MENU RESPONSIVO
     ============================================================ */
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link (mobile) — rolagem suave nativa via CSS scroll-behavior
  $$('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ============================================================
     4. ROLETA DE DESCULPAS (SVG desenhado dinamicamente)
     ============================================================ */
  const rouletteSvg = $('#rouletteSvg');
  const spinBtn = $('#spinBtn');
  const rouletteResult = $('#rouletteResult');
  const rouletteCategory = $('#rouletteCategory');
  const rouletteExcuse = $('#rouletteExcuse');

  const CORES_ROLETA = ['#3B82F6', '#8B5CF6', '#22C55E', '#60A5FA', '#A78BFA', '#4ADE80', '#2563EB', '#7C3AED', '#16A34A', '#93C5FD', '#C4B5FD', '#86EFAC'];

  function desenharRoleta() {
    const total = categoriasRoleta.length;
    const raio = 200;
    const centro = 200;
    const anguloFatia = 360 / total;
    let svgContent = '';

    categoriasRoleta.forEach((categoria, i) => {
      const anguloInicial = i * anguloFatia;
      const anguloFinal = anguloInicial + anguloFatia;

      const x1 = centro + raio * Math.cos((Math.PI / 180) * (anguloInicial - 90));
      const y1 = centro + raio * Math.sin((Math.PI / 180) * (anguloInicial - 90));
      const x2 = centro + raio * Math.cos((Math.PI / 180) * (anguloFinal - 90));
      const y2 = centro + raio * Math.sin((Math.PI / 180) * (anguloFinal - 90));

      const largeArc = anguloFatia > 180 ? 1 : 0;
      const cor = CORES_ROLETA[i % CORES_ROLETA.length];

      svgContent += `<path d="M${centro},${centro} L${x1},${y1} A${raio},${raio} 0 ${largeArc},1 ${x2},${y2} Z" fill="${cor}" stroke="#ffffff" stroke-width="2"></path>`;

      // Texto da categoria, posicionado no meio da fatia
      const anguloTexto = anguloInicial + anguloFatia / 2;
      const raioTexto = raio * 0.62;
      const xTexto = centro + raioTexto * Math.cos((Math.PI / 180) * (anguloTexto - 90));
      const yTexto = centro + raioTexto * Math.sin((Math.PI / 180) * (anguloTexto - 90));

      svgContent += `<text x="${xTexto}" y="${yTexto}" fill="#ffffff" font-size="11" font-family="Poppins, sans-serif" font-weight="600" text-anchor="middle" dominant-baseline="middle" transform="rotate(${anguloTexto}, ${xTexto}, ${yTexto})">${categoria}</text>`;
    });

    rouletteSvg.innerHTML = svgContent;
  }

  desenharRoleta();

  let anguloAtual = 0;
  let girando = false;

  spinBtn.addEventListener('click', () => {
    if (girando) return;
    girando = true;
    spinBtn.disabled = true;
    rouletteResult.hidden = true;

    const total = categoriasRoleta.length;
    const anguloFatia = 360 / total;

    // Escolhe categoria aleatória e calcula o ângulo final para parar nela
    const indiceSorteado = Math.floor(Math.random() * total);
    const voltasExtras = 6; // quantas voltas completas antes de parar
    const anguloDestino = 360 * voltasExtras + (360 - (indiceSorteado * anguloFatia + anguloFatia / 2));

    anguloAtual += anguloDestino;
    rouletteSvg.style.transform = `rotate(${anguloAtual}deg)`;

    setTimeout(() => {
      const categoria = categoriasRoleta[indiceSorteado];
      const desculpa = sorteia(bancoDeDesculpas[categoria]);

      rouletteCategory.textContent = categoria;
      rouletteExcuse.textContent = desculpa;
      rouletteResult.hidden = false;
      rouletteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      girando = false;
      spinBtn.disabled = false;
    }, 5000);
  });

  /* ============================================================
     5. GERADOR COMPLETO DE DESCULPAS
     ============================================================ */
  const generatorForm = $('#generatorForm');
  const urgenciaInput = $('#urgencia');
  const urgenciaValue = $('#urgenciaValue');
  const resultEmpty = $('#resultEmpty');
  const resultContent = $('#resultContent');
  const resultTag = $('#resultTag');
  const resultText = $('#resultText');
  const copyBtn = $('#copyBtn');
  const regenerateBtn = $('#regenerateBtn');
  const shareBtn = $('#shareBtn');

  urgenciaInput.addEventListener('input', () => {
    urgenciaValue.textContent = urgenciaInput.value;
  });

  function montarDesculpa() {
    const compromisso = $('#compromisso').value;
    const pessoa = $('#pessoa').value;
    const tom = $('#tom').value;
    const urgencia = urgenciaInput.value;

    const situacoes = situacoesPorCompromisso[compromisso] || situacoesPorCompromisso["Trabalho"];
    const abertura = abrePorTom[tom];
    const situacao = sorteia(situacoes);
    const fechamento = fechoPorUrgencia(urgencia);

    const texto = `${abertura} tive ${situacao} e por isso não vou conseguir chegar no horário combinado. ${fechamento}`;

    return { texto, tag: `${compromisso} · ${pessoa} · Tom ${tom}` };
  }

  function exibirResultado() {
    const { texto, tag } = montarDesculpa();
    resultTag.textContent = tag;
    resultText.textContent = texto;
    resultEmpty.hidden = true;
    resultContent.hidden = false;
    resultContent.classList.remove('result-content'); // reinicia animação
    void resultContent.offsetWidth; // força reflow
    resultContent.classList.add('result-content');
  }

  generatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    exibirResultado();
    resultContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  regenerateBtn.addEventListener('click', exibirResultado);

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(resultText.textContent);
      const textoOriginal = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
      setTimeout(() => { copyBtn.innerHTML = textoOriginal; }, 2000);
    } catch (err) {
      alert('Não foi possível copiar automaticamente. Copie manualmente: ' + resultText.textContent);
    }
  });

  shareBtn.addEventListener('click', async () => {
    const texto = resultText.textContent;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Minha desculpa perfeita', text: texto });
      } catch (err) {
        // usuário cancelou o compartilhamento — nada a fazer
      }
    } else {
      try {
        await navigator.clipboard.writeText(texto);
        alert('Compartilhamento não suportado neste navegador. O texto foi copiado para você colar onde quiser.');
      } catch (err) {
        alert(texto);
      }
    }
  });

  /* ============================================================
     6. BIBLIOTECA DE DESCULPAS (cartões gerados via JS)
     ============================================================ */
  const bibliotecaDados = [
    { icone: 'fa-briefcase', titulo: 'Trabalho', desc: 'Desculpas profissionais para atrasos e ausências no expediente.', categoria: 'Trabalho' },
    { icone: 'fa-graduation-cap', titulo: 'Faculdade', desc: 'Ideais para faltas em aula, provas e entregas de trabalhos.', categoria: 'Faculdade' },
    { icone: 'fa-house', titulo: 'Família', desc: 'Desculpas gentis para compromissos e reuniões de família.', categoria: 'Família' },
    { icone: 'fa-people-group', titulo: 'Amigos', desc: 'Descontraídas e sinceras para cancelar programas com a turma.', categoria: 'Amigos' },
    { icone: 'fa-heart', titulo: 'Relacionamento', desc: 'Para aqueles momentos em que o encontro precisa ser remarcado.', categoria: 'Namoro' },
    { icone: 'fa-triangle-exclamation', titulo: 'Emergência', desc: 'Desculpas para imprevistos sérios que exigem atenção imediata.', categoria: 'Emergência Familiar' },
    { icone: 'fa-plane', titulo: 'Viagem', desc: 'Para atrasos, remarcações e imprevistos durante deslocamentos.', categoria: 'Transporte Público' }
  ];

  const libraryGrid = $('#libraryGrid');

  bibliotecaDados.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'library-card';
    card.innerHTML = `
      <div class="library-icon"><i class="fa-solid ${item.icone}"></i></div>
      <h3>${item.titulo}</h3>
      <p>${item.desc}</p>
      <button class="btn btn-outline usar-btn" data-categoria="${item.categoria}">Usar</button>
    `;
    libraryGrid.appendChild(card);
  });

  // Ao clicar em "Usar", rola até a roleta e já sorteia uma desculpa da categoria
  libraryGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.usar-btn');
    if (!btn) return;

    const categoria = btn.dataset.categoria;
    const desculpa = sorteia(bancoDeDesculpas[categoria] || bancoDeDesculpas['Outro']);

    rouletteCategory.textContent = categoria;
    rouletteExcuse.textContent = desculpa;
    rouletteResult.hidden = false;

    $('#roleta').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ============================================================
     7. CONTADORES ANIMADOS
     ============================================================ */
  const statNumbers = $$('.stat-number');

  function animarContador(elemento) {
    const alvo = Number(elemento.dataset.target);
    const sufixo = elemento.dataset.suffix || '';
    const duracao = 1800;
    const inicio = performance.now();

    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const facilitado = 1 - Math.pow(1 - progresso, 3); // ease-out cúbico
      const valorAtual = Math.floor(facilitado * alvo);
      elemento.textContent = valorAtual.toLocaleString('pt-BR') + sufixo;

      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        elemento.textContent = alvo.toLocaleString('pt-BR') + sufixo;
      }
    }
    requestAnimationFrame(passo);
  }

  const statsObserver = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        statsObserver.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach((el) => statsObserver.observe(el));

  /* ============================================================
     8. FAQ EXPANSÍVEL (ACORDEÃO)
     ============================================================ */
  $$('.faq-item').forEach((item) => {
    const pergunta = item.querySelector('.faq-question');
    pergunta.addEventListener('click', () => {
      const jaAberto = item.classList.contains('active');

      // Fecha todos os outros itens (comportamento de acordeão único)
      $$('.faq-item').forEach((outro) => outro.classList.remove('active'));

      if (!jaAberto) item.classList.add('active');
    });
  });

  /* ============================================================
     9. ANIMAÇÕES AO ROLAR A PÁGINA (SCROLL REVEAL)
     ============================================================ */
  const animatedElements = $$('[data-animate]');

  const revealObserver = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('in-view');
        revealObserver.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach((el) => revealObserver.observe(el));

  /* ============================================================
     10. EFEITO DE DIGITAÇÃO E MEDIDOR NO HERO
     ============================================================ */
  const heroTyped = $('#heroTyped');
  const heroMeter = $('#heroMeter');
  const heroMeterValue = $('#heroMeterValue');
  const fraseHero = 'Desculpa gerada: reunião de emergência.';

  let indiceCaractere = 0;
  function digitarFraseHero() {
    if (indiceCaractere <= fraseHero.length) {
      heroTyped.textContent = fraseHero.slice(0, indiceCaractere);
      indiceCaractere++;
      setTimeout(digitarFraseHero, 45);
    } else {
      // Ao terminar de digitar, anima o medidor de credibilidade até 96%
      requestAnimationFrame(() => {
        heroMeter.style.width = '96%';
      });
      animarValorMedidor(96);
    }
  }

  function animarValorMedidor(alvo) {
    let atual = 0;
    const intervalo = setInterval(() => {
      atual += 2;
      if (atual >= alvo) {
        atual = alvo;
        clearInterval(intervalo);
      }
      heroMeterValue.textContent = atual + '%';
    }, 30);
  }

  setTimeout(digitarFraseHero, 900);

  /* ============================================================
     11. CABEÇALHO COM SOMBRA AO ROLAR + BOTÃO VOLTAR AO TOPO
     ============================================================ */
  const header = $('#header');
  const scrollTopBtn = $('#scrollTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    header.style.boxShadow = scrollY > 10 ? '0 4px 20px rgba(15,23,42,0.06)' : 'none';

    if (scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     12. ANO ATUAL NO RODAPÉ
     ============================================================ */
  $('#year').textContent = new Date().getFullYear();

});
