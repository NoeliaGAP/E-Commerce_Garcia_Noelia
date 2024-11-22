function loadProds(categoria = "") {
  document.querySelector(".container").innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  setTimeout(() => {
    let cards;

    if (categoria === "") {
      cards = data.map((product) => {
        return `
<div class="card d-flex flex-column align-items-start" style="width: 18rem; border: 1px solid #036281; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <img src="${product.img}"
        class="card-img-top"
        alt="image ${product.title}"
        style="object-fit: cover; width: 100%; height: 150px; border-bottom: 1px solid #036281;"
    />
    <div class="card-body d-flex flex-column text-nowrap" style="padding: 15px;">
        <div class="card-text mb-2" style="font-weight: bold; font-size: 1rem; color: #2fe0d2;">
            Title: ${product.title}
        </div>
        <div class="card-text mb-2" style="font-size: 1rem; color: #036281;">
            Price: ${product.price}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Stock: ${product.stock}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Category: ${product.category}
        </div>
        <a href="./product.html?prod=${product.id}">
            <button type="button" class="btn btn-sm" style="background-color: #036281; color: white; font-weight: bold; padding: 8px 12px; border-radius: 5px; transition: background-color 0.3s;">
                See more
            </button>
        </a>
    </div>
</div>
`;
      });
    } else {
      cards = data.filter((product) => product.category === categoria).map((product) => {
        return `
<div class="card d-flex flex-column align-items-start" style="width: 18rem; border: 1px solid #036281; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <img src="${product.img}"
        class="card-img-top"
        alt="image ${product.title}"
        style="object-fit: cover; width: 100%; height: 150px; border-bottom: 1px solid #036281;"
    />
    <div class="card-body d-flex flex-column text-nowrap" style="padding: 15px;">
        <div class="card-text mb-2" style="font-weight: bold; font-size: 1rem; color: #2fe0d2;">
            Title: ${product.title}
        </div>
        <div class="card-text mb-2" style="font-size: 1rem; color: #036281;">
            Price: ${product.price}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Stock: ${product.stock}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Category: ${product.category}
        </div>
        <a href="./product.html?prod=${product.id}">
            <button type="button" class="btn btn-sm" style="background-color: #036281; color: white; font-weight: bold; padding: 8px 12px; border-radius: 5px; transition: background-color 0.3s;">
                See more
            </button>
        </a>
    </div>
</div>
        `;
      });
    }

    // Actualiza el contenido de la container después del retraso
    document.querySelector(".container").innerHTML = cards.join('');
  }, 500);
}

loadProds()
const boton = document.querySelector(".boton")
const myCategories = document.querySelectorAll(".categoria")

boton.addEventListener("click", () => {
  const input = document.querySelector(".input")
  const filterData = data.filter((producto) => producto.title === input.value)

  const cards = filterData.map((product) => {
    return `
<div class="card d-flex flex-column align-items-start" style="width: 18rem; border: 1px solid #036281; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <img src="${product.img}"
        class="card-img-top"
        alt="image ${product.title}"
        style="object-fit: cover; width: 100%; height: 150px; border-bottom: 1px solid #036281;"
    />
    <div class="card-body d-flex flex-column text-nowrap" style="padding: 15px;">
        <div class="card-text mb-2" style="font-weight: bold; font-size: 1rem; color: #2fe0d2;">
            Title: ${product.title}
        </div>
        <div class="card-text mb-2" style="font-size: 1rem; color: #036281;">
            Price: ${product.price}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Stock: ${product.stock}
        </div>
        <div class="card-text mb-2" style="font-size: 0.9rem; color: #6c757d;">
            Category: ${product.category}
        </div>
        <a href="./product.html?prod=${product.id}">
            <button type="button" class="btn btn-sm" style="background-color: #036281; color: white; font-weight: bold; padding: 8px 12px; border-radius: 5px; transition: background-color 0.3s;">
                See more
            </button>
        </a>
    </div>
</div>
    `;
  });
  document.querySelector(".container").innerHTML = cards.join('');
})

for (const category of myCategories) {
  if (category.innerText === "All") {
    category.addEventListener("click", () => {
      loadProds()
    })
  } else {
    category.addEventListener("click", () => {
      loadProds(category.innerText)
    })
  }
}