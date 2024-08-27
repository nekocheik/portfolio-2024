interface FileTypeCheck {
  isImage: boolean;
  isVideo: boolean;
}

export function checkType(fileName: string): FileTypeCheck {
  // Définir les extensions des images et des vidéos
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"];
  const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".flv", ".webm"];

  // Récupérer l'extension du fichier
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  // Vérifier le type de fichier
  const isImage = imageExtensions.includes(`.${fileExtension}`);
  const isVideo = videoExtensions.includes(`.${fileExtension}`);

  return {
    isImage,
    isVideo
  };
}

export default checkType