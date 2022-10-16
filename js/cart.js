    document.addEventListener("DOMContentLoaded", ()=> {

            /* Imprime el usuario en el navbar */
    const userHTML = document.getElementById("user")
    userHTML.innerHTML += localStorage.getItem("user")

    /* Chequea si el usuario está logeado, sino lo redirije al logIn */
    if (localStorage.getItem("user") == null) {
        window.location = "index.html"
    }
    })



/* Abre/Cierra el menú lateral según su posicion actual */
function toggleInfo() {
    let trap1 = document.getElementById("trap1");
    let trap2 = document.getElementById("trap2");
    let trap3 = document.getElementById("trap3");
    let trap4 = document.getElementById("trap4");
    let trap5 = document.getElementById("trap5");
    let open = [trap1, trap2, trap3, trap4, trap5]
    let firstCol = document.getElementById("firstCol");
    let secondCol = document.getElementById("secondCol");

    open.forEach(element => {
        element.classList.toggle("sidebarMenu");
    });
    firstCol.classList.toggle("col-2")
    firstCol.classList.toggle("col-3")
    secondCol.classList.toggle("col-4")
    secondCol.classList.toggle("col-3")
};


/* Bloque encargado de darle funcionalidad al movimiento del menú lateral */
const checkbox = document.getElementById("check")

checkbox.addEventListener("click", ()=> {
        toggleInfo();
});


/* Recibe una url y devuelve el objeto */
async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};


/* URL del carrito al cual debemos de realizar la petición */
const carrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

/* Genera el DOM del usuario al que tenemos que hacer la petición de muestra */
document.addEventListener("DOMContentLoaded", async () => {
    const randomUserCart = await getData(carrito);
    const randomUserCartData = await randomUserCart.articles
    console.log(randomUserCartData);

    const cartHTML = document.getElementById("carro");


    cartHTML.innerHTML += 
    `
    <div class="row cartItem" id="${randomUserCartData[0].id}" onclick="showInfo(${randomUserCartData[0].id})">
        <div class="col-1 mt-1 text-center"><img src="${randomUserCartData[0].image}" class="fotoCart" alt=""></div>
        <div class="col-3 mt-1 text-center">${randomUserCartData[0].name}</div>
        <div class="col-2 mt-1 text-center">${randomUserCartData[0].unitCost} ${randomUserCartData[0].currency}</div>
        <div class="col-2 mt-1 text-center" id="${randomUserCartData[0].id}cant">${randomUserCartData[0].count}</div>
        <div class="col-3 mt-1 text-center"><span id="${randomUserCartData[0].id}total">${randomUserCartData[0].count * randomUserCartData[0].unitCost}</span> ${randomUserCartData[0].currency}</div>
        <div class="col-1 text-center btn btn-outline-danger w-auto pb-2 pe-3 ps-3 pt-2"><i class="fa-solid fa-trash"></i></div>
    </div>
    <hr class="mb-2 mt-2 cartLine">
    `
});




/* Funcion encargada de generar la información del menú lateral */
async function showInfo(id) {
    const infoProd = "https://japceibal.github.io/emercado-api/products/" + id + ".json"
    const infoTab  = document.getElementById("trap5");


    let prodData = await getData(infoProd)
    console.log(prodData);

    infoTab.innerHTML = 
    `
        <div class="info slide">
            <div class="">
                <img src="${prodData.images[0]}" class="d-block imgventa">
            </div>
            <div class="fs-1 fw-bold text-center mt-2" id="infoName">
                ${prodData.name}
            </div>
            <hr class="mt-0">
            <div class="row">
                <div class="fs-3 fw-bold price col-6" id="infoPrice">
                ${prodData.cost} ${prodData.currency}
                </div>
                <div class="col-6">
                    <select class="form-select mb-3" aria-label=".form-select-lg example" id="prodAmount" onchange="changeAmount(${prodData.id}, ${prodData.cost})">
                        <option value="0" selected>Cantidad</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            <div class="fit" id="infoDesc" style="height: 12vh;">
                ${prodData.description}
            </div>
            <hr>
            <div class="btn btn-danger btn-toolbar justify-content-center" onclick="removeItem(${prodData.id})">Quitar del Carrito</div>
            </div>
        </div>  
    `


    /* Abre el menú lateral y corre los productos a un lado para dar espacio para el menú */
    let trap1 = document.getElementById("trap1");
    let trap2 = document.getElementById("trap2");
    let trap3 = document.getElementById("trap3");
    let trap4 = document.getElementById("trap4");
    let trap5 = document.getElementById("trap5");
    let open = [trap1, trap2, trap3, trap4, trap5]
    let firstCol = document.getElementById("firstCol");
    let secondCol = document.getElementById("secondCol");

    open.forEach(element => {
        element.classList.remove("sidebarMenu");
    });
    firstCol.classList.add("col-2")
    firstCol.classList.remove("col-3")
    secondCol.classList.add("col-4")
    secondCol.classList.remove("col-3")

    /* toggleInfo(); */
};


/* Trae del localStorage los productos que seleccionó el usuario */
let amountCarrito = [];

document.addEventListener("DOMContentLoaded",()=> {
    if (localStorage.getItem("cart") != null) {
        amountCarrito = JSON.parse(localStorage.getItem("cart"))
    }
});

/* Función encargada de actualizar la cantidad del producto selecionado */
function changeAmount(idP, cost) {
    let cant = document.getElementById("prodAmount").value
    let subTotal = document.getElementById(idP+"total")
    let amount = document.getElementById(idP+"cant")

    /* Cambia la cantidad de un producto en cuestión */
    let cantProd = document.getElementById("totalProd").innerHTML;

    cantProd -= JSON.parse(amount.innerHTML)
    cantProd += JSON.parse(cant)

    document.getElementById("totalProd").innerHTML = cantProd


    
    amount.innerHTML = cant
    subTotal.innerHTML = (cost*cant)
    /* Lo guarda en el localStorage */
    amountCarrito.forEach(element => {
        if (element.id == idP) {
            element.amount = JSON.parse(cant)
            }
        });
    localStorage.setItem("cart", JSON.stringify(amountCarrito))

    /* Actualiza los precios en función de la cantidad seleccionada */
    let totalCostUSD = 0;
    let totalCostUYU = 0;

    amountCarrito.forEach(async element => {
        let prodData = await getData("https://japceibal.github.io/emercado-api/products/" + element.id + ".json")
        
        if (prodData.currency == "USD" && element.amount > 0) {
            totalCostUSD += prodData.cost * JSON.parse(element.amount)
            document.getElementById("totalCostUSD").innerHTML = totalCostUSD + " USD"
        } else
            if (prodData.currency == "UYU" && element.amount > 0) {
                totalCostUYU += prodData.cost * JSON.parse(element.amount)
                document.getElementById("totalCostUYU").innerHTML = totalCostUYU + " UYU"
            }
    });
};


/* Genera los productos en el carrito al cargar la página */
document.addEventListener("DOMContentLoaded", async ()=> {
    let carrito = JSON.parse(localStorage.getItem("cart"));
    const cartHTML = document.getElementById("carro");
    let cantProd = 0;
    let totalCostUSD = 0;
    let totalCostUYU = 0;



    carrito.forEach(async element => {
        let prodData = await getData("https://japceibal.github.io/emercado-api/products/" + element.id + ".json")

        console.log(prodData);


        if (element.amount != 0) {
            cartHTML.innerHTML += 
            `
                <div class="row cartItem" id="${element.id}div">
                    <div class="col-1 mt-1 text-center" onclick="showInfo(${element.id})"><img src="${prodData.images[0]}" class="fotoCart" alt=""></div>
                    <div class="col-3 mt-1 text-center" onclick="showInfo(${element.id})">${prodData.name}</div>
                    <div class="col-2 mt-1 text-center" onclick="showInfo(${element.id})">${prodData.cost} ${prodData.currency}</div>
                    <div class="col-2 mt-1 text-center" onclick="showInfo(${element.id})" id="${element.id}cant">${element.amount}</div>
                    <div class="col-3 mt-1 text-center" onclick="showInfo(${element.id})"><span id="${element.id}total">${element.amount * prodData.cost}</span> ${prodData.currency}</div>
                    <div class="col-1 text-center btn btn-outline-danger w-auto pb-2 pe-3 ps-3 pt-2" onclick="removeItem(${element.id})"><i class="fa-solid fa-trash"></i></div>
                </div>
                <hr class="mb-2 mt-2 cartLine" id="${element.id}hr">
            `
        }
        cantProd += JSON.parse(element.amount)
        document.getElementById("totalProd").innerHTML = cantProd

        /* Calcula la cantidad de productos total y su precio en USD o UYU */
        if (prodData.currency == "USD") {
            totalCostUSD += prodData.cost * element.amount
            document.getElementById("totalCostUSD").innerHTML = totalCostUSD + " USD" 
        }
        if (prodData.currency == "UYU") {
            totalCostUYU += prodData.cost * element.amount
            document.getElementById("totalCostUYU").innerHTML = totalCostUYU + " UYU" 
        }
    });

});

/* Función encargada de remover totalmente un objeto */
async function removeItem(idP) {
    let carrito = JSON.parse(localStorage.getItem("cart"));
    const cartHTML = document.getElementById("carro");
    var Cindex = carrito.map(producto => producto.id).indexOf(idP)
    var ACindex = amountCarrito.map(producto => producto.id).indexOf(idP)

/* Quita la cantidad de productos que aportaba al total */
    let cantProd = document.getElementById("totalProd").innerHTML;
    let amount = document.getElementById(idP+"cant")
    cantProd -= JSON.parse(amount.innerHTML)
    document.getElementById("totalProd").innerHTML = cantProd


    carrito.splice(Cindex, 1);
    amountCarrito.splice(ACindex, 1);
    localStorage.setItem("cart", JSON.stringify(carrito))

    document.getElementById(idP + "div").remove()
    document.getElementById(idP + "hr").remove()

    /* Fuerza el cierre del menú lateral */
    let trap1 = document.getElementById("trap1");
    let trap2 = document.getElementById("trap2");
    let trap3 = document.getElementById("trap3");
    let trap4 = document.getElementById("trap4");
    let trap5 = document.getElementById("trap5");
    let open = [trap1, trap2, trap3, trap4, trap5]
    let firstCol = document.getElementById("firstCol");
    let secondCol = document.getElementById("secondCol");

    open.forEach(element => {
        element.classList.add("sidebarMenu");
    });
    firstCol.classList.remove("col-2")
    firstCol.classList.add("col-3")
    secondCol.classList.remove("col-4")
    secondCol.classList.add("col-3")


    /* Calcula nuevamente los costos debido a la falta del producto */
    let totalCostUSD = 0;
    let totalCostUYU = 0;

    amountCarrito.forEach(async element => {
        let prodData = await getData("https://japceibal.github.io/emercado-api/products/" + element.id + ".json")

        if (prodData.currency == "USD" && element.amount > 0) {
            totalCostUSD += prodData.cost * JSON.parse(element.amount)
            document.getElementById("totalCostUSD").innerHTML = totalCostUSD + " USD"
        } else
            if (prodData.currency == "UYU" && element.amount > 0) {
                totalCostUYU += prodData.cost * JSON.parse(element.amount)
                document.getElementById("totalCostUYU").innerHTML = totalCostUYU + " UYU"
            }
    });

    /* Elimina los precios totales si ya no son necesarios */
    if (totalCostUSD == 0) {
        document.getElementById("totalCostUSD").innerHTML = "";
    }
    if (totalCostUYU == 0) {
        document.getElementById("totalCostUYU").innerHTML = "";
    }
    if (localStorage.getItem("cart") === '[]') {
        document.getElementById("totalCostUYU").innerHTML = "";
        document.getElementById("totalCostUSD").innerHTML = "";
        document.getElementById("totalProd").innerHTML = "";
    }   
};