var body = document.body;
var themeBtn = document.getElementById('themeBtn');

var saved = localStorage.getItem('theme');
var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if ((saved || (prefersDark ? 'dark' : 'light')) === 'light') {
    body.classList.add('light-mode');
}
themeBtn.textContent = body.classList.contains('light-mode') ? '\u25D1' : '\u25D0';

function toggleTheme() {
    body.classList.toggle('light-mode');
    var light = body.classList.contains('light-mode');
    localStorage.setItem('theme', light ? 'light' : 'dark');
    themeBtn.textContent = light ? '\u25D1' : '\u25D0';
}
