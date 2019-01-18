var RESOURCE_CACHE_NAME = 'resource_v1';
function sendMessage(message){
    self.clients.matchAll().then(function(clients){
        clients.forEach(function(client){
            client.postMessage(message);
        });
    });
}
self.addEventListener('fetch',function(event){
    var request = event.request,
        url = new URL(request.url);
    sendMessage(request.url);
    /*if(url.pathname.startsWith('/api')){
        return;
    }*/
    var cc = 2;
    event.respondWith(
        caches.match(request).then(function(resp) {
            try{
                return resp || fetch(request).then(function(response) {
                    return caches.open(RESOURCE_CACHE_NAME).then(function(cache) {
                        if(['POST','PUT'].indexOf(request.method) === -1){
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    });
                });
            }catch(e){
                console.log(e);
            }

        })
    );
});
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key === RESOURCE_CACHE_NAME){
                    sendMessage('deleting cache key : ' + key);
                    return caches.delete(key);
                }
            }));
        })
    );
});