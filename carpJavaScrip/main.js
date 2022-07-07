import { getService, carryToCart } from "./firebase.js";

getService();

const carts = [];

let suma = 0;

const cleanTotal = document.querySelector(".cleanTotal")

const cleanCart = () => {

  suma = 0;

  document.querySelector(".priceTotal").textContent = suma;

  carts.length = 0;

  document.querySelector(".injectProducts").innerHTML = "";

}

cleanTotal.addEventListener("click", cleanCart);

const sumaTotal = (price) => {

  const priceTotal = document.querySelector(".priceTotal");

  suma += price;

  priceTotal.textContent = suma;

}

const validateProduct = (id) => carts.some(product => product.id === id);

const insideTheCart = async(e) => {

  if(validateProduct(e.target.id)){

    return false;

  }else {

    const storeInCart = await carryToCart(e.target.id);

    sumaTotal(storeInCart.data().price);

    carts.push(storeInCart);
  
    assembleCard();

  }

}

const assembleCard = () => {

  const injectProducts = document.querySelector(".injectProducts");

  injectProducts.innerHTML = "";

  carts.forEach(product => {  
    
    const addElements = document.createElement("div");

    addElements.classList = "card mb-3";

    addElements.innerHTML = `
  
    <div class="row g-0">
        
      <div class="col-md-4">
        <img src=${product.data().image} class="img-fluid rounded-start" alt="${product.data().name}">
      </div>
        
      <div class="col-md-8">
          
        <div class="card-body">
              
          <h5 class="card-title">${product.data().name}</h5>
              
          <p class="card-text">$ ${product.data().price}</p>
              
          <p class="card-text"><small class="text-muted"></small></p>
          
        </div>
        
      </div>
    
    </div>
   
  `
    injectProducts.append(addElements);
  
})

}


const addEvents = () => {

  const eventButtons = document.querySelectorAll(".eventButtons");

  eventButtons.forEach(btn => (btn.addEventListener("click", insideTheCart)));

}

const makeCards = async (productsOfArray) => {

    const products = await productsOfArray;

    const getCards = document.querySelector(".itemsCards");
    
    products.forEach(items => {

        const paint = document.createElement("div");

        paint.className = "card col-12 col-xl-6 my-3";

        paint.innerHTML = `
        
            <img src= ${items.data().image} class="card-img-top py-2" alt= >
            
            <div class="card-body">
            
                <h5 class="card-title">${items.data().name}</h5>
                
                <p class="card-text">$ ${items.data().price}</p>
                
                <a href="#" class="btn btn-primary eventButtons" id= ${items.id}>Add to cart</a>
                
            </div>
        
        `
        
        getCards.append(paint);
    
    });

    addEvents(); 

}

makeCards(getService());






















