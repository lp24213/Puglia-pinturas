// Simulador de Orçamento Instantâneo
class OrcamentoSimulator {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('orcamentoForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calcularOrcamento();
            });
        }
    }

    calcularOrcamento() {
        const tipoServico = document.getElementById('tipoServico').value;
        const area = parseFloat(document.getElementById('area').value) || 0;
        const comodos = parseInt(document.getElementById('comodos').value) || 0;
        const condicao = document.getElementById('condicao').value;
        const altura = document.getElementById('altura').value;

        if (!tipoServico || !area || !comodos || !condicao || !altura) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Preços base por m² (aproximados)
        const precosBase = {
            residencial: 35,
            comercial: 45,
            industrial: 55,
            fachada: 40,
            piso: 60
        };

        let precoM2 = precosBase[tipoServico] || 40;

        // Ajustes por condição
        const ajustesCondicao = {
            nova: 1.0,
            boa: 1.1,
            regular: 1.3,
            ruim: 1.5
        };

        // Ajustes por altura
        const ajustesAltura = {
            padrao: 1.0,
            alto: 1.15,
            'muito-alto': 1.3
        };

        precoM2 *= ajustesCondicao[condicao] || 1.0;
        precoM2 *= ajustesAltura[altura] || 1.0;

        // Cálculo base
        let valorBase = area * precoM2;

        // Ajuste por número de cômodos (mais cômodos = mais trabalho de preparação)
        if (comodos > 5) {
            valorBase *= 1.1;
        }

        // Processo Puglia Premium (5+ demãos) - adiciona 20% ao valor
        valorBase *= 1.2;

        // Arredondar para múltiplo de 100
        const valorFinal = Math.round(valorBase / 100) * 100;

        this.mostrarResultado(valorFinal);
    }

    mostrarResultado(valor) {
        const resultadoDiv = document.getElementById('resultadoOrcamento');
        const valorSpan = resultadoDiv.querySelector('.valor');
        
        valorSpan.textContent = `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        resultadoDiv.style.display = 'block';
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

document.addEventListener('pageLoaded', (e) => {
    if (e.detail === 'orcamento') {
        new OrcamentoSimulator();
    }
});
