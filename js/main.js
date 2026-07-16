/* Power Fitness — JavaScript */
document.addEventListener('DOMContentLoaded',()=>{
  // Sidebar
  const hamburger=document.getElementById('hamburger'),sidebar=document.getElementById('sidebar'),overlay=document.getElementById('sidebarOverlay'),closeBtn=document.getElementById('sidebarClose');
  function open(){sidebar.classList.add('open');overlay.classList.add('active');hamburger?.classList.add('open');document.body.style.overflow='hidden'}
  function close(){sidebar.classList.remove('open');overlay.classList.remove('active');hamburger?.classList.remove('open');document.body.style.overflow=''}
  hamburger?.addEventListener('click',()=>sidebar.classList.contains('open')?close():open());
  closeBtn?.addEventListener('click',close);overlay?.addEventListener('click',close);

  // Navbar
  const navbar=document.getElementById('navbar'),btt=document.getElementById('backToTop');
  window.addEventListener('scroll',()=>{const y=window.scrollY;if(!navbar.classList.contains('scrolled')&&y>50)navbar.classList.add('scrolled');if(navbar.classList.contains('scrolled')&&y<=50)navbar.classList.remove('scrolled');btt?.classList.toggle('visible',y>500)},{passive:true});
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Slide Animation
  const els=document.querySelectorAll('[data-slide]');
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const d=parseInt(e.target.dataset.delay)||0;setTimeout(()=>e.target.classList.add('slided'),d);obs.unobserve(e.target)}})},{threshold:.12});
  els.forEach(el=>obs.observe(el));

  // BMI Calculator
  const calcBtn=document.getElementById('calcBMI');
  calcBtn?.addEventListener('click',()=>{
    const h=parseFloat(document.getElementById('bmiHeight').value),w=parseFloat(document.getElementById('bmiWeight').value);
    if(!h||!w||h<100||h>250||w<30||w>200){showToast('Enter valid height (100-250) & weight (30-200)');return}
    const bmi=(w/((h/100)**2)).toFixed(1);
    const res=document.getElementById('bmiResult'),num=document.getElementById('bmiNumber'),cat=document.getElementById('bmiCategory'),msg=document.getElementById('bmiMessage');
    // Animate number
    let cur=0;const target=parseFloat(bmi),dur=1000,s=performance.now();
    (function u(n){const p=Math.min((n-s)/dur,1);num.textContent=(target*(1-Math.pow(1-p,3))).toFixed(1);p<1?requestAnimationFrame(u):num.textContent=bmi})(s);
    let c,m,c2;
    if(bmi<18.5){c='UNDERWEIGHT';m='Gain muscle! Join our Strength program.';c2='#3b82f6'}
    else if(bmi<25){c='NORMAL';m='Great shape! Maintain with General Fitness.';c2='#22c55e'}
    else if(bmi<30){c='OVERWEIGHT';m='Transform! Our HIIT program is for you.';c2='#eab308'}
    else{c='OBESE';m='Start now! Join Body Transformation.';c2='#ef4444'}
    cat.textContent=c;cat.style.color=c2;msg.textContent=m;num.style.color=c2;
    res.classList.remove('hidden');
  });

  // Pricing Toggle
  const toggleBtns=document.querySelectorAll('.toggle-btn');
  const priceEls=document.querySelectorAll('.pricing-price');
  toggleBtns.forEach(btn=>{btn.addEventListener('click',()=>{toggleBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const p=btn.dataset.period;priceEls.forEach(el=>{const price=el.dataset[p];const sfx=p==='monthly'?'/month':'/year';el.innerHTML=price+'<span>'+sfx+'</span>'})})});

  function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)}
});
