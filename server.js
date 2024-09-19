const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fonction pour lire les données du fichier JSON
function readData() {
  const dataPath = path.join(__dirname, 'data.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
}

// Fonction pour écrire les données dans le fichier JSON
function writeData(data) {
  const dataPath = path.join(__dirname, 'data.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Charger les données au démarrage du serveur
let { likes, comments, views,viewers, downloads,shares } = readData();

// Si `views` n'existe pas encore dans le fichier JSON, initialise-le
if (typeof views === 'undefined') {
  views = 0;
}

/*
// Route principale pour la vidéo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour servir la vidéo
app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'public', 'video.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});
*/

// Serveur de fichiers statiques (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour streamer la vidéo
app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'public', 'video.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;

    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});


// Liste des vidéos disponibles
app.get('/videos', (req, res) => {
  res.send(`
    <h1>Liste des vidéos disponibles</h1>
    <ul>
      <li><a href="/video1">Vidéo 1</a></li>
      <li><a href="/video2">Vidéo 2</a></li>
    </ul>
  `);
});

// Liste des vidéos disponibles
app.get('/about', (req, res) => {
  res.send(`
    <h1>Liste des vidéos disponibles</h1>
    <ul>
      <li><a href="/video1">Vidéo 1</a></li>
      <li><a href="/video2">Vidéo 2</a></li>
    </ul>
  `);
});

// Route pour chaque vidéo
app.get('/video1', (req, res) => {
  const videoPath = path.join(__dirname, 'public', 'video1.mp4');
  streamVideo(videoPath, req, res);
});

app.get('/video2', (req, res) => {
  const videoPath = path.join(__dirname, 'public', 'video2.mp4');
  streamVideo(videoPath, req, res);
});

// Fonction générique pour streamer les vidéos
function streamVideo(videoPath, req, res) {
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;

    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
}

// Route pour incrémenter le nombre de vues
/*app.post('/view', (req, res) => {
  views++; // Incrémenter le nombre de vues*/
  app.post('/view', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    if (!viewers.includes(clientIp)) {
      views++; // Incrémenter les vues seulement pour une nouvelle adresse IP
      viewers.push(clientIp);
  
      // Sauvegarder le nombre de vues et les IPs dans le fichier JSON
      writeData({ likes, comments, views, viewers,downloads,shares });
    }
  

  /*// Sauvegarder le nombre de vues dans le fichier JSON
  writeData({ likes, comments, views });*/

  res.status(200).send({ success: true,views });
});

// Route pour gérer les téléchargements
app.post('/download', (req, res) => {
  downloads = req.body.downloads; // Mettre à jour le nombre de téléchargements
  console.log(`Nombre de téléchargements : ${downloads}`);

  // Sauvegarder le nombre de téléchargements dans le fichier JSON
  writeData({ likes, comments, views,viewers, downloads,shares });

  res.status(200).send({ success: true });
});


/*// Route pour gérer les partages
app.post('/share', (req, res) => {
  shares = req.body.shares; // Mettre à jour le nombre de partages
  console.log(`Nombre de partages : ${shares}`);

  // Sauvegarder le nombre de partages dans le fichier JSON
  writeData({ likes, comments, views,viewers, downloads, shares });

  res.status(200).send({ success: true });
});*/

// Route pour gérer les partages
app.post('/share', (req, res) => {
  shares++; // Incrémenter le nombre de partages

  // Sauvegarder le nombre de partages dans le fichier JSON
  writeData({ likes, comments, views, viewers, downloads, shares });

  // Renvoie du lien de la vidéo à partager
  const videoLink = 'http://localhost:5000/video';
  console.log(`Nombre de partages : ${shares}`);
  res.status(200).json({ success: true, link: videoLink, shares: shares });
});


// Route pour gérer les likes
app.post('/like', (req, res) => {
  likes = req.body.likes;
  console.log(`Nombre de likes : ${likes}`);

  // Sauvegarder le nouveau nombre de likes dans le fichier JSON
  writeData({ likes, comments, views, viewers,downloads,shares });

  res.status(200).send({ success: true });
});

// Route pour gérer les commentaires
app.post('/comment', (req, res) => {
  const {pseudo, comment} = req.body;
  comments.push({pseudo, comment});
  console.log(`Nouveau commentaire de ${pseudo}: ${comment}`);

  // Sauvegarder le nouveau commentaire dans le fichier JSON
  writeData({ likes, comments, views, viewers, downloads,shares });

  res.status(200).send({ success: true });
});

// Route pour récupérer les likes et commentaires au chargement de la page
app.get('/data', (req, res) => {
  res.json({ likes, comments, views, viewers, downloads,shares });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
