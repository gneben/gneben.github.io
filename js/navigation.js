var topBtn = document.getElementById('topBtn');
var navEl = document.querySelector('nav');
var navLinks = document.querySelectorAll('nav a');
var sections = document.querySelectorAll('section');

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        entry.target.classList.toggle('visible', entry.isIntersecting);
    });
}, { threshold: 0.15 });

sections.forEach(function(s) { observer.observe(s); });

function updateActiveMenu() {
    var winH = innerHeight;
    var best = 0;
    var active = null;

    sections.forEach(function(s) {
        var r = s.getBoundingClientRect();
        var visible = Math.max(0, Math.min(winH, r.bottom) - Math.max(0, r.top));
        var pct = visible / r.height * 100;
        if (pct > best) { best = pct; active = s.id || 'hero'; }
    });

    navLinks.forEach(function(link) {
        var href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', active === href);
    });
}

var scrollTimer;
addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateActiveMenu, 50);
    topBtn.classList.toggle('show', scrollY > innerHeight * 0.5);
});

navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('href').substring(1));
        if (target) scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
});

addEventListener('load', updateActiveMenu);

function positionTopBtn() {
    topBtn.style.top = navEl.offsetHeight + 15 + 'px';
}
positionTopBtn();
addEventListener('resize', positionTopBtn);

topBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
