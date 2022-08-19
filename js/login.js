function revisarForm() {
    const mail = document.getElementById("form3Example3").value
    const pass = document.getElementById("form3Example4").value

        if ((mail.replace(/\s+/g, '')) != "" && (pass.replace(/\s+/g, '')) != "") {
            window.location.replace("index.html");;
        }
        else {
            document.querySelector("span").innerHTML = ("El correo o la contraseña son incorrectas")
            document.querySelector("span").classList.add("shake")
            setTimeout(() => {
                document.querySelector("span").classList.remove("shake")
            }, 200);
        }
};

