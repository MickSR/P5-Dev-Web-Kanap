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
        title.innerHTML = `<h1>${product.name}</h1>`;
        price.innerHTML = `${product.price}`;
        description.innerHTML = `${product.description}`;
    
    // mise en place des choix de couleurs
    for (number in product.colors) {
        colors.options[colors.options.length] = new Option(product.colors[number]);
        }
    })

    .catch((error) => { 
        console.log("Erreur de la requête API");
    })

//mettre en place l'ajout panier avec les variables
const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');
const addToCart = document.getElementById('addToCart');
let imageURL = "";
let imageAlt = "";

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: New,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,

};

// je déclare une variable productInLocalStorage 
// dans laquelle je mets les clés+valeurs dans le local storage
// JSON.parse permet de convertir les données au format JSON en objet JavaScript
let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

// j'ajoute les produits sélectionnés dans le localStorage
const addProductLocalStorage = () => {
// je récupère la sélection de l'utilisateur dans le tableau de l'objet :
// on peut voir dans la console qu'il y a les données,
// mais pas encore stockées dans le storage à ce stade

productInLocalStorage.push(selection);
// je stocke les données récupérées dans le localStorage :
// JSON.stringify permet de convertir les données au format JavaScript en JSON 
// vérifier que key et value dans l'inspecteur contiennent bien des données
localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}

// je crée une boîte de dialogue pour confirmer l'ajout au panier
let addConfirm = () => {
  alert('Le produit a bien été ajouté au panier');
}

let update = false;

// s'il y a des produits enregistrés dans le localStorage
if (productInLocalStorage) {
// verifier que le produit ne soit pas deja dans le localstorage/panier
// avec la couleur
 productInLocalStorage.forEach (function (productOk, key) {
  if (productOk.id == newID && productOk.color == selectColors.value) {
    productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    update = true;
    addConfirm();
  }
});

//
  if (!update) {
  addProductLocalStorage();
  addConfirm();
  }
}

// s'il n'y a aucun produit enregistré dans le localStorage 
else {
  // je crée alors un tableau avec les éléments choisi par l'utilisateur
  productInLocalStorage = [];
  addProductLocalStorage();
  addConfirm();
}
});
