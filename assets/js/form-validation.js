/**
 * Validação e Envio do Formulário de Contato
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const loadingDiv = form.querySelector('.loading');
    const errorDiv = form.querySelector('.error-message');
    const successDiv = form.querySelector('.sent-message');

    // Ocultar divs de status inicialmente
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens anteriores
        hideAllMessages();
        
        // Validar formulário
        if (!validateForm()) {
            return;
        }
        
        // Mostrar loading
        showLoading();
        
        // Enviar formulário
        submitForm();
    });

    function validateForm() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const captchaInput = document.getElementById('captcha').value.trim();

        // Validar campos obrigatórios
        if (!nome) {
            showError('Por favor, preencha seu nome.');
            return false;
        }

        if (!email) {
            showError('Por favor, preencha seu e-mail.');
            return false;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, insira um e-mail válido.');
            return false;
        }

        if (!assunto) {
            showError('Por favor, preencha o assunto.');
            return false;
        }

        if (!mensagem) {
            showError('Por favor, escreva sua mensagem.');
            return false;
        }

        if (!captchaInput) {
            showError('Por favor, resolva a operação matemática.');
            return false;
        }

        // Validar captcha
        if (!validateCaptcha()) {
            showError('Resposta da operação matemática incorreta. Tente novamente.');
            mathCaptcha.generateQuestion(); // Gerar nova pergunta
            document.getElementById('captcha').value = '';
            return false;
        }

        return true;
    }

    function submitForm() {
        const formData = new FormData(form);
        
        // Adicionar campos com nomes corretos para o PHP
        const data = {
            name: formData.get('nome'),
            email: formData.get('email'),
            phone: formData.get('telefone') || '',
            subject: formData.get('assunto'),
            message: formData.get('mensagem'),
            captcha_answer: formData.get('captcha-answer'),
            captcha_input: formData.get('captcha')
        };

        fetch('forms/contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(data => {
            hideLoading();
            
            if (data.status === 'success') {
                showSuccess(data.message);
                form.reset();
                mathCaptcha.generateQuestion(); // Gerar nova pergunta
            } else {
                showError(data.message || 'Erro ao enviar mensagem. Tente novamente.');
                if (data.regenerate_captcha !== false) {
                    mathCaptcha.generateQuestion(); // Gerar nova pergunta em caso de erro
                    document.getElementById('captcha').value = '';
                }
            }
        })
        .catch(error => {
            hideLoading();
            showError('Erro de conexão. Verifique sua internet e tente novamente.');
            console.error('Erro:', error);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showLoading() {
        loadingDiv.style.display = 'block';
        loadingDiv.textContent = 'Enviando...';
    }

    function hideLoading() {
        loadingDiv.style.display = 'none';
    }

    function showError(message) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
        // Auto-hide após 5 segundos
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        successDiv.style.display = 'block';
        successDiv.textContent = message;
        // Auto-hide após 8 segundos
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 8000);
    }

    function hideAllMessages() {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
    }
});
