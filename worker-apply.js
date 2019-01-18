if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {scope: '/'})
        .then(function(reg) {
            console.log('Registration worker succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
        console.log('Registration worker ' + error);
    });
    navigator.serviceWorker.addEventListener('message',function(e){
        console.log(e.data);
    })
}