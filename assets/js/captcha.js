/**
 * Sistema de Captcha com Operações Matemáticas
 */
class MathCaptcha {
    constructor() {
        this.num1 = 0;
        this.num2 = 0;
        this.answer = 0;
        this.operations = ['+', '-', '*'];
        this.currentOperation = '+';
        this.init();
    }

    // Gera números aleatórios baseados na operação
    generateNumbers() {
        switch(this.currentOperation) {
            case '+':
                this.num1 = Math.floor(Math.random() * 50) + 1; // 1-50
                this.num2 = Math.floor(Math.random() * 50) + 1; // 1-50
                this.answer = this.num1 + this.num2;
                break;
            case '-':
                this.num1 = Math.floor(Math.random() * 50) + 20; // 20-70
                this.num2 = Math.floor(Math.random() * 20) + 1;  // 1-20
                // Garantir que o resultado seja positivo
                if (this.num2 > this.num1) {
                    [this.num1, this.num2] = [this.num2, this.num1];
                }
                this.answer = this.num1 - this.num2;
                break;
            case '*':
                this.num1 = Math.floor(Math.random() * 10) + 2; // 2-11
                this.num2 = Math.floor(Math.random() * 10) + 2; // 2-11
                this.answer = this.num1 * this.num2;
                break;
        }
    }

    // Seleciona operação aleatória
    selectRandomOperation() {
        const randomIndex = Math.floor(Math.random() * this.operations.length);
        this.currentOperation = this.operations[randomIndex];
    }

    // Gera nova pergunta do captcha
    generateQuestion() {
        this.selectRandomOperation();
        this.generateNumbers();
        
        const questionElement = document.getElementById('captcha-question');
        const answerElement = document.getElementById('captcha-answer');
        
        if (questionElement && answerElement) {
            questionElement.textContent = `${this.num1} ${this.currentOperation} ${this.num2}`;
            answerElement.value = this.answer;
        }
    }

    // Valida a resposta do usuário
    validateAnswer(userAnswer) {
        return parseInt(userAnswer) === this.answer;
    }

    // Inicializa o captcha
    init() {
        this.generateQuestion();
        
        // Regenerar captcha ao clicar na pergunta
        const questionElement = document.getElementById('captcha-question');
        if (questionElement) {
            questionElement.style.cursor = 'pointer';
            questionElement.title = 'Clique para gerar nova operação';
            questionElement.addEventListener('click', () => {
                this.generateQuestion();
                document.getElementById('captcha').value = '';
            });
        }
    }
}

// Instanciar o captcha quando a página carregar
let mathCaptcha;

document.addEventListener('DOMContentLoaded', function() {
    mathCaptcha = new MathCaptcha();
});

// Função para validar captcha (usada no form-validation.js)
function validateCaptcha() {
    const userAnswer = document.getElementById('captcha').value;
    if (!userAnswer) {
        return false;
    }
    return mathCaptcha.validateAnswer(userAnswer);
}
