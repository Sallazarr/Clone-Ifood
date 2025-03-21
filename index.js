let root = document.querySelector(':root')
let body = document.querySelector('body')

document.getElementById('themeSwitcher').addEventListener('click', function(){
    if(body.dataset.theme === 'light') {
    root.style.setProperty('--color-primary', '#66b3ff')
    root.style.setProperty('--color-primary-hover', '#3385cc')
    root.style.setProperty('--color-background', 'rgba(18, 18, 18, 1)')
    root.style.setProperty('--color-background-light', 'rgba(31, 31, 31, 0.9)')
    root.style.setProperty('--color-text', '#e0e0e0')
    root.style.setProperty('--color-error', '#ff4d4d')
    root.style.setProperty('--color-shadow', 'rgba(0, 0, 0, 0.6)')
    root.style.setProperty('--color-link', '#66b3ff')
    body.dataset.theme = 'dark'
    }

})