function revisarForm() {
    const mail = document.getElementById("form3Example3").value
    const pass = document.getElementById("form3Example4").value
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if((mail.match(mailformat)) && (pass.replace(/\s+/g, '')) != "") {
            localStorage.setItem("user", mail);
            window.location.replace("main.html");
        }
        else {
            document.querySelector("span").innerHTML = ("El correo o la contraseña son incorrectas");
            document.querySelector("span").classList.add("shake");
            setTimeout(() => {
                document.querySelector("span").classList.remove("shake")
            }, 200);
        };
};

document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear()
})
