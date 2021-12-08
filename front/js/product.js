const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

fetch("http://localhost:3000/api/products/")
    .then(res => res.json())
    .then(product => {
        image[0].innerHTML =`<img src="${product.imageUrl}" alt=${product.altTxt}">`;

    })
    

