/**
 * PGW — comportamento do front-end.
 * Mantém o fluxo do protótipo, mas agora vincula as ações de compra e
 * depoimento à sessão criada no cadastro.
 */
document.addEventListener('DOMContentLoaded', () => {
    const money = value => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(Number(value) || 0);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  
    async function readJsonResponse(response) {
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error(`O servidor devolveu uma resposta inválida (${response.status}). Verifique o console do PHP/XAMPP.`); }
      if (!response.ok || data.success === false) throw new Error(data.error || `Erro HTTP ${response.status}.`);
      return data;
    }
  
    const bootstrapModal = id => {
      const el = document.querySelector(id);
      return el && window.bootstrap ? bootstrap.Modal.getOrCreateInstance(el) : null;
    };
  
    // =========================================================
    // FOOD DETAILS — montagem por camadas
    // =========================================================
    const foodLayers = [
      {id:'base', label:'01 / BASE', items:[
        {name:'Base clássica', code:'BASE-01', price:8.5, src:'assets/img/food-layers/base/base-01.svg', desc:'Base neutra para iniciar a refeição.'},
        {name:'Base integral', code:'BASE-02', price:10.5, src:'assets/img/food-layers/base/base-02.svg', desc:'Base mais robusta para receitas completas.'},
        {name:'Base crocante', code:'BASE-03', price:12, src:'assets/img/food-layers/base/base-03.svg', desc:'Base com acabamento crocante.'}
      ]},
      {id:'protein', label:'02 / PROTEÍNA', items:[
        {name:'Proteína sintética', code:'PROT-01', price:14.5, src:'assets/img/food-layers/protein/protein-01.svg', desc:'Proteína formulada para impressão rápida.'},
        {name:'Proteína vegetal', code:'PROT-02', price:16, src:'assets/img/food-layers/protein/protein-02.svg', desc:'Alternativa vegetal de textura controlada.'},
        {name:'Proteína grelhada', code:'PROT-03', price:18, src:'assets/img/food-layers/protein/protein-03.svg', desc:'Versão mais intensa e dourada.'}
      ]},
      {id:'side', label:'03 / ACOMP.', items:[
        {name:'Legumes', code:'SIDE-01', price:7, src:'assets/img/food-layers/side/side-01.svg', desc:'Seleção vegetal molecular.'},
        {name:'Purê molecular', code:'SIDE-02', price:8.5, src:'assets/img/food-layers/side/side-02.svg', desc:'Acompanhamento cremoso.'},
        {name:'Arroz nutritivo', code:'SIDE-03', price:9.5, src:'assets/img/food-layers/side/side-03.svg', desc:'Arroz formulado para a rotina.'}
      ]},
      {id:'sauce', label:'04 / MOLHO', items:[
        {name:'Molho clássico', code:'SAUCE-01', price:4, src:'assets/img/food-layers/sauce/sauce-01.svg', desc:'Molho-base da casa.'},
        {name:'Molho cítrico', code:'SAUCE-02', price:4.5, src:'assets/img/food-layers/sauce/sauce-02.svg', desc:'Acidez leve e aroma fresco.'},
        {name:'Molho picante', code:'SAUCE-03', price:5, src:'assets/img/food-layers/sauce/sauce-03.svg', desc:'Finalização com mais intensidade.'}
      ]},
      {id:'finish', label:'05 / FINAL', items:[
        {name:'Finalização verde', code:'FIN-01', price:2.5, src:'assets/img/food-layers/finish/finish-01.svg', desc:'Toque visual e vegetal.'},
        {name:'Crocante', code:'FIN-02', price:3.5, src:'assets/img/food-layers/finish/finish-02.svg', desc:'Textura final crocante.'},
        {name:'Microfolhas', code:'FIN-03', price:4, src:'assets/img/food-layers/finish/finish-03.svg', desc:'Acabamento leve de alta tecnologia.'}
      ]}
    ];
  
    const layerState = foodLayers.map(() => 0);
    const layerList = document.querySelector('#foodLayers');
    const assembled = document.querySelector('#assembledFood');
    const totalPrice = document.querySelector('#foodTotalPrice');
    const nameOutput = document.querySelector('#assembledFoodName');
    const descriptionOutput = document.querySelector('#assembledFoodDescription');
    const codeOutput = document.querySelector('#assembledFoodCode');
    const counterOutput = document.querySelector('#foodLayerCounter');
  
    const selectedItem = index => foodLayers[index].items[layerState[index]];
    const calculateFoodTotal = () => foodLayers.reduce((sum, _, i) => sum + selectedItem(i).price, 0);
  
    function renderFoodStack() {
      if (!assembled) return;
      assembled.innerHTML = foodLayers.map((layer, i) => {
        const item = selectedItem(i);
        return `<img class="assembled-layer assembled-layer-${layer.id}" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.name)}" title="${escapeHtml(item.name)}">`;
      }).join('');
      totalPrice.textContent = money(calculateFoodTotal());
      const active = selectedItem(foodLayers.length - 1);
      nameOutput.textContent = active.name;
      descriptionOutput.textContent = active.desc;
      codeOutput.textContent = active.code;
    }
  
    function renderLayerControls() {
      if (!layerList) return;
      layerList.innerHTML = foodLayers.map((layer, i) => {
        const item = selectedItem(i);
        return `<article class="food-layer-row" data-layer-id="${layer.id}">
          <div class="food-layer-label">${escapeHtml(layer.label)}</div>
          <button type="button" class="food-layer-arrow" data-layer="${i}" data-direction="-1" aria-label="Opção anterior de ${escapeHtml(layer.label)}"><i class="bi bi-caret-left-fill"></i></button>
          <div class="food-layer-preview"><img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.name)}"></div>
          <div class="food-layer-info"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.code)} · ${money(item.price)}</span></div>
          <button type="button" class="food-layer-arrow" data-layer="${i}" data-direction="1" aria-label="Próxima opção de ${escapeHtml(layer.label)}"><i class="bi bi-caret-right-fill"></i></button>
        </article>`;
      }).join('');
  
      layerList.querySelectorAll('.food-layer-arrow').forEach(button => {
        button.addEventListener('click', () => {
          const index = Number(button.dataset.layer);
          const direction = Number(button.dataset.direction);
          const count = foodLayers[index].items.length;
          layerState[index] = (layerState[index] + direction + count) % count;
          renderLayerControls(); renderFoodStack();
          if (counterOutput) counterOutput.textContent = `LAYER ${String(index + 1).padStart(2,'0')} / ${String(foodLayers.length).padStart(2,'0')}`;
        });
      });
    }
  
    document.querySelector('#resetFood')?.addEventListener('click', () => {
      layerState.fill(0); renderLayerControls(); renderFoodStack();
      if (counterOutput) counterOutput.textContent = 'LAYER 01 / 05';
    });
    renderLayerControls(); renderFoodStack();
  
    // =========================================================
    // SIMULADOR DE PLANO
    // =========================================================
    const plan = document.querySelector('#plan');
    const meals = document.querySelector('#meals');
    const cartridges = document.querySelector('#cartridges');
    const period = document.querySelector('#period');
    const total = document.querySelector('#monthlyTotal');
    const mealsOut = document.querySelector('#monthlyMeals');
    const periodOut = document.querySelector('#periodTotal');
    const mealsValue = document.querySelector('#mealsValue');
  
    const updateCalculator = () => {
      if (!plan) return;
      const monthly = Number(plan.value) + Number(cartridges.value);
      const weeklyMeals = Number(meals.value);


      const monthlyMeals = Math.round(weeklyMeals * 4);



      
      total.textContent = money(monthly);


    



      mealsOut.textContent = monthlyMeals;
      mealsValue.textContent = weeklyMeals;
      periodOut.textContent = money(monthly * Number(period.value));
    };
    [plan, meals, cartridges, period].filter(Boolean).forEach(el => el.addEventListener('input', updateCalculator));
    updateCalculator();
  
    // =========================================================
    // SESSÃO / AÇÕES PROTEGIDAS
    // =========================================================
    const sessionStatus = document.querySelector('#sessionStatus');
    let session = {authenticated: !!window.PGW_CONFIG?.sessionStarted, client_id: Number(window.PGW_CONFIG?.clientId || 0), client_name: window.PGW_CONFIG?.clientName || ''};
  
    const isAuthenticated = () => !!session.authenticated;
    function setAccountUi() {
      const profileBtn = document.querySelector('#profileBtn');
      const cartBtn = document.querySelector('#cartBtn');
      const testimonialBtn = document.querySelector('#openTestimonialBtn');
      if (profileBtn) profileBtn.hidden = !isAuthenticated();
      if (cartBtn) cartBtn.hidden = !isAuthenticated();
      if (testimonialBtn) testimonialBtn.hidden = !isAuthenticated();
      if (sessionStatus) sessionStatus.textContent = isAuthenticated()
        ? `Sessão: ativa · cliente #${session.client_id} · ${session.client_name}`
        : 'Sessão: aguardando cadastro';
    }
  
    async function refreshSessionStatus() {
      try {
        const response = await fetch('api/session.php', {headers:{Accept:'application/json'}, credentials:'same-origin'});
        const data = await readJsonResponse(response);
        session = data;
        setAccountUi();
      } catch { setAccountUi(); }
    }
    refreshSessionStatus();
  
    function requireSession() {
      if (isAuthenticated()) return true;
      bootstrapModal('#gateModal')?.show();
      return false;
    }
  
    document.querySelector('#gateToSignup')?.addEventListener('click', () => document.querySelector('#cadastro')?.scrollIntoView({behavior:'smooth'}));
  
    // =========================================================
    // DEPOIMENTOS
    // =========================================================
    const grid = document.querySelector('#testimonialGrid');
    async function loadTestimonials() {
      if (!grid) return;
      grid.innerHTML = '<div class="col-lg-4"><article class="testimonial-card skeleton-card"></article></div>'.repeat(3);
      try {
        const response = await fetch('api/testimonials.php', {headers:{Accept:'application/json'}, credentials:'same-origin'});
        const data = await readJsonResponse(response);
        grid.innerHTML = data.testimonials.map(item => `<div class="col-lg-4"><article class="testimonial-card h-100">
          <div class="testimonial-head"><img class="avatar" src="${escapeHtml(item.avatar)}" alt="" loading="lazy"><div><div class="stars" aria-label="${item.rating} de 5">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div><div class="testimonial-author">${escapeHtml(item.name)} · ${escapeHtml(item.role)}</div></div></div>
          <blockquote class="testimonial-message">“${escapeHtml(item.message)}”</blockquote><small class="text-muted">${escapeHtml(item.created_at)}</small>
        </article></div>`).join('');
      } catch (error) {
        grid.innerHTML = `<div class="col-12"><div class="alert alert-warning"><strong>Não foi possível carregar os depoimentos.</strong><br>${escapeHtml(error.message)}</div></div>`;
      }
    }
    loadTestimonials();
    document.querySelector('#reloadTestimonials')?.addEventListener('click', loadTestimonials);
  
    function openTestimonial() {
      if (!requireSession()) return;
      document.querySelector('#testimonialForm')?.reset();
      bootstrapModal('#testimonialModal')?.show();
    }
    document.querySelector('#openTestimonialBtn')?.addEventListener('click', openTestimonial);
    document.querySelector('#profileToTestimonial')?.addEventListener('click', () => {
      bootstrapModal('#profileModal')?.hide();
      setTimeout(openTestimonial, 150);
    });
  
    const testimonialMessage = document.querySelector('#testimonialMessage');
    const testimonialCounter = document.querySelector('#testimonialCounter');
    function updateTestimonialCounter() {
      if (!testimonialMessage || !testimonialCounter) return;
      const n = testimonialMessage.value.length;
      testimonialCounter.textContent = `${n} / 500 caracteres · mínimo 140${n < 140 ? ` · faltam ${140 - n}` : ''}`;
    }
    testimonialMessage?.addEventListener('input', updateTestimonialCounter);
    testimonialMessage?.addEventListener('paste', () => setTimeout(updateTestimonialCounter, 0));
    updateTestimonialCounter();
  
    async function enrichPlayfulError(output, text) {
      output.textContent = text;
      if (!/SENSOR_17|impressora|observador/i.test(text)) return;
      try {
        const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode', {headers:{Accept:'application/json'}});
        const joke = await jokeResponse.json();
        if (joke?.joke) output.textContent = `${text} | ${joke.joke}`;
      } catch {
        // A piada é opcional. O protótipo não fica refém de uma API pública.
      }
    }
  
    document.querySelector('#testimonialForm')?.addEventListener('submit', async e => {
      e.preventDefault();
      if (!requireSession()) return;
      const output = document.querySelector('#testimonialMessageOutput');
      const form = e.currentTarget;
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      output.textContent = 'Publicando...';
      try {
        const payload = Object.fromEntries(new FormData(form).entries());
        const response = await fetch('api/testimonials.php', {method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify(payload)});
        const data = await readJsonResponse(response);
        output.textContent = data.message;
        form.reset(); form.classList.remove('was-validated');
        setTimeout(() => bootstrapModal('#testimonialModal')?.hide(), 500);
        setTimeout(loadTestimonials, 600);
      } catch (error) { await enrichPlayfulError(output, error.message); }
    });
  
    // =========================================================
    // PERFIL
    // =========================================================
    async function loadProfile() {
      if (!requireSession()) return;
      const content = document.querySelector('#profileContent');
      content.innerHTML = '<div class="skeleton-card"></div>';
      bootstrapModal('#profileModal')?.show();
      try {
        const response = await fetch('api/profile.php', {headers:{Accept:'application/json'}, credentials:'same-origin'});
        const data = await readJsonResponse(response);
        const u = data.user;
        content.innerHTML = `<div class="profile-grid">
          <div class="profile-cell"><span>Nome</span><strong>${escapeHtml(u.name)}</strong></div>
          <div class="profile-cell"><span>Cliente</span><strong>#${escapeHtml(u.id)}</strong></div>
          <div class="profile-cell"><span>E-mail</span><strong>${escapeHtml(u.email)}</strong></div>
          <div class="profile-cell"><span>Telefone</span><strong>${escapeHtml(u.phone)}</strong></div>
          <div class="profile-cell"><span>Interesse</span><strong>${escapeHtml(u.interest)}</strong></div>
          <div class="profile-cell"><span>Termos aceitos</span><strong>${Number(u.terms_accepted) === 1 ? 'Sim' : 'Não'}</strong></div>
          <div class="profile-cell"><span>Cadastro</span><strong>${escapeHtml(u.created_at)}</strong></div>
        </div>`;
      } catch (error) { content.innerHTML = `<div class="alert alert-warning">${escapeHtml(error.message)}</div>`; }
    }
    document.querySelector('#profileBtn')?.addEventListener('click', e => { e.preventDefault(); loadProfile(); });
  
    // =========================================================
    // CARRINHO
    // =========================================================
    let cartItems = [];
    async function loadCart(show = true) {
      if (!requireSession()) return;
      try {
        const response = await fetch('api/cart.php', {headers:{Accept:'application/json'}, credentials:'same-origin'});
        const data = await readJsonResponse(response);
        cartItems = data.items;
        renderCart(data.total);
        if (show) bootstrapModal('#cartModal')?.show();
      } catch (error) {
        document.querySelector('#cartContent').innerHTML = `<div class="alert alert-warning">${escapeHtml(error.message)}</div>`;
        if (show) bootstrapModal('#cartModal')?.show();
      }
    }
  
    function renderCart(totalValue = 0) {
      const count = cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
      document.querySelector('#cartCount').textContent = count;
      document.querySelector('#cartTotal').textContent = money(totalValue);
      const content = document.querySelector('#cartContent');











      if (!cartItems.length) { content.innerHTML = '<div class="empty-state">Carrinho vazio. O futuro chegou e trouxe nada para você.</div>'; return; }
      content.innerHTML = `<div class="cart-list">${cartItems.map(item => `<article class="cart-item">









        <div><span class="cart-item-type">${escapeHtml(item.item_type === 'plan' ? 'PLANO' : 'REFEIÇÃO')}</span><h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.description || '')}</p><button type="button" class="btn btn-pgw-secondary btn-sm cart-remove" data-remove-cart="${item.id}">Remover</button></div>
        <div class="cart-item-price"><strong>${money(item.subtotal)}</strong><small>${item.quantity} × ${money(item.unit_price)}</small></div>
      </article>`).join('')}</div>`;
      content.querySelectorAll('[data-remove-cart]').forEach(btn => btn.addEventListener('click', async () => {
        await fetch('api/cart.php', {method:'DELETE', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify({item_id:Number(btn.dataset.removeCart)})});
        loadCart(false);
      }));
    }
    document.querySelector('#cartBtn')?.addEventListener('click', () => loadCart(true));
  
    async function addToCart(item) {
      if (!requireSession()) return false;
      try {
        const response = await fetch('api/cart.php', {method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify(item)});
        const data = await readJsonResponse(response);
        await loadCart(false);
        return data;
      } catch (error) {
        throw new Error(`Não foi possível adicionar ao carrinho: ${error.message}`);
      }
    }
  
    // Reutilizamos un único modal de confirmação para alimento e plano.
    let confirmTask = null;
    function showConfirm(title, html, task) {
      if (!requireSession()) return;
      document.querySelector('#confirmModalLabel').textContent = title;
      document.querySelector('#confirmContent').innerHTML = html;
      confirmTask = task;
      bootstrapModal('#confirmModal')?.show();
    }
    document.querySelector('#confirmActionBtn')?.addEventListener('click', async () => {
      if (!confirmTask) return;
      const button = document.querySelector('#confirmActionBtn');
      button.disabled = true; button.textContent = 'Salvando...';
      try { await confirmTask(); bootstrapModal('#confirmModal')?.hide(); }
      catch (error) { document.querySelector('#confirmContent').innerHTML += `<div class="alert alert-warning mt-3">${escapeHtml(error.message)}</div>`; }
      finally { button.disabled = false; button.innerHTML = 'Confirmar'; confirmTask = null; }
    });
  
    document.querySelector('#addFoodToCart')?.addEventListener('click', () => {
      if (!requireSession()) return;
      const items = foodLayers.map((layer, i) => selectedItem(i));
      const foodName = `Refeição ${items[0].name} + ${items[1].name}`;
      const description = items.map(item => item.name).join(' · ');
      const price = calculateFoodTotal();
      showConfirm('Adicionar refeição', `<div class="confirm-summary"><span class="eyebrow">FOOD // CURRENT ASSEMBLY</span><h4>${escapeHtml(foodName)}</h4><p>${escapeHtml(description)}</p><strong>${money(price)}</strong></div>`, async () => {
        await addToCart({item_type:'food', item_key:items.map(i => i.code).join('-'), name:foodName, description, unit_price:price, quantity:1, metadata:{layers:items}});
      });
    });
  
    document.querySelector('#choosePlanBtn')?.addEventListener('click', () => {
      if (!requireSession()) return;
      const planName = plan.options[plan.selectedIndex].textContent;
      const planPrice = Number(plan.value) + Number(cartridges.value);
      const weeklyMeals = Number(meals.value);
      const months = Number(period.value);
      const cartridgesLabel = cartridges.options[cartridges.selectedIndex].textContent;
      showConfirm('Confirmar plano', `<div class="confirm-summary"><span class="eyebrow">PLAN // CONFIGURATION</span><h4>${escapeHtml(planName)}</h4><p>${weeklyMeals} refeições/semana · ${months} mês(es) · ${escapeHtml(cartridgesLabel)}</p><strong>${money(planPrice)} / mês</strong><small class="d-block mt-2">Total estimado do período: ${money(planPrice * months)}</small></div>`, async () => {
        await addToCart({item_type:'plan', item_key:plan.value, name:planName.split(' — ')[0], description:`${weeklyMeals} refeições/semana · ${months} mês(es) · ${cartridgesLabel}`, unit_price:planPrice, quantity:1, metadata:{plan:planName, meals:weeklyMeals, period:months, cartridges:cartridgesLabel, cartridge_value:Number(cartridges.value)}});
      });
    });
  
    // Confirma o carrinho. Planos confirmados também ficam registrados como assinatura.
    document.querySelector('#finishCartBtn')?.addEventListener('click', () => {
      if (!cartItems.length) return;
      showConfirm('Confirmar carrinho', `<div class="confirm-summary"><span class="eyebrow">ORDER // REVIEW</span><h4>${cartItems.length} item(ns)</h4><p>Os planos serão registrados no seu cadastro. A compra é apenas demonstrativa neste protótipo.</p><strong>${money(cartItems.reduce((s,i)=>s+Number(i.subtotal),0))}</strong></div>`, async () => {
        for (const item of cartItems) {
          if (item.item_type === 'plan') {
            const m = item.metadata || {};
            const response = await fetch('api/subscribe.php', {method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify({plan:item.name, price:item.unit_price, meals:Number(m.meals || 0), period:Number(m.period || 1), cartridges:String(m.cartridges || '')})});
            await readJsonResponse(response);
          }
          await fetch('api/cart.php', {method:'DELETE', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify({item_id:item.id})});
        }
        cartItems = [];
        renderCart(0);
        bootstrapModal('#cartModal')?.hide();
        setTimeout(() => bootstrapModal('#cartModal')?.show(), 180);
      });
    });
  
    // =========================================================
    // CADASTRO
    // =========================================================
    const form = document.querySelector('#signupForm');
    const message = document.querySelector('#formMessage');
    form?.addEventListener('submit', async e => {
      e.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) return;
      message.textContent = 'Salvando...';
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.terms = document.querySelector('#terms').checked;
      try {
        const response = await fetch('api/register.php', {method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, credentials:'same-origin', body:JSON.stringify(payload)});
        const data = await readJsonResponse(response);
        session = {authenticated:true, client_id:Number(data.client_id), client_name:String(data.client_name)};
        setAccountUi();
        message.textContent = data.message;
        form.reset(); form.classList.remove('was-validated');
        await refreshSessionStatus();
        document.querySelector('#profileBtn')?.scrollIntoView({behavior:'smooth', block:'nearest'});
      } catch (error) { message.textContent = error.message; }
    });
  
    // =========================================================
    // NAVEGAÇÃO
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'});
        const nav = document.querySelector('#mainNav');
        if (nav?.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
      });
    });
  });
  