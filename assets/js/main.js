/* Nodrits Solutions — shared header/footer + interactions. Works from file:// (no fetch). */
(function(){
  var page = document.body.getAttribute('data-page') || '';
  var root = document.body.getAttribute('data-root') || '';
  var navItems = [
    ['index.html','Home'],
    ['services.html','Services'],
    ['pricing.html','Pricing'],
    ['work.html','Work'],
    ['process.html','Process'],
    ['about.html','About'],
    ['blog.html','Blog'],
    ['faq.html','FAQ'],
    ['contact.html','Contact']
  ];
  var links = navItems.map(function(it){
    var cls = (it[0].replace('.html','') === page || (page===''&&it[0]==='index.html')) ? ' class="active"' : '';
    return '<li><a href="'+root+it[0]+'"'+cls+'>'+it[1]+'</a></li>';
  }).join('');
  var header =
    '<a class="skip" href="#main">Skip to content</a>'+
    '<div class="wrap nav">'+
      '<a class="brand" href="'+root+'index.html"><img src="'+root+'assets/img/favicon.svg" alt="Nodrits Solutions logo">Nodrits <span class="grad">Solutions</span></a>'+
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false">☰</button>'+
      '<ul class="nav-links" id="navLinks">'+links+
        '<li class="nav-cta"><a class="btn small" href="'+root+'contact.html" style="color:#ffffff">Get a Quote</a></li>'+
      '</ul>'+
    '</div>';
  document.getElementById('site-header').innerHTML = header;
  var burger = document.getElementById('burger'), nl = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    var open = nl.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.textContent = open ? '✕' : '☰';
  });

  var footer =
    '<div class="wrap foot-grid">'+
      '<div class="foot-brand">'+
        '<a class="brand" href="'+root+'index.html"><img src="'+root+'assets/img/favicon.svg" alt="Nodrits Solutions logo">Nodrits <span class="grad">Solutions</span></a>'+
        '<p>Websites, SaaS products and AI workflows that help Pakistani businesses grow. Designed, built and supported in Pakistan.</p>'+
        '<div class="socials">'+
          '<a href="https://www.instagram.com/nodritsolutions/" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">📸</a>'+
          '<a href="https://www.facebook.com/profile.php?id=61595117498860" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">f</a>'+
          '<a href="https://www.linkedin.com/company/nodrits-solutions/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">in</a>'+
        '</div>'+
      '</div>'+
      '<div><h4>Company</h4><ul>'+
        '<li><a href="'+root+'about.html">About us</a></li>'+
        '<li><a href="'+root+'work.html">Our work</a></li>'+
        '<li><a href="'+root+'process.html">How we work</a></li>'+
        '<li><a href="'+root+'contact.html">Contact</a></li>'+
      '</ul></div>'+
      '<div><h4>Services</h4><ul>'+
        '<li><a href="'+root+'services.html#web-development">Web development</a></li>'+
        '<li><a href="'+root+'services.html#ai-chatbots">AI chatbots &amp; workflows</a></li>'+
        '<li><a href="'+root+'services.html#ecommerce">Online stores</a></li>'+
        '<li><a href="'+root+'services.html#automation">Business automation</a></li>'+
        '<li><a href="'+root+'services.html#care-plans">Monthly care plans</a></li>'+
      '</ul></div>'+
      '<div><h4>Resources</h4><ul>'+
        '<li><a href="'+root+'pricing.html">Pricing</a></li>'+
        '<li><a href="'+root+'blog.html">Blog</a></li>'+
        '<li><a href="'+root+'faq.html">FAQ</a></li>'+
        '<li><a href="mailto:nodritsolutions@gmail.com">nodritsolutions@gmail.com</a></li>'+
      '</ul></div>'+
    '</div>'+
    '<div class="foot-bottom"><div class="wrap" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:0 20px">'+
      '<span>© 2026 Nodrits Solutions. All rights reserved.</span>'+
      '<span>Domain + hosting at actual cost — no markup.</span>'+
    '</div></div>';
  document.getElementById('site-footer').innerHTML = footer;

  // FAQ accordions
  document.querySelectorAll('.faq-item .faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement, ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
    });
  });

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // Contact form -> mailto fallback
  var form = document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = form.name.value.trim(), phone = form.phone.value.trim(),
          pkg = form.package.value, msg = form.message.value.trim();
      var subject = encodeURIComponent('Website enquiry from ' + name + ' — ' + pkg);
      var body = encodeURIComponent('Name: '+name+'\nPhone/WhatsApp: '+phone+'\nInterested in: '+pkg+'\n\nDetails:\n'+msg);
      window.location.href = 'mailto:nodritsolutions@gmail.com?subject='+subject+'&body='+body;
    });
  }
})();
