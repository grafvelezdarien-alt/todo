/* AppMint · Service Worker del chat (malla wifi)
 *
 * Se registra desde index.html solo cuando la app se sirve por http/https
 * (en el APK el origen es file:// y Android no permite service workers).
 *
 * Recibe {type:'notificar-mensaje', usuario, texto} por postMessage y muestra
 * la notificación del sistema; al tocarla avisa a la página para que abra el
 * chat de la malla wifi.
 */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function (event) {
  var d = event.data || {};
  if (d.type !== 'notificar-mensaje') return;
  var usuario = String(d.usuario == null || d.usuario === '' ? 'Alguien' : d.usuario);
  var texto = String(d.texto == null ? '' : d.texto).slice(0, 160);
  event.waitUntil(
    self.registration.showNotification('Nuevo mensaje de ' + usuario, {
      body: texto,
      tag: 'mesh-' + usuario,
      vibrate: [200, 100, 200],
      renotify: true,
      actions: [
        { action: 'abrir', title: 'Responder' },
        { action: 'cerrar', title: 'Descartar' }
      ]
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  var tag = (event.notification && event.notification.tag) || '';

  if (event.action === 'cerrar') {
    event.notification.close();
    return;
  }

  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client) {
          try {
            client.postMessage({ type: 'notification-click', action: event.action || 'abrir', tag: tag });
          } catch (e) {}
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
