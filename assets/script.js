function handleLogin(event){
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(!email || !password){
        alert("Email Dan Password Wajib Diisi");
        return;
    }
        alert("Login Berhasil");
}