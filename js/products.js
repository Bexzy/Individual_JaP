const productos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};

async function lista(url) {
    const data2 = await getData(url);
    console.log(data2.products)
    return data2.products
};

function getHTML(list) {
    console.log(list);
    return `
    <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${list.image}" alt="Imagen auto" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${list.name}</h4>
                    <small class="text-muted">${list.soldCount}</small>
                </div>
                <p class="mb-1">${list.description}</p> 
            </div>
        </div>
    </div>
`
};

document.addEventListener("DOMContentLoaded", async () => {

    const list = await lista(productos)

    list.forEach(element => {
        let pag = getHTML(element)
        document.getElementById("listaP").innerHTML += pag
    });
});