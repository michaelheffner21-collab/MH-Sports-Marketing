// Mobiles Menü
(function(){
  var btn=document.querySelector('.menu-toggle');
  var nav=document.getElementById('hauptmenue');
  if(!btn||!nav)return;
  function close(){nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Menü öffnen');}
  btn.addEventListener('click',function(){
    var open=nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();

// Ziel-Finder: Auswahl in eine vorbereitete E-Mail übernehmen
(function(){
  var finder=document.querySelector('.goal-finder');
  if(!finder)return;
  var send=finder.querySelector('.goal-send');
  var status=finder.querySelector('.finder-status');
  var goals=finder.querySelectorAll('.goal-tag');
  var sports=finder.querySelectorAll('.sport-tag');
  var mail='heffner@mh-sportsmarketing.de';
  function selected(list){return Array.prototype.filter.call(list,function(b){return b.getAttribute('aria-pressed')==='true';}).map(function(b){return b.getAttribute('data-label');});}
  function update(){
    var g=selected(goals), sp=selected(sports);
    var body='Hallo Herr Heffner,\n\nich interessiere mich für eine Partnerschaft im Sport.';
    if(g.length){body+=' Diese Ziele sind mir wichtig:\n'+g.map(function(x){return '– '+x;}).join('\n');}
    if(sp.length){body+='\n\nSportart: '+sp[0];}
    body+='\n\nUnternehmen:\nAnsprechpartner:\nTelefon:\n\nViele Grüße';
    send.href='mailto:'+mail+'?subject='+encodeURIComponent('Anfrage Sponsoring – meine Ziele')+'&body='+encodeURIComponent(body);
    status.textContent=g.length?(g.length===1?'1 Ziel ausgewählt':g.length+' Ziele ausgewählt')+(sp.length?' · '+sp[0]:'')+' – wird in die E-Mail übernommen.':'Wählen Sie Ihre Ziele – Ihre Auswahl wird in die E-Mail übernommen.';
  }
  goals.forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');update();});});
  sports.forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';sports.forEach(function(o){o.setAttribute('aria-pressed','false');});if(!on)b.setAttribute('aria-pressed','true');update();});});
  update();
})();
