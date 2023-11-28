import './style.css'
import Experience from './Experience/Experience.js'

window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

document.addEventListener('DOMContentLoaded', function() {
    const projectLink = document.getElementById('projectLink');
    const splineViewer = document.getElementById('splineViewer');
    const buttonViewer = document.getElementById('buttonViewer');

    projectLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (splineViewer.style.display === 'none') {
            splineViewer.style.display = 'block';
            buttonViewer.style.display = 'block';

        } else {
            splineViewer.style.display = 'none';
            buttonViewer.style.display = 'none';
        }
    });
});
