// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

// AFFICHER LES PRODUITS DU PANIER
let cartAndFormContainer = document.getElementById('cartAndFormContainer');

// si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage === null || productInLocalStorage == 0) {
 document.querySelector("#cart__items").innerHTML =`
 <div class="cart__empty">
   <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
 </div>`;
}
// si le panier n'est pas vide : afficher les produits dans le localStorage
else{
 let itemCards = [];
}