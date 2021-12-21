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
        //je combines mes variables avec chaque produits
        image[0].innerHTML =`<img src="${product.imageUrl}" alt=${product.altTxt}">`;
        imageURL = product.imageUrl;
        imageAlt = product.altTxt;
        title.innerHTML = `<h1>${product.name}</h1>`;
        price.innerHTML = `${product.price}`;
        description.innerHTML = `${product.description}`;
    
    // mise en place des choix de couleurs
    for (number in product.colors) {
        colors.options[colors.options.length] = new Option(product.colors[number]);
        }
    })

    .catch((error) => { 
        console.error("Erreur");
    })

//mettre en place l'ajout panier avec les variables
const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');
const addToCart = document.getElementById('addToCart');
let imageURL = "";
let altTxt = "";

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: New,
    image: imageURL,
    alt: altTxt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,

};

// je met clés+valeurs dans le localStorage
let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

//j'ajoute les produits choisis dans le localstorage
const addProductLocalStorage = () => {

//je récupère le choix du client
productInLocalStorage.push(selection);

//je récupère les données dans le localStorage
localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}

let addConfirm = () => {
  alert('Votre produit a bien été ajouté');
}

let update = false;

//si il y a des produits et verification qu'il n'y a pas les mêmes produits
if (productInLocalStorage) {
 productInLocalStorage.forEach (function (productconfirmation, key) {
  if (productconfirmation.id == New && productconfirmation.color == selectColors.value) {
    productInLocalStorage[key].quantity = parseInt(productconfirmation.quantity) + parseInt(selectQuantity.value);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    update = true;
    addConfirm();
  }
});

  if (!update) {
  addProductLocalStorage();
  addConfirm();
  }
}

else {
  productInLocalStorage = [];
  addProductLocalStorage();
  addConfirm();
}
});
