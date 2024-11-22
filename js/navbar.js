function changeTheme() {
  const classes = document.getElementById("themeIcon").classList
  const attributes = document.querySelector("html").attributes
  if (classes[1] === "bi-moon-fill") {
    classes.remove("bi-moon-fill")
    classes.add("bi-sun-fill")
    attributes[1].value = "dark"
  } else if (classes[1] === "bi-sun-fill") {
    classes.remove("bi-sun-fill")
    classes.add("bi-moon-fill")
    attributes[1].value = "light"
  }
}

const navbar = `<div class="d-flex align-items-center ms-auto" style="font-size: 14px; color: #333;">
    <p class="mb-0 ms-2" style="font-weight: bold; color: #1A97AF;">Offers</p>
    <p class="mb-0 ms-auto me-2" style="font-size: 13px; color: #2fe0d2; font-style: italic;">
        Free Shipping on orders over $65+
    </p>
</div>

<nav class="navbar navbar-expand-lg bg-body-tertiary" style="border-bottom: 1px solid #1A97AF; background-color: #2fe0d2">
    <div class="container-fluid">
        <a class="navbar-brand" href="./index.html">
            <img src="./assets/logo.svg" class="img-fluid" style="max-width: 150px; max-height: 50px;" alt="Logo">
        </a>
        <div class="d-flex align-items-center ms-auto">
            <div class="input-icons position-relative me-3" style="width: 250px;">
                <div class="d-flex" role="search">
                    <input
                        class="form-control rounded-pill pe-5 input"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style="border: 1px solid #169aa5; box-shadow: none; font-size: 14px;"
                    />
                    <i
                        class="bi bi-search position-absolute top-50 translate-middle-y end-0 me-3"
                        style="color: #169aa5;"
                    ></i>
                </div>
            </div>
            <button class="btn me-3 boton" style="border-radius: 50px; padding: 10px 20px; font-weight: bold; font-size: 14px; border-color: #169aa5; color: #169aa5;">
                Search
            </button>
            <a href="cart.html" class="text-decoration-none text-reset">
                <i class="bi bi-cart2 me-3 cursor" style="font-size: 20px; color: #169aa5;"></i>
            </a>
            <button
                class="navbar-toggler me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style="border: none; background-color: transparent;"
            >
                <span class="navbar-toggler-icon" style="color: #169aa5;"></span>
            </button>
            <button class="me-3" onclick="changeTheme()" id="themeToggle" style="border: none; background-color: transparent;">
                <i class="bi bi-moon-fill" id="themeIcon" style="font-size: 20px; color: #169aa5;"></i>
            </button>
            ${localStorage.getItem("session") ? 
                `<span class="cursor me-3" onclick="logOut()" style="color: #169aa5; font-weight: bold; cursor: pointer;">Cerrar sesión</span>` : 
                `<a class="text-decoration-none text-reset me-3" href="./login.html"><span class="cursor" style="color: #169aa5; font-weight: bold;">Iniciar sesión</span></a>`
            }
        </div>
    </div>
</nav>

<div class="onlyCategorias d-flex justify-content-evenly text-white " style="background-color: #169aa5; padding: 10px 0; color: #FFFFFF;">
</div>
`
const page = location.pathname
function logOut() {
  localStorage.clear()
  location.href = location.href
}
document.querySelector("header").innerHTML = navbar

if (page !== "/product.html" && page !== "/cart.html") {
  let categories = ["Comics & Superheroes", "Video Games", "Movies & TV", "Anime & Manga", "Animation & Cartoons", "All"]
  let htmlCategories = []
  for (let category of categories) {
    htmlCategories.push(`<button class="unstyled-button categoria"><a class="text-decoration-none text-reset">${category}</a></button>`)
  }
  document.querySelector(".onlyCategorias").innerHTML = htmlCategories.join("")
}