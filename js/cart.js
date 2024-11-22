const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

let tarjetaInput = ""

function addButton(id) {
  const existingItemIndex = cartItems.findIndex(item => item.prod.id === id);
  if (existingItemIndex < -1) return "error"
  const foundItem = cartItems[existingItemIndex];
  if (foundItem.quantity < foundItem.prod.stock) {
    foundItem.quantity += 1
    localStorage.setItem("cart", JSON.stringify(cartItems))
    document.querySelector(`#prod-quantity-${foundItem.prod.id}`).innerHTML = foundItem.quantity
    document.querySelector(`#prod-price-${foundItem.prod.id}`).innerHTML = `$${foundItem.quantity * foundItem.prod.price}`
    updateCardDetail()
  }
}

function restButton(id) {
  const existingItemIndex = cartItems.findIndex(item => item.prod.id === id);
  if (existingItemIndex < -1) return "error"
  const foundItem = cartItems[existingItemIndex];
  if (foundItem.quantity > 1) {
    foundItem.quantity -= 1
    localStorage.setItem("cart", JSON.stringify(cartItems))
    document.querySelector(`#prod-quantity-${foundItem.prod.id}`).innerHTML = foundItem.quantity
    document.querySelector(`#prod-price-${foundItem.prod.id}`).innerHTML = `$${foundItem.quantity * foundItem.prod.price}`
    updateCardDetail()
  }
}

function deleteFromCart(id) {
  const existingItemIndex = cartItems.findIndex(item => item.prod.id === id);
  if (existingItemIndex === -1) return "error"
  cartItems.splice(existingItemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems))
  location.pathname = location.pathname
}

function confirmRemoveToCart(id) {
  Swal.fire({
    title: "Do you want to remove this product?",
    showCancelButton: true,
    confirmButtonColor: "#0EE5DF",
    cancelButtonColor: "#FF6969",
    confirmButtonText: "Yup, delete it"
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Correctly removed",
        className: "info",
        style: {
          background: "linear-gradient(to right, #036281, #0EE5DF)"
        }
      }).showToast();
      deleteFromCart(id)
    }
  });
}

if (cartItems.length === 0) {
  document.querySelector(".cartProds").innerHTML = `
        <div class="alert alert-warning text-center" role="alert" style="background: #FF6969; color: #FFFFFF; border: none">
            You have no products in your cart.
        </div>
    `;
} else {
  const cartHtml = cartItems.map((item) => {
    return `
<div class="card mb-3 shadow-sm" style="width: 40rem;">
  <div class="row g-0 align-items-center">
    <div class="col-3">
      <img src="${item.prod.img}" class="img-fluid rounded-start" alt="${item.prod.title}">
    </div>
    <div class="col-9">
      <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column me-3 ">
          <h6 style="width:10rem;" class="card-title text-nowrap overflow-hidden">${item.prod.title}</h6>
        </div>
        <div class="d-flex align-items-center">
          <div class="d-flex flex-column me-2">
            <button class="btn btn-outline-secondary btn-sm mb-2" onclick="addButton(${item.prod.id})">
              <i class="bi bi-caret-up-fill"></i>
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="restButton(${item.prod.id})">
              <i class="bi bi-caret-down-fill"></i>
            </button>
          </div>
          <span id="prod-quantity-${item.prod.id}" style="width: 2rem; text-align: center;">${item.quantity}</span>
        </div>
        <div class="d-flex align-items-center">
          <p class="fw-bold text-primary mb-0 me-3" id="prod-price-${item.prod.id}" style="width: 5rem; text-align: right;">
            $${item.prod.price * item.quantity}
          </p>
          <i class="bi bi-trash cursor" onclick="confirmRemoveToCart(${item.prod.id})"></i>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
  });
  document.querySelector(".cartProds").innerHTML = cartHtml.join(" ");
  updateCardDetail()
}

function updateCardDetail() {
  let subTotal = 0;
  let envio = 0;
  for (const item of cartItems) {
    subTotal += item.prod.price * item.quantity
    envio += Math.round(subTotal / 20)
  }

  const costoFinal = subTotal + envio
  document.querySelector(".cartDetail").innerHTML = `<div class="card" style="width: 24rem">
          <div class="card-body">
            <h5 class="card-title mb-3">Detalles de tarjeta</h5>

            <section class="mb-2">
              <h6>Escoge tu tarjeta</h6>
              <div class="card">
                <ul class="list-group list-group-horizontal list-group-flush" style="height: 5rem;">
                  <li class="list-group-item list-group-item-action border-0">
                    <img
                      class="w-100 h-100 rounded tarjetaInput"
                      src="./assets/mastercard.svg"
                      alt="MasterCard"
                      data-tarjeta="MasterCard"
                    />
                  </li>
                  <li class="list-group-item list-group-item-action border-0">
                    <img
                      class="w-100 h-100 rounded tarjetaInput"
                      src="./assets/visa.svg"
                      alt="Visa"
                      data-tarjeta="Visa"
                    />
                  </li>
                  <li class="list-group-item list-group-item-action border-0">
                    <img
                      class="w-100 h-100 rounded tarjetaInput"
                      src="./assets/american-express.svg"
                      alt="American Express"
                      data-tarjeta="AmericanExpress"
                    />
                  </li>
                </ul>
              </div>
            </section>

            <section class="mb-2">
              <div class="mb-2">
                <label class="form-label">Número de tarjeta</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="xxxx xxxx xxxx xxxx"
                  id="tarjetaNum"
                />
              </div>
              <div class="d-flex">
                <div class="mb-2 me-2" style="flex: 1">
                  <label class="form-label">Fecha de expiración</label>
                  <input type="date" class="form-control" placeholder="DD/MM/AA" id="fechaExpiracion" />
                </div>
                <div class="mb-2" style="flex: 1">
                  <label class="form-label">CVV</label>
                  <input type="text" class="form-control" minlength="3" maxlength="4" placeholder="xxxx" id="CVV"/>
                </div>
              </div>
            </section>

            <section class="mb-2">
              <ul class="list-group borderless-list">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0"
                >
                  Sub-Total
                  <span id="subTotal">$${subTotal}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0"
                >
                  Envio
                  <span id="envio">$${envio}</span>
                </li>
              </ul>
            </section>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="card-text mb-0" id="costoFinal">
                Costo final: <span>$${costoFinal}</span>
              </p>
              <button type="button" class="btn btn-outline-dark" onclick="finalizarCompra()">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>`
}

function finalizarCompra() {
  // Retrieve required DOM elements and parse values
  const envio = parseFloat(document.querySelector("#envio").textContent.replace("$", "")) || 0;
  const subTotal = parseFloat(document.querySelector("#subTotal").textContent.replace("$", "")) || 0;
  const costoFinal = parseFloat(document.querySelector("#costoFinal").textContent.replace("$", "")) || 0;
  const cvv = document.querySelector("#CVV").value.trim();
  const fechaExpiracion = document.querySelector("#fechaExpiracion").value.trim();
  const tarjetaNum = document.querySelector("#tarjetaNum").value.trim();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Input validations
  if (cartItems.length === 0) {
    Toastify({
      text: "No hay items en el carrito.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)"
      }
    }).showToast();
    return;
  }

  if (!tarjetaInput) {
    Toastify({
      text: "Elige una tarjeta.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)"
      }
    }).showToast();
    return;
  }

  if (!cvv || !fechaExpiracion || !tarjetaNum) {
    Toastify({
      text: "Completa las opciones de pago.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)"
      }
    }).showToast();
    return;
  }

  const order = {
    fechaDeCompra: new Date().toISOString(),
    itemsComprados: cartItems,
    precioFinal: costoFinal,
    tarjetaUsada: tarjetaInput,
    subTotal: subTotal,
    envio: envio,
  };
  Swal.fire({
    title: "¿Quieres terminar tu compra?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, terminar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://67367aefaafa2ef222309f2a.mockapi.io/api/Orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al procesar la compra")
          }
          return response.json();
        })
        .then(() => {
          Toastify({
            text: "Compra finalizada.",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
          }).showToast();
          localStorage.removeItem("cart");
          window.location.reload()
        })
        .catch((error) => {
          Toastify({
            text: "Hubo un problema al finalizar la compra",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }
          }).showToast();
        });
    }
  });
}



document.querySelectorAll('.tarjetaInput').forEach((tarjeta) => {
  tarjeta.addEventListener('click', (event) => {
    document.querySelectorAll('.tarjetaInput').forEach((img) => {
      img.classList.remove('border', 'border-primary');
    });
    const selectedTarjeta = event.currentTarget;
    selectedTarjeta.classList.add('border', 'border-2', 'border-info');
    tarjetaInput = selectedTarjeta.alt
  });
})