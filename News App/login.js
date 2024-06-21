function showpas() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function val() {
    event.preventDefault();
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    if (username === "") {
        usernameError.innerHTML = "Username is required ";
        return;
    } 
    if (password === "") {
        passwordError.innerHTML = "Password is required ";
        return;
    }
    fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username,password}),
        })
        .then((r) =>{return r.json()})
        .then((data) => {
            if(data.txt!="sucess") {
                alert(data.txt);
                return;
            }
            else window.location.href = '/loggedIn'; // page after login
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred. Please try again later.");
        });
}