const productos = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("prodID") + ".json"
const comments = "https://japceibal.github.io/emercado-api/products_comments/" +localStorage.getItem("prodID") + ".json"
const catsProd = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json"
let userComments = [];
let prodUserComments = [];

/* Recibe una url y devuelve el objeto */
async function getData(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
};







/* Genera el documento HTML a partir de los datos brindados */
document.addEventListener("DOMContentLoaded", async () => {
    const itemData = await getData(productos);
    const itemComments = await getData(comments);
    const main = document.getElementById("main");
    const commentsHTML = document.getElementById("comentarios");
    let media = 0;

    /* Carga comentarios del ususario */
    if (localStorage.getItem("UsuarioComment") != null) {
        userComments = JSON.parse(localStorage.getItem("UsuarioComment"));
        prodUserComments = JSON.parse(localStorage.getItem("UsuarioComment"));
    }

    /* Filtra los comentarios para que solo aparezcan en su producto en especifico */
    prodUserComments = prodUserComments.filter(comentarios => comentarios.productID == localStorage.getItem("prodID"))

    
    /* Añade lso detalles del producto al HTML */
    main.innerHTML += 
    `
    <div class="row flex-nowrap">
        <div class="col-md-5" style="height: 600px; width: ;">
            <div class="pb-3">
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="${itemData.images[0]}" class="d-block star fotoMain">
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="${itemData.images[1]}" class="d-block star fotoMain">
                </div>
                <div class="carousel-item">
                    <img src="${itemData.images[2]}" class="d-block star fotoMain">
                </div>
                <div class="carousel-item">
                    <img src="${itemData.images[3]}" class="d-block star fotoMain">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
            <div class="row">
                <div class="col-md-4"><img src="${itemData.images[1]}" alt="" class="sub foto"></div>
                <div class="col-md-4"><img src="${itemData.images[2]}" alt="" class="sub foto"></div>
                <div class="col-md-4"><img src="${itemData.images[3]}" alt="" class="sub foto"></div>
            </div>
        </div>
        <div class="col-md-7 info">
        
        
            <div class="title">
                ${itemData.name}
            
                <p class="text-muted">${itemData.category}</p>
            </div>
            <hr>
            <div class="score">
                <span id="totalScore">

                </span>
                <span class="sells">
                    &nbsp;${itemData.soldCount} vendidos en total <span class="text-muted">(${itemComments.length + prodUserComments.length} reviews)</span>
                </span> 
            </div>
            <div class="price">
                ${itemData.currency}    ${itemData.cost} 
            </div>
            <br>
            <div class="desc" style="hight: 200px; padding-bottom: 70px;">
                ${itemData.description}
            </div>
        </div>
    </div>
    `

    /* Añade los comentarios */
        if (itemComments.length != 0 || prodUserComments != []) {
            itemComments.forEach(comment => {

        commentsHTML.innerHTML +=
        `
        <div class="row">
            <div class="card-body row">
                <div class="col-md-1">
                    Space reserved for pp
                </div>
                <div class="col-md-11">
                    <h5 class="card-title user">
                        ${comment.user}
                        <br> 
                        <span class="date text-muted">${comment.dateTime}</span>
                    </h5>
                <div class="card-text">
                    <div style="margin-top: 6px;" class="scoreComment scoreCss">
                        ${comment.score}
                    </div>
                    ${comment.description}
                </div>
                <hr>
            </div>
        </div>
        `;
    }) /* Añade los comentarios del usuario */
        if (prodUserComments != []) {
            prodUserComments.forEach(element => {
                
                commentsHTML.innerHTML +=
                `
                <div class="row">
                    <div class="card-body row">
                        <div class="col-md-1">
                            Space reserved for pp
                        </div>
                        <div class="col-md-11">
                            <h5 class="card-title user">
                                ${element.user}
                                <br> 
                                <span class="date text-muted">${element.date}</span>
                            </h5>
                        <div class="card-text">
                            <div style="margin-top: 6px;" class="scoreComment scoreCss">
                                ${element.score}
                            </div>
                            ${element.review}
                        </div>
                        <hr>
                    </div>
                </div>
                `;
            });
        }
    } else { /* Deja un mensaje de "No hay comentarios." en caso de que no se encuentre ninguno. */
        commentsHTML.innerHTML += '<div class="text-muted"> No hay comentarios. </div>';
    };


    /* Hace la media de puntuación entre todos los comentarios para el producto */
    document.querySelectorAll(".scoreComment").forEach(element => {
        media += JSON.parse(element.innerHTML)
    });
    media = (media / document.querySelectorAll(".scoreComment").length)
    for (let i = 0; i < Math.floor(media); i++) {
        document.getElementById("totalScore").innerHTML += "<i class='fa-solid fa-star' style='color: gold;'></i>"
    }
    for (let i = Math.floor(media); i < 5; i++) {
        document.getElementById("totalScore").innerHTML += "<i class='fa-regular fa-star'></i>"
    }


    /* Agrega la puntuación de las reviews */
    document.querySelectorAll(".scoreComment").forEach(element => {
        let puntaje = element.innerHTML

        for (let i = 0; i < puntaje; i++) {
            element.innerHTML +=  "<i class='fa-solid fa-star' style='color: gold;'></i>"
        }
        if (puntaje < 5) {
            for (let i = puntaje; i < 5; i++) {
                element.innerHTML +=  "<i class='fa-regular fa-star'></i>"
                
            }
        }
    });

    /* GENERA LA SECCIÓN DE PRODUCTOS RELACIONADOS */
    const related = document.getElementById("related");

    let categoria = await getData(catsProd);
    categoria.products.forEach(element => {
        if (element.id != localStorage.getItem("prodID")) {
            related.innerHTML += 
            `
            <div class="col-md-4" onclick="recargar(${element.id})">
                <div class="card mb-4 shadow-sm custom-card cursor-active btn-success green align-items-start p-0" id="muebles">
                    <img class="bd-placeholder-img card-img-top" src="${element.image}">
                    <h3 class="m-3">${element.name}</h3>
                </div>
            </div>
            `
        }
    });
});


function recargar(id) {
    localStorage.setItem("prodID", id)
    window.location = "product-info.html"
}


/* Trae e imprime el username en la navbar */
document.addEventListener("DOMContentLoaded", () => {
    const userHTML = document.getElementById("user");

    userHTML.innerHTML += localStorage.getItem("user");

        /* Chequea si el usuario está logeado, sino lo redirije al logIn */
        if (localStorage.getItem("user") == null) {
            window.location = "index.html"
        }
});



const botonComentar = document.getElementById("btnComment");

/* Genera el comentario y lo guarda en el localStorage */
botonComentar.addEventListener("click", () => {
    var textoComentario = document.getElementById("txtComment").value;
    var scoreComentario = document.getElementById("score").value;
    const listComentarios = document.getElementById("comentarios");
    const user = localStorage.getItem("user");
    const prodID = localStorage.getItem("prodID");
    const tempo = Date.now();
    const date = new Date(tempo);
    const hoy = date.toLocaleDateString()
    
    let value = JSON.stringify(userComments);


    if (textoComentario.replace(/\s/g, '') == "") {
    alert("Porfavor escriba su reseña.")
    } else {
    
    listComentarios.innerHTML +=
    `
    <div class="row">
        <div class="card-body row">
            <div class="col-md-1">
                Space reserved for pp
            </div>
            <div class="col-md-11">
                <h5 class="card-title user">
                    ${user}
                    <br> 
                    <span class="date text-muted">${hoy}</span>
                </h5>
            <div class="card-text">
                <div style="margin-top: 6px;" class="scoreComment scoreCss">
                    ${scoreComentario}
                </div>
                ${textoComentario}
            </div>
            <hr>
        </div>
    </div>
    `;
    
    userComments.push({user: user, review: textoComentario, score: scoreComentario, date: hoy ,productID: prodID})
    value = JSON.stringify(userComments)
    
    /* Reestablece los valores del input y manda el comentario a localStorage */
    document.getElementById("txtComment").value = "";
    document.getElementById("score").value = 1; 

    localStorage.setItem("UsuarioComment", value)


    /* Coloca las estrellas en el comentario del usuario */
    document.querySelectorAll(".scoreComment").forEach(element => {
        let puntaje = element.innerHTML

        for (let i = 0; i < puntaje; i++) {
            element.innerHTML +=  "<i class='fa-solid fa-star' style='color: gold;'></i>"
        }
        if (puntaje < 5) {
            for (let i = puntaje; i < 5; i++) {
                element.innerHTML +=  "<i class='fa-regular fa-star'></i>"
                
            }
        }
    });
}
});
