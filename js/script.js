document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');

    function navigateTo(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    function logout() {
        navigateTo('landing-page');
    }

    function showCreateForm() {
        document.getElementById('data-form').classList.remove('hidden');
    }

    function hideCreateForm() {
        document.getElementById('data-form').classList.add('hidden');
    }

    // Navigation from landing page to login page
    window.navigateTo = navigateTo;

    // Logout
    window.logout = logout;

    // Show and hide create form
    window.showCreateForm = showCreateForm;
    window.hideCreateForm = hideCreateForm;

    // Initial page
    navigateTo('landing-page');
});

// تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع السلوك الافتراضي للنموذج

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // طلب تسجيل الدخول
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // الانتقال إلى الصفحة الرئيسية
            navigateTo('home-page');
        } else {
            alert('خطأ في اسم المستخدم أو كلمة المرور');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// جلب المستخدمين
fetch('/users')
    .then(response => response.json())
    .then(data => {
        console.log('Users:', data);
        // يمكنك معالجة البيانات هنا إذا أردت
    })
    .catch(error => {
        console.error('Error:', error);
    });


 fetch('/record')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.created_at}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
