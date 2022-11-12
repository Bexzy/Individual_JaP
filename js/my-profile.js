    /* Imprime el usuario en el navbar */
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


/* SECCIÓN ENCARGADA DE INFORMAR AL USUARIO SOBRE EL ESTADO DEL ARCHIVO Y DE ACTUALIAR LA FOTO DE PERFIL */
const input = document.getElementById("img");
const preview = document.getElementById("preview");

input.addEventListener('change', updateImageDisplay);


function updateImageDisplay() {
    preview.innerHTML = "";
    
    const imagenes = input.files;
    
    if (imagenes.length === 0) {
        preview.innerHTML = '<p class="p-1 text-center fs-5 mb-1">No hay ningún archivo seleccionado actualmente.</p>';
        } else {
            if (validFileType(imagenes[0])) {
                console.log(URL.createObjectURL(imagenes[0]));
                preview.innerHTML = 
                `
                <p><b>Nombre de archivo:</b> ${imagenes[0].name} <br> <b>Tamaño de archivo:</b> ${returnFileSize(imagenes[0].size)}.</p>
                `

                document.getElementById("pfp").innerHTML = 
                `
                <img src="${URL.createObjectURL(imagenes[0])}" alt="" class="img">
                `
                
            }   else {
                preview.innerHTML =  `<p class="p-1 text-center fs-5 mb-1"><b>Nombre de archivo:</b> ${file.name}: El formato del archivo no es valido.</p>`;
            }
        }
}


/* Tipos de archivos que acepta como imagen de perfil */
const fileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

/* Función que devuelve el peso total del archivo seleccionado por el usuario y su unidad */
function returnFileSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} bytes`;
    } else if (bytes >= 1024 && bytes < 1048576) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    } else if (bytes >= 1048576) {
        return `${(bytes / 1048576).toFixed(1)} MB`;
    }
}


/* FUNCIÓN ENCARGADA DE LA VERIFICACIÓN DE DATOS DEL USUARIO */
function verify() {
    document.querySelectorAll(".verify").forEach(element => {
        if (element.value === "") {
            element.classList.add("is-invalid")
        }

        element.addEventListener("keyup", ()=> {
            if (element.value === "") {
                element.classList.add("is-invalid")
            } else {
                element.classList.replace("is-invalid", "is-valid")
            }
        })
    });

    /* EN CASO DE ESTAR TODO CORRECTO GUARDA LOS DATOS QUE INGRESÓ EL USUARIO */
    if (document.querySelectorAll(".is-invalid").length == 0) {
        const name = document.getElementById("name")
        const surname = document.getElementById("surname")
        const phone = document.getElementById("phone")
        const secName = document.getElementById("secName")
        const secSurname = document.getElementById("secSurname")

        let user = JSON.parse(localStorage.getItem("user"))

        user.name = name.value
        user.surname = surname.value
        user.phone = phone.value

        /* En caso de que algunos de los valores quedes vacio los deja como "undefined" para ocultar el dato. */
        if(secName.value != "") {
            user.secName = secName.value
        } else {
            user.secName = undefined
        }
        if (secSurname.value != "") {
            user.secSurname = secSurname.value
        } else {
            user.secName = undefined
        }
        
        localStorage.setItem("user", JSON.stringify(user))
        userHTML.innerHTML = '<i class="fa-solid fa-user-large"></i> ' + JSON.parse(localStorage.getItem("user")).name
    }
}



/* ACTIVA EL BOTÓN DE GUARDAR CAMBIOS EN CASO DE DETECTAR ALGUNO */
document.querySelectorAll("input").forEach(element => {
    element.addEventListener("change", ()=> {
        document.getElementById("saveBtn").disabled = false
    })
});



/* AL CARGAR LA PÁGINA CHEQUEA SI EL USUARIO YA HABIA PREESCRITO SUS DATOS Y LOS COLOCA */
document.addEventListener("DOMContentLoaded", ()=> {
    const email = document.getElementById("email");
    email.value = JSON.parse(localStorage.getItem("user")).email;

    let user = JSON.parse(localStorage.getItem("user"));

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const phone = document.getElementById("phone");
    const secName = document.getElementById("secName");
    const secSurname = document.getElementById("secSurname");


    if(user.name != undefined) {
        name.value = user.name
    };
    if(user.surname != undefined) {
        surname.value = user.surname
    };
    if(user.phone != undefined) {
        phone.value = user.phone
    };
    if(user.secName != undefined) {
        secName.value = user.secName
    };
    if(user.secSurname != undefined) {
        secSurname.value = user.secSurname
    };
});





/* 
    CÓDIGO DE "JASPER"
    https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page/65867840#65867840

    Modificado mínimamente para uso propio.

    CAPTURA LA IMAGEN DE PERFIL SELECCIONADA Y LA GUARDA EN EL LOCALSTORAGE PARA SU POSTERIOR USO 
*/
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById('img').addEventListener("change", ()=> {
        /* Trae la imagen que subió el usuario. En caso de haber subido más de una trae únicamente la primera */
    const imgCatch = document.getElementById('img').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        /* Convierte la imagen en base64 y envia el string al localStorage para ser almacenado */
        localStorage.setItem("userPfp", reader.result);
    }, false);

    if (imgCatch) {
        reader.readAsDataURL(imgCatch);
    }
    });

    /* En caso de haber una imagen previamente guardada la selecciona como foto de perfil */
    if (localStorage.getItem("userPfp") != null) {
        let img = document.getElementById('pic');
        img.src = localStorage.getItem('userPfp');
    };
});

