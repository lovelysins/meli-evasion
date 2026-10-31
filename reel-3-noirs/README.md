# reel-3-noirs (HyperFrames)

Reel Instagram + TikTok vertical 1080x1920, 31 s : hook, teaser, 3 looks (face puis dos), outro.

## Utilisation
1. Télécharger les 6 rushes depuis Drive (`montage-video/raw/`) et les mettre dans `assets/`
   (noms attendus : IMG_1292.MOV ... IMG_1297.MOV).
2. Ouvrir `build.mjs` : vérifier l'association fichier -> look/face/dos (hypothèse : 1292 face L1, 1293 dos L1,
   1294 face L2, 1295 dos L2, 1296 face L3, 1297 dos L3) et régler `in` (seconde de départ de chaque plan, 3,5 s utilisées).
3. `node build.mjs` puis `npm run check`
4. `npm run dev` pour prévisualiser, `npm run render` pour exporter le MP4.
5. Musique : ajouter un `<audio>` (morceau licencié pour la plateforme) puis relancer le check.

Prérequis : Node 22+, ffmpeg.
