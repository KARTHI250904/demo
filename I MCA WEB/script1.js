document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email    = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (username.length < 3) {
        alert("Username must be at least 3 characters");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (this.responseText === "success") {
            document.getElementById("msg").innerHTML =
                "<span style='color:green'>Login Successful</span>";
        } else {
            document.getElementById("msg").innerHTML =
                "<span style='color:red'>Invalid Login Details</span>";
        }
    };

    xhr.send(
        "username=" + username +
        "&email=" + email +
        "&password=" + password
    );
});
