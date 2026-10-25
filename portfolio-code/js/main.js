/* M. Abdullah Malik – Portfolio scripts */

/* 1) Light / dark mode toggle + image protection */
(function(){
  var r=document.documentElement,btns=document.querySelectorAll('.tg');
  function apply(d){r.setAttribute('data-theme',d?'dark':'light');btns.forEach(function(b){b.setAttribute('aria-checked',d?'true':'false');});}
  var saved=null;try{saved=localStorage.getItem('theme');}catch(e){}
  apply(saved==='dark');
  document.addEventListener('contextmenu',function(e){if(e.target.closest&&e.target.closest('img,figure,.stage'))e.preventDefault();});
  document.addEventListener('dragstart',function(e){if(e.target.tagName==='IMG')e.preventDefault();});
  btns.forEach(function(b){b.addEventListener('click',function(){
    var d=r.getAttribute('data-theme')!=='dark';apply(d);
    try{localStorage.setItem('theme',d?'dark':'light');}catch(e){}
  });});
})();

/* 2) Projects: random picks and "View all projects" */
(function(){
  var sec=document.getElementById('projects'),btn=document.getElementById('moreBtn'),row=sec&&sec.querySelector('.allp');
  if(!sec||!btn||!row)return;
  var all=[].slice.call(row.children),cat={post:sec.querySelector('.posts'),logo:sec.querySelector('.logos'),mock:sec.querySelector('.mocks')};
  function type(f){return f.classList.contains('post')?'post':f.classList.contains('logo')?'logo':'mock';}
  ['post','logo','mock'].forEach(function(c){
    var items=all.filter(function(f){return type(f)===c;});
    if(items.length)items[Math.floor(Math.random()*items.length)].classList.add('pick');
  });
  sec.classList.add('collapsed');
  btn.addEventListener('click',function(){
    var collapsed=sec.classList.toggle('collapsed');
    var n={post:0,logo:3,mock:7};
    all.forEach(function(f){var c=type(f);(collapsed?row:cat[c]).appendChild(f);if(!collapsed){f.style.setProperty('--i',n[c]++);}});
    btn.setAttribute('aria-expanded',collapsed?'false':'true');
    btn.textContent=collapsed?'View all projects':'Show fewer projects';
    if(collapsed)sec.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();
