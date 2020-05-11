//主要就是緩存內容
const CACHE_NAME = 'cache_v1';
self.addEventListener('install', async event =>{
    //開啟一個cache,得到了一個cache對象
    const cache = await caches.open(CACHE_NAME);
    //cache 對象就可以儲存資源
    //等待cache 把所有的資源儲存起來
    await cache.addAll([
        '/PWA/05-pwa-caches/',
        'images/capo.jpg',
        'manifest.json',
        'index.css'
    ]);
    await self.skipWaiting();
});

//清除舊的緩存
self.addEventListener('activate', async event =>{
    //會清除舊的資源，獲取到所有資源的key
    const keys = await caches.keys();
    keys.forEach(key => {
        if (key !== CACHE_NAME){
            caches.delete(key);
        }
    });

    //表示service worker 激活後，立即獲取控制權
    await self.clients.claim();

});

//捕獲所有請求
//判斷資源是否能夠請求成功，如果能夠請求成功，就響應成功的結果，如果斷網，請求失敗了，讀取caches緩存即可
self.addEventListener('fetch', event =>{
    //請求對象
    const req = event.request;
    console.log('request' + event.request.url);
    //給瀏覽器響應
    event.respondWith(networkFirst(req));


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