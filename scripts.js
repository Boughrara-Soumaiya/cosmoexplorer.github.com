function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}
//news
const apiKey = 'DaPlte3v3Ts23or2X9dH0EuTNUzeLjihuBD189bP';

// Récupérer des images spatiales uniquement (sans vidéos)
async function fetchSpaceImages() {
    const url = `https://api.nasa.gov/planetary/apod?count=10&api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const images = await response.json();
        const carousel = document.querySelector('.carousel');

        // Filtrer pour ne garder que les images et éviter les vidéos
        const imageUrls = images.filter(img => img.media_type === "image").map(img => img.url);

        // Vérifier s'il y a des images valides
        if (imageUrls.length === 0) {
            carousel.innerHTML = `<img src="https://via.placeholder.com/800x400" alt="Image non disponible">`;
            return;
        }

        // Générer les images dans le carrousel
        carousel.innerHTML = imageUrls.map(url => `<img src="${url}" alt="Image de l'espace">`).join('');
    } catch (error) {
        console.error('Erreur lors de la récupération des images NASA', error);
    }
}

// Fetch des articles NASA
async function fetchNews() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const newsContainer = document.getElementById('news-articles');
        newsContainer.innerHTML = `
            <div class="news-item">
                <h3><a href="${data.url}" target="_blank">${data.title}</a></h3>
                <p>${data.explanation}</p>
            </div>
        `;
    } catch (error) {
        console.error('Erreur lors de la récupération des news NASA', error);
    }
}

// Gestion du carrousel
let index = 0;
function moveSlide(step) {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    index = (index + step + images.length) % images.length;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}

// Initialisation
window.onload = () => {
    fetchSpaceImages();
    fetchNews();

    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
};
//SYSTEME SOLAIRE
// Fonction pour afficher la description de la planète dans un popup
function showDescription(planet) {
    const descriptions = {
        soleil: "Le Soleil est l'étoile au centre du système solaire.",
        mercure: "Mercure est la planète la plus proche du Soleil.",
        venus: "Vénus est une planète rocheuse avec une atmosphère dense.",
        terre: "La Terre est la seule planète connue à abriter la vie.",
        mars: "Mars est souvent appelée la planète rouge en raison de sa couleur.",
        jupiter: "Jupiter est la plus grande planète du système solaire.",
        saturne: "Saturne est célèbre pour ses anneaux impressionnants.",
        uranus: "Uranus est une planète géante glacée avec une inclinaison extrême.",
        neptune: "Neptune est la planète la plus éloignée du Soleil."
    };

    // Récupérer la modale et les éléments de description
    const modal = document.getElementById("planetModal");
    const modalName = document.getElementById("modal-planet-name");
    const modalDesc = document.getElementById("modal-planet-desc");

    // Mettre à jour les informations de la modale
    modalName.innerText = planet.charAt(0).toUpperCase() + planet.slice(1);
    modalDesc.innerText = descriptions[planet] || "Description non disponible.";

    // Afficher la modale
    modal.style.display = "block";
}

// Fonction pour fermer la modale
const closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function() {
    const modal = document.getElementById("planetModal");
    modal.style.display = "none";
}

// Fermer la modale si l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    const modal = document.getElementById("planetModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}



//REGLEMENTATION 
window.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.categorie');
    categories.forEach((categorie, index) => {
        setTimeout(() => {
            categorie.classList.add('visible');
        }, index * 300); // Décalage pour un effet de "fade-in"
    });
});