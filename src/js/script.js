function handleLogin(event){
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!email || !password){
        alert("Email dan Password wajib diisi");
        return;
    }
        alert("Login berhasil");
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

function handleForm(event, actionType) {
    event.preventDefault();

    const nim = document.getElementById("nim").value.trim();
    const nama = document.getElementById("nama").value.trim();

    if (!nim || !nama) {
        alert("NIM dan Nama wajib diisi");
        return;
    }
    alert(`Mahasiswa berhasil ${actionType}`);
    
}


document.addEventListener("DOMContentLoaded", async function () {
    async function loadComponent(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Gagal memuat ${filePath}`);
            
            const data = await response.text();
            document.getElementById(elementId).innerHTML = data;
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
        }
    }

    // load sidebar dan header
    loadComponent("sidebar-container", "component/sidebar.html");
    loadComponent("header-container", "component/header.html");
    loadComponent("footer-container", "component/footer.html");
    loadComponent("add-modal", "assets/addModal.html");
    loadComponent("edit-modal", "assets/editModal.html");
});