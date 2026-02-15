var slides = document.querySelectorAll('.project-slide');
var dots = document.getElementById('carouselDots');
var carousel = document.getElementById('projectCarousel');
var currentSlide = 0;

slides.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goToSlide(i, i > currentSlide ? 1 : -1); });
    dots.appendChild(dot);
});

function goToSlide(n, dir) {
    var next = (n + slides.length) % slides.length;
    if (next === currentSlide) return;

    var cur = slides[currentSlide];
    var nxt = slides[next];

    cur.style.transform = 'translateX(' + (dir > 0 ? '-60px' : '60px') + ') scale(0.95)';
    cur.classList.remove('active');

    nxt.classList.add('no-transition');
    nxt.style.transform = 'translateX(' + (dir > 0 ? '60px' : '-60px') + ') scale(0.95)';
    void nxt.offsetWidth;
    nxt.classList.remove('no-transition');
    nxt.classList.add('active');
    nxt.style.transform = '';

    cur.addEventListener('transitionend', function cleanup() {
        cur.style.transform = '';
        cur.removeEventListener('transitionend', cleanup);
    });

    dots.children[currentSlide].classList.remove('active');
    dots.children[next].classList.add('active');
    currentSlide = next;
}

var startX, dragging;

function swipeEnd(x) {
    if (!dragging) return;
    dragging = false;
    var diff = startX - x;
    if (Math.abs(diff) > 40) goToSlide(currentSlide + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
}

carousel.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
carousel.addEventListener('touchend', function(e) { swipeEnd(e.changedTouches[0].clientX); });
carousel.addEventListener('mousedown', function(e) { startX = e.clientX; dragging = true; });
addEventListener('mouseup', function(e) { swipeEnd(e.clientX); });
