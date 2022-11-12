function revisarForm() {
    const mail = document.getElementById("form3Example3").value
    const pass = document.getElementById("form3Example4").value
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    /* Verifica que la información esté correcta y en caso de serlo la almacena */
        if((mail.match(mailformat)) && (pass.replace(/\s+/g, '')) != "") {
            localStorage.setItem("user", JSON.stringify({
                email: "brunopastorino321@gmail.com",
                name: undefined,
                secName: undefined,
                surname: undefined,
                secSurname: undefined,
                phone: undefined
            }))
            window.location.replace("main.html");
        } /* Añade el mensaje de error en caso de detectar uno */
        else {
            document.querySelector("span").innerHTML = ("El correo o la contraseña son incorrectas");
            document.querySelector("span").classList.add("shake");
            setTimeout(() => {
                document.querySelector("span").classList.remove("shake")
            }, 240);
        };
};

/* Limpia el localStorage al entrar al login para ingresar un nuevo usuario */
document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear()
})
