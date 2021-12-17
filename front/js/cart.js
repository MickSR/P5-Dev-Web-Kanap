// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

// AFFICHER LES PRODUITS DU PANIER

 // je sélectionne la partie html concernée
 let cartAndFormContainer = document.getElementById('cartAndFormContainer');

 // si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide !</p>
  </div>`;
}
// sinon afficher les produits dans le localStorage
else{
  let itemCards = [];
 
  // expression initiale; condition; incrémentation
  for (i = 0; i < productInLocalStorage.length; i++) {
  products.push(productInLocalStorage[i].id);
 
  // le code suivant sera injecté à chaque tour de boucle
  // selon la longueur des produits dans le local storage
  itemCards = itemCards + `
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  
  if (i === productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }

// je modifie la quantité dans le panier
function modifyQuantity() {

  let productQuantity = document.querySelectorAll('.itemQuantity');

  for (let j = 0; j < productQuantity.length; j++) {
    productQuantity[j].addEventListener('change', (event) => {
    event.preventDefault();

    //nouvelle quantité...
    let productNewQuantity = productQuantity[j].value;
    const newLocalStorage = {
      id: productInLocalStorage[j].id,
      image: productInLocalStorage[j].image,
      alt: productInLocalStorage[j].alt,
      name: productInLocalStorage[j].name,
      color: productInLocalStorage[j].color,
      price: productInLocalStorage[j].price,   
      quantity: productNewQuantity,
    };

    // actualiser le localStorage 
    productInLocalStorage[j] = newLocalStorage;
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // avertir la modification
    alert('Commande à jour.');
    totalArticles();
    priceAmount();
      })
  }
}
modifyQuantity();
}