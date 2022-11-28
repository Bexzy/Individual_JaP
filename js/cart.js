    document.addEventListener("DOMContentLoaded", ()=> {

    const userHTML = document.getElementById("user")
    if (JSON.parse(localStorage.getItem("user")).name != undefined) {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).name
    } else {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).email
    }

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

    let totalCostUYU = totalCostUSD * 40;


    amountCarrito.forEach(async element => {
        let prodData = await getData("https://japceibal.github.io/emercado-api/products/" + element.id + ".json")
        
        if (prodData.currency == "USD" && element.amount > 0) {
            totalCostUSD += prodData.cost * JSON.parse(element.amount)

        } else
            if (prodData.currency == "UYU" && element.amount > 0) {
                totalCostUSD += (prodData.cost * JSON.parse(element.amount)) * 0.025
            }
        document.getElementById("totalCost").innerHTML = totalCostUSD.toFixed(2)

    });
};


/* Genera los productos en el carrito al cargar la página */
document.addEventListener("DOMContentLoaded", async ()=> {
    let carrito = JSON.parse(localStorage.getItem("cart"));
    const cartHTML = document.getElementById("carro");
    let cantProd = 0;
    let totalCostUSD = 0;

    let totalCostUYU = totalCostUSD * 40;




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


        /* Calcula la cantidad de productos total y su precio en USD */
        if (prodData.currency == "USD") {
            totalCostUSD += prodData.cost * element.amount
            
        }
        if (prodData.currency == "UYU") {
            totalCostUSD += (prodData.cost * element.amount) * 0.025
            
        }
        document.getElementById("totalCost").innerHTML = totalCostUSD.toFixed(2)

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

    firstCol.classList.replace("col-2", "col-3")
    secondCol.classList.replace("col-4", "col-3")


    let totalCostUSD = 0;
    let totalCostUYU = totalCostUSD * 40;


    amountCarrito.forEach(async element => {
        let prodData = await getData("https://japceibal.github.io/emercado-api/products/" + element.id + ".json")

        if (prodData.currency == "USD" && element.amount > 0) {
            totalCostUSD += prodData.cost * JSON.parse(element.amount)

        } else
            if (prodData.currency == "UYU" && element.amount > 0) {
                totalCostUSD += (prodData.cost * JSON.parse(element.amount)) * 0.025
            }
        document.getElementById("totalCost").innerHTML = totalCostUSD.toFixed(2)

    });

        /* Elimina los precios totales si ya no son necesarios */
    if (totalCostUSD == 0) {
        document.getElementById("totalCost").innerHTML = "0";
    }
    if (localStorage.getItem("cart") === '[]') {
        document.getElementById("totalCost").innerHTML = "0";
        document.getElementById("totalProd").innerHTML = "0";
    } 

};





/* Funcion encargada del funcionamiento del checkbox custom y su escucha debajo */
function checkIcon(id) {
        switch (id) {
            case "fexpress":
                document.getElementById("ifexpress").classList.toggle("fa-square")
                document.getElementById("ifexpress").classList.toggle("fa-square-check")
                document.getElementById("ifpremium").classList.replace("fa-square-check", "fa-square")
                document.getElementById("ifstandard").classList.replace("fa-square-check", "fa-square")
            break;
            case "fpremium":
                document.getElementById("ifpremium").classList.toggle("fa-square")
                document.getElementById("ifpremium").classList.toggle("fa-square-check")
                document.getElementById("ifexpress").classList.replace("fa-square-check", "fa-square")
                document.getElementById("ifstandard").classList.replace("fa-square-check", "fa-square")
            break;
            case "fstandard":
                document.getElementById("ifstandard").classList.toggle("fa-square")
                document.getElementById("ifstandard").classList.toggle("fa-square-check")
                document.getElementById("ifexpress").classList.replace("fa-square-check", "fa-square")
                document.getElementById("ifpremium").classList.replace("fa-square-check", "fa-square")
            break;
        }
}

/* Calcula el costo de envio según el método elegido */
function shippingCost(id, actualPrice) {
            switch (id) {
                case "fexpress":
                    actualPrice = (actualPrice * 0.08)
                    return actualPrice
                case "fpremium":
                    actualPrice = (actualPrice * 0.15)
                    return actualPrice
                case "fstandard":
                    actualPrice = (actualPrice * 0.05)
                    return actualPrice
    }
}

let selectedShipping = undefined;

const checkboxes = [(document.getElementById("fpremium")),(document.getElementById("fexpress")), (document.getElementById("fstandard"))]
/* Genera */
checkboxes.forEach(element => {
    element.addEventListener("change", ()=> {
        let actualPrice = document.getElementById("totalCost").innerHTML

        checkIcon(element.id)
        document.getElementById("shipPrice").innerHTML = (shippingCost(element.id, JSON.parse(actualPrice))).toFixed(2)
        document.getElementById("totalPrice").innerHTML = (shippingCost(element.id, JSON.parse(actualPrice)) + JSON.parse(actualPrice)).toFixed(2)
        selectedShipping = element.value
    });
});

/* Se encarga de modificar la divisa y precio al usar el swap */
document.getElementById("USDtoUYU").addEventListener("change", () => {
    if (document.getElementById("USDtoUYU").checked) {
        document.getElementById("totalCost").innerHTML = ((document.getElementById("totalCost").innerHTML) * 40).toFixed(2)
        document.getElementById("currencyCostHTML").innerHTML = " UYU"
        document.getElementById("shipPrice").innerHTML = ((document.getElementById("shipPrice").innerHTML) * 40).toFixed(2)
        document.getElementById("currencyShipHTML").innerHTML = " UYU"
        document.getElementById("totalPrice").innerHTML = ((document.getElementById("totalPrice").innerHTML) * 40).toFixed(2)
        document.getElementById("currencyPriceHTML").innerHTML = " UYU"
    } else {
        document.getElementById("totalCost").innerHTML = ((document.getElementById("totalCost").innerHTML) * 0.025).toFixed(2)
        document.getElementById("currencyCostHTML").innerHTML = " USD"
        document.getElementById("shipPrice").innerHTML = ((document.getElementById("shipPrice").innerHTML) * 0.025).toFixed(2)
        document.getElementById("currencyShipHTML").innerHTML = " USD"
        document.getElementById("totalPrice").innerHTML = ((document.getElementById("totalPrice").innerHTML) * 0.025).toFixed(2)
        document.getElementById("currencyPriceHTML").innerHTML = " USD"
    }
});


var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
})

var creditCardModal = new bootstrap.Modal(document.getElementById('creditCardModal'), {
    keyboard: false
})

var bankTransfModal = new bootstrap.Modal(document.getElementById('bankTransfModal'), {
    keyboard: false
})

/* Define los parametros de verificación */
function verify(id) {
    const item = document.getElementById(id);

    switch (id) {
        case "street":
        case "number":
        case "corner":
        case "creditCardName":
        case "creditCardNum":
        case "creditCardSecCode":
        case "creditCardDate":
        case "bankName":
        case "bankNum":
            return (item.value === "")
    }
}

let selectedMethod = undefined 
/* Función final, se encarga de la validación de datos en general y de brindar la clase a quien es debido. Tras el primer click 
añade un excucha a todos los input para que se verifiquen a ellos mismos */
function escuchar() {
    document.querySelectorAll(".escucha").forEach(element => {
        if (verify(element.id)) {
            element.classList.add("is-invalid")
        } else {
            element.classList.add("is-valid")
        }

        element.addEventListener("keyup", () => {
            if (verify(element.id)) {
                element.classList.replace("is-valid", "is-invalid")
            } else {
                element.classList.replace("is-invalid", "is-valid")
            }
        });

    });

    if (!(document.getElementById("fstandard").checked || document.getElementById("fexpress").checked || document.getElementById("fpremium").checked)) { 
        document.getElementById("formShipping").classList.add("is-invalid")
    }

    const shipping = [document.getElementById("fstandard"), document.getElementById("fexpress"), document.getElementById("fpremium")]

    shipping.forEach(element => {
        element.addEventListener("change", () => {
            if (element.checked == true) { 
                document.getElementById("formShipping").classList.replace("is-invalid", "is-valid") 
            }
        });
    });

    if (selectedMethod == undefined) {
        document.getElementById("payMethod").classList.add("is-invalid")
    } else 
        if (selectedMethod == "tarjetaCredito") {
            document.querySelectorAll(".tarjeta").forEach(element => {
                if (verify(element.id)) {
                    element.classList.add("is-invalid")
                    document.getElementById("paySelectedMethod").classList.add("is-invalid")
                } else {
                    element.classList.add("is-valid")
                }

                element.addEventListener("keyup", () => {
                    if (verify(element.id)) {
                        element.classList.replace("is-valid", "is-invalid")
                        document.getElementById("paySelectedMethod").classList.add("is-invalid")
                    } else {
                        element.classList.replace("is-invalid", "is-valid")
                    }
                });

                element.addEventListener("keyup", () => {
                    if (document.getElementById("creditCardName").value    != "" && 
                        document.getElementById("creditCardNum").value     != "" && 
                        document.getElementById("creditCardSecCode").value != "" && 
                        document.getElementById("creditCardDate").value    != "") {
                            document.getElementById("paySelectedMethod").classList.remove("is-invalid")
                        }
                    })

            });



    } else 
        if (selectedMethod == "transfBancaria") {
            document.querySelectorAll(".transferencia").forEach(element => {
                if (verify(element.id)) {
                    element.classList.add("is-invalid")
                    document.getElementById("paySelectedMethod").classList.add("is-invalid")
                } else {
                    element.classList.add("is-valid")
                }

                element.addEventListener("keyup", () => {
                    if (verify(element.id)) {
                        element.classList.replace("is-valid", "is-invalid")
                        document.getElementById("paySelectedMethod").classList.add("is-invalid")
                    } else {
                        element.classList.replace("is-invalid", "is-valid")
                    }
                });
            
                element.addEventListener("keyup", () => {
                    if (document.getElementById("bankName").value != "" && 
                        document.getElementById("bankNum").value  != "") {
                            document.getElementById("paySelectedMethod").classList.remove("is-invalid")
                        }
                    })

            });
    }
};

/* Sección de tarjeta de credito en el modal */
function creditCard() {
    document.getElementById("paySelectedMethod").innerHTML = 'Tarjeta de Credito<span class="link-primary ms-2 text-decoration-underline fs-6" onclick="creditCardModal.toggle()">Editar datos</span>'
    document.getElementById("payMethod").innerHTML = ""
    selectedMethod = "tarjetaCredito"
    if (document.getElementById("payMethod").classList.contains("is-invalid")) {
        document.getElementById("payMethod").classList.remove("is-invalid")
    }
    document.querySelectorAll(".transferencia").forEach(element => {
        if (document.getElementById("paySelectedMethod").classList.contains("is-invalid")) {
            document.getElementById("paySelectedMethod").classList.replace("is-invalid", "is-valid")
        }
    });
};


/* Sección de transferencia bancaria en el modal */
function bankTrans() {
    document.getElementById("paySelectedMethod").innerHTML = 'Transferencia Bancaria<span class="link-primary ms-2 text-decoration-underline fs-6" onclick="bankTransfModal.toggle()">Editar datos</span>'
    document.getElementById("payMethod").innerHTML = ""
    selectedMethod = "transfBancaria"
    if (document.getElementById("payMethod").classList.contains("is-invalid")) {
        document.getElementById("payMethod").classList.remove("is-invalid")
    }
    document.querySelectorAll(".tarjeta").forEach(element => {
        if (document.getElementById("paySelectedMethod").classList.contains("is-invalid")) {
            document.getElementById("paySelectedMethod").classList.replace("is-invalid", "is-valid")
        }
    });
};


function finishCart() {
    escuchar()
    if (document.querySelectorAll(".is-invalid").length == 0) {
        modalSuccess.toggle()
        logBuy()
    }
}

var modalSuccess = new bootstrap.Modal(document.getElementById('modalSuccess'), {
    keyboard: false
})


/* Crea un JSON con los datos de la compra */
async function logBuy(){
    let nombre = JSON.parse(localStorage.getItem("user")).name;
    let mail = JSON.parse(localStorage.getItem("user")).email;
    let shipping = selectedShipping;
    let cost = document.getElementById('totalPrice').innerHTML;
    let metodoPago = selectedMethod;
    let calle = document.getElementById('street').value;
    let numeroCasa = document.getElementById('number').value;
    let esquina = document.getElementById('corner').value;
    let detallesEspeciales = document.getElementById('specialDetails').value;
    let carro = JSON.parse(localStorage.getItem("cart"))

    var formData =  {
                        id: 001,
                        name: nombre,
                        email: mail,
                        shippingMethod: shipping,
                        totalCost: cost,
                        currency: "USD",
                        payMethod: metodoPago,
                        items: [],
                        shipping:   {
                                        street: calle,
                                        number: numeroCasa,
                                        corner: esquina,
                                        specialDetails: detallesEspeciales
                                    },
                    };

    /* formData.id = (001);
    formData.name = (nombre.value);
    formData.email = (mail.value);
    formData.shippingMethod = (shipping.value);
    formData.totalCost = (cost.value);
    formData.currency = "USD";
    formData.items = []; */
    carro.forEach(element => {
        formData.items.push(
            {
                itemID: element.id,
                itemAmount: element.amount
            }
        )
    });
/*  formData.payMethod = undefined;
    formData.shipping = [];
    formData.shipping.push(
        {
            street: undefined,
            number: undefined,
            corner: undefined,
            specialDetails: undefined,
        }
    ); */

    let response = await fetch('http://localhost:3000/data/user_buy_history/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    let respuestaFinal = await response.json()
    console.log(respuestaFinal);
};