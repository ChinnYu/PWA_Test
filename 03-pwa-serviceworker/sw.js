self.addEventListener('install', event =>{
    console.log('install' ,event);
	//11
    //會讓service worker 跳過等待，直接進入到activate狀態
    // self.skipWaiting();
    //等待skipwating結束，才進入到activate
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event =>{
    console.log('activate' ,event);
    //表示service worker 激活後，立即獲取控制權
    event.waitUntil(self.clients.claim());

});
//捕獲所有請求
self.addEventListener('fetch', event =>{
    console.log('fetch' ,event);
});