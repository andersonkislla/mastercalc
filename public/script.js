// Função para exibir mensagens de status
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
}

// Função para enviar o formulário de cadastro
document.getElementById('submit').addEventListener('click', async function () {
    const brand = document.getElementById('brand').value;
    const ecu_type = document.getElementById('ecu_type').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const procedure_script = document.getElementById('procedure_script').value;

    if (!brand || !ecu_type || !title || !procedure_script) {
        showStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    const procedureData = {
        brand,
        ecu_type,
        title,
        description,
        procedure_script
    };

    try {
        const response = await fetch('http://localhost:3000/api/procedures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(procedureData)
        });

        const result = await response.json();

        if (response.ok) {
            showStatus('Procedimento cadastrado com sucesso!', 'success');
            loadProcedures(); // Atualiza a lista após o cadastro
        } else {
            showStatus(result.error || 'Erro desconhecido ao cadastrar procedimento', 'error');
        }

    } catch (error) {
        console.error('Erro:', error);
        showStatus('Erro ao se comunicar com o servidor.', 'error');
    }
});

// Função para carregar e exibir os procedimentos cadastrados
async function loadProcedures() {
    try {
        const response = await fetch('http://localhost:3000/api/procedures');
        const procedures = await response.json();

        const procedureList = document.getElementById('procedure-list');
        procedureList.innerHTML = ''; // Limpar lista antes de atualizar

        procedures.forEach(procedure => {
            const procedureDiv = document.createElement('div');
            procedureDiv.classList.add('procedure-item');
            procedureDiv.innerHTML = `
                <h3>${procedure.title}</h3>
                <p><strong>Marca:</strong> ${procedure.brand}</p>
                <p><strong>Tipo de ECU:</strong> ${procedure.ecu_type}</p>
                <p><strong>Descrição:</strong> ${procedure.description}</p>
                <p><strong>Script:</strong><pre>${procedure.procedure_script}</pre></p>
            `;
            procedureList.appendChild(procedureDiv);
        });

    } catch (error) {
        console.error('Erro ao carregar procedimentos:', error);
    }
}

// Carregar os procedimentos quando a página for carregada
window.onload = loadProcedures;
