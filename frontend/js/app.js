// Puglia Pinturas - Aplicação Principal Premium
class PugliaApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = {};
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupDynamicButtons();
        this.setupHeaderScroll();
        this.loadPage('home');
    }

    setupHeaderScroll() {
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    setupDynamicButtons() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('[data-page]');
            if (button && button.hasAttribute('data-page')) {
                e.preventDefault();
                const page = button.getAttribute('data-page');
                this.loadPage(page);
            }
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.loadPage(page);
            });
        });
    }

    loadPage(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) activeLink.classList.add('active');

        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        setTimeout(() => {
            this.loadPageContent(pageName);
        }, 100);
    }

    loadPageContent(pageName) {
        const mainContent = document.getElementById('main-content');
        const existingPages = mainContent.querySelectorAll('.page:not(#home-page)');
        existingPages.forEach(page => page.remove());

        let pageElement = document.getElementById(`${pageName}-page`);
        if (!pageElement) {
            pageElement = document.createElement('section');
            pageElement.id = `${pageName}-page`;
            pageElement.className = 'page';

            switch(pageName) {
                case 'home':
                    this.loadHomePage(pageElement);
                    break;
                case 'sobre':
                    this.loadSobrePage(pageElement);
                    break;
                case 'servicos':
                    this.loadServicosPage(pageElement);
                    break;
                case 'trabalho':
                    this.loadTrabalhoPage(pageElement);
                    break;
                case 'lojas':
                    this.loadLojasPage(pageElement);
                    break;
                case 'blog':
                    this.loadBlogPage(pageElement);
                    break;
                case 'clientes':
                    this.loadClientesPage(pageElement);
                    break;
                case 'orcamento':
                    this.loadOrcamentoPage(pageElement);
                    break;
                case 'contato':
                    this.loadContatoPage(pageElement);
                    break;
                // Páginas de serviços individuais
                case 'pintura-residencial':
                case 'pintura-comercial':
                case 'pintura-industrial':
                case 'pintura-fachadas':
                case 'pintura-pisos-epoxi':
                case 'pintura-poliuretano':
                case 'pintura-anticorrosiva':
                case 'pintura-galpoes':
                case 'pintura-portoes':
                case 'textura-grafiato':
                case 'impermeabilizacao':
                case 'pintura-altura':
                    this.loadServicoPage(pageElement, pageName);
                    break;
                default:
                    this.loadHomePage(pageElement);
            }

            mainContent.appendChild(pageElement);
        }

        pageElement.classList.add('active');
        this.loadPageCSS(pageName);
        this.loadPageScript(pageName);

        setTimeout(() => {
            const event = new CustomEvent('pageLoaded', { detail: pageName });
            document.dispatchEvent(event);
        }, 100);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadPageCSS(pageName) {
        if (pageName === 'home') return;
        
        // Páginas de serviços individuais usam o mesmo CSS
        const servicosIndividuais = [
            'pintura-residencial', 'pintura-comercial', 'pintura-industrial',
            'pintura-fachadas', 'pintura-pisos-epoxi', 'pintura-poliuretano',
            'pintura-anticorrosiva', 'pintura-galpoes', 'pintura-portoes',
            'textura-grafiato', 'impermeabilizacao', 'pintura-altura'
        ];
        
        const cssFile = servicosIndividuais.includes(pageName) 
            ? 'servico-individual' 
            : pageName;
        
        const existingCSS = document.querySelector(`link[data-page-css="${pageName}"]`);
        if (existingCSS) existingCSS.remove();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/${cssFile}.css`;
        link.setAttribute('data-page-css', pageName);
        document.head.appendChild(link);
    }

    loadPageScript(pageName) {
        if (pageName === 'home') return;
        const existingScript = document.querySelector(`script[data-page="${pageName}"]`);
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = `js/${pageName}.js`;
        script.setAttribute('data-page', pageName);
        document.body.appendChild(script);
    }

    // Processo Puglia Premium - Componente reutilizável
    getProcessoPuglia() {
        return `
            <section class="processo-puglia">
                <div class="container">
                    <h2>Processo Puglia Premium</h2>
                    <p class="section-subtitle">Nosso diferencial: mais de 5 demãos obrigatórias de tinta premium para garantir acabamento impecável e máxima durabilidade</p>
                    
                    <div class="processo-destaque">
                        <strong>5+ DEMÃOS OBRIGATÓRIAS</strong>
                        <p style="margin-top: 15px; color: var(--text-light);">Aplicamos sistematicamente mais de 5 mãos de tinta premium das melhores marcas, garantindo cobertura total, uniformidade perfeita e acabamento profissional de excelência.</p>
                    </div>

                    <div class="processo-steps">
                        <div class="processo-step">
                            <h3>1. Preparação Completa</h3>
                            <p>Lavagem e limpeza profunda da superfície, remoção de tintas antigas quando necessário, correção de imperfeições e preparação técnica completa para receber a pintura premium.</p>
                        </div>
                        <div class="processo-step">
                            <h3>2. Lixamento Profissional</h3>
                            <p>Lixamento técnico com lixas de diferentes granulometrias conforme a superfície, garantindo base lisa, uniforme e com aderência perfeita para as tintas premium.</p>
                        </div>
                        <div class="processo-step">
                            <h3>3. Massa Corrida Premium</h3>
                            <p>Aplicação de massa corrida das melhores marcas (Eucatex, Suvinil) para correção de imperfeições, nivelamento perfeito e base impecável para a pintura.</p>
                        </div>
                        <div class="processo-step">
                            <h3>4. Selador Especial</h3>
                            <p>Aplicação de selador premium que garante uniformidade, economia de tinta e maior durabilidade do acabamento final. Base essencial para resultado perfeito.</p>
                        </div>
                        <div class="processo-step">
                            <h3>5. Primer de Alta Qualidade</h3>
                            <p>Primer premium das melhores marcas aplicado antes de cada demão de tinta, garantindo aderência superior, cobertura uniforme e acabamento profissional.</p>
                        </div>
                        <div class="processo-step">
                            <h3>6. 5+ Demãos de Tinta Premium</h3>
                            <p><strong>DIFERENCIAL PUGLIA:</strong> Aplicamos sistematicamente mais de 5 mãos de tinta premium (Suvinil, Coral, Eucatex, Renner, Sherwin-Williams) para garantir cobertura total, uniformidade perfeita e acabamento impecável.</p>
                        </div>
                        <div class="processo-step">
                            <h3>7. Acabamento Impecável</h3>
                            <p>Acabamento final profissional com atenção aos detalhes, verificação de uniformidade, correção de imperfeições e garantia de resultado perfeito em cada projeto.</p>
                        </div>
                        <div class="processo-step">
                            <h3>8. Limpeza Final</h3>
                            <p>Limpeza completa do ambiente, remoção de proteções, organização do espaço e entrega do projeto com ambiente limpo e pronto para uso.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadHomePage(container) {
        container.innerHTML = `
            <div class="hero">
                <div class="hero-content">
                    <h1>Pintura Premium em Sinop<br><span class="destaque">Qualidade que dura anos</span></h1>
                    <p>Mais de 10 anos transformando ambientes em Sinop-MT. Processo completo com 5+ demãos de tinta premium das melhores marcas. Qualidade, profissionalismo e acabamento impecável.</p>
                    <div class="hero-buttons">
                        <a href="#" class="btn primary" data-page="contato">Solicitar Orçamento Grátis</a>
                        <a href="#" class="btn secondary" data-page="orcamento">Simulador de Orçamento</a>
                    </div>
                </div>
            </div>

            <section class="why-puglia">
                <div class="container">
                    <h2 class="section-title">Por que escolher a Puglia?</h2>
                    <p class="section-subtitle">Diferenciais que fazem da Puglia Pinturas a melhor escolha em Sinop-MT</p>
                    <div class="why-grid">
                        <div class="why-card">
                            <div class="why-icon">⭐</div>
                            <h3>5+ Demãos Obrigatórias</h3>
                            <p>Aplicamos sistematicamente mais de 5 demãos de tinta premium, garantindo cobertura total e durabilidade superior.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🎨</div>
                            <h3>Marcas Premium</h3>
                            <p>Trabalhamos exclusivamente com Suvinil, Coral, Eucatex, Renner e Sherwin-Williams - as melhores do mercado.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🔧</div>
                            <h3>Processo Completo</h3>
                            <p>Desde a preparação até o acabamento final, cada etapa é executada com precisão técnica e materiais premium.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">👷</div>
                            <h3>Equipe Especializada</h3>
                            <p>Profissionais treinados e experientes, prontos para entregar resultados de excelência em cada projeto.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">🛡️</div>
                            <h3>Garantia Puglia</h3>
                            <p>Todos os nossos projetos são garantidos. Qualidade, durabilidade e satisfação total do cliente.</p>
                        </div>
                        <div class="why-card">
                            <div class="why-icon">⏱️</div>
                            <h3>Prazos Cumpridos</h3>
                            <p>Compromisso total com prazos. Planejamento rigoroso e execução precisa em cada projeto.</p>
                        </div>
                    </div>
                </div>
            </section>

            ${this.getProcessoPuglia()}

            <section class="marcas-section">
                <div class="container">
                    <h2 class="section-title">Marcas Premium que Utilizamos</h2>
                    <p class="section-subtitle">Trabalhamos exclusivamente com as melhores marcas do mercado brasileiro, garantindo qualidade superior e durabilidade excepcional</p>
                    <div class="marcas-grid">
                        <div class="marca-item">
                            <h3>Suvinil Premium</h3>
                            <p>Tintas acrílicas e esmaltes de alta qualidade</p>
                        </div>
                        <div class="marca-item">
                            <h3>Coral Premium</h3>
                            <p>Tintas premium para todos os tipos de superfície</p>
                        </div>
                        <div class="marca-item">
                            <h3>Eucatex Premium</h3>
                            <p>Massa corrida e tintas de excelência</p>
                        </div>
                        <div class="marca-item">
                            <h3>Renner</h3>
                            <p>Tintas profissionais de alta performance</p>
                        </div>
                        <div class="marca-item">
                            <h3>Sherwin-Williams</h3>
                            <p>Tintas premium internacionais</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="comparacao-section">
                <div class="container">
                    <h2 class="section-title">Por que a Puglia é Superior?</h2>
                    <p class="section-subtitle">Comparação com outras empresas de pintura</p>
                    <div class="comparacao-grid">
                        <div class="comparacao-card puglia">
                            <h3>Puglia Pinturas</h3>
                            <ul>
                                <li>5+ demãos obrigatórias de tinta premium</li>
                                <li>Materiais das melhores marcas (Suvinil, Coral, Eucatex, Renner, Sherwin-Williams)</li>
                                <li>Processo completo: preparação, lixamento, massa corrida, selador, primer, múltiplas demãos</li>
                                <li>Equipe técnica especializada e treinada</li>
                                <li>Garantia Puglia em todos os projetos</li>
                                <li>Acabamento impecável e profissional</li>
                                <li>Limpeza final completa</li>
                                <li>Mais de 10 anos de experiência</li>
                            </ul>
                        </div>
                        <div class="comparacao-card concorrentes">
                            <h3>Outras Empresas</h3>
                            <ul>
                                <li>2-3 demãos (insuficiente)</li>
                                <li>Tintas de qualidade inferior</li>
                                <li>Processo incompleto ou simplificado</li>
                                <li>Equipe sem treinamento adequado</li>
                                <li>Sem garantia ou garantia limitada</li>
                                <li>Acabamento irregular</li>
                                <li>Limpeza parcial ou inexistente</li>
                                <li>Experiência limitada</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="depoimentos-home">
                <div class="container">
                    <h2 class="section-title">O que Nossos Clientes Dizem</h2>
                    <p class="section-subtitle">Depoimentos reais de clientes satisfeitos com nossos serviços</p>
                    <div class="depoimentos-grid">
                        <div class="depoimento-card">
                            <div class="depoimento-texto">
                                Excelente trabalho! A Puglia Pinturas transformou completamente nossa casa. Profissionais competentes, processo completo com mais de 5 demãos de tinta premium e acabamento impecável. Superou todas as expectativas!
                            </div>
                            <div class="depoimento-autor">
                                <strong>Maria Silva</strong>
                                <span>Jardim Imperial, Sinop-MT</span>
                            </div>
                            <div class="depoimento-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div class="depoimento-card">
                            <div class="depoimento-texto">
                                Contratamos para pintar nosso escritório corporativo e o resultado foi excepcional. Processo completo, tintas premium, mais de 5 demãos e acabamento profissional. Equipe pontual e materiais de primeira linha.
                            </div>
                            <div class="depoimento-autor">
                                <strong>João Santos</strong>
                                <span>Centro, Sinop-MT</span>
                            </div>
                            <div class="depoimento-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div class="depoimento-card">
                            <div class="depoimento-texto">
                                Serviço excepcional no galpão da nossa empresa. Pintura epóxi premium com mais de 5 demãos, proteção total contra corrosão. Processo técnico completo e resultado superior. Recomendo fortemente a Puglia Pinturas!
                            </div>
                            <div class="depoimento-autor">
                                <strong>Carlos Oliveira</strong>
                                <span>Distrito Industrial, Sinop-MT</span>
                            </div>
                            <div class="depoimento-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="services-preview">
                <div class="container">
                    <h2 class="section-title">Nossos Serviços Premium</h2>
                    <p class="section-subtitle">Processo completo com 5+ demãos de tinta premium em todos os serviços</p>
                    <div class="services-grid">
                        <div class="service-card">
                            <h3>Pintura Residencial</h3>
                            <p><strong>Processo Completo:</strong> Preparação, lixamento, massa corrida premium, selador, primer e mais de 5 demãos de tinta acrílica premium Suvinil, Coral ou Eucatex.</p>
                            <p><strong>Materiais Premium:</strong> Utilizamos exclusivamente tintas das melhores marcas para garantir acabamento impecável e durabilidade superior.</p>
                            <a href="#" class="btn primary" data-page="pintura-residencial">Saiba Mais</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Comercial</h3>
                            <p><strong>Sistema Completo:</strong> Pintura comercial premium com tintas epóxi e acrílicas de alta qualidade. Processo completo com 5+ demãos para máxima durabilidade.</p>
                            <p><strong>Acabamento Profissional:</strong> Resultado impecável que reflete profissionalismo e qualidade em escritórios, lojas e estabelecimentos comerciais.</p>
                            <a href="#" class="btn primary" data-page="pintura-comercial">Saiba Mais</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Industrial</h3>
                            <p><strong>Proteção Total:</strong> Sistema completo com mais de 5 demãos de tinta epóxi e poliuretano premium para máxima proteção contra corrosão e intempéries.</p>
                            <p><strong>Tintas de Alto Desempenho:</strong> Utilizamos tintas especiais das melhores marcas para ambientes industriais com exigências técnicas elevadas.</p>
                            <a href="#" class="btn primary" data-page="pintura-industrial">Saiba Mais</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadSobrePage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Sobre a Puglia Pinturas</h1>
                    <p class="section-subtitle">Mais de 10 anos transformando ambientes com excelência e profissionalismo</p>
                </div>
            </div>

            <section class="about-content">
                <div class="container">
                    <div class="about-grid">
                        <div class="about-card">
                            <h2>Nossa História</h2>
                            <p>A Puglia Pinturas nasceu da paixão por transformar ambientes e da dedicação em oferecer serviços de pintura de excelência. Fundada por Evando Reis Chaves Puglia e Cristina Aparecida Puglia, nossa empresa iniciou suas atividades com o compromisso de levar qualidade e profissionalismo para Sinop e região.</p>
                            <p><strong>Especialização em Tintas Premium:</strong> Trabalhamos exclusivamente com as melhores marcas do mercado brasileiro - Suvinil Premium, Coral Premium, Eucatex Premium, Renner e Sherwin-Williams. Conhecemos profundamente as características técnicas de cada tipo de tinta e aplicamos a solução ideal para cada projeto, sempre utilizando materiais de primeira linha.</p>
                            <p><strong>Processo Completo de Pintura:</strong> Realizamos todo o processo de pintura com mais de 5 mãos de tinta, garantindo cobertura total, uniformidade perfeita e acabamento impecável. Cada projeto recebe tratamento especial desde a preparação até o acabamento final.</p>
                            <p>Com mais de 10 anos de experiência no mercado, construímos nossa reputação através de projetos bem-sucedidos e da satisfação de nossos clientes.</p>
                        </div>

                        <div class="about-card">
                            <h2>Nossos Valores</h2>
                            <p><strong>Qualidade Superior:</strong> Utilizamos apenas materiais de primeira linha e técnicas comprovadas. Trabalhamos exclusivamente com tintas premium das melhores marcas que garantem durabilidade, cobertura superior e acabamento impecável. Aplicamos mais de 5 mãos de tinta em cada projeto para garantir máxima qualidade.</p>
                            <p><strong>Compromisso Total:</strong> Cada projeto é tratado com atenção aos detalhes e respeito aos prazos. Realizamos planejamento rigoroso e execução precisa de todo o processo de pintura, desde a preparação da superfície até o acabamento final.</p>
                            <p><strong>Profissionalismo Técnico:</strong> Equipe treinada e qualificada para oferecer o melhor serviço. Conhecimento técnico profundo sobre preparação de superfícies, aplicação de múltiplas demãos, mistura de cores e acabamentos especiais de alta qualidade.</p>
                        </div>

                        <div class="about-card">
                            <h2>Nossa Equipe</h2>
                            <p>Profissionais qualificados e experientes, prontos para transformar seu espaço com excelência e segurança. Nossa equipe é composta por especialistas em diferentes tipos de pintura, acabamentos e técnicas de aplicação.</p>
                            <p><strong>Conhecimento Técnico Avançado:</strong> Nossos pintores são treinados em técnicas modernas de aplicação, preparação de superfícies, mistura de cores, aplicação de múltiplas demãos (5+ mãos) e acabamentos especiais. Investimos constantemente em treinamento técnico e equipamentos de ponta para garantir resultados superiores em cada projeto.</p>
                            <p><strong>Processo Completo:</strong> Nossa equipe domina todo o processo de pintura: lixamento profissional, aplicação de massa corrida, selador, primer, múltiplas demãos de tinta premium e acabamento final impecável.</p>
                        </div>
                    </div>

                    <div class="company-info">
                        <h2>Informações da Empresa</h2>
                        <div class="info-grid">
                            <div class="info-item">
                                <strong>CNPJ:</strong> 18.225.966/0001-35
                            </div>
                            <div class="info-item">
                                <strong>Proprietários:</strong> Evando Reis Chaves Puglia e Cristina Aparecida Puglia
                            </div>
                            <div class="info-item">
                                <strong>Localização:</strong> Rua dos Cajueiros, 2320 - Jardim Imperial, Sinop-MT
                            </div>
                            <div class="info-item">
                                <strong>Atuação:</strong> Sinop e região
                            </div>
                        </div>
                    </div>

                    <div class="garantia-puglia">
                        <h2>Garantia Puglia</h2>
                        <p>Todos os nossos projetos são garantidos. Oferecemos garantia completa em todos os serviços de pintura, assegurando qualidade, durabilidade e satisfação total do cliente.</p>
                    </div>
                </div>
            </section>
        `;
    }

    loadServicosPage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Nossos Serviços Premium</h1>
                    <p class="section-subtitle">Processo completo com 5+ demãos de tinta premium em todos os serviços</p>
                </div>
            </div>

            <section class="services-list">
                <div class="container">
                    <div class="services-grid">
                        <div class="service-card">
                            <h3>Pintura Residencial</h3>
                            <p>Processo completo com mais de 5 demãos de tinta acrílica premium. Preparação, lixamento, massa corrida, selador, primer e acabamento impecável.</p>
                            <a href="#" class="btn primary" data-page="pintura-residencial">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Comercial</h3>
                            <p>Sistema completo de pintura comercial com tintas epóxi e acrílicas premium. 5+ demãos para máxima durabilidade e acabamento profissional.</p>
                            <a href="#" class="btn primary" data-page="pintura-comercial">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Industrial</h3>
                            <p>Proteção total com tintas epóxi e poliuretano premium. Mais de 5 demãos para máxima proteção contra corrosão e intempéries.</p>
                            <a href="#" class="btn primary" data-page="pintura-industrial">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura de Fachadas</h3>
                            <p>Pintura de fachadas com tintas premium resistentes às intempéries. Processo completo com impermeabilização e mais de 5 demãos.</p>
                            <a href="#" class="btn primary" data-page="pintura-fachadas">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura de Pisos Epóxi</h3>
                            <p>Pisos epóxi premium com sistema completo de aplicação. Mais de 5 demãos para máxima resistência química e mecânica.</p>
                            <a href="#" class="btn primary" data-page="pintura-pisos-epoxi">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Poliuretano</h3>
                            <p>Proteção UV superior e resistência à abrasão. Tintas poliuretano premium com mais de 5 demãos para estruturas metálicas.</p>
                            <a href="#" class="btn primary" data-page="pintura-poliuretano">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura Anticorrosiva</h3>
                            <p>Proteção metálica de longa duração. Primer anticorrosivo premium e mais de 5 demãos de tinta especial para máxima proteção.</p>
                            <a href="#" class="btn primary" data-page="pintura-anticorrosiva">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura de Galpões</h3>
                            <p>Pintura completa de galpões com tintas premium. Sistema completo com mais de 5 demãos para proteção total e durabilidade superior.</p>
                            <a href="#" class="btn primary" data-page="pintura-galpoes">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura de Portões e Esquadrias</h3>
                            <p>Esmaltes sintéticos premium para portões e esquadrias. Processo completo com mais de 5 demãos para brilho intenso e durabilidade.</p>
                            <a href="#" class="btn primary" data-page="pintura-portoes">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Textura e Grafiato</h3>
                            <p>Acabamentos especiais com textura e grafiato premium. Personalização completa com materiais das melhores marcas.</p>
                            <a href="#" class="btn primary" data-page="textura-grafiato">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Impermeabilização</h3>
                            <p>Sistema completo de impermeabilização premium. Proteção total contra umidade, infiltrações e intempéries em fachadas e coberturas.</p>
                            <a href="#" class="btn primary" data-page="impermeabilizacao">Ver Detalhes</a>
                        </div>
                        <div class="service-card">
                            <h3>Pintura em Altura</h3>
                            <p>Serviços especializados em pintura em altura com segurança total. Equipamentos adequados e equipe treinada para trabalhos em altura.</p>
                            <a href="#" class="btn primary" data-page="pintura-altura">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            </section>

            ${this.getProcessoPuglia()}
        `;
    }

    loadServicoPage(container, pageName) {
        const servicos = {
            'pintura-residencial': {
                title: 'Pintura Residencial Premium',
                desc: 'Transforme sua residência com processo completo e mais de 5 demãos de tinta acrílica premium',
                explicacao: 'A pintura residencial premium da Puglia Pinturas utiliza processo técnico completo, garantindo acabamento impecável e durabilidade excepcional. Aplicamos sistematicamente mais de 5 demãos de tinta acrílica premium das melhores marcas (Suvinil, Coral, Eucatex), seguindo rigorosamente nosso Processo Puglia Premium. Cada ambiente recebe tratamento especial desde a preparação até o acabamento final, garantindo cores vibrantes, uniformidade perfeita e proteção total contra umidade e intempéries.',
                materiais: [
                    { nome: 'Tintas Acrílicas Premium', desc: 'Suvinil Acrílica Premium, Coral Acrílica Premium, Eucatex Premium - Cobertura superior e acabamento impecável' },
                    { nome: 'Massa Corrida Premium', desc: 'Eucatex Massa Corrida, Suvinil Massa Corrida - Correção de imperfeições e nivelamento perfeito' },
                    { nome: 'Selador Premium', desc: 'Selador de alta qualidade para uniformidade e economia de tinta' },
                    { nome: 'Primer Premium', desc: 'Primer de primeira linha para aderência superior e cobertura uniforme' }
                ],
                processo: [
                    'Preparação completa da superfície com lavagem e limpeza profunda',
                    'Lixamento profissional com lixas de diferentes granulometrias',
                    'Aplicação de massa corrida premium para correção de imperfeições',
                    'Aplicação de selador especial para uniformidade',
                    'Aplicação de primer de alta qualidade',
                    'Mais de 5 demãos de tinta acrílica premium (Suvinil, Coral ou Eucatex)',
                    'Acabamento final impecável com verificação de uniformidade',
                    'Limpeza completa do ambiente'
                ],
                beneficios: [
                    { titulo: 'Acabamento Impecável', desc: 'Resultado profissional com uniformidade perfeita e cores vibrantes' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura e resistência' },
                    { titulo: 'Fácil Limpeza', desc: 'Superfície lisa e resistente permite limpeza fácil e frequente' },
                    { titulo: 'Proteção Total', desc: 'Proteção contra umidade, intempéries e desgaste' }
                ]
            },
            'pintura-comercial': {
                title: 'Pintura Comercial Premium',
                desc: 'Sistema completo de pintura comercial com tintas epóxi e acrílicas premium para ambientes corporativos',
                explicacao: 'A pintura comercial premium da Puglia Pinturas utiliza sistema técnico completo com tintas epóxi e acrílicas de alta qualidade. Aplicamos mais de 5 demãos de tinta premium para garantir resistência química e mecânica excepcional, acabamento profissional impecável e durabilidade superior em escritórios, lojas e estabelecimentos comerciais. Processo completo desde a preparação até o acabamento final, garantindo ambiente corporativo de excelência.',
                materiais: [
                    { nome: 'Tintas Epóxi Premium', desc: 'Tintas epóxi de alta qualidade para resistência química e mecânica' },
                    { nome: 'Tintas Acrílicas Premium', desc: 'Tintas acrílicas premium para acabamento profissional' },
                    { nome: 'Primer Epóxi', desc: 'Primer epóxi de alta qualidade para aderência superior' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade e economia' }
                ],
                processo: [
                    'Preparação técnica completa da superfície',
                    'Lixamento profissional especializado',
                    'Aplicação de massa corrida premium',
                    'Aplicação de selador especial',
                    'Aplicação de primer epóxi de alta qualidade',
                    'Mais de 5 demãos de tinta epóxi e acrílica premium',
                    'Acabamento final profissional impecável',
                    'Limpeza completa do ambiente comercial'
                ],
                beneficios: [
                    { titulo: 'Resistência Química e Mecânica', desc: 'Tintas epóxi garantem resistência excepcional em ambientes de alto tráfego' },
                    { titulo: 'Acabamento Profissional', desc: 'Resultado impecável que reflete profissionalismo e qualidade' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Fácil Manutenção', desc: 'Superfície resistente permite limpeza fácil e frequente' }
                ]
            },
            'pintura-industrial': {
                title: 'Pintura Industrial de Alto Desempenho',
                desc: 'Proteção total com tintas epóxi e poliuretano premium para ambientes industriais exigentes',
                explicacao: 'A pintura industrial de alto desempenho da Puglia Pinturas utiliza sistema completo com tintas epóxi e poliuretano premium das melhores marcas. Aplicamos mais de 5 demãos para garantir máxima proteção contra corrosão, produtos químicos e intempéries em estruturas industriais, galpões e fábricas. Processo técnico especializado desde a preparação até o acabamento final, garantindo proteção total e longa vida útil.',
                materiais: [
                    { nome: 'Tintas Epóxi Premium', desc: 'Tintas epóxi de alta qualidade para proteção química e mecânica' },
                    { nome: 'Tintas Poliuretano Premium', desc: 'Tintas poliuretano para proteção UV e resistência à abrasão' },
                    { nome: 'Primer Anticorrosivo Premium', desc: 'Primer anticorrosivo de primeira linha para proteção metálica' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade e aderência' }
                ],
                processo: [
                    'Preparação especializada completa da superfície',
                    'Lixamento técnico profissional',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de selador especial',
                    'Aplicação de primer anticorrosivo premium',
                    'Mais de 5 demãos de tinta epóxi e poliuretano premium',
                    'Acabamento técnico de excelência',
                    'Limpeza e organização do ambiente industrial'
                ],
                beneficios: [
                    { titulo: 'Máxima Proteção Contra Corrosão', desc: 'Sistema completo garante proteção total contra corrosão' },
                    { titulo: 'Resistência Química Excepcional', desc: 'Tintas epóxi garantem resistência a produtos químicos' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Proteção Contra Intempéries', desc: 'Proteção total contra chuva, sol e variações climáticas' }
                ]
            },
            'pintura-fachadas': {
                title: 'Pintura de Fachadas Premium',
                desc: 'Pintura de fachadas com tintas premium resistentes às intempéries e processo completo',
                explicacao: 'A pintura de fachadas premium da Puglia Pinturas utiliza tintas especiais resistentes às intempéries e sistema completo de impermeabilização. Aplicamos mais de 5 demãos de tinta premium para garantir proteção total contra chuva, sol, umidade e variações climáticas. Processo completo desde a preparação até o acabamento final, garantindo durabilidade superior e beleza duradoura para a primeira impressão do seu imóvel.',
                materiais: [
                    { nome: 'Tintas para Fachadas Premium', desc: 'Tintas especiais resistentes às intempéries de alta qualidade' },
                    { nome: 'Impermeabilizante Premium', desc: 'Impermeabilizante de primeira linha para proteção total' },
                    { nome: 'Primer para Externas', desc: 'Primer especial para exteriores de alta qualidade' },
                    { nome: 'Massa Corrida Externa', desc: 'Massa corrida premium para correção de imperfeições externas' }
                ],
                processo: [
                    'Preparação completa da fachada com limpeza profunda',
                    'Lixamento profissional da superfície',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de impermeabilizante premium',
                    'Aplicação de primer para exteriores',
                    'Mais de 5 demãos de tinta para fachadas premium',
                    'Acabamento final impecável',
                    'Limpeza e organização do local'
                ],
                beneficios: [
                    { titulo: 'Proteção Total', desc: 'Proteção contra chuva, sol, umidade e intempéries' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Beleza Duradoura', desc: 'Cores vibrantes que mantêm a beleza por anos' },
                    { titulo: 'Primeira Impressão', desc: 'Fachada renovada que impressiona e valoriza o imóvel' }
                ]
            },
            'pintura-pisos-epoxi': {
                title: 'Pintura de Pisos Epóxi Premium',
                desc: 'Pisos epóxi premium com sistema completo de aplicação para máxima resistência',
                explicacao: 'A pintura de pisos epóxi premium da Puglia Pinturas utiliza sistema técnico completo com tintas epóxi de alta qualidade. Aplicamos mais de 5 demãos para garantir máxima resistência química e mecânica, acabamento liso e profissional, e durabilidade superior em pisos industriais, comerciais e residenciais. Processo completo desde a preparação até o acabamento final, garantindo piso de excelência.',
                materiais: [
                    { nome: 'Tintas Epóxi para Pisos', desc: 'Tintas epóxi de alta qualidade para pisos industriais e comerciais' },
                    { nome: 'Primer Epóxi', desc: 'Primer epóxi de primeira linha para aderência superior' },
                    { nome: 'Selador Epóxi', desc: 'Selador epóxi especial para uniformidade' },
                    { nome: 'Massa Corrida Epóxi', desc: 'Massa corrida epóxi para correção de imperfeições' }
                ],
                processo: [
                    'Preparação completa do piso com limpeza profunda',
                    'Lixamento técnico profissional do piso',
                    'Aplicação de massa corrida epóxi quando necessário',
                    'Aplicação de selador epóxi especial',
                    'Aplicação de primer epóxi de alta qualidade',
                    'Mais de 5 demãos de tinta epóxi premium',
                    'Acabamento final liso e profissional',
                    'Limpeza completa do ambiente'
                ],
                beneficios: [
                    { titulo: 'Resistência Química e Mecânica', desc: 'Máxima resistência a produtos químicos e tráfego intenso' },
                    { titulo: 'Fácil Limpeza', desc: 'Superfície lisa permite limpeza fácil e frequente' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Acabamento Profissional', desc: 'Piso liso e uniforme de excelência' }
                ]
            },
            'pintura-poliuretano': {
                title: 'Pintura Poliuretano Premium',
                desc: 'Proteção UV superior e resistência à abrasão com tintas poliuretano premium',
                explicacao: 'A pintura poliuretano premium da Puglia Pinturas utiliza tintas poliuretano de alta qualidade para proteção UV superior e resistência à abrasão. Aplicamos mais de 5 demãos para garantir máxima proteção em estruturas metálicas expostas, garantindo longa vida útil e acabamento profissional. Processo técnico completo desde a preparação até o acabamento final, garantindo proteção total.',
                materiais: [
                    { nome: 'Tintas Poliuretano Premium', desc: 'Tintas poliuretano de alta qualidade para proteção UV' },
                    { nome: 'Primer Poliuretano', desc: 'Primer poliuretano de primeira linha para aderência' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade' },
                    { nome: 'Primer Anticorrosivo', desc: 'Primer anticorrosivo para proteção metálica' }
                ],
                processo: [
                    'Preparação especializada completa da superfície metálica',
                    'Lixamento técnico profissional',
                    'Aplicação de primer anticorrosivo premium',
                    'Aplicação de selador especial',
                    'Aplicação de primer poliuretano',
                    'Mais de 5 demãos de tinta poliuretano premium',
                    'Acabamento final profissional',
                    'Limpeza e organização do local'
                ],
                beneficios: [
                    { titulo: 'Proteção UV Superior', desc: 'Proteção total contra raios UV e intempéries' },
                    { titulo: 'Resistência à Abrasão', desc: 'Máxima resistência ao desgaste e abrasão' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Proteção Metálica', desc: 'Proteção total para estruturas metálicas expostas' }
                ]
            },
            'pintura-anticorrosiva': {
                title: 'Pintura Anticorrosiva Premium',
                desc: 'Proteção metálica de longa duração com primer anticorrosivo premium e tintas especiais',
                explicacao: 'A pintura anticorrosiva premium da Puglia Pinturas utiliza sistema técnico completo com primer anticorrosivo de alta qualidade e tintas especiais. Aplicamos mais de 5 demãos para garantir máxima proteção contra corrosão em estruturas metálicas, garantindo longa vida útil e proteção total. Processo especializado desde a preparação até o acabamento final, garantindo proteção metálica de excelência.',
                materiais: [
                    { nome: 'Primer Anticorrosivo Premium', desc: 'Primer anticorrosivo de primeira linha para proteção metálica' },
                    { nome: 'Tintas Anticorrosivas', desc: 'Tintas especiais anticorrosivas de alta qualidade' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade e aderência' },
                    { nome: 'Tintas Epóxi Premium', desc: 'Tintas epóxi para acabamento e proteção adicional' }
                ],
                processo: [
                    'Preparação especializada completa da superfície metálica',
                    'Remoção de ferrugem e corrosão existente',
                    'Lixamento técnico profissional',
                    'Aplicação de primer anticorrosivo premium',
                    'Aplicação de selador especial',
                    'Mais de 5 demãos de tinta anticorrosiva premium',
                    'Acabamento final técnico de excelência',
                    'Limpeza e organização do local'
                ],
                beneficios: [
                    { titulo: 'Proteção Contra Corrosão', desc: 'Máxima proteção contra corrosão e oxidação' },
                    { titulo: 'Longa Vida Útil', desc: 'Proteção duradoura para estruturas metálicas' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção total' },
                    { titulo: 'Proteção Total', desc: 'Sistema completo garante proteção metálica de excelência' }
                ]
            },
            'pintura-galpoes': {
                title: 'Pintura de Galpões Premium',
                desc: 'Pintura completa de galpões com tintas premium e sistema completo para proteção total',
                explicacao: 'A pintura de galpões premium da Puglia Pinturas utiliza sistema completo com tintas premium das melhores marcas. Aplicamos mais de 5 demãos para garantir proteção total e durabilidade superior em galpões industriais, comerciais e de armazenamento. Processo técnico completo desde a preparação até o acabamento final, garantindo galpão protegido e com acabamento profissional.',
                materiais: [
                    { nome: 'Tintas para Galpões Premium', desc: 'Tintas especiais para galpões de alta qualidade' },
                    { nome: 'Tintas Epóxi Premium', desc: 'Tintas epóxi para proteção e durabilidade' },
                    { nome: 'Primer Premium', desc: 'Primer de primeira linha para aderência superior' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade' }
                ],
                processo: [
                    'Preparação completa do galpão com limpeza profunda',
                    'Lixamento técnico profissional',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de selador especial',
                    'Aplicação de primer premium',
                    'Mais de 5 demãos de tinta premium para galpões',
                    'Acabamento final profissional',
                    'Limpeza e organização completa do galpão'
                ],
                beneficios: [
                    { titulo: 'Proteção Total', desc: 'Proteção contra intempéries, umidade e desgaste' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Acabamento Profissional', desc: 'Galpão com acabamento impecável e profissional' },
                    { titulo: 'Eficiência', desc: 'Pintura eficiente de grandes áreas com qualidade superior' }
                ]
            },
            'pintura-portoes': {
                title: 'Pintura de Portões e Esquadrias Premium',
                desc: 'Esmaltes sintéticos premium para portões e esquadrias com processo completo',
                explicacao: 'A pintura de portões e esquadrias premium da Puglia Pinturas utiliza esmaltes sintéticos premium das melhores marcas. Aplicamos mais de 5 demãos para garantir brilho intenso, durabilidade superior e acabamento impecável em portões, janelas e esquadrias. Processo completo desde a preparação até o acabamento final, garantindo resultado profissional de excelência.',
                materiais: [
                    { nome: 'Esmaltes Sintéticos Premium', desc: 'Esmaltes sintéticos de alta qualidade para brilho intenso' },
                    { nome: 'Primer para Metais', desc: 'Primer especial para metais de primeira linha' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade' },
                    { nome: 'Massa Corrida Premium', desc: 'Massa corrida para correção de imperfeições' }
                ],
                processo: [
                    'Preparação completa de portões e esquadrias',
                    'Remoção de tinta antiga quando necessário',
                    'Lixamento técnico profissional',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de selador especial',
                    'Aplicação de primer para metais',
                    'Mais de 5 demãos de esmalte sintético premium',
                    'Acabamento final impecável'
                ],
                beneficios: [
                    { titulo: 'Brilho Intenso', desc: 'Esmaltes premium garantem brilho intenso e duradouro' },
                    { titulo: 'Durabilidade Superior', desc: 'Mais de 5 demãos garantem proteção duradoura' },
                    { titulo: 'Resistência', desc: 'Resistência à limpeza frequente e intempéries' },
                    { titulo: 'Acabamento Impecável', desc: 'Resultado profissional com acabamento perfeito' }
                ]
            },
            'textura-grafiato': {
                title: 'Textura e Grafiato Premium',
                desc: 'Acabamentos especiais com textura e grafiato premium para personalização completa',
                explicacao: 'A textura e grafiato premium da Puglia Pinturas utiliza materiais das melhores marcas para criar acabamentos especiais e personalizados. Aplicamos processo completo com preparação técnica, aplicação de texturas e grafiato premium, e acabamento final impecável. Personalização completa conforme sua preferência, garantindo resultado único e sofisticado.',
                materiais: [
                    { nome: 'Texturas Premium', desc: 'Texturas de alta qualidade das melhores marcas' },
                    { nome: 'Grafiato Premium', desc: 'Grafiato de primeira linha para acabamentos especiais' },
                    { nome: 'Tintas Premium', desc: 'Tintas premium para base e acabamento' },
                    { nome: 'Primer Premium', desc: 'Primer de alta qualidade para aderência' }
                ],
                processo: [
                    'Preparação completa da superfície',
                    'Lixamento profissional',
                    'Aplicação de massa corrida premium',
                    'Aplicação de primer premium',
                    'Aplicação de base de tinta premium',
                    'Aplicação de textura ou grafiato premium',
                    'Acabamento final com tinta premium',
                    'Limpeza completa do ambiente'
                ],
                beneficios: [
                    { titulo: 'Personalização Completa', desc: 'Acabamentos únicos conforme sua preferência' },
                    { titulo: 'Sofisticação', desc: 'Resultado sofisticado e elegante' },
                    { titulo: 'Durabilidade', desc: 'Materiais premium garantem durabilidade superior' },
                    { titulo: 'Acabamento Especial', desc: 'Acabamento único que agrega personalidade' }
                ]
            },
            'impermeabilizacao': {
                title: 'Impermeabilização Premium',
                desc: 'Sistema completo de impermeabilização premium para proteção total contra umidade e infiltrações',
                explicacao: 'A impermeabilização premium da Puglia Pinturas utiliza sistema completo com produtos premium das melhores marcas. Aplicamos processo técnico completo para garantir proteção total contra umidade, infiltrações e intempéries em fachadas, coberturas e áreas molhadas. Sistema completo desde a preparação até o acabamento final, garantindo proteção duradoura e eficaz.',
                materiais: [
                    { nome: 'Impermeabilizantes Premium', desc: 'Impermeabilizantes de primeira linha para proteção total' },
                    { nome: 'Primer Impermeabilizante', desc: 'Primer especial para impermeabilização' },
                    { nome: 'Massa Corrida Premium', desc: 'Massa corrida para correção de imperfeições' },
                    { nome: 'Tintas Premium', desc: 'Tintas premium para acabamento quando necessário' }
                ],
                processo: [
                    'Preparação completa da superfície com limpeza profunda',
                    'Correção de imperfeições e rachaduras',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de primer impermeabilizante',
                    'Aplicação de impermeabilizante premium em múltiplas camadas',
                    'Acabamento final com tinta premium quando necessário',
                    'Verificação de vedação e proteção',
                    'Limpeza completa do local'
                ],
                beneficios: [
                    { titulo: 'Proteção Total', desc: 'Proteção completa contra umidade e infiltrações' },
                    { titulo: 'Durabilidade Superior', desc: 'Sistema completo garante proteção duradoura' },
                    { titulo: 'Prevenção de Danos', desc: 'Previne danos estruturais causados por umidade' },
                    { titulo: 'Eficácia Comprovada', desc: 'Sistema técnico comprovado de alta eficácia' }
                ]
            },
            'pintura-altura': {
                title: 'Pintura em Altura Premium',
                desc: 'Serviços especializados em pintura em altura com segurança total e qualidade superior',
                explicacao: 'A pintura em altura premium da Puglia Pinturas utiliza equipe especializada e equipamentos adequados para trabalhos em grandes alturas. Aplicamos processo completo com mais de 5 demãos de tinta premium, garantindo segurança total e qualidade superior em fachadas, estruturas altas e áreas de difícil acesso. Processo técnico completo desde a preparação até o acabamento final, garantindo resultado profissional e seguro.',
                materiais: [
                    { nome: 'Tintas Premium', desc: 'Tintas premium das melhores marcas para exteriores' },
                    { nome: 'Equipamentos de Segurança', desc: 'Equipamentos certificados para trabalhos em altura' },
                    { nome: 'Primer Premium', desc: 'Primer de alta qualidade para aderência' },
                    { nome: 'Selador Especial', desc: 'Selador especial para uniformidade' }
                ],
                processo: [
                    'Planejamento e análise de segurança',
                    'Preparação completa da superfície',
                    'Lixamento técnico profissional',
                    'Aplicação de massa corrida premium quando necessário',
                    'Aplicação de selador especial',
                    'Aplicação de primer premium',
                    'Mais de 5 demãos de tinta premium',
                    'Acabamento final profissional e verificação de segurança'
                ],
                beneficios: [
                    { titulo: 'Segurança Total', desc: 'Equipe treinada e equipamentos certificados' },
                    { titulo: 'Qualidade Superior', desc: 'Processo completo garante qualidade superior' },
                    { titulo: 'Profissionalismo', desc: 'Trabalho profissional em grandes alturas' },
                    { titulo: 'Eficiência', desc: 'Execução eficiente e segura de projetos em altura' }
                ]
            }
        };

        const servico = servicos[pageName] || {
            title: 'Serviço Premium',
            desc: 'Processo completo com mais de 5 demãos de tinta premium',
            explicacao: 'Processo completo Puglia Premium com mais de 5 demãos de tinta premium',
            materiais: [],
            processo: [],
            beneficios: []
        };

        // Renderizar materiais
        const materiaisHTML = servico.materiais && servico.materiais.length > 0 
            ? servico.materiais.map(m => `
                <div class="material-item">
                    <h3>${m.nome}</h3>
                    <p>${m.desc}</p>
                </div>
            `).join('')
            : '<p>Tintas premium das melhores marcas do mercado.</p>';

        // Renderizar processo
        const processoHTML = servico.processo && servico.processo.length > 0
            ? servico.processo.map((p, i) => `
                <div class="processo-step">
                    <h3>${i + 1}. ${p}</h3>
                </div>
            `).join('')
            : '<p>Processo completo Puglia Premium com mais de 5 demãos.</p>';

        // Renderizar benefícios
        const beneficiosHTML = servico.beneficios && servico.beneficios.length > 0
            ? servico.beneficios.map(b => `
                <div class="beneficio-card">
                    <h3>${b.titulo}</h3>
                    <p>${b.desc}</p>
                </div>
            `).join('')
            : '<p>Qualidade superior e acabamento impecável.</p>';

        // Adicionar classe ao container para imagem de fundo
        container.className = `page ${pageName}`;
        
        container.innerHTML = `
            <div class="servico-header">
                <div class="container">
                    <h1 class="section-title" style="color: var(--blue-premium);">${servico.title}</h1>
                    <p class="section-subtitle" style="color: var(--text-dark);">${servico.desc}</p>
                </div>
            </div>

            <section class="servico-content">
                <div class="container">
                    <div class="servico-section">
                        <h2>Explicação Técnica Completa</h2>
                        <p>${servico.explicacao || 'O serviço da Puglia Pinturas utiliza processo completo e técnico, garantindo resultado superior e durabilidade excepcional. Aplicamos sistematicamente mais de 5 demãos de tinta premium das melhores marcas do mercado, seguindo rigorosamente nosso Processo Puglia Premium.'}</p>
                        <p>Cada etapa é executada com precisão técnica: preparação completa da superfície, lixamento profissional, aplicação de massa corrida premium, selador especial, primer de alta qualidade e múltiplas demãos de tinta premium para garantir cobertura total, uniformidade perfeita e acabamento impecável.</p>
                    </div>

                    <div class="servico-section">
                        <h2>Materiais Utilizados</h2>
                        <p>Trabalhamos exclusivamente com materiais de primeira linha das melhores marcas do mercado brasileiro e internacional. Todos os materiais são selecionados criteriosamente para garantir máxima qualidade, durabilidade e acabamento profissional em cada projeto.</p>
                        <div class="materiais-grid">
                            ${materiaisHTML}
                        </div>
                    </div>

                    <div class="servico-section">
                        <h2>Processo de Aplicação</h2>
                        <p>Seguimos rigorosamente nosso Processo Puglia Premium, aplicando mais de 5 demãos obrigatórias de tinta premium para garantir resultado superior. Cada etapa é executada por profissionais treinados, utilizando técnicas modernas e equipamentos de ponta para garantir excelência em cada projeto.</p>
                        <div class="processo-steps">
                            ${processoHTML}
                        </div>
                    </div>

                    <div class="servico-section">
                        <h2>Benefícios</h2>
                        <p>Com nosso processo completo e materiais premium, garantimos resultado superior que supera expectativas e oferece máxima satisfação.</p>
                        <div class="beneficios-grid">
                            ${beneficiosHTML}
                        </div>
                    </div>
                </div>
            </section>

            ${this.getProcessoPuglia()}

            <section class="cta-section">
                <div class="container">
                    <h2>Solicite seu Orçamento Grátis</h2>
                    <p>Entre em contato e receba um orçamento personalizado para seu projeto</p>
                    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
                        <a href="#" class="btn primary" data-page="contato">Solicitar Orçamento</a>
                        <a href="#" class="btn secondary" data-page="orcamento">Simulador de Orçamento</a>
                    </div>
                </div>
            </section>
        `;
    }

    loadTrabalhoPage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Nosso Trabalho</h1>
                    <p class="section-subtitle">Galeria de projetos realizados com processo completo e acabamento impecável</p>
                </div>
            </div>

            <section class="portfolio-section">
                <div class="container">
                    <div class="portfolio-filters">
                        <button class="filter-btn active" data-filter="all">Todos</button>
                        <button class="filter-btn" data-filter="residencial">Residencial</button>
                        <button class="filter-btn" data-filter="comercial">Comercial</button>
                        <button class="filter-btn" data-filter="industrial">Industrial</button>
                    </div>

                    <div class="portfolio-grid">
                        <div class="portfolio-item" data-category="residencial">
                            <div class="portfolio-image">
                                <div class="image-placeholder">🏠</div>
                            </div>
                            <h3>Projeto Residencial Completo</h3>
                            <p><strong>Processo:</strong> Mais de 5 demãos de tinta acrílica premium Suvinil. Preparação completa, massa corrida Eucatex, selador, primer e acabamento impecável.</p>
                            <span class="category">Residencial</span>
                        </div>

                        <div class="portfolio-item" data-category="comercial">
                            <div class="portfolio-image">
                                <div class="image-placeholder">🏢</div>
                            </div>
                            <h3>Projeto Comercial Premium</h3>
                            <p><strong>Processo:</strong> Sistema completo com tintas epóxi premium. Mais de 5 demãos para máxima durabilidade e acabamento profissional.</p>
                            <span class="category">Comercial</span>
                        </div>

                        <div class="portfolio-item" data-category="industrial">
                            <div class="portfolio-image">
                                <div class="image-placeholder">🏭</div>
                            </div>
                            <h3>Projeto Industrial de Alto Desempenho</h3>
                            <p><strong>Processo:</strong> Pintura epóxi e poliuretano premium. Mais de 5 demãos para proteção total contra corrosão e intempéries.</p>
                            <span class="category">Industrial</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadLojasPage(container) {
        container.innerHTML = `
            <div class="page-header" style="background: linear-gradient(135deg, rgba(0, 27, 58, 0.1), rgba(167, 145, 73, 0.1)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90') center/cover; padding: 120px 0 80px; text-align: center;">
                <div class="container">
                    <h1 class="section-title" style="color: var(--blue-premium);">Lojas de Tintas Parceiras em Sinop</h1>
                    <p class="section-subtitle" style="color: var(--text-dark);">Trabalhamos com as melhores lojas de tintas de Sinop-MT</p>
                </div>
            </div>

            <section class="lojas-section">
                <div class="container">
                    <div class="lojas-grid">
                        <div class="loja-card">
                            <h3>Sinop Tintas</h3>
                            <p><strong>Endereço:</strong> Av. das Acácias, 946, Setor Residencial Sul, Sinop-MT</p>
                            <p>Loja especializada em tintas de alta qualidade. Amplo estoque de tintas acrílicas, esmaltes e produtos para pintura profissional.</p>
                            <p><strong>Recomendações:</strong> Tintas acrílicas premium, esmaltes sintéticos e produtos complementares de primeira linha.</p>
                        </div>
                        <div class="loja-card">
                            <h3>Só Tintas</h3>
                            <p><strong>Endereço:</strong> Av. das Itaúbas, 1829, Jardim Paraíso, Sinop-MT</p>
                            <p>Loja completa de tintas e materiais para pintura. Atendimento especializado e produtos das melhores marcas do mercado.</p>
                            <p><strong>Recomendações:</strong> Tintas premium, massa corrida, seladores e primers de alta qualidade.</p>
                        </div>
                        <div class="loja-card">
                            <h3>Nortão Color</h3>
                            <p><strong>Endereço:</strong> Av. das Itaúbas, 40, Jardim Celeste, Sinop-MT</p>
                            <p>Fábrica e revenda de tintas em Sinop. Produção própria e distribuição de tintas de excelência para todo o mercado regional.</p>
                            <p><strong>Recomendações:</strong> Tintas Nortão Color de produção própria, tintas acrílicas premium e produtos especiais para pintura profissional.</p>
                        </div>
                        <div class="loja-card">
                            <h3>Pantanal Colors</h3>
                            <p><strong>Endereço:</strong> Rua Bizazel José dos Santos, 152, Lic Norte, Sinop-MT</p>
                            <p>Loja especializada em tintas e produtos para pintura. Variedade completa de cores e produtos premium para todos os tipos de projeto.</p>
                            <p><strong>Recomendações:</strong> Tintas Pantanal Colors, tintas acrílicas premium e linha completa de produtos para pintura profissional.</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 60px; padding: 50px; background: var(--white); border-radius: 20px; box-shadow: var(--shadow-md); text-align: center; border: 2px solid var(--gold-premium);">
                        <h2 style="color: var(--blue-premium); font-size: 2rem; margin-bottom: 20px; font-weight: 800;">Trabalhamos com as Melhores Marcas</h2>
                        <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8; max-width: 800px; margin: 0 auto;">
                            Em todas essas lojas parceiras, você encontra as melhores marcas de tintas premium que utilizamos em nossos projetos: <strong style="color: var(--text-dark);">Suvinil Premium, Coral Premium, Eucatex Premium, Renner e Sherwin-Williams</strong>. Trabalhamos exclusivamente com tintas de primeira linha para garantir qualidade superior e durabilidade excepcional em cada projeto.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }

    loadBlogPage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Blog Puglia Pinturas</h1>
                    <p class="section-subtitle">Tutoriais completos, processos técnicos, tipos de tinta, escolha de cores e manutenção</p>
                </div>
            </div>

            <section class="blog-section">
                <div class="container">
                    <div class="blog-grid">
                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🎨</div>
                            </div>
                            <div class="post-content">
                                <h3>Tipos de Tintas Premium: Guia Completo das Melhores Marcas</h3>
                                <p class="post-meta">Publicado em 20 de novembro de 2025</p>
                                <p><strong>Tintas Acrílicas Premium:</strong> Perfeitas para interiores, secagem rápida e fácil aplicação. Utilizamos exclusivamente marcas premium: Suvinil Acrílica Premium, Coral Acrílica Premium e Eucatex Premium. Aplicamos mais de 5 mãos para garantir cobertura total e acabamento impecável.</p>
                                <p><strong>Tintas PVA de Qualidade:</strong> Econômicas e ideais para áreas internas com baixa umidade. Utilizamos apenas tintas PVA das melhores marcas, garantindo excelente custo-benefício e qualidade superior.</p>
                                <p><strong>Esmaltes Sintéticos Premium:</strong> Brilho intenso e alta durabilidade para portas, janelas e móveis. Trabalhamos com esmaltes das melhores marcas, resistentes à limpeza frequente e com acabamento perfeito.</p>
                                <p><strong>Processo Completo:</strong> Em todos os projetos, aplicamos sistema completo com múltiplas demãos (5+ mãos) utilizando apenas tintas premium das melhores marcas do mercado.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🏠</div>
                            </div>
                            <div class="post-content">
                                <h3>Preparação de Superfícies: Processo Completo para Pintura Perfeita</h3>
                                <p class="post-meta">Publicado em 19 de novembro de 2025</p>
                                <p><strong>Lixamento Profissional:</strong> Fundamental para aderência perfeita. Utilizamos lixas de diferentes granulometrias conforme a superfície, garantindo base lisa e uniforme para aplicação das tintas premium.</p>
                                <p><strong>Massa Corrida Premium:</strong> Correção de imperfeições e nivelamento de paredes para acabamento impecável. Utilizamos massa corrida das melhores marcas (Eucatex, Suvinil) para garantir qualidade superior.</p>
                                <p><strong>Primer de Alta Qualidade:</strong> Base essencial que garante uniformidade, economia de tinta e maior durabilidade do acabamento final. Aplicamos primer premium antes de cada demão de tinta.</p>
                                <p><strong>Sistema Completo:</strong> Todo o processo de preparação é executado com materiais premium, seguido de aplicação de mais de 5 mãos de tinta das melhores marcas para resultado perfeito.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🏭</div>
                            </div>
                            <div class="post-content">
                                <h3>Tintas Epóxi e Poliuretano Premium: Proteção Industrial de Alto Desempenho</h3>
                                <p class="post-meta">Publicado em 18 de novembro de 2025</p>
                                <p><strong>Tintas Epóxi Premium:</strong> Resistência química excepcional, ideal para pisos industriais, galpões e áreas com alta exigência. Utilizamos apenas tintas epóxi das melhores marcas, aplicando sistema completo com mais de 5 mãos para máxima proteção.</p>
                                <p><strong>Poliuretano de Alta Qualidade:</strong> Proteção UV superior e resistência à abrasão. Perfeito para estruturas metálicas expostas. Trabalhamos com poliuretano premium das melhores marcas do mercado.</p>
                                <p><strong>Aplicação Técnica Especializada:</strong> Requer preparação especializada e equipamentos adequados. Aplicamos sistema completo com múltiplas demãos (5+) utilizando materiais premium para garantir máxima aderência, durabilidade e proteção total.</p>
                                <p><strong>Materiais Premium:</strong> Utilizamos exclusivamente tintas epóxi e poliuretano das melhores marcas, garantindo proteção superior e longa durabilidade em ambientes industriais.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🎨</div>
                            </div>
                            <div class="post-content">
                                <h3>Como Escolher as Cores Perfeitas para Cada Ambiente</h3>
                                <p class="post-meta">Publicado em 17 de novembro de 2025</p>
                                <p><strong>Análise do Ambiente:</strong> Cada ambiente possui características específicas que influenciam na escolha das cores. Salas de estar requerem cores acolhedoras, escritórios precisam de tons profissionais, e quartos podem ter cores mais personalizadas.</p>
                                <p><strong>Iluminação Natural e Artificial:</strong> A iluminação é fundamental na escolha das cores. Ambientes com muita luz natural podem usar cores mais escuras, enquanto ambientes com pouca luz se beneficiam de cores claras que ampliam o espaço.</p>
                                <p><strong>Harmonia de Cores:</strong> Criar harmonia entre diferentes ambientes é essencial. Utilizamos técnicas profissionais de combinação de cores para garantir resultado harmonioso e elegante em toda a residência ou estabelecimento.</p>
                                <p><strong>Consultoria de Cores:</strong> Oferecemos consultoria profissional para escolha de cores, considerando estilo pessoal, funcionalidade do ambiente e tendências atuais do mercado.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🔧</div>
                            </div>
                            <div class="post-content">
                                <h3>Manutenção e Cuidados com Pintura: Guia Completo</h3>
                                <p class="post-meta">Publicado em 16 de novembro de 2025</p>
                                <p><strong>Limpeza Regular:</strong> Manter a pintura limpa é fundamental para preservar sua aparência e durabilidade. Utilizamos técnicas de limpeza adequadas para cada tipo de superfície, garantindo que a pintura mantenha sua qualidade ao longo dos anos.</p>
                                <p><strong>Inspeção Periódica:</strong> Realizar inspeções periódicas permite identificar problemas antes que se agravem. Verificamos rachaduras, descascamentos e outros sinais de desgaste que podem ser corrigidos preventivamente.</p>
                                <p><strong>Reparos Preventivos:</strong> Pequenos reparos preventivos são essenciais para manter a pintura em perfeito estado. Com nosso processo completo e mais de 5 demãos, a necessidade de reparos é significativamente reduzida.</p>
                                <p><strong>Durabilidade Superior:</strong> Nossa pintura com mais de 5 demãos de tinta premium garante durabilidade superior, reduzindo a necessidade de manutenção frequente e mantendo o acabamento impecável por muito mais tempo.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">📐</div>
                            </div>
                            <div class="post-content">
                                <h3>Processo Puglia Premium: Por que 5+ Demãos Fazem a Diferença</h3>
                                <p class="post-meta">Publicado em 15 de novembro de 2025</p>
                                <p><strong>Diferencial Técnico:</strong> Aplicamos sistematicamente mais de 5 demãos de tinta premium em todos os projetos. Este processo garante cobertura total, uniformidade perfeita e acabamento impecável que supera significativamente projetos com menos demãos.</p>
                                <p><strong>Cobertura Total:</strong> Múltiplas demãos garantem cobertura total da superfície, eliminando falhas e garantindo uniformidade perfeita. Cada demão adiciona camadas de proteção e qualidade ao acabamento final.</p>
                                <p><strong>Durabilidade Superior:</strong> Mais demãos significam maior espessura da camada de tinta, resultando em durabilidade superior e resistência ao desgaste. Nossos projetos duram muito mais tempo que projetos convencionais.</p>
                                <p><strong>Acabamento Profissional:</strong> O resultado final com 5+ demãos é visivelmente superior: acabamento liso, uniforme e profissional que reflete qualidade e atenção aos detalhes em cada projeto.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🏢</div>
                            </div>
                            <div class="post-content">
                                <h3>Pintura Comercial: Processo Técnico e Benefícios</h3>
                                <p class="post-meta">Publicado em 14 de novembro de 2025</p>
                                <p><strong>Sistema Completo:</strong> A pintura comercial requer sistema técnico completo com tintas epóxi e acrílicas premium. Aplicamos mais de 5 demãos para garantir resistência química e mecânica excepcional em ambientes de alto tráfego.</p>
                                <p><strong>Ambiente Profissional:</strong> O acabamento profissional reflete diretamente na imagem do estabelecimento. Nossa pintura garante ambiente corporativo impecável que transmite profissionalismo e qualidade.</p>
                                <p><strong>Durabilidade em Alto Tráfego:</strong> Escritórios, lojas e estabelecimentos comerciais têm alto tráfego de pessoas. Nossa pintura com mais de 5 demãos garante durabilidade superior mesmo em ambientes com uso intenso.</p>
                                <p><strong>Fácil Manutenção:</strong> Superfícies pintadas com nosso processo completo são mais fáceis de limpar e manter, reduzindo custos de manutenção e mantendo o ambiente sempre apresentável.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>

                        <article class="blog-post">
                            <div class="post-image">
                                <div class="image-placeholder">🛡️</div>
                            </div>
                            <div class="post-content">
                                <h3>Impermeabilização: Proteção Total Contra Umidade e Infiltrações</h3>
                                <p class="post-meta">Publicado em 13 de novembro de 2025</p>
                                <p><strong>Sistema Completo:</strong> A impermeabilização premium utiliza sistema técnico completo com produtos das melhores marcas. Aplicamos múltiplas camadas para garantir proteção total contra umidade, infiltrações e intempéries.</p>
                                <p><strong>Proteção Estrutural:</strong> A impermeabilização adequada previne danos estruturais causados por umidade, protegendo a integridade do imóvel e evitando custos elevados de reparos futuros.</p>
                                <p><strong>Aplicação Técnica:</strong> Requer preparação especializada e aplicação técnica profissional. Nossa equipe possui conhecimento técnico avançado para garantir eficácia total do sistema de impermeabilização.</p>
                                <p><strong>Durabilidade:</strong> Sistema completo de impermeabilização premium garante proteção duradoura e eficaz, mantendo o imóvel protegido por muitos anos.</p>
                                <a href="#" class="read-more">Ler mais</a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;
    }

    loadClientesPage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Depoimentos de Clientes</h1>
                    <p class="section-subtitle">Avaliações reais de clientes satisfeitos com nossos serviços</p>
                </div>
            </div>

            <section class="clientes-section">
                <div class="container">
                    <div class="rating-overall">
                        <h2>Avaliação Geral</h2>
                        <div class="rating-stars">⭐⭐⭐⭐⭐</div>
                        <p class="rating-score">4.9/5.0 baseado em 127 avaliações</p>
                    </div>

                    <div class="testimonials-filters">
                        <button class="filter-btn active" data-filter="all">Todos</button>
                        <button class="filter-btn" data-filter="residencial">Residencial</button>
                        <button class="filter-btn" data-filter="comercial">Comercial</button>
                        <button class="filter-btn" data-filter="industrial">Industrial</button>
                    </div>

                    <div class="testimonials-grid">
                        <div class="testimonial-card" data-category="residencial">
                            <div class="testimonial-content">
                                <p>"Excelente trabalho! A Puglia Pinturas transformou completamente nossa casa. Processo completo com mais de 5 demãos de tinta premium, profissionais competentes e acabamento impecável. Superou todas as expectativas!"</p>
                                <div class="testimonial-author">
                                    <strong>Maria Silva</strong><br>
                                    <span>Jardim Imperial, Sinop-MT</span>
                                </div>
                            </div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-service">Residencial</div>
                        </div>

                        <div class="testimonial-card" data-category="comercial">
                            <div class="testimonial-content">
                                <p>"Contratamos para pintar nosso escritório corporativo e o resultado foi excepcional. Processo completo, tintas premium, mais de 5 demãos e acabamento profissional. Equipe pontual e materiais de primeira linha."</p>
                                <div class="testimonial-author">
                                    <strong>João Santos</strong><br>
                                    <span>Centro, Sinop-MT</span>
                                </div>
                            </div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-service">Comercial</div>
                        </div>

                        <div class="testimonial-card" data-category="industrial">
                            <div class="testimonial-content">
                                <p>"Serviço excepcional no galpão da nossa empresa. Pintura epóxi premium com mais de 5 demãos, proteção total contra corrosão. Processo técnico completo e resultado superior. Recomendo fortemente!"</p>
                                <div class="testimonial-author">
                                    <strong>Carlos Oliveira</strong><br>
                                    <span>Distrito Industrial, Sinop-MT</span>
                                </div>
                            </div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-service">Industrial</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadOrcamentoPage(container) {
        container.innerHTML = `
            <div class="page-header" style="background: linear-gradient(135deg, rgba(0, 27, 58, 0.1), rgba(167, 145, 73, 0.1)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90') center/cover; padding: 120px 0 80px; text-align: center;">
                <div class="container">
                    <h1 class="section-title" style="color: var(--blue-premium);">Simulador de Orçamento Instantâneo</h1>
                    <p class="section-subtitle" style="color: var(--text-dark);">Receba uma estimativa prévia do seu projeto de pintura premium</p>
                </div>
            </div>

            <section class="orcamento-section" style="padding: 100px 0; background: var(--white);">
                <div class="container">
                    <div class="card-premium" style="max-width: 800px; margin: 0 auto;">
                        <h2 style="color: var(--blue-premium); font-size: 2rem; margin-bottom: 30px; text-align: center; font-weight: 800;">Preencha os dados do seu projeto</h2>
                        <form id="orcamentoForm">
                            <div class="form-group" style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--blue-premium);">Nome Completo:</label>
                                <input type="text" name="nome" required style="width: 100%; padding: 15px; border: 2px solid var(--border-light); border-radius: 12px; font-size: 1rem; transition: var(--transition);" placeholder="Seu nome completo">
                            </div>

                            <div class="form-group" style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--blue-premium);">Telefone:</label>
                                <input type="tel" name="telefone" required style="width: 100%; padding: 15px; border: 2px solid var(--border-light); border-radius: 12px; font-size: 1rem; transition: var(--transition);" placeholder="(66) 99999-9999">
                            </div>

                            <div class="form-group" style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--blue-premium);">Endereço:</label>
                                <input type="text" name="endereco" required style="width: 100%; padding: 15px; border: 2px solid var(--border-light); border-radius: 12px; font-size: 1rem; transition: var(--transition);" placeholder="Rua, número, bairro - Sinop-MT">
                            </div>

                            <div class="form-group" style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--blue-premium);">Metros Quadrados (m²):</label>
                                <input type="number" name="metrosQuadrados" min="1" step="0.01" required style="width: 100%; padding: 15px; border: 2px solid var(--border-light); border-radius: 12px; font-size: 1rem; transition: var(--transition);" placeholder="Ex: 100">
                            </div>

                            <div class="form-group" style="margin-bottom: 30px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--blue-premium);">Tipo de Serviço:</label>
                                <select name="tipoServico" required style="width: 100%; padding: 15px; border: 2px solid var(--border-light); border-radius: 12px; font-size: 1rem; transition: var(--transition); background: var(--white);">
                                    <option value="">Selecione o tipo de serviço...</option>
                                    <option value="residencial">Pintura Residencial</option>
                                    <option value="comercial">Pintura Comercial</option>
                                    <option value="industrial">Pintura Industrial</option>
                                    <option value="fachada">Pintura de Fachada</option>
                                    <option value="piso-epoxi">Pintura de Piso Epóxi</option>
                                    <option value="galpao">Pintura de Galpão</option>
                                    <option value="portoes">Pintura de Portões/Esquadrias</option>
                                    <option value="impermeabilizacao">Impermeabilização</option>
                                </select>
                            </div>

                            <button type="submit" class="btn primary" style="width: 100%; padding: 18px; font-size: 1.1rem;">Calcular Orçamento</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    loadContatoPage(container) {
        container.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1 class="section-title">Entre em Contato</h1>
                    <p class="section-subtitle">Solicite seu orçamento grátis e personalizado</p>
                </div>
            </div>

            <section class="contact-section">
                <div class="container">
                    <div class="contact-grid">
                        <div class="contact-info">
                            <h2>Informações de Contato</h2>
                            <div class="info-list">
                                <div class="info-item">
                                    <span class="icon">📞</span>
                                    <div>
                                        <strong>Telefone:</strong><br>
                                        +55 66 99686-1898
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span class="icon">📧</span>
                                    <div>
                                        <strong>E-mail:</strong><br>
                                        contato@pugliapinturas.com
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span class="icon">📍</span>
                                    <div>
                                        <strong>Endereço:</strong><br>
                                        Rua dos Cajueiros, 2320<br>
                                        Jardim Imperial, Sinop-MT
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span class="icon">🏢</span>
                                    <div>
                                        <strong>CNPJ:</strong><br>
                                        18.225.966/0001-35
                                    </div>
                                </div>
                            </div>

                            <div class="contact-buttons">
                                <a href="tel:+5566996861898" class="btn primary">📞 Ligar Agora</a>
                                <a href="https://wa.me/5566996861898?text=Olá! Gostaria de solicitar um orçamento para pintura." target="_blank" class="btn whatsapp">📱 WhatsApp</a>
                            </div>
                        </div>

                        <div class="contact-form">
                            <h2>Envie sua Mensagem</h2>
                            <form id="contactForm">
                                <div class="form-group">
                                    <label for="nome">Nome Completo:</label>
                                    <input type="text" id="nome" name="nome" required>
                                </div>

                                <div class="form-group">
                                    <label for="endereco">Endereço do Projeto:</label>
                                    <input type="text" id="endereco" name="endereco" required>
                                </div>

                                <div class="form-group">
                                    <label for="email">E-mail:</label>
                                    <input type="email" id="email" name="email" required>
                                </div>

                                <div class="form-group">
                                    <label for="telefone">Telefone/WhatsApp:</label>
                                    <input type="tel" id="telefone" name="telefone" required>
                                </div>

                                <div class="form-group">
                                    <label for="assunto">Tipo de Serviço:</label>
                                    <select id="assunto" name="assunto" required>
                                        <option value="">Selecione...</option>
                                        <option value="residencial">Pintura Residencial</option>
                                        <option value="comercial">Pintura Comercial</option>
                                        <option value="industrial">Pintura Industrial</option>
                                        <option value="fachada">Pintura de Fachada</option>
                                        <option value="piso">Pintura de Piso Epóxi</option>
                                        <option value="poliuretano">Pintura Poliuretano</option>
                                        <option value="anticorrosiva">Pintura Anticorrosiva</option>
                                        <option value="galpoes">Pintura de Galpões</option>
                                        <option value="portoes">Pintura de Portões/Esquadrias</option>
                                        <option value="textura">Textura e Grafiato</option>
                                        <option value="impermeabilizacao">Impermeabilização</option>
                                        <option value="altura">Pintura em Altura</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="mensagem">Descreva seu Projeto:</label>
                                    <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Descreva o projeto, área aproximada, tipo de ambiente, etc."></textarea>
                                </div>

                                <button type="submit" class="btn primary">Enviar Mensagem</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

}

// Inicializar a aplicação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.pugliaApp = new PugliaApp();
});