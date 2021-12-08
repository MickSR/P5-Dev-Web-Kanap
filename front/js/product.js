// il faut que je redirige l'API sur cette page
let params = new URL(window.location.href).searchParams;
let New = params.get('id');
console.log(New);

// mise en place de mes variables
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');


fetch("http://localhost:3000/api/products/" + New)
    .then(res => res.json())
    .then(product => {
        image[0].innerHTML =`<img src="${product.imageUrl}" alt=${product.altTxt}">`;
        title.innerHTML = `<h1>${product.name}</h1>`;
        price.innerHTML = `${product.price}`;
        description.innerHTML = `${product.description}`;
    })
    
    .catch((error) => { 
        console.log("Erreur de la requête API");
      })
