function handleLogin() {
    const user = document.getElementById('usernameInput').value;
    const pass = document.getElementById('passwordInput').value;

    if (user.trim() !== "" && pass === "12345") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', user);
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('displayUserName').innerText = user;
        
        showToast("Selamat Datang, " + user);
        fetchSpreadsheetData(); // Memuat data setelah login
    } else {
        showToast("Username atau Password Salah!");
    }
}

function handleLogout() {
    if(confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    }
}