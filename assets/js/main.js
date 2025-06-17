// ========================================
// FUNÇÃO GLOBAL PARA O MENU MOBILE
// ========================================
// Função global para o onclick no HTML
window.toggleMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navMenu && menuBtn) {
        navMenu.classList.toggle('active');
        // Alternar ícone
        menuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        
        // Acessibilidade
        const isOpen = navMenu.classList.contains('active');
        menuBtn.setAttribute('aria-expanded', isOpen);
        
        // Prevenir scroll do body quando menu estiver aberto
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
};

// ========================================
// INICIALIZAÇÃO QUANDO O DOM CARREGAR
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CONFIGURAÇÕES DO HEADER
    // ========================================
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Garantir que o header seja visível
    if (header) {
        header.style.display = 'block';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '1000';
    }
    
    if (nav) {
        nav.style.display = 'flex';
    }
    
    // ========================================
    // MENU MOBILE - SOLUÇÃO SIMPLIFICADA
    // ========================================

    // Função global SIMPLES para o onclick
    function toggleMenu() {
        console.log('toggleMenu chamada'); // Debug
        
        const navMenu = document.getElementById('navMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        console.log('Menu encontrado:', navMenu); // Debug
        console.log('Botão encontrado:', menuBtn); // Debug
        
        if (navMenu) {
            navMenu.classList.toggle('active');
            console.log('Classes do menu:', navMenu.className); // Debug
            
            if (menuBtn) {
                menuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            }
        }
    }

    // Tornar a função global
    window.toggleMenu = toggleMenu;

    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM carregado'); // Debug
        
        // ========================================
        // CONFIGURAÇÕES BÁSICAS DO HEADER
        // ========================================
        const header = document.querySelector('header');
        if (header) {
            header.style.display = 'block';
            header.style.visibility = 'visible';
            header.style.opacity = '1';
        }
        
        // ========================================
        // BACKUP DO MENU MOBILE
        // ========================================
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.getElementById('navMenu');
        
        console.log('Elementos encontrados:', { mobileMenuBtn, navMenu }); // Debug
        
        if (mobileMenuBtn && navMenu) {
            // Event listener de backup
            mobileMenuBtn.addEventListener('click', function(e) {
                console.log('Click no botão detectado'); // Debug
                e.preventDefault();
                
                navMenu.classList.toggle('active');
                this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
                
                console.log('Menu ativo:', navMenu.classList.contains('active')); // Debug
            });
            
            // Fechar menu ao clicar nos links
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Link clicado, fechando menu'); // Debug
                    navMenu.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });
        }
        
        // ========================================
        // TESTE DO MENU (REMOVER DEPOIS)
        // ========================================
        // Adicionar um teste após 2 segundos
        setTimeout(() => {
            console.log('=== TESTE DO MENU ===');
            console.log('Menu element:', document.getElementById('navMenu'));
            console.log('Button element:', document.querySelector('.mobile-menu-btn'));
            console.log('toggleMenu function:', typeof window.toggleMenu);
            
            // Teste da função
            if (window.toggleMenu) {
                console.log('Função toggleMenu disponível');
            } else {
                console.error('Função toggleMenu NÃO disponível');
            }
        }, 2000);
        
        // ========================================
        // FORMULÁRIO DE CONTATO (SIMPLIFICADO)
        // ========================================
        const contactForm = document.querySelector('.php-email-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitButton = this.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';
                    
                    // Simular envio (substitua pela sua lógica)
                    setTimeout(() => {
                        alert('Formulário enviado com sucesso!');
                        submitButton.disabled = false;
                        submitButton.textContent = 'Enviar';
                        this.reset();
                    }, 2000);
                }
            });
        }
    });

// ========================================
// FUNÇÃO DE DEBUG PARA TESTAR NO CONSOLE
// ========================================
window.testMenu = function() {
    console.log('=== TESTE MANUAL ===');
    const menu = document.getElementById('navMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    
    if (menu && btn) {
        menu.classList.toggle('active');
        btn.textContent = menu.classList.contains('active') ? '✕' : '☰';
        console.log('Menu toggled. Ativo:', menu.classList.contains('active'));
    } else {
        console.error('Elementos não encontrados:', { menu, btn });
    }
};

    
    // ========================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é uma âncora válida
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calcular posição considerando a altura do header
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.textContent = '☰';
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ========================================
    // FUNCIONALIDADES DO FORMULÁRIO DE CONTATO
    // ========================================
    const contactForm = document.querySelector('.php-email-form');
    
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const loadingMessage = document.querySelector('.loading');
        const errorMessage = document.querySelector('.error-message');
        const sentMessage = document.querySelector('.sent-message');
        const originalButtonText = submitButton ? submitButton.textContent : 'Enviar';
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar captcha antes de enviar
            const captchaInput = document.getElementById('captcha');
            const captchaAnswer = document.getElementById('captcha-answer');
            
            if (captchaInput && captchaAnswer) {
                if (parseInt(captchaInput.value) !== parseInt(captchaAnswer.value)) {
                    showFormMessage('Resposta do captcha incorreta!', 'error');
                    return;
                }
            }
            
            // Mostrar loading
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                submitButton.style.opacity = '0.7';
            }
            
            showFormMessage('Enviando mensagem...', 'loading');
            
            // Preparar dados do formulário
            const formData = new FormData(contactForm);
            
            // Enviar via fetch
            fetch(contactForm.action || 'forms/contact.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    showFormMessage(data.message || 'Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                    
                    // Gerar novo captcha
                    if (window.generateCaptcha) {
                        window.generateCaptcha();
                    }
                } else {
                    showFormMessage(data.message || 'Erro ao enviar mensagem.', 'error');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                showFormMessage('Erro de conexão. Tente novamente.', 'error');
            })
            .finally(() => {
                // Restaurar botão
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                }
            });
        });
        
        // Função para mostrar mensagens do formulário
        function showFormMessage(message, type) {
            // Esconder todas as mensagens primeiro
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            if (sentMessage) sentMessage.style.display = 'none';
            
            // Mostrar a mensagem apropriada
            let targetElement;
            switch(type) {
                case 'loading':
                    targetElement = loadingMessage;
                    break;
                case 'error':
                    targetElement = errorMessage;
                    break;
                case 'success':
                    targetElement = sentMessage;
                    break;
            }
            
            if (targetElement) {
                targetElement.textContent = message;
                targetElement.style.display = 'block';
                
                // Auto-hide após 5 segundos (exceto loading)
                if (type !== 'loading') {
                    setTimeout(() => {
                        targetElement.style.display = 'none';
                    }, 5000);
                }
            }
        }
    }
    
    // ========================================
    // INICIALIZAÇÃO DE OUTROS COMPONENTES
    // ========================================
    
    // Inicializar captcha se a função existir
    if (window.generateCaptcha) {
        window.generateCaptcha();
    }
    
    // Adicionar classe para elementos com animação quando entrarem na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação
    document.querySelectorAll('.faq-item, .professor-card, .contact-form, .contact-info').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // MELHORIAS DE PERFORMANCE E UX
    // ========================================
    
    // Lazy loading para imagens (se não suportado nativamente)
    if ('loading' in HTMLImageElement.prototype === false) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Adicionar indicador de loading para links externos
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            // Adicionar feedback visual se necessário
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    console.log('🚀 Site carregado e funcionalidades inicializadas!');
});

// ========================================
// FUNÇÕES UTILITÁRIAS GLOBAIS
// ========================================

// Função para debug (remover em produção)
window.debugMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    console.log('Menu element:', navMenu);
    console.log('Button element:', mobileBtn);
    console.log('Menu classes:', navMenu ? navMenu.className : 'not found');
    console.log('Button text:', mobileBtn ? mobileBtn.textContent : 'not found');
};

// Função para verificar se é dispositivo móvel
window.isMobile = function() {
    return window.innerWidth <= 768;
};

// Função para scroll to top
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
