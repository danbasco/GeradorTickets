/**  Salvando os Elementos da página HTML **/

// Index.html

document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const avatarInput = document.getElementById('avatarInput');
    const uploadInicialContainer = document.getElementById('uploadInicial');
    const atualizarAvatarContainer = document.getElementById('atualizarAvatar');
    
    const avatarPreview = document.getElementById('avatarPreview');
    
    const changeAvatarBtn = document.getElementById('changeAvatar');
    const removeAvatarBtn = document.getElementById('removeAvatar');
    
    const ticketForm = document.getElementById('ticketForm');

    // --- Funções ---

    /**
     * Simula o clique no input de arquivo para abrir o seletor de arquivos.
     */
    const triggerAvatarUpload = () => {
        avatarInput.click();
    };

    /**
     * Redefine o estado do upload de avatar para o inicial.
     */
    const resetAvatarUpload = () => {
        // Limpa o valor do input de arquivo
        avatarInput.value = ''; 
        
        // Alterna a visibilidade dos containers
        uploadInicialContainer.style.display = 'flex';
        atualizarAvatarContainer.style.display = 'none';
    };

    /**
     * Lida com a seleção de um novo arquivo de avatar.
     * @param {Event} event - O evento de mudança do input.
     */
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            // Atualiza a imagem de preview
            avatarPreview.src = e.target.result;

            // Alterna a visibilidade dos containers
            uploadInicialContainer.style.display = 'none';
            atualizarAvatarContainer.style.display = 'flex';
        };

        reader.readAsDataURL(file);
    };

    /**
     * Lida com a submissão do formulário para gerar o ticket.
     * @param {Event} event - O evento de submissão do formulário.
     */
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const githubUsername = document.getElementById('githubUsername').value;
        const avatarSrc = avatarPreview.src;

        // Armazena os dados no localStorage para a próxima página
        localStorage.setItem('ticketData', JSON.stringify({
            fullName,
            email,
            githubUsername,
            avatarSrc
        }));

        // Redireciona para a página do ticket
    window.location.href = 'pages/ticket.html';
    };

    // --- Event Listeners ---

    // Gatilhos para abrir o seletor de arquivos
    if (uploadInicialContainer) {
        uploadInicialContainer.addEventListener('click', triggerAvatarUpload);
    }
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', triggerAvatarUpload);
    }

    // Ação de remover avatar
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', resetAvatarUpload);
    }

    // Ação ao selecionar um arquivo
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarChange);
    }

    // --- Drag and Drop Events ---
    if (uploadInicialContainer) {
        // Adiciona um feedback visual quando um arquivo é arrastado sobre o container
        uploadInicialContainer.addEventListener('dragover', (event) => {
            event.preventDefault(); // Previne o comportamento padrão
            uploadInicialContainer.style.borderColor = '#8844ee'; // Muda a cor da borda para indicar uma área válida
        });

        // Remove o feedback visual quando o arquivo sai da área
        uploadInicialContainer.addEventListener('dragleave', () => {
            uploadInicialContainer.style.borderColor = ''; // Restaura a cor original da borda
        });

        // Lida com o arquivo quando ele é solto na área
        uploadInicialContainer.addEventListener('drop', (event) => {
            event.preventDefault(); // Previne que o navegador abra o arquivo
            uploadInicialContainer.style.borderColor = ''; // Restaura a cor da borda

            const files = event.dataTransfer.files;
            if (files.length > 0) {
                // Coloca o arquivo solto no nosso input de arquivo
                avatarInput.files = files;
                
                // Dispara o evento 'change' no input manualmente para reusar a lógica existente
                const changeEvent = new Event('change', { bubbles: true });
                avatarInput.dispatchEvent(changeEvent);
            }
        });
    }

    // Ação de submeter o formulário
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleFormSubmit);
    }

    /*
    ================================================================================
    == EXEMPLOS EDUCATIVOS: VALIDAÇÕES E ERROS ==
    ================================================================================

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como altero para validar que a pessoa escreveu apenas o primeiro nome (sem regex)?
    // --------------------------------------------------------------------------------
    // const isFirstNameOnly = (name) => {
    //     const n = (name || '').trim();
    //     return n.length > 0 && !n.includes(' ');
    // };

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como altero para validar que escreveu nome e sobrenome (considerando que utilize apenas um campo de input para isso e sem regex)?
    // --------------------------------------------------------------------------------
    // const isFullName = (name) => {
    //     const parts = (name || '').trim().split(' ').filter(Boolean);
    //     return parts.length >= 2;
    // };

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como posso alterar minha página para mover a validação de erro para que ela seja apresentada de uma forma diferente?
    // --------------------------------------------------------------------------------

    // // A validação aparecer em vermelho, abaixo do campo de input (diretamente na página).
    // const showErrorBelow = (inputEl, message) => {
    //     const errorDiv = document.createElement('div');
    //     errorDiv.className = 'field-error-message';
    //     errorDiv.style.color = '#ff5252';
    //     errorDiv.style.marginTop = '4px';
    //     errorDiv.textContent = message;
    //     inputEl.insertAdjacentElement('afterend', errorDiv);
    // };

    // // A validação aparecer em vermelho, acima do campo de input (diretamente na página).
    // const showErrorAbove = (inputEl, message) => {
    //     const errorDiv = document.createElement('div');
    //     errorDiv.className = 'field-error-message';
    //     errorDiv.style.color = '#ff5252';
    //     errorDiv.style.marginBottom = '4px';
    //     errorDiv.textContent = message;
    //     inputEl.insertAdjacentElement('beforebegin', errorDiv);
    // };

    // // A validação aparecer como um alert().
    // const showErrorAsAlert = (message) => {
    //     alert(message);
    // };

    // // A validação aparecer como um toast no canto superior direito da página.
    // // Requer biblioteca externa, ex: Toastify.js
    // // HTML: <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    // const showErrorAsToast = (message) => {
    //     if (window.Toastify) {
    //         Toastify({ text: message, duration: 3000, gravity: "top", position: "right" }).showToast();
    //     } else {
    //         alert(message); // Fallback
    //     }
    // };

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como altero para validar que o usuário escreveu o "@" do GitHub?
    // --------------------------------------------------------------------------------
    // const githubUsernameValue = document.getElementById('githubUsername').value;
    // if (!githubUsernameValue.startsWith('@')) {
    //     // Exibiria erro aqui
    // }

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como altero para validar que o usuário não escreveu o "@" do GitHub, e o adicionarmos automaticamente?
    // --------------------------------------------------------------------------------
    // let githubHandle = document.getElementById('githubUsername').value;
    // if (!githubHandle.startsWith('@')) {
    //     githubHandle = '@' + githubHandle;
    // }

    // --------------------------------------------------------------------------------
    // PERGUNTA: Como altero para, independente de se o usuário escreveu o "@" do GitHub ou não, ele ser apresentado e não aparecer duplicado?
    // --------------------------------------------------------------------------------
    // const normalizeGithubUsername = (rawUsername) => {
    //     const username = (rawUsername || '').trim();
    //     const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
    //     return cleanUsername;
    // };
    // // Uso:
    // // const cleanGithub = normalizeGithubUsername(github_input_value);
    // // Para salvar: localStorage.setItem('github', cleanGithub);
    // // Para exibir: '@' + localStorage.getItem('github');

    */
});

