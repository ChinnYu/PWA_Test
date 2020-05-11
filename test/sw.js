//主要就是緩存內容
let CACHE_VERSION = 4;
let CACHE_NAME = 'cache_v' + CACHE_VERSION;
let CACHE_URLS = [
    '/PWA/test/',
    'images/capo.jpg',
    'manifest.json',
    'index.css'];

function precache(){
    return caches
        .open(CACHE_NAME)
        .then(function (cache) {
            cache.addAll(CACHE_URLS);
        });
}

self.addEventListener('install',event =>{
    event.waitUntil(
        precache().
        then(self.skipWaiting)
    );
});

function clearCache(){
    return caches.keys().then(keys => {
       keys.forEach(key =>{
          if (key !== CACHE_NAME){
              caches.delete(key);
          }
       });
    });
}

//清除舊的緩存
self.addEventListener('activate',event =>{
    event.waitUntil(
        Promise.all([
          clearCache(),
          self.clients.claim()
        ])
    );
});

function saveToCache(req,res) {
    return caches.open(CACHE_NAME).then(cache => cache.put(req,res));
}

function fetchAndCache(req){
    return fetch(req).then(function (res) {
        saveToCache(req,res.clone());
        return res;
    });
}

//捕獲所有請求
//判斷資源是否能夠請求成功，如果能夠請求成功，就響應成功的結果，如果斷網，請求失敗了，讀取caches緩存即可
self.addEventListener('fetch', event =>{
    // let url = new URL(event.request.url);
    // if (url.origin === self.origin) {
    //     return;
    // }
    
    // if (event.request.url.includes('/api/movies')){
    //     event.respondWith(
    //         fetchAndCache(event.request).catch(function () {
    //             return caches.match(event.request);
    //         })
    //     );
    //     return;
    // }

    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );


});

//網路優先
async function networkFirst(req) {
    //先從網路讀取資源
    try {
        //先從網路讀取最新的資源
        const fresh = await fetch(req);
        // console.log(fresh);
        return fresh;
    }catch (e) {
        //去緩存中讀取
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        return cached;
    }

}

//緩存優先
function networkFirst() {

}