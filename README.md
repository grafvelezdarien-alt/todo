# TODO — App Android (APK)

Aplicación Android generada con [AppMint Studio](https://perchance.org/appmint-studio) a partir de HTML, CSS y JavaScript.
Es una app WebView: tu sitio web o código HTML se ejecuta dentro de una WebView nativa de Android.

## Características

- Convierte HTML/CSS/JS (o un sitio web por URL) en una app Android instalable.
- Icono, splash screen, colores de tema y barra de estado personalizados.
- Modo oscuro (sigue el sistema / claro / oscuro).
- Orientación: automática, vertical u horizontal.
- Pull-to-refresh, zoom con gestos, modo escritorio, pantalla completa.
- Bloqueo de popups y enlaces externos abiertos en el navegador.
- Cookies persistentes.
- APIs de JavaScript disponibles en tu código:
  - `MintApp.toast(msg)`, `MintApp.showDialog(t, m)`, `MintApp.vibrate(ms)`
  - `MintApp.openUrl(url)`, `MintApp.share(texto)`, `MintApp.exit()`
  - `MintApp.setKeepScreenOn(true)`, `MintApp.setScreenshotsEnabled(bool)`
  - `MintApp.setTitle(t)`, `MintApp.setOrientation('portrait'|'landscape'|'auto')`
  - `MintApp.setFullscreen(true)`, `MintApp.hideSplash()`
  - `MintApp.getAppName()`, `MintApp.getAppVersion()`
- Compila APK y Android App Bundle (.aab) automáticamente con GitHub Actions.

## Cómo obtener el APK (sin instalar nada)

1. Sube este proyecto a un repositorio de GitHub.
2. GitHub Actions compilará el APK automáticamente al hacer push.
3. Ve a la pestaña **Actions** del repositorio, abre el último workflow y descarga el artefacto **APK-Instalable**.
4. Instala el APK en tu teléfono (permite "orígenes desconocidos").
5. El artefacto **AAB-GooglePlay** es el App Bundle para publicar en Google Play.

## Compilar localmente (Android Studio)

1. El workflow monta el proyecto y compila solo. Para compilar tú localmente: descarga la plantilla (misma que usa el workflow), ejecuta `python3 build.py .` y abre la carpeta en Android Studio.
2. Espera a que Gradle sincronice (descarga dependencias).
3. Menú *Build* → *Build Bundle(s) / APK(s)* → *Build APK(s)*.
4. El APK aparece en `app/build/outputs/apk/`.

## Configuración

Este repositorio solo contiene tus archivos web y la configuración; el proyecto Android se monta automáticamente al compilar:

- **Contenido web**: `www/` (HTML/CSS/JS y archivos subidos).
- **Configuración de la app** (nombre, paquete, versión, colores, permisos, orientación, opciones de WebView): `appmint.json`. El workflow la aplica automáticamente en cada compilación.
- **Icono**: `icon.png` (cuadrado, 512×512).
- **Compilación**: `.github/workflows/build-apk.yml` — descarga la plantilla Android, monta el proyecto con `appmint.json` y compila el APK y el AAB.

> Nota: la firma `release` usa el keystore de depuración para que el APK se pueda instalar directamente. Para publicar en Google Play necesitas firmar con tu propio keystore (sección *Signing* del build.gradle).

## Licencia

MIT — ver [LICENSE](LICENSE).
