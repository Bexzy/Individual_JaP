const productos = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json"

async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};

async function lista(url) {
    const data2 = await getData(url);
    return data2.products
};

/* Maqueta de los productos */
function getHTML(list) {
    return `
    <div class="list-group-item cursor-active sobre btnPers" style="border-color: #3b756c; margin: 2px;" id="${list.id}" onclick="setProdID(${list.id})">
        <div class="row btnPers">
            <div class="col-3 d-flex btnPersImg">
                <img src="${list.image}" alt="Imagen" class="card-img" style:"background-color: #3b756c; border-color:  #3b756c;">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${list.name + " - " + list.currency + " " + list.cost } </h4>
                    <small class="">${list.soldCount + " Vendidos"}</small>
                </div>
                <p class="mb-1" >${list.description}</p> 
            </div>
        </div>
    </div>
`
};


/* Genera el título dinamicamente */
document.addEventListener("DOMContentLoaded", async () => {
    const categ = document.getElementById("titulo")
    const respuesta2 = await fetch(productos);
    const data2 = await respuesta2.json();

    categ.innerHTML += (data2.catName)
});




const botonFiltrar =  document.getElementById("botonFiltrar")
const limpiarFiltro = document.getElementById("limpiarFiltro")
let maxFiltro = document.getElementById("maxFiltro").value;
let minFiltro = document.getElementById("minFiltro").value;


const precioUp =   document.getElementById("precioUp")
const precioDown = document.getElementById("precioDown")
const filtroVentas = document.getElementById("filtroVentas")

const filtroTexto = document.getElementById("filtroTexto")
const buscador = document.getElementById("buscador")

/* Genera La lista inicial al cargar la página */
document.addEventListener("DOMContentLoaded", async () => {

    const list = await lista(productos)
    

    list.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});






/* Limpia los filtros acutales */
limpiarFiltro.addEventListener("click", async () => {
    let maxFiltro = document.getElementById("maxFiltro").value;
    let minFiltro = document.getElementById("minFiltro").value;

    const list = await lista(productos)
    document.getElementById("listaP").innerHTML = "";
    

    list.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    })

document.getElementById("maxFiltro").value = "";
document.getElementById("minFiltro").value = "";
})


/* Filtra articulos en un margen de precio */
botonFiltrar.addEventListener("click", async () => {
    let maxFiltro = document.getElementById("maxFiltro").value;
    let minFiltro = document.getElementById("minFiltro").value;

    const list = await lista(productos)
    document.getElementById("listaP").innerHTML = "";
    

    list.forEach(element => {
        if (element.cost <= maxFiltro && element.cost >= minFiltro) {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
        }
    })

document.getElementById("maxFiltro").value = "";
document.getElementById("minFiltro").value = "";
})


/* Filtra articulos de mander ascendente según su precio */
precioUp.addEventListener("click", async () => {
    const list = await lista(productos)
    let priceOrderAsc = list.sort((a, b) => {
        if (a.cost > b.cost) {return 1}
        if (b.cost > a.cost) {return -1}
    });


    document.getElementById("listaP").innerHTML = "";

    priceOrderAsc.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});

/* Filtra articulos de manera descendente según su precio */
precioDown.addEventListener("click", async () => {
    const list = await lista(productos)
    let priceOrderDesc = list.sort((a, b) => {
        if (a.cost > b.cost) {return -1}
        if (b.cost > a.cost) {return 1}
    });


    document.getElementById("listaP").innerHTML = "";

    priceOrderDesc.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});

/* Filtra los articulos en función de su cantidad de vendidos */
filtroVentas.addEventListener("click", async () => {
    const list = await lista(productos)
    let sellOrder = list.sort((a, b) => {
        if (a.soldCount > b.soldCount) {return -1}
        if (b.soldCount > a.soldCount) {return 1}
    });


    document.getElementById("listaP").innerHTML = "";

    sellOrder.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});

/* Filtra articulos en función de un buscador */
buscador.addEventListener("keyup", async () => {
    const list = await lista(productos);
    let busqueda = document.getElementById("buscador").value;


    document.getElementById("listaP").innerHTML = "";

    list.forEach(element => {
        if (element.name.toLowerCase().includes(busqueda.toLowerCase()) || element.description.toLowerCase().includes(busqueda.toLowerCase())) {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
        };
    });
});



/* Deja en el local storage la información necesaria para ingresar al producto deseado tras su click */
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
};



/* Trae e imprime el username en la navbar */
document.addEventListener("DOMContentLoaded", () => {
    const userHTML = document.getElementById("user")
    if (JSON.parse(localStorage.getItem("user")).name != undefined) {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).name
    } else {
        userHTML.innerHTML += JSON.parse(localStorage.getItem("user")).email
    };

    if (localStorage.getItem("user") == null) {
        window.location = "index.html"
    };
});