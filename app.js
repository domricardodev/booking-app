// Dados simulados (seriam substituídos por chamadas à API)
// Aqui criamos um array de objetos que representam destinos de viagem.
// Cada objeto tem propriedades que descrevem o destino. Na aplicação real,
// esses dados viriam de uma API.
const destinations = [
  {
    id: 1,  // Identificador único do destino
    name: "Hotel Praia Dourada",  // Nome do estabelecimento
    location: "Rio de Janeiro, Brasil",  // Localização
    price: 350,  // Preço por noite
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",  // URL da imagem
    description: "Hotel frente à praia com piscina e restaurante",  // Descrição
    amenities: "Wi-Fi, Ar-condicionado, TV, Frigobar"  // Comodidades
  },
  // Os outros objetos seguem a mesma estrutura para diferentes destinos
  {
    id: 2,
    name: "Pousada Mata Verde",
    location: "Gramado, Brasil",
    price: 280,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Chalés aconchegantes em meio à natureza",
    amenities: "Wi-Fi, Lareira, Café da manhã"
  },
  {
    id: 3,
    name: "Resort All Inclusive",
    location: "Porto Seguro, Brasil",
    price: 520,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    description: "Resort com tudo incluso e atividades para toda família",
    amenities: "Wi-Fi, Piscinas, Restaurante, Atividades"
  },
  {
    id: 4,
    name: "Flat Premium",
    location: "São Paulo, Brasil",
    price: 320,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    description: "Flat moderno no centro da cidade",
    amenities: "Wi-Fi, Ar-condicionado, Cozinha, Lavanderia"
  }
];

// Elementos da interface - selecionamos elementos HTML para manipulação
// Aqui selecionamos elementos do DOM (Document Object Model) para podermos 
// manipulá-los com JavaScript. Usamos getElementById para pegar elementos 
// por ID e querySelectorAll para pegar vários elementos com a mesma classe.
const destinationsContainer = document.getElementById('destinations-container'); // Div onde os destinos serão exibidos
const loginBtn = document.getElementById('login-btn'); // Botão de login
const registerBtn = document.getElementById('register-btn'); // Botão de cadastro
const loginModal = document.getElementById('login-modal'); // Modal de login
const registerModal = document.getElementById('register-modal'); // Modal de cadastro
const bookingModal = document.getElementById('booking-modal'); // Modal de reserva
const closeModals = document.querySelectorAll('.close-modal'); // Botões para fechar modais
const showRegister = document.getElementById('show-register'); // Link para mostrar cadastro
const showLogin = document.getElementById('show-login'); // Link para mostrar login
const loginForm = document.getElementById('login-form'); // Formulário de login
const registerForm = document.getElementById('register-form'); // Formulário de cadastro
const bookingForm = document.getElementById('booking-form'); // Formulário de reserva
const bookingDetails = document.getElementById('booking-details'); // Div com detalhes da reserva
const searchBtn = document.getElementById('search-btn'); // Botão de busca
const destinationInput = document.getElementById('destination-input');
const checkinInput = document.getElementById('checkin-input');
const checkoutInput = document.getElementById('checkout-input');
const guestsSelect = document.getElementById('guests-select');

// Variáveis globais
// Variável global que guardará o destino que o usuário está tentando reservar.
let currentDestination = null; // Armazena o destino selecionado para reserva

// Carregar destinos na página
// Esta função é responsável por:
// 1 Limpar o container de destinos.
// 2 Criar um card para cada destino usando os dados do array.
// 3 Adicionar eventos de clique nos botões "Reservar" que 
// armazenam o destino selecionado e mostram o modal de reserva.
// 1. Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {

  // 2. Seleciona o container onde os destinos serão colocados
  const destinationsContainer = document.getElementById('destinations-container');

  // 4. Função para criar e exibir os cards de destinos
  function displayDestinations() {
    // Limpa o container antes de adicionar
    destinationsContainer.innerHTML = '';

    // Para cada destino no array
    destinations.forEach(destination => {
      // Cria um elemento div para o card
      const card = document.createElement('div');
      card.className = 'destination-card';

      // Preenche o HTML do card com os dados do destino
      card.innerHTML = `
        <div class="destination-image" style="background-image: url('${destination.image}')"></div>
        <div class="destination-info">
          <h3>${destination.name}</h3>
          <div class="destination-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${destination.location}</span>
          </div>
          <div class="destination-price">R$ ${destination.price.toFixed(2)} <span>por noite</span></div>
          <button class="book-btn" data-id="${destination.id}">Reservar</button>
        </div>
      `;

      // Adiciona o card ao container
      destinationsContainer.appendChild(card);
    });

    // Adiciona eventos aos botões de reserva
    setupBookingButtons();

    //     4. Como Funciona o Processo

    //     Carregamento da Página: Quando a página carrega, o evento DOMContentLoaded dispara.

    //     Seleção do Container: Encontramos a div com id destinations-container onde os cards serão colocados.

    //     Dados dos Destinos: Temos um array de objetos com informações de cada destino.

    //     Criação dos Cards:

    //         Para cada destino, criamos uma div (destination-card)

    //         Preenchemos com HTML contendo a imagem, nome, localização e preço

    //         Adicionamos um botão "Reservar" com um atributo data-id para identificação

    //     Adição ao DOM: Cada card criado é adicionado ao container.

    //     Eventos dos Botões: Configuramos os listeners para os botões "Reservar".

    // 5. Solução de Problemas Comuns

    // Se os destinos não aparecerem:

    //     Verifique o console do navegador (F12 > Console) por erros

    //     Confira se o arquivo app.js está sendo carregado:

    //         No navegador, clique direito > "Inspecionar" > aba "Network"

    //         Recarregue a página e veja se app.js aparece na lista

    //     Confira os caminhos dos arquivos:

    //         Certifique-se que todos os arquivos estão na mesma pasta

    //         Ou ajuste o caminho no <script src=""> se estiverem em subpastas

    // 6. Próximos Passos

    // Para evoluir seu projeto:

    //     Buscar dados de uma API real em vez de usar o array fixo

    //     Implementar o modal de reserva quando clicar no botão

    //     Adicionar loading state enquanto os dados carregam

    //     Implementar filtros por localização, preço, etc.

    // Este código completo já deve fazer os destinos aparecerem na sua página conforme o layout do HTML que você compartilhou.
  }

  // 5. Função para configurar os botões de reserva
  function setupBookingButtons() {
    document.querySelectorAll('.book-btn').forEach(button => {
      button.addEventListener('click', function () {
        const destinationId = parseInt(this.getAttribute('data-id'));
        const selectedDest = destinations.find(d => d.id === destinationId);
        alert(`Você clicou em reservar: ${selectedDest.name}`);
        // Aqui você pode abrir o modal de reserva
      });
    });
  }

  // 6. Chama a função para exibir os destinos
  displayDestinations();
});

// Mostrar modal de login
function showLoginModal() {
  loginModal.classList.add('active');  // Adiciona classe 'active' para mostrar o modal
  document.body.style.overflow = 'hidden'; // Impede scroll da página
}

// Função para esconder todos os modais
function hideModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto'; // Restaura scroll da página
}

// Evento de clique no botão de login
loginBtn.addEventListener('click', showLoginModal);

// Evento para fechar modais (clicar no X)
closeModals.forEach(btn => {
  btn.addEventListener('click', hideModals);
});

// Evento para mostrar o modal de cadastro
showRegister.addEventListener('click', function (e) {
  e.preventDefault();
  hideModals();
  registerModal.classList.add('active');
});

// Evento de clique fora do modal para fechar
window.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal')) {
    hideModals();
  }
});

// Função para lidar com o login
async function handleLogin(email, password) {
  try {
    // Aqui você faria a chamada à API real
    // Exemplo com fetch:
    /*
    const response = await fetch('https://sua-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) throw new Error('Credenciais inválidas');
    
    const data = await response.json();
    */

    // Simulação de login bem-sucedido (remova isso na implementação real)
    console.log('Tentativa de login com:', email, password);
    alert('Login simulado com sucesso! Na implementação real, isso validaria com uma API.');

    // Fecha o modal após login bem-sucedido
    hideModals();

    // Atualiza a interface para mostrar que o usuário está logado
    loginBtn.textContent = 'Minha Conta';
    // Aqui você pode adicionar mais lógica pós-login

    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Falha no login: ' + error.message);
    return false;
  }
}

// Evento de submit do formulário de login
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Validação básica
  if (!email || !password) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  // Chama a função de login
  handleLogin(email, password);
});

// Função para mostrar o modal de cadastro
function showRegisterModal() {
  hideModals(); // Fecha outros modais abertos
  registerModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Evento para o botão de cadastro
registerBtn.addEventListener('click', showRegisterModal);

// Evento para o link "Faça login" dentro do modal de cadastro
showLogin.addEventListener('click', function (e) {
  e.preventDefault();
  hideModals();
  loginModal.classList.add('active');
});

// Função para validar o formulário de cadastro
function validateRegisterForm(name, email, password, confirmPassword) {
  // Validação básica dos campos
  if (!name || !email || !password || !confirmPassword) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return false;
  }

  // Validação de e-mail simples
  if (!email.includes('@') || !email.includes('.')) {
    alert('Por favor, insira um e-mail válido');
    return false;
  }

  // Verifica se as senhas coincidem
  if (password !== confirmPassword) {
    alert('As senhas não coincidem');
    return false;
  }

  // Verifica força da senha (pode ser mais robusto)
  if (password.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres');
    return false;
  }

  return true;
}

// Função para processar o cadastro
async function handleRegistration(userData) {
  try {
    // Simulação de cadastro (substitua pela chamada real à API)
    console.log('Dados para cadastro:', userData);

    // Exemplo com fetch (descomente e adapte para sua API):
    /*
    const response = await fetch('https://sua-api.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) throw new Error('Erro no cadastro');
    
    const data = await response.json();
    */

    // Simulação de sucesso
    alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.');

    // Fecha o modal e redireciona ou faz login automático
    hideModals();

    // Atualiza a interface
    registerBtn.textContent = 'Minha Conta';

    return true;
  } catch (error) {
    console.error('Erro no cadastro:', error);
    alert('Erro no cadastro: ' + error.message);
    return false;
  }
}

// Evento de submit do formulário de cadastro
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtém os valores dos campos
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const phone = document.getElementById('register-phone').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm').value;

  // Valida o formulário
  if (!validateRegisterForm(name, email, password, confirmPassword)) {
    return;
  }

  // Prepara os dados para envio
  const userData = {
    name,
    email,
    phone: phone || null, // Envia null se o telefone estiver vazio
    password
  };

  // Processa o cadastro
  handleRegistration(userData);
});

// Mostrar modal de reserva
// Estas funções controlam a exibição dos modais:
// showLoginModal() e showRegisterModal() simplesmente mostram seus respectivos modais.
// showBookingModal() primeiro verifica se há um destino selecionado, depois
// preenche os detalhes no modal antes de mostrá-lo.
function showBookingModal() {
  if (!currentDestination) return;

  bookingDetails.innerHTML = `
      <div class="destination-info">
          <h3>${currentDestination.name}</h3>
          <p><i class="fas fa-map-marker-alt"></i> ${currentDestination.location}</p>
          <p>${currentDestination.description}</p>
          <p><strong>Comodidades:</strong> ${currentDestination.amenities}</p>
          <p><strong>Preço por noite:</strong> R$ ${currentDestination.price.toFixed(2)}</p>
      </div>
  `;
  bookingModal.classList.add('active');  // Mostra o modal (ve se essa linha é aqui..)
}

// bookingModal.classList.add('active');  // Mostra o modal (ou aqui..)
// bookingModal // ou aqui

/*Este código demonstra vários conceitos importantes:
Manipulação do DOM (adicionar/remover elementos)
Event listeners (ouvintes de eventos)
Template literals (para criar strings com variáveis)
Trabalho com arrays e objetos
Organização de código em funções especializadas

Em uma aplicação real, você precisaria adicionar:
Event listeners para os botões de login/cadastro
alidação de formulários
Chamadas à API para buscar dados reais
Lógica para enviar reservas
 Tratamento de erros */

// Função para validar as datas
function validateDates(checkin, checkout) {
  if (!checkin || !checkout) {
    alert('Por favor, selecione ambas as datas');
    return false;
  }

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkinDate < today) {
    alert('A data de check-in não pode ser no passado');
    return false;
  }

  if (checkoutDate <= checkinDate) {
    alert('A data de check-out deve ser após o check-in');
    return false;
  }

  return true;
}

// Função para formatar a data (opcional)
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para realizar a busca
async function performSearch(searchParams) {
  try {
    // Simulação de busca (substitua pela chamada real à API)
    console.log('Parâmetros de busca:', searchParams);

    // Exemplo com fetch (descomente e adapte para sua API):
    /*
    const response = await fetch('https://sua-api.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    });
    
    if (!response.ok) throw new Error('Erro na busca');
    
    const data = await response.json();
    return data;
    */

    // Simulação de retorno de busca
    const mockResults = [
      {
        id: 101,
        name: "Hotel Exemplo em " + searchParams.destination,
        location: searchParams.destination,
        price: 300 + Math.floor(Math.random() * 200),
        image: "https://source.unsplash.com/random/300x200/?hotel", // https://images.unsplash.com/photo-1522708323590-d24dbb6b0267
        description: "Ótima opção para sua estadia em " + searchParams.destination,
        amenities: "Wi-Fi, Ar-condicionado, TV"
      }
      // Adicione mais resultados simulados se desejar
    ];

    return mockResults;
  } catch (error) {
    console.error('Erro na busca:', error);
    throw error;
  }
}

// Função para exibir os resultados
function displaySearchResults(results) {
  const destinationsContainer = document.getElementById('destinations-container');

  if (!results || results.length === 0) {
    destinationsContainer.innerHTML = '<p class="no-results">Nenhum resultado encontrado. Tente alterar seus critérios de busca.</p>';
    return;
  }

  destinationsContainer.innerHTML = '';

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
      <div class="destination-image" style="background-image: url('${result.image}')"></div>
      <div class="destination-info">
        <h3>${result.name}</h3>
        <div class="destination-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${result.location}</span>
        </div>
        <div class="destination-price">R$ ${result.price.toFixed(2)} <span>por noite</span></div>
        <button class="book-btn" data-id="${result.id}">Reservar</button>
      </div>
    `;
    destinationsContainer.appendChild(card);
  });
}

// Evento de clique no botão de busca
searchBtn.addEventListener('click', async function () {
  // Obtém os valores dos campos
  const destination = destinationInput.value.trim();
  const checkin = checkinInput.value;
  const checkout = checkoutInput.value;
  const guests = guestsSelect.value;

  // Validação básica
  if (!destination) {
    alert('Por favor, informe o destino');
    return;
  }

  if (!validateDates(checkin, checkout)) {
    return;
  }

  // Mostra feedback visual (opcional)
  searchBtn.disabled = true;
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';

  try {
    // Prepara os parâmetros de busca
    const searchParams = {
      destination,
      checkin,
      checkout,
      guests: parseInt(guests)
    };

    // Realiza a busca
    const results = await performSearch(searchParams);

    // Exibe os resultados
    displaySearchResults(results);

    // Feedback visual
    const resultsTitle = document.querySelector('.popular-destinations h2');
    if (resultsTitle) {
      resultsTitle.textContent = `Resultados para ${destination}`;
    }

  } catch (error) {
    alert('Ocorreu um erro na busca: ' + error.message);
  } finally {
    // Restaura o botão
    searchBtn.disabled = false;
    searchBtn.textContent = 'Buscar';
  }
});

// Evento para permitir busca ao pressionar Enter
destinationInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// 4. Explicação do Funcionamento

//     Seleção de Elementos:

//         Capturamos todos os campos do formulário de busca

//     Validação:

//         validateDates(): Verifica se as datas são válidas

//         Validação básica do destino

//     Processamento da Busca:

//         performSearch(): Simula/envia os parâmetros para o backend

//         Na implementação real, você faria uma chamada API aqui

//     Exibição de Resultados:

//         displaySearchResults(): Atualiza a lista de destinos com os resultados

//         Mostra mensagem quando não há resultados

//     Feedback Visual:

//         Botão muda durante o carregamento

//         Tratamento de erros com mensagens

// 5. Próximos Passos para Implementação Completa

//     Integração com Backend:

//         Substitua a simulação por chamadas reais à sua API

//         Implemente paginação para muitos resultados

//     Filtros Avançados:

//         Adicione filtros por preço, avaliação, comodidades

//         Implemente ordenação dos resultados

//     Melhorias de UX:

//         Adicione auto-complete para destinos

//         Implemente calendário interativo para seleção de datas

//     Histórico de Buscas:

//         Armazene buscas recentes

//         Permita fácil reutilização de buscas anteriores

//     Mapa de Resultados:

//         Mostre os resultados em um mapa (Google Maps, Mapbox)

//         Filtre por localização no mapa

// Esta implementação fornece uma base completa para o funcionamento da busca,
// desde a captura dos parâmetros até a exibição dos resultados, com validações
// e feedback para o usuário.