    //récupération de l'api
    fetch("http://localhost:3000/api/products/") 
    .then(res => res.json())
    .then(res => Products(res))

    //message en cas d'erreur serveur
      .catch((error) => { 
        console.error("Erreur de la requête API");
      })

    function Products(res) {

    // "product" => élément "res" => itérable
        for (product of res) { 
  
        //.innerHTML +=`` le "+" pour ajouter le contenus tant qu'il y en a .
        //je récupère dans le html à partir de la ligne 52 qu'on remplace par une chaîne de caractère (texte dans une variable)
            const item = document.getElementById('items').innerHTML +=` 
            <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
            </a>
      `;
    }
}



 