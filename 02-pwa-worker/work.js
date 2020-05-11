//web worker 是一個獨立的進程，不能操作DOM和BOM
//適合做大量運算
let total =0;
for (var i =0; i<100000000;i++){
    total += i;
}


//發消息給主線程，把結果給他
self.postMessage({
    total:total
});