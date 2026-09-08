/* Malak Graphic V2 — shared enhancements */
const polishSheet=document.createElement('link');
polishSheet.rel='stylesheet';polishSheet.href='fixes.css?v=20260908b';document.head.appendChild(polishSheet);

const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
const current = location.pathname.split('/').pop() || 'index.html';
$$('[data-page]').forEach(a=>a.classList.toggle('active', a.dataset.page===current));

// Keep the universal menu reliable on every page and viewport.
document.addEventListener('click',e=>{
  const panel=$('.nav-panel'),toggle=$('.menu-toggle');
  if(!panel||!toggle||!panel.classList.contains('open')) return;
  if(panel.contains(e.target)||toggle.contains(e.target)) return;
  panel.classList.remove('open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  const panel=$('.nav-panel'),toggle=$('.menu-toggle');
  if(panel?.classList.contains('open')){panel.classList.remove('open');toggle?.classList.remove('active');toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
});

$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  $$('.editorial-card').forEach((card,i)=>{
    const show=f==='all'||card.dataset.category===f;
    card.classList.toggle('hidden',!show);
    if(show) card.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:420,delay:i*22,easing:'cubic-bezier(.2,.75,.25,1)'});
  });
}));
const styles={
  minimal:{title:'Minimal',desc:'مساحات نظيفة، تفاصيل قليلة، وخطوط مرتبة. مناسب للي بحب التصميم الهادئ اللي ما يصرخ.',img:'assets/images/wedding-soft.webp'},
  classic:{title:'Classic',desc:'توازن أنيق بين الطابع الكلاسيكي والتفاصيل الناعمة، خصوصًا للدعوات والمناسبات.',img:'assets/images/wedding-classic.webp'},
  romantic:{title:'Romantic',desc:'ستايل دافئ وناعم للتفاصيل الشخصية، الأفراح، الخطوبة واللحظات الخاصة.',img:'assets/images/engagement.webp'},
  modern:{title:'Modern',desc:'ترتيب عصري، جرأة محسوبة، وتكوينات تناسب السوشال ميديا والمشاريع الجديدة.',img:'assets/images/social-purple.webp'},
  luxury:{title:'Luxury',desc:'تفاصيل أقل لكن حضور أقوى. مناسب للبراندات والمناسبات اللي بدها إحساس راقٍ وواثق.',img:'assets/images/logo-studio.webp'},
  playful:{title:'Playful',desc:'حركة أخف وطاقة ألطف لتصاميم أعياد الميلاد والمحتوى المرح بدون فوضى بصرية.',img:'assets/images/birthday.webp'}
};
$$('.style-tab').forEach(tab=>tab.addEventListener('click',()=>{
  const item=styles[tab.dataset.style]; if(!item)return;
  $$('.style-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active');
  const img=$('#style-preview-img'),title=$('#style-preview-title'),desc=$('#style-preview-desc');
  if(img){img.style.opacity='.2';setTimeout(()=>{img.src=item.img;img.alt=`نموذج ستايل ${item.title}`;img.style.opacity='1'},170)}
  if(title) title.textContent=item.title; if(desc) desc.textContent=item.desc;
}));
const orderForm=$('#order-wizard');
if(orderForm){
  let step=1; const max=4;
  const show=()=>{
    $$('.form-step',orderForm).forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===step));
    $$('.progress-item').forEach(p=>p.classList.toggle('active',Number(p.dataset.step)<=step));
    $('#prev-step').style.visibility=step===1?'hidden':'visible';
    $('#next-step').textContent=step===max?'جهز رسالة واتساب':'التالي';
    $('#step-count').textContent=`${step} / ${max}`;
    if(step===max) buildSummary();
  };
  const val=name=>{const c=$(`[name="${name}"]:checked`,orderForm);return c?c.value:($(`[name="${name}"]`,orderForm)?.value||'')};
  const buildSummary=()=>{
    const text=`الاسم: ${val('clientName')||'—'}\nنوع التصميم: ${val('designType')||'—'}\nالستايل: ${val('designStyle')||'—'}\nالاستخدام: ${val('usage')||'—'}\nالموعد المطلوب: ${val('deadline')||'غير محدد'}\nالتفاصيل: ${val('details')||'—'}`;
    $('#order-summary').textContent=text;
  };
  $('#next-step').addEventListener('click',()=>{
    if(step<max){step++;show();return;}
    buildSummary();
    const msg=`مرحبا Malak Graphic، بدي أطلب تصميم.\n\n${$('#order-summary').textContent}\n\nممكن نحكي بالتفاصيل والسعر؟`;
    window.open(typeof whatsappUrl==='function'?whatsappUrl(msg):`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer');
  });
  $('#prev-step').addEventListener('click',()=>{if(step>1){step--;show()}}); show();
}
$$('.faq-mode').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.faq-mode').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  $$('.smart-faq-panel').forEach(p=>p.classList.toggle('active',p.dataset.mode===btn.dataset.mode));
}));
const projectRoot=$('#project-root');
if(projectRoot){
  const projects={
    wedding:{title:'دعوة زفاف كلاسيكية',type:'Wedding Invitation',year:'2026',mood:'هادئ · كلاسيكي · راقٍ',cover:'assets/images/wedding-classic.webp',gallery:['assets/images/wedding-classic.webp','assets/images/wedding-soft.webp','assets/images/final-design.webp'],brief:'دعوة زفاف بهوية ناعمة تعطي إحساس راقٍ من أول نظرة، بدون زخرفة زيادة.',story:'بدأت الفكرة من رغبة بتصميم بسيط وهادئ. التركيز كان على التسلسل البصري، فراغ مريح، وخطوط تعطي مساحة للأسماء والتفاصيل بدل ما تنافسها.'},
    social:{title:'هوية سوشال لمشروع صغير',type:'Social Media',year:'2026',mood:'Modern · Editorial · Clean',cover:'assets/images/social-purple.webp',gallery:['assets/images/social-purple.webp','assets/images/social-soft.webp','assets/images/poster.webp'],brief:'نظام بصري مرن لمنشورات السوشال يحافظ على شخصية المشروع بدون تكرار ممل.',story:'الهدف كان خلق لغة بصرية سهلة الاستخدام لاحقًا. اعتمدنا مساحات ثابتة للعناوين والعروض مع تنويع التكوين حتى تظل الصفحة مترابطة وحيوية.'},
    menu:{title:'منيو Atelier Café',type:'Menu Design',year:'2026',mood:'Warm · Minimal · Business',cover:'assets/images/menu.webp',gallery:['assets/images/menu.webp','assets/images/logo-studio.webp','assets/images/poster.webp'],brief:'منيو مرتب وسهل القراءة لمشروع صغير، مصمم للطباعة والاستخدام الرقمي.',story:'رتبنا المعلومات أولًا قبل التجميل. الأقسام والأسعار لازم تنقرأ بسرعة، وبعدها دخلت الهوية البصرية كطبقة تعطي للمكان شخصية بدون ما تعطل الوظيفة.'},
    birthday:{title:'Birthday Lavender',type:'Birthday Invitation',year:'2026',mood:'Soft · Playful · Personal',cover:'assets/images/birthday.webp',gallery:['assets/images/birthday.webp','assets/images/greeting.webp','assets/images/engagement.webp'],brief:'دعوة عيد ميلاد شخصية بطابع لطيف وناعم بعيد عن الزحمة.',story:'تم بناء التصميم حول إحساس خفيف ومرح، مع الحفاظ على أناقة الألوان والخطوط حتى يظل مناسب للإرسال الرقمي والطباعة.'},
    logo:{title:'Minimal Studio Identity',type:'Logo Design',year:'2026',mood:'Minimal · Elegant · Clear',cover:'assets/images/logo-studio.webp',gallery:['assets/images/logo-studio.webp','assets/images/social-soft.webp','assets/images/greeting.webp'],brief:'هوية بسيطة لمشروع صغير تحتاج شعار واضح وسهل الاستخدام.',story:'الفكرة كانت تقليل العناصر لأقصى حد ممكن بدون فقدان الشخصية. ركزنا على شكل نظيف يشتغل بحجم صغير وكبير وعلى أكثر من خلفية.'}
  };
  const key=new URLSearchParams(location.search).get('p')||'wedding'; const p=projects[key]||projects.wedding;
  $('#project-title').textContent=p.title; $('#project-type').textContent=p.type; if($('#project-type-2')) $('#project-type-2').textContent=p.type; $('#project-year').textContent=p.year; $('#project-mood').textContent=p.mood; $('#project-brief').textContent=p.brief; $('#project-story').textContent=p.story;
  const cover=$('#project-cover-img'); cover.src=p.cover; cover.alt=p.title;
  $('#project-gallery').innerHTML=p.gallery.map((src,i)=>`<figure class="reveal in-view"><img src="${src}" alt="${p.title} — عرض ${i+1}" loading="lazy"></figure>`).join('');
  document.title=`${p.title} | Malak Graphic`;
  $$('.project-order').forEach(a=>a.dataset.message=`مرحبا Malak Graphic، عجبني مشروع ${p.title} وبدي تصميم مشابه.`);
}
