
        // --- AUTH SYSTEM ---
        function handleLogin() {
            const user = document.getElementById('usernameInput').value;
            const pass = document.getElementById('passwordInput').value;
            if (user.trim() !== "" && pass === "12345") {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUserName', user);
                initApp();
            } else {
                alert("Nama pengguna atau password salah");
            }
        }

        function handleLogout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserName');
            location.reload();
        }

        function initApp() {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('main-app').style.display = 'block';
                document.getElementById('displayUserName').innerText = localStorage.getItem('currentUserName');
                const savedAvatar = localStorage.getItem('userProfileAvatar');
                if (savedAvatar) updateAvatarUI(savedAvatar);
                fetchSpreadsheetData();
                updateNetwork();
            }
        }isLoggedIn');
        location.reload();
    }
}
