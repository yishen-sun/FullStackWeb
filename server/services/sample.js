// write a func to retrieve a blob of json
// make an ajax request. Use 'fetch' functino. 'fetch' is a default js function standard lib
// fetch 是一个promise 需要用.then
function fetchAlbums() {
    fetch('https://dummyjson.com/products/1')
    .then(res => {res.json()})
    .then(json => console.log(json))
}
// refactor
async function fetchAlbums() {
    const res = await fetch('https://dummyjson.com/products/1');
    const json = await res.json();
    console.log(json);
}
// 改成箭头函数
const fetchAlbums = async () => {
    const res = await fetch('https://dummyjson.com/products/1');
    const json = await res.json();
    console.log(json);
}

fetchAlbums();