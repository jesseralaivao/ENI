// Fonction pour charger les données depuis le serveur
function loadData() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        // Mettre à jour les likes
        likeCount = data.likes;
        likeCountDisplay.textContent = likeCount;

         // Mettre à jour le nombre de vues
         viewCountDisplay.textContent = data.views;

         // Mettre à jour les partages
          shareCount = data.shares;
          shareCountDisplay.textContent = shareCount;

         // Mettre à jour les téléchargements
          downloadCount = data.downloads;
          downloadCountDisplay.textContent = downloadCount;
  
        // Afficher les commentaires
        data.comments.forEach(({pseudo, comment }) => {
          const commentElement = document.createElement('li');
          commentElement.textContent = `${pseudo}: ${comment}`;
          commentList.appendChild(commentElement);
        });

        // Mettre à jour le nombre de commentaires
      const commentCount = data.comments.length;
      document.getElementById('commentCount').textContent = commentCount;
      })
      .catch(err => console.error('Erreur lors du chargement des données :', err));
  }


// Ajouter un écouteur pour l'événement 'play' de la vidéo
const videoPlayer = document.getElementById('videoPlayer');
videoPlayer.addEventListener('play', () => {
  fetch('/view', { method: 'POST' })
    .then(() => {
      // Incrémenter le compteur de vues localement
      const viewCountElement = document.getElementById('viewCount');
      const currentViews = parseInt(viewCountElement.textContent);
      viewCountElement.textContent = currentViews + 1;
    })
    .catch(err => console.error('Erreur lors de l incrémentation des vues :', err));
});

// View count functionality
const videoElement = document.getElementById('videoElement');
const viewCountDisplay = document.getElementById('viewCount');
  
  // Charger les données à chaque chargement de la page
  window.onload = loadData;
  
  // Like button functionality
  let likeCount = 0;
  const likeBtn = document.getElementById('likeBtn');
  const likeCountDisplay = document.getElementById('likeCount');
  
  likeBtn.addEventListener('click', () => {
    likeCount++;
    likeCountDisplay.textContent = likeCount;
  
    // Envoyer le nombre de likes au serveur
    fetch('/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: likeCount })
    });
  });
  
  // Comment section functionality
  const commentForm = document.getElementById('commentForm');
  const commentList = document.getElementById('commentList');
  
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pseudoInput = document.getElementById('pseudoInput');
    const commentInput = document.getElementById('commentInput');

    const pseudo = pseudoInput.value;
    const comment = commentInput.value;
  
  
    // Envoyer le commentaire au serveur
    fetch('/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, comment })
            
    })
    .then (()=>{
    // Ajouter le commentaire à la liste
    const commentElement = document.createElement('li');
    commentElement.textContent = `${pseudo}: ${comment}`;
    commentList.appendChild(commentElement);
    
    // Mettre à jour le nombre de commentaires
    const commentCount = commentList.children.length;
    document.getElementById('commentCount').textContent = commentCount;

    // Réinitialiser l'entrée du formulaire
    pseudoInput.value = '';
    commentInput.value = '';
  });
});

// Fonction pour télécharger la vidéo
const downloadBtn = document.getElementById('downloadBtn');
const downloadCountDisplay = document.getElementById('downloadCount');
let downloadCount = 0;

downloadBtn.addEventListener('click', () => {
  // Créer un lien de téléchargement vers la vidéo
  const link = document.createElement('a');
  link.href = '/video'; // Lien vers la vidéo
  link.download = 'video.mp4'; // Nom du fichier téléchargé
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Incrémenter le compteur de téléchargements
  downloadCount++;
  downloadCountDisplay.textContent = downloadCount;

  // Envoyer le nombre de téléchargements au serveur
  fetch('/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ downloads: downloadCount })
  });
});


/*// Fonction pour partager la vidéo
const shareBtn = document.getElementById('shareBtn');
const shareCountDisplay = document.getElementById('shareCount');
let shareCount = 0;

shareBtn.addEventListener('click', async () => {
  const videoUrl = window.location.href; // Le lien vers la vidéo
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Regarde cette vidéo !',
        text: 'Voici une vidéo que je veux partager avec toi.',
        url: videoUrl
      });
      
      // Incrémenter le compteur de partages
      shareCount++;
      shareCountDisplay.textContent = shareCount;

      // Envoyer le nombre de partages au serveur
      fetch('/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shares: shareCount })
      });
    } catch (error) {
      console.error('Erreur lors du partage :', error);
    }
  } else {
    // Fallback : Copier l'URL dans le presse-papiers
    try {
      await navigator.clipboard.writeText(videoUrl);
      alert('Le lien de la vidéo a été copié dans le presse-papiers !');

      // Incrémenter le compteur de partages même dans ce cas
      shareCount++;
      shareCountDisplay.textContent = shareCount;

      // Envoyer le nombre de partages au serveur
      fetch('/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shares: shareCount })
      });
    } catch (err) {
      console.error('Erreur lors de la copie du lien :', err);
    }
  }
});*/

const shareBtn = document.getElementById('shareBtn');
const shareCountDisplay = document.getElementById('shareCount');

// Gestion de l'événement de clic sur le bouton de partage
shareBtn.addEventListener('click', () => {
  // Envoyer une requête au serveur pour enregistrer le partage
  fetch('/share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Afficher le lien dans la console ou dans une alerte
      alert(`Lien partagé : ${data.link}`);
      
      // Mettre à jour le compteur de partages
      shareCountDisplay.textContent = data.shares;
    }
  })
  .catch(err => console.error('Erreur lors du partage :', err));
});
