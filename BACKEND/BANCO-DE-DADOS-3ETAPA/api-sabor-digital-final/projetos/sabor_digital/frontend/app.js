// A URL base onde seu backend Node.js + Express está escutando
const API_URL = 'http://localhost:3000';

// ----------------------------------------------------
// 1. MAPEAMENTO DE ELEMENTOS DA TELA
// ----------------------------------------------------
// Capturamos os elementos do HTML pelo ID ou classe usando o DOM.
const productsGrid = document.getElementById('products-grid');
const modal = document.getElementById('modal');
const btnNovoProduto = document.getElementById('btn-novo-produto');
const closeBtn = document.querySelector('.close-btn');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');

// Elementos de Login
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const modalLogin = document.getElementById('modal-login');
const closeLoginBtn = document.getElementById('close-login-btn');
const loginForm = document.getElementById('login-form');

// Elementos de Registro
const btnRegistrar = document.getElementById('btn-registrar');
const modalRegistrar = document.getElementById('modal-registrar');
const closeRegistrarBtn = document.getElementById('close-registrar-btn');
const registrarForm = document.getElementById('registrar-form');

// Variáveis de estado global (Token JWT e Papel)
let tokenJWT = localStorage.getItem('token') || null;
let usuarioPapel = localStorage.getItem('papel') || null;

// ----------------------------------------------------
// 2. INICIALIZAÇÃO E EVENTOS
// ----------------------------------------------------
// Assim que a tela termina de ser montada no navegador, chamamos a função para trazer do BD os produtos.
document.addEventListener('DOMContentLoaded', () => {
    verificarLogin();
    carregarProdutos();
});

// Ao clicar no botão 'Novo Produto', chama a função de Abrir o formulário Modal
btnNovoProduto.addEventListener('click', () => abrirModal());

// Ao clicar no botão X ou fora da tela do modal (no escuro), esconde o form.
closeBtn.addEventListener('click', fecharModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

// Intercepta quando o usuário aperta o botão 'Salvar' (O Form faria a tela recarregar por padrão)
productForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a tela de piscar e apagar os dados preenchidos
    await salvarProduto(); // Envia via Ajax (Fetch API) para o Backend
});

// ----------------------------------------------------
// EVENTOS DE LOGIN
// ----------------------------------------------------
btnLogin.addEventListener('click', () => modalLogin.classList.remove('hidden'));
closeLoginBtn.addEventListener('click', () => modalLogin.classList.add('hidden'));
btnLogout.addEventListener('click', () => fazerLogout());

btnRegistrar.addEventListener('click', () => modalRegistrar.classList.remove('hidden'));
closeRegistrarBtn.addEventListener('click', () => modalRegistrar.classList.add('hidden'));

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await fazerLogin();
});

registrarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await fazerRegistro();
});

// ----------------------------------------------------
// 2.5 FUNÇÕES DE AUTENTICAÇÃO
// ----------------------------------------------------
function verificarLogin() {
    if (tokenJWT && usuarioPapel === 'admin') {
        btnNovoProduto.classList.remove('hidden');
        btnLogout.classList.remove('hidden');
        btnLogin.classList.add('hidden');
        btnRegistrar.classList.add('hidden');
    } else {
        btnNovoProduto.classList.add('hidden');
        btnLogout.classList.add('hidden');
        btnLogin.classList.remove('hidden');
        btnRegistrar.classList.remove('hidden');
    }
}

async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (data.sucesso) {
            tokenJWT = data.token;
            usuarioPapel = data.usuario.papel;
            localStorage.setItem('token', tokenJWT);
            localStorage.setItem('papel', usuarioPapel);
            
            modalLogin.classList.add('hidden');
            loginForm.reset();
            verificarLogin();
            carregarProdutos(); // recarrega para mostrar os botões de edição
        } else {
            alert("Erro de Login: " + (data.mensagem || "Credenciais inválidas"));
        }
    } catch (err) {
        alert("Falha na comunicação com o servidor.");
    }
}

function fazerLogout() {
    tokenJWT = null;
    usuarioPapel = null;
    localStorage.removeItem('token');
    localStorage.removeItem('papel');
    verificarLogin();
    carregarProdutos(); // recarrega para esconder os botões de edição
}

async function fazerRegistro() {
    const nome = document.getElementById('reg-nome').value;
    const email = document.getElementById('reg-email').value;
    const senha = document.getElementById('reg-senha').value;
    const papel = document.getElementById('reg-papel').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, papel })
        });
        
        const data = await response.json();
        
        if (response.ok || data.sucesso) {
            alert("Conta criada com sucesso! Você já pode fazer login.");
            modalRegistrar.classList.add('hidden');
            registrarForm.reset();
            // Opcional: já abrir o modal de login automaticamente
            modalLogin.classList.remove('hidden');
        } else {
            alert("Erro ao registrar: " + (data.mensagem || data.erro || "Falha no cadastro"));
        }
    } catch (err) {
        alert("Falha na comunicação com o servidor.");
    }
}

// ----------------------------------------------------
// 3. FUNÇÃO: LISTAR PRODUTOS (GET)
// ----------------------------------------------------
async function carregarProdutos() {
    try {
        // Envia requisição para a rota GET /produtos
        const response = await fetch(`${API_URL}/produtos`);
        const data = await response.json();
        
        // Pega o array de produtos. (Nossa API enviava a lista num objeto 'dados')
        const produtos = data.dados || data;

        // Pede para jogar os dados na tela
        renderizarProdutos(produtos);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        productsGrid.innerHTML = '<p style="grid-column: span 3; text-align: center; color: red;">Não foi possível conectar com a API. Verifique se o servidor Node está rodando.</p>';
    }
}

// ----------------------------------------------------
// 4. FUNÇÃO: DESENHAR PRODUTOS NA TELA (DOM MANIPULATION)
// ----------------------------------------------------
function renderizarProdutos(produtos) {
    productsGrid.innerHTML = ''; // Limpa a grade antes de preencher, para não duplicar

    if (!produtos || produtos.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: span 3; text-align: center; color: #666;">Nenhum produto cadastrado na base de dados.</p>';
        return;
    }

    // Para cada Produto do array, criamos um HTML
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Verificamos se o produto tem imagem associada.
        let imgHtml = '<div class="card-img-placeholder">Sem Imagem</div>';
        if (produto.imagem) {
            // A API já envia o caminho da imagem com o prefixo "/public/", 
            // Então juntamos URL Base + /public/uploads/produtos/...
            imgHtml = `<img src="${API_URL}${produto.imagem}" alt="${produto.nome}">`;
        }

        // Formata o Preço (número) para o padrão R$ 00,00 da moeda brasileira
        const precoFormatado = Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Só renderiza botões de edição se for admin logado
        let actionsHtml = '';
        if (tokenJWT && usuarioPapel === 'admin') {
            actionsHtml = `
                <div class="card-actions">
                    <button class="btn edit" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn danger" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            `;
        }

        // Montamos o design do card mesclando texto estático HTML com as variáveis do JS
        card.innerHTML = `
            <div class="card-img-container">
                ${imgHtml}
            </div>
            <div class="card-content">
                <h3 class="card-title">${produto.nome}</h3>
                <p class="card-desc">${produto.descricao}</p>
                <div class="card-price">${precoFormatado}</div>
                ${actionsHtml}
            </div>
        `;
        productsGrid.appendChild(card); // Insere a caixinha HTML criada no final da tela
    });
}

// ----------------------------------------------------
// 5. FUNÇÃO: ABRIR FORMULÁRIO (E Preencher se for Edição)
// ----------------------------------------------------
function abrirModal(produto = null) {
    // Aponta para os inputs na tela
    const idInput = document.getElementById('produto-id');
    const nomeInput = document.getElementById('nome');
    const descInput = document.getElementById('descricao');
    const precoInput = document.getElementById('preco');
    const catInput = document.getElementById('categoria');
    const dispInput = document.getElementById('disponivel');

    // Limpa o que tiver digitado antes
    productForm.reset();
    
    // Se recebeu um produto como parâmetro, significa que o usuário apertou "Editar"
    if (produto) {
        modalTitle.textContent = 'Editar Produto';
        
        // Joga as variáveis do banco pros inputs ficarem preenchidos
        idInput.value = produto.id;
        nomeInput.value = produto.nome;
        descInput.value = produto.descricao;
        precoInput.value = produto.preco;
        catInput.value = produto.categoria || '';
        dispInput.checked = produto.disponivel;
        // Imagem não é recarregada por questão de segurança dos browsers. Se ficar vazio não atualiza a imagem, apenas mantêm a que tava.
    } else {
        // Se for produto novo, garante q o formulário é sobre inserção
        modalTitle.textContent = 'Cadastrar Produto';
        idInput.value = '';
    }

    modal.classList.remove('hidden'); // Faz a classe CSS que deixava a opacidade no 0 sumir, mostrando a caixa.
}

function fecharModal() {
    modal.classList.add('hidden'); // Esconde o modal 
}

// ----------------------------------------------------
// 6. FUNÇÃO: INSERIR OU ATUALIZAR (POST / PUT) COM FOTO
// ----------------------------------------------------
async function salvarProduto() {
    const id = document.getElementById('produto-id').value;
    const isEdit = !!id; // Se o ID existir, é uma edição.
    
    // Como a API usa MULTER para receber arquivos, nós somos OBRIGADOS a usar o FormData() nativo.
    // Não podemos enviar em JSON ({ nome: "..." }) pois JSON não transporta imagens de forma eficiente.
    const formData = new FormData();
    formData.append('nome', document.getElementById('nome').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('preco', document.getElementById('preco').value);
    formData.append('categoria', document.getElementById('categoria').value);
    formData.append('disponivel', document.getElementById('disponivel').checked);
    
    // Captura o arquivo de fato que foi escolhido da pasta local
    const fileInput = document.getElementById('imagem');
    if (fileInput.files.length > 0) {
        formData.append('imagem', fileInput.files[0]); // A chave 'imagem' é justamente a que o router upload.single('imagem') lê no node.
    }

    // Identifica se vai pra rota de POST (Cadastrar) ou PUT (Editar que pede ID na rota)
    const url = isEdit ? `${API_URL}/produtos/${id}` : `${API_URL}/produtos`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${tokenJWT}`
            },
            body: formData // Não precisa de "Content-Type", o fetch bota automático pelo FormData para multipart.
        });

        const data = await response.json();
        
        // Confere se o back-end devolveu Status 200/201
        if (response.ok || data.sucesso) {
            fecharModal(); // Fecha a caixinha
            carregarProdutos(); // Dá um "refresh" chamando os dados lá da api denovo.
        } else {
            alert("Erro: " + (data.mensagem || data.erro || "Desconhecido"));
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro de conexão ao tentar salvar.");
    }
}

// ----------------------------------------------------
// 7. FUNÇÃO: BUSCAR 1 E JOGAR NA TELA (GET /id)
// ----------------------------------------------------
window.editarProduto = async function(id) {
    try {
        // Vai na API buscar os dados desse ID exato para não usarmos dados velhos da grid.
        const response = await fetch(`${API_URL}/produtos/${id}`);
        const data = await response.json();
        const produto = data.dados || data;
        
        abrirModal(produto); // Manda o form se abrir
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
    }
}

// ----------------------------------------------------
// 8. FUNÇÃO: EXCLUIR (DELETE)
// ----------------------------------------------------
window.excluirProduto = async function(id) {
    // Validação pro usuário não apagar acidentalmente
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            const response = await fetch(`${API_URL}/produtos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenJWT}`
                }
            });
            if (response.ok) {
                carregarProdutos(); // Se der sucesso, recarrega a grid limpando a foto e os dados mortos
            } else {
                const data = await response.json();
                alert("Erro ao excluir: " + (data.mensagem || data.erro));
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
}
