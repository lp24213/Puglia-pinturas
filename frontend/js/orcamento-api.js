// Integração com API Real de Cotação - Netlify Functions
class OrcamentoAPI {
    constructor() {
        this.apiUrl = 'https://pugliapinturas.netlify.app/.netlify/functions/orcamento';
        this.init();
    }

    init() {
        const form = document.getElementById('orcamentoForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.enviarOrcamento(form);
            });
        }
    }

    async enviarOrcamento(form) {
        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            telefone: formData.get('telefone'),
            endereco: formData.get('endereco'),
            metrosQuadrados: parseFloat(formData.get('metrosQuadrados')) || 0,
            tipoServico: formData.get('tipoServico')
        };

        // Validação
        if (!this.validarDados(data)) {
            this.mostrarErro('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Mostrar loading
        this.mostrarLoading();

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.mostrarResultado(result);
                form.reset();
            } else {
                throw new Error(result.error || 'Erro ao calcular orçamento');
            }
        } catch (error) {
            console.error('Erro:', error);
            this.mostrarErro('Erro ao conectar com o servidor. Tente novamente.');
        } finally {
            this.esconderLoading();
        }
    }

    validarDados(data) {
        return data.nome && 
               data.telefone && 
               data.endereco && 
               data.metrosQuadrados > 0 && 
               data.tipoServico;
    }

    mostrarLoading() {
        // Criar overlay de loading
        const overlay = document.createElement('div');
        overlay.id = 'orcamento-loading';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 4px solid #001B3A; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="color: #001B3A; font-weight: 600;">Calculando orçamento...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    esconderLoading() {
        const loading = document.getElementById('orcamento-loading');
        if (loading) loading.remove();
    }

    mostrarResultado(result) {
        // Criar modal premium
        const modal = document.createElement('div');
        modal.id = 'orcamento-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 24px; padding: 50px; max-width: 600px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: slideUp 0.3s ease-out;">
                <button onclick="this.closest('#orcamento-modal').remove()" style="float: right; background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                <h2 style="color: #001B3A; font-size: 2rem; margin-bottom: 30px; font-weight: 800;">Orçamento Calculado</h2>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 16px; margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #666;">Custo por m²:</span>
                        <strong style="color: #001B3A;">R$ ${result.custoPorMetro?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #666;">Material:</span>
                        <strong style="color: #001B3A;">R$ ${result.custoMaterial?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #666;">Mão de Obra:</span>
                        <strong style="color: #001B3A;">R$ ${result.custoMaoDeObra?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div style="border-top: 2px solid #A79149; padding-top: 15px; margin-top: 15px; display: flex; justify-content: space-between;">
                        <span style="color: #001B3A; font-size: 1.2rem; font-weight: 700;">Total:</span>
                        <strong style="color: #A79149; font-size: 1.5rem; font-weight: 800;">R$ ${result.total?.toFixed(2) || '0.00'}</strong>
                    </div>
                </div>
                
                ${result.prazo ? `
                    <p style="color: #666; margin-bottom: 25px;">
                        <strong>Prazo estimado:</strong> ${result.prazo}
                    </p>
                ` : ''}
                
                <div style="display: flex; gap: 15px;">
                    <button onclick="this.closest('#orcamento-modal').remove()" style="flex: 1; padding: 15px; background: #f0f0f0; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; color: #001B3A;">Fechar</button>
                    <a href="#" data-page="contato" onclick="this.closest('#orcamento-modal').remove()" style="flex: 1; padding: 15px; background: #001B3A; color: white; text-align: center; border-radius: 12px; font-weight: 600; text-decoration: none; display: flex; align-items: center; justify-content: center;">Solicitar Orçamento Detalhado</a>
                </div>
            </div>
        `;
        
        // Adicionar estilos de animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    mostrarErro(mensagem) {
        alert(mensagem); // Pode ser substituído por um toast premium
    }
}

// Inicializar quando a página de orçamento carregar
document.addEventListener('pageLoaded', (e) => {
    if (e.detail === 'orcamento') {
        new OrcamentoAPI();
    }
});

