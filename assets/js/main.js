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
});
