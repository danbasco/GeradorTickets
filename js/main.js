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
        window.location.href = '../pages/ticket.html';
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

    // Ação de submeter o formulário
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleFormSubmit);
    }
});

