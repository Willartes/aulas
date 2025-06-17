// Adicionar este script antes do </body> no HTML

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar loading
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.style.opacity = '0.7';
        
        // Preparar dados do formulário
        const formData = new FormData(contactForm);
        
        // Enviar via fetch
        fetch('forms/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showAlert(data.message, 'success');
                contactForm.reset();
            } else {
                showAlert(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            showAlert('Erro de conexão. Tente novamente.', 'error');
        })
        .finally(() => {
            // Restaurar botão
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.opacity = '5';
        });
    });
    
    // Função para mostrar alertas
    function showAlert(message, type) {
        // Remover alerta anterior se existir
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Criar novo alerta
        const alert = document.createElement('div');
        alert.className = `form-alert form-alert-${type}`;
        alert.textContent = message;
        
        // Inserir antes do formulário
        contactForm.parentNode.insertBefore(alert, contactForm);
        
        // Remover após 5 segundos
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    function toggleMenu() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    }

    });
    // Garantir que o header seja visível ao carregar a página
    document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Forçar visibilidade
        if (header) {
            header.style.display = 'block';
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '9999';
        }
        
        if (nav) {
            nav.style.display = 'flex';
        }
        
        // Menu mobile
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
    
});
