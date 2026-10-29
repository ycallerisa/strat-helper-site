// Tout le site est gardé en cache : il s'ouvre instantanément, même sans réseau.
// Un fichier absent du cache (ajouté par une version plus récente) y est mis à son premier chargement.
// Une nouvelle version (nouveau sw.js) remplace le cache ; elle s'affiche à l'ouverture suivante.
const CACHE = 'strat-helper-9d573a9c8ecb';
const FILES = ["./","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./assets/index-D3d4QBjf.js","./assets/Chiffres-LWwn0QgO.js","./assets/Coach-81tH7Fgu.js","./assets/Cs2-BvfqQkOF.js","./assets/IglRoom-BhHSjgoG.js","./assets/LiveCard-Cs4DtUi3.js","./assets/Salle-DlQyeu55.js","./assets/Strat-Bgr1Hl-F.js","./assets/Strats-Bh32zwAR.js","./assets/Tasks-CSUVFzKV.js","./assets/ancient.en-D9bp_en0.js","./assets/ancient.fr-Gm1z4_VB.js","./assets/ancient.ru-CC61Pp_u.js","./assets/anubis.en-s9i3YsUn.js","./assets/anubis.fr-DGZ-kcpY.js","./assets/anubis.ru-ClCSbuR_.js","./assets/cache.en-DTamveIP.js","./assets/cache.fr-BJLQW9Ty.js","./assets/cache.ru-CEp07Dpv.js","./assets/client-D35MNd4v.js","./assets/client-bKFakDM9.js","./assets/dust2.en-CbGGo2tZ.js","./assets/dust2.fr-DpfLmk-3.js","./assets/dust2.ru-Bralg-jq.js","./assets/en-BZzHZdL8.js","./assets/fr-DbprlOCS.js","./assets/hooks-gDgi_xSW.js","./assets/inferno.en-CYNepvD3.js","./assets/inferno.fr-Cb38FSnK.js","./assets/inferno.ru-D1OdMwzU.js","./assets/mirage.en-P7gWOBPG.js","./assets/mirage.fr-Dz-Gw7B3.js","./assets/mirage.ru-C0MSDrIh.js","./assets/nuke.en-ida6vIpx.js","./assets/nuke.fr-BEzvB-ct.js","./assets/nuke.ru-Yv-grfYn.js","./assets/reliability-D32W3dFc.js","./assets/ru-BQjKy2q1.js","./assets/wakeLock-BfSERCqn.js","./assets/index-B5bAJTGb.css"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  const cached = request.mode === 'navigate' ? caches.match('./') : caches.match(request, { ignoreSearch: true });
  event.respondWith(
    cached.then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok && request.mode !== 'navigate') {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
