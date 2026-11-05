# Serveur local pour voir le site : interdit au navigateur de garder d'anciennes versions des fichiers
# Depuis la racine du projet : python -I outils/serveur.py 8080 .
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SansCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        # Efface aussi les anciennes pages déjà gardées par le navigateur
        if self.path.split('?')[0].endswith(('/', '.html')):
            self.send_header('Clear-Site-Data', '"cache"')
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
dossier = sys.argv[2] if len(sys.argv) > 2 else '.'
print('Site sur http://localhost:%d' % port, flush=True)
ThreadingHTTPServer(('', port), partial(SansCache, directory=dossier)).serve_forever()
