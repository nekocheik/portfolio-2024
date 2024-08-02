#!/bin/bash

# Supprimer le fichier note.txt s'il existe
rm -f note.txt

# Chercher les fichiers .ts et .vue dans le dossier src
find src -type f \( -name "*.ts" -o -name "*.vue" \) -print0 | while IFS= read -r -d '' file; do
  # Récupérer le nom du fichier
  filename=$(basename "$file")

  # Ajouter le nom du fichier en commentaire au début du contenu
  echo "/* --- $filename --- */" >> note.txt
  cat "$file" >> note.txt
  echo "" >> note.txt
done