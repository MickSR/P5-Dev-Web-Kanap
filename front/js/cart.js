// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(productInLocalStorage)

// AFFICHER LES PRODUITS DU PANIER

 // je sélectionne la partie html concernée
 const cartAndFormContainer = document.getElementById('cartAndFormContainer');

 // si le panier est vide : afficher 'le panier est vide'
 if(productInLocalStorage === null || productInLocalStorage.length <= 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide !</p>
  </div>`;
}
// sinon afficher les produits dans le localStorage
else{

  const itemCart = document.getElementById('cart__items');
 
  // expression initiale
  for (i = 0; i < productInLocalStorage.length; i++) {
  products.push(productInLocalStorage[i].id);
 
  if (itemCart){
  
  // mise en place du code html
  itemCart.innerHTML += `
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
}

// je modifie la quantité dans le panier
function modifyQuantity() {

  const productQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < productQuantity.length; i++) {
    productQuantity[i].addEventListener('change', (event) => {
    event.preventDefault();

    //nouvelle quantité...
    let productNewQuantity = productQuantity[i].value;
    const newLocalStorage = {
      id: productInLocalStorage[i].id,
      image: productInLocalStorage[i].image,
      alt: productInLocalStorage[i].alt,
      name: productInLocalStorage[i].name,
      color: productInLocalStorage[i].color,
      price: productInLocalStorage[i].price,   
      quantity: productNewQuantity,
    };

    // actualiser le localStorage 
    productInLocalStorage[b] = newLocalStorage;
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // avertir la modification
    alert('Commande à jour.');
    totalArticles();
    priceAmount();
    })
  }
}
modifyQuantity();

// je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteItem.length; i++) { 
    deleteItem[i].addEventListener('click', (event) => {
    event.preventDefault();

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = productInLocalStorage[c].id;
    let deleteColor = productInLocalStorage[c].color;

    // filtrer l'élément cliqué par le bouton supprimer
    productInLocalStorage = productInLocalStorage.filter( element => element.id !== deleteId || element.color !== deleteColor);
      
    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // avertir de la suppression et recharger la page
    alert('Article supprimé.');
    window.location.href = "cart.html";
    });
  }
}
deleteArticle();

// j'affiche le total des articles dans le panier
function totalArticles() {
  let totalItems = 0;
  for (i in productInLocalStorage) {
    
    // renvoie un entier (parseInteger), sur la base décimale de 10
    const newQuantity = parseInt(productInLocalStorage[i].quantity, 10);

    // attribuer la valeur retournée par parseInt à la variable totalItems
    totalItems += newQuantity;
  }
    // attribuer à totalQuantity la valeur de totalItems et l'afficher dans le DOM
    const totalQuantity = document.getElementById('totalQuantity');
    if (totalQuantity) {
    totalQuantity.textContent = totalItems;
}}
totalArticles();

// je calcule le montant total du panier
function priceAmount() {
  const calculPrice = [];
  for (e = 0; e < productInLocalStorage.length; e++) {
    // prix de l'article quantité * prix
    const cartAmount = productInLocalStorage[e].price * productInLocalStorage[e].quantity;
    calculPrice.push(cartAmount);

    // la fonction reduce() permet de garder en mémoire les résultats de l'opération
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  if (totalPrice) {
  totalPrice.textContent = total;
}}
priceAmount();
} 

// j'envoie le formulaire dans le serveur
function postForm() {
  const order = document.getElementById('order');
  if (order) {
  order.addEventListener('click', (event) => {
  event.preventDefault();
  
  // je récupère les données du formulaire dans un objet
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }
 
 
  // vérifier la validation des entrées
  // contrôle prénom
  function controlFirstName() {
    const validFirstName = (/^[a-z ,.'-]+$/.test(contact.firstName))
    if (validFirstName) {
      return true;
    } else {
      let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
      firstNameErrorMsg.innerText = "Merci de vérifier le prénom, 3 caractères minimum";
    }
  } 

  // contrôle nom
  function controlName() {
    const validName = contact.lastName;
    if (/^[a-z ,.'-]+$/.test(validName)) {
      return true;
    } else {
      let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
      lastNameErrorMsg.innerText = "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
    }
  }

  // contrôle adresse
  function controlAddress() {
    const validAddress = contact.address;
    if (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(validAddress)) {
      return true;
    } else {
      let addressErrorMsg = document.getElementById('addressErrorMsg');
      addressErrorMsg.innerText = "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
    }
  } 

  // contrôle ville
  function controlCity() {
    const validAddress = contact.city;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
      return true;
    } else {
      let cityErrorMsg = document.getElementById('cityErrorMsg');
      cityErrorMsg.innerText = "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
    }
  }

  // contrôle email
  function controlEmail() {
    const validEmail = contact.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
      return true;
    } else {
      let emailErrorMsg = document.getElementById('emailErrorMsg');
      emailErrorMsg.innerText = "Erreur ! Email non valide";
    }
  }
  
  // vérifier la validation des entrées 
  // Après vérification des entrées, j'envoie l'objet contact dans le localStorage
  function validControl() {
    if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
      localStorage.setItem('contact', JSON.stringify(contact));
      return true;
    } else {
        alert('Merci de revérifier les données du formulaire')
      }
  }
  validControl()

  // je mets les valeurs du formulaire et les produits sélectionnés dans une variable
  const sendFormData = {
    contact,
    products,
  }

  // j'envoie le formulaire + localStorage (sendFormData) au serveur
  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then(response =>response.json())
    .then(data => {
      console.log("data",data)
      localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id='+ data.orderId;

        }
    });
}) 
}}
postForm();

function checkout(){
  const orderId = document.getElementById('orderId');
  if (orderId) {
  orderId.innerHTML = localStorage.getItem('orderId');
}}
checkout();