class Producto {
  constructor(title, details, stock, price, image) {
    this.title = title,
      this.details = details,
      this.stock = stock,
      this.price = price,
      this.image = image
  }
}
let prod = new Producto("Funko", "severamente caro", 1, 1000000000, "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw2a49dc76/images/funko/upload/72613_POP-Animation_Demon-Slayer_Tanjiro(Training)_POP_GLAM-WEB.png?sw=800&sh=800")

// Parse the product ID from the URL
let id = parseInt(window.location.search.split("=")[1]);
const foundProd = data.find((product) => product.id === id);
document.querySelector("title").innerHTML = foundProd.title
if (!foundProd) {
  document.querySelector(".producto").innerHTML = `<p>Product not found</p>`;
} else {
  let counter = 0;

  let cardHtml = `
      <div class="card d-flex flex-column align-items-center" style="width: 18rem">
        <img src="${foundProd.img}"
            class="card-img-top ratio ratio-4x3"
            alt="image ${foundProd.title}"
            style="object-fit: contain;"
        />
        <div class="card-body d-flex flex-column" >
          <h3 class="card-title">Title: ${foundProd.title}</h3>
          <p class="card-text">Price: ${foundProd.price}</p>
          <p class="card-text">Stock: ${foundProd.stock}</p>
          <p class="card-text">Category: ${foundProd.category}</p>
          ${localStorage.getItem("session")
      ? `<div class="input-group mb-3">
            <button class="btn btn-outline-secondary" type="button" id="button-addon1" onclick="restButton()">-</button>
            <span class="form-control text-center shadow-none" id="number-counter">${counter}</span>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="addButton()">+</button>
          </div>
          <button type="button" class="btn btn-dark" onclick="confirmAddToCart()">Add to cart</button>`
      : `<a class="text-decoration-none text-reset" href="./login.html">
          <button type="button" class="btn btn-dark">Login</button>
        </a>`
    }
        </div>
      </div>
    `;

  document.querySelector(".producto").innerHTML = cardHtml;

  const numberCounter = document.querySelector("#number-counter");

  function addButton() {
    if (counter < foundProd.stock) {
      counter += 1;
      numberCounter.innerHTML = counter;
    }
  }

  function restButton() {
    if (counter > 0) {
      counter -= 1;
      numberCounter.innerHTML = counter;
    }
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addButtonToCart() {
    if (counter <= 0 || counter > foundProd.stock) return;

    const existingItemIndex = cart.findIndex((item) => item.prod.id === foundProd.id);
    if (existingItemIndex > -1) {
      const existingItem = cart[existingItemIndex];
      const newQuantity = existingItem.quantity + counter;

      if (newQuantity <= foundProd.stock) {
        cart[existingItemIndex].quantity = newQuantity;
      } else {
        Toastify({
          text: "Exceeds stock",
          className: "info",
          style: {
            background: "linear-gradient(to right, #036281, #2fe0d2)"
          }
        }).showToast();
        return false
      }
    } else {
      cart.push({ prod: foundProd, quantity: counter });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return true
  }

  function confirmAddToCart() {
    Swal.fire({
      title: "Do you want to add this product?",
      showCancelButton: true,
      confirmButtonColor: "#0EE5DF",
      cancelButtonColor: "#FF6969",
      confirmButtonText: "Yup"
    }).then((result) => {
      if (result.isConfirmed) {
        const exito = addButtonToCart();
        if (exito) {
          Toastify({
            text: "You have successfully added",
            className: "info",
            style: {
              background: "linear-gradient(to right, #036281, #2fe0d2)"
            }
          }).showToast();
        }
      }
    });
  }
}
