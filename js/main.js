document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    /* Imprime el usuario en el navbar */
    const userHTML = document.getElementById("user")
    userHTML.innerHTML += localStorage.getItem("user")

    /* Chequea si el usuario está logeado, sino lo redirije al logIn */
    if (localStorage.getItem("user") == null) {
        window.location = "index.html"
    }
});