import './style.css'
import Experience from './Experience/Experience.js'

window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const loadingScreen = document.getElementById('loadingScreen');

let progress = 0;
const interval = setInterval(function () {
    progress += 1;
    progressBar.style.width = `${progress * 5}%`; 
    progressText.textContent = `${progress * 5}%`;
    if (progress >= 20) { 
        clearInterval(interval);
        loadingScreen.style.transition = 'opacity 0.5s ease'; 
        loadingScreen.style.opacity = '0'; 
        setTimeout(() => {
            loadingScreen.style.display = 'none'; 
        }, 500); 
    }
}, 500);



document.addEventListener('DOMContentLoaded', function() {
    function fadeOut(element) {
        let opacity = 1;
        const fadeEffect = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeEffect);
                element.style.display = 'none';
            }
        }, 50);
    }

    const projectLink1 = document.getElementById('projectLink1');
    const splineViewer1 = document.getElementById('splineViewer1');
    const buttonViewer1 = document.getElementById('buttonViewer1');

    projectLink1.addEventListener('click', function(event) {
        event.preventDefault();
        fadeOut(splineViewer1);
        fadeOut(buttonViewer1);
    });

    const projectLink2 = document.getElementById('projectLink2');
    const splineViewer2 = document.getElementById('splineViewer2');
    const buttonViewer2 = document.getElementById('buttonViewer2');

    projectLink2.addEventListener('click', function(event) {
        event.preventDefault();
        fadeOut(splineViewer2);
        fadeOut(buttonViewer2);
    });
});

