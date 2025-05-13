const initialEquipments = [
  { id: 1, type: 'Empilhadeira', name: 'Empilhadeira 01', status: 'Disponível', history: [], hourmeter: 100 },
  { id: 2, type: 'Empilhadeira', name: 'Empilhadeira 02', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS007', responsible: 'João', date: '05/05/2025 09:00:00' }], hourmeter: 150 },
  { id: 3, type: 'Empilhadeira', name: 'Empilhadeira 03', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS001', responsible: 'Maria', reason: 'Falha mecânica', justification: 'Motor superaquecido', date: '08/05/2025 10:00:00' }], hourmeter: 200 },
  { id: 4, type: 'Empilhadeira', name: 'Empilhadeira 04', status: 'Inspeção', history: [{ type: 'inspection', os: 'OS008', responsible: 'Pedro', date: '06/05/2025 14:00:00' }], hourmeter: 120 },
  { id: 5, type: 'Guindaste Rodoviário', name: 'Guindaste Rodoviário 01', status: 'Disponível', history: [{ type: 'scheduled_maintenance', os: 'OS009', responsible: 'Ana', scheduledDate: '15/05/2025 08:00:00' }], hourmeter: 300 },
  { id: 6, type: 'Guindaste Rodoviário', name: 'Guindaste Rodoviário 02', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS010', responsible: 'Lucas', date: '04/05/2025 11:00:00' }], hourmeter: 250 },
  { id: 7, type: 'Guindaste Rodoviário', name: 'Guindaste Rodoviário 03', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS002', responsible: 'Ana', reason: 'Problema elétrico', justification: 'Curto-circuito', date: '06/05/2025 12:00:00' }], hourmeter: 180 },
  { id: 8, type: 'Guindaste Rodoviário', name: 'Guindaste Rodoviário 04', status: 'Inspeção', history: [{ type: 'inspection', os: 'OS011', responsible: 'Clara', date: '07/05/2025 13:00:00' }], hourmeter: 140 },
  { id: 9, type: 'Guindaste Portuário', name: 'Guindaste Portuário 01', status: 'Disponível', history: [], hourmeter: 400 },
  { id: 10, type: 'Guindaste Portuário', name: 'Guindaste Portuário 02', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS012', responsible: 'Rafael', date: '03/05/2025 10:00:00' }], hourmeter: 350 },
  { id: 11, type: 'Guindaste Portuário', name: 'Guindaste Portuário 03', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS003', responsible: 'Lucas', reason: 'Avaria', justification: 'Dano na estrutura', date: '05/05/2025 08:00:00' }], hourmeter: 320 },
  { id: 12, type: 'Caminhão Truck', name: 'Caminhão Truck 01', status: 'Disponível', history: [{ type: 'scheduled_inspection', os: 'OS013', responsible: 'Sofia', scheduledDate: '20/05/2025 09:00:00' }], hourmeter: 90 },
  { id: 13, type: 'Caminhão Truck', name: 'Caminhão Truck 02', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS014', responsible: 'João', date: '02/05/2025 15:00:00' }], hourmeter: 110 },
  { id: 14, type: 'Carreta', name: 'Carreta 01', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS004', responsible: 'Clara', reason: 'Pneu furado', justification: 'Pneu dianteiro estourado', date: '07/05/2025 15:00:00' }], hourmeter: 80 },
  { id: 15, type: 'Carreta', name: 'Carreta 02', status: 'Inspeção', history: [{ type: 'inspection', os: 'OS015', responsible: 'Pedro', date: '05/05/2025 16:00:00' }], hourmeter: 100 },
  { id: 16, type: 'Carreta', name: 'Carreta 03', status: 'Disponível', history: [], hourmeter: 70 },
  { id: 17, type: 'Prancha Baixa', name: 'Prancha Baixa 01', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS016', responsible: 'Ana', date: '01/05/2025 12:00:00' }], hourmeter: 60 },
  { id: 18, type: 'Prancha Baixa', name: 'Prancha Baixa 02', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS005', responsible: 'Rafael', reason: 'Problema hidráulico', justification: 'Vazamento no sistema', date: '08/05/2025 11:00:00' }], hourmeter: 50 },
  { id: 19, type: 'Linha de Eixo', name: 'Linha de Eixo 01', status: 'Disponível', history: [], hourmeter: 40 },
  { id: 20, type: 'Traquitana', name: 'Traquitana 01', status: 'Inspeção', history: [{ type: 'inspection', os: 'OS017', responsible: 'Lucas', date: '04/05/2025 14:00:00' }], hourmeter: 30 },
  { id: 21, type: 'Traquitana', name: 'Traquitana 02', status: 'Disponível', history: [], hourmeter: 20 },
  { id: 22, type: 'Bote', name: 'Bote 01', status: 'Manutenção', history: [{ type: 'maintenance', os: 'OS018', responsible: 'Sofia', date: '06/05/2025 10:00:00' }], hourmeter: 10 },
  { id: 23, type: 'Bote', name: 'Bote 02', status: 'Indisponível', history: [{ type: 'unavailability', os: 'OS006', responsible: 'Sofia', reason: 'Motor danificado', justification: 'Falha no motor de popa', date: '06/05/2025 13:00:00' }], hourmeter: 15 }
];

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 5000);
  }
  console.error('Erro:', message);
}

function showSuccess(message) {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('hidden'), 5000);
  }
  console.log('Sucesso:', message);
}

function loadEquipments() {
  try {
    const saved = localStorage.getItem('equipments');
    if (!saved) {
      console.log('Nenhum dado de equipamentos no localStorage, usando initialEquipments');
      return initialEquipments;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(eq => eq.id && eq.name && eq.type && eq.status && Array.isArray(eq.history) && typeof eq.hourmeter === 'number')) {
      console.warn('Dados de equipamentos inválidos, usando initialEquipments');
      showError('Dados de equipamentos inválidos. Usando dados padrão.');
      return initialEquipments;
    }
    console.log('Equipamentos carregados do localStorage:', parsed.length, 'itens');
    return parsed;
  } catch (e) {
    showError('Erro ao carregar equipamentos: ' + e.message);
    console.error('Erro em loadEquipments:', e);
    return initialEquipments;
  }
}

function saveEquipments(equipments) {
  try {
    if (!Array.isArray(equipments)) {
      throw new Error('Equipments deve ser um array');
    }
    localStorage.setItem('equipments', JSON.stringify(equipments));
    console.log('Equipamentos salvos:', equipments.length, 'itens');
  } catch (e) {
    showError('Erro ao salvar equipamentos: ' + e.message);
    console.error('Erro em saveEquipments:', e);
  }
}

function loadUsers() {
  try {
    const saved = localStorage.getItem('registeredUsers');
    if (!saved) {
      console.log('Nenhum dado de usuários no localStorage, usando padrão');
      return [
        { username: 'Maria Souza', password: 'senha123', type: 'operacao' },
        { username: 'João Silva', password: 'admin456', type: 'admin' },
        { username: 'Ana Costa', password: 'operacao789', type: 'operacao' }
      ];
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      console.warn('Dados de usuários não são um array, usando padrão');
      return [
        { username: 'Maria Souza', password: 'senha123', type: 'operacao' },
        { username: 'João Silva', password: 'admin456', type: 'admin' },
        { username: 'Ana Costa', password: 'operacao789', type: 'operacao' }
      ];
    }
    console.log('Usuários carregados:', parsed.length, 'itens');
    return parsed;
  } catch (e) {
    showError('Erro ao carregar usuários: ' + e.message);
    console.error('Erro em loadUsers:', e);
    return [
      { username: 'Maria Souza', password: 'senha123', type: 'operacao' },
      { username: 'João Silva', password: 'admin456', type: 'admin' },
      { username: 'Ana Costa', password: 'operacao789', type: 'operacao' }
    ];
  }
}

function saveUsers(users) {
  try {
    if (!Array.isArray(users)) {
      throw new Error('Users deve ser um array');
    }
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    console.log('Usuários salvos:', users.length, 'itens');
  } catch (e) {
    showError('Erro ao salvar usuários: ' + e.message);
    console.error('Erro em saveUsers:', e);
  }
}

function populateUserSelect() {
  const userSelect = document.getElementById('user-to-remove');
  if (!userSelect) {
    showError('Elemento user-to-remove não encontrado.');
    return;
  }
  const users = loadUsers();
  userSelect.innerHTML = '<option value="">Selecione um usuário</option>';
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.username;
    option.textContent = user.username;
    userSelect.appendChild(option);
  });
  console.log('Select de usuários preenchido:', users.length, 'itens');
}

function logout() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userType');
  console.log('Logout realizado');
  window.location.href = 'index.html';
}

function clearHistory() {
  if (!confirm('Tem certeza que deseja zerar o histórico de todos os equipamentos? Esta ação não pode ser desfeita.')) {
    return;
  }
  try {
    const equipments = loadEquipments();
    if (!Array.isArray(equipments) || equipments.length === 0) {
      showError('Nenhum equipamento encontrado para zerar o histórico.');
      return;
    }
    const updatedEquipments = equipments.map(eq => ({ ...eq, history: [], status: eq.status === 'Disponível' ? eq.status : 'Disponível' }));
    saveEquipments(updatedEquipments);
    showSuccess('Histórico zerado com sucesso.');
    renderHistoryRecords();
  } catch (e) {
    showError('Erro ao zerar histórico: ' + e.message);
    console.error('Erro em clearHistory:', e);
  }
}

function addEquipment() {
  const name = document.getElementById('equip-name').value.trim();
  const type = document.getElementById('equip-type').value.trim();
  const status = document.getElementById('equip-status').value;
  const hourmeter = parseInt(document.getElementById('equip-hourmeter').value) || 0;

  if (!name || !type) {
    showError('Por favor, preencha todos os campos obrigatórios (Nome e Tipo).');
    return;
  }
  if (hourmeter < 0) {
    showError('Horímetro não pode ser negativo.');
    return;
  }

  try {
    const equipments = loadEquipments();
    const maxId = equipments.length > 0 ? Math.max(...equipments.map(eq => eq.id)) : 0;
    const newEquipment = {
      id: maxId + 1,
      name,
      type,
      status,
      history: [],
      hourmeter
    };
    equipments.push(newEquipment);
    saveEquipments(equipments);
    showSuccess('Equipamento adicionado com sucesso.');
    document.getElementById('equip-name').value = '';
    document.getElementById('equip-type').value = '';
    document.getElementById('equip-status').value = 'Disponível';
    document.getElementById('equip-hourmeter').value = '';
    renderHistoryRecords();
  } catch (e) {
    showError('Erro ao adicionar equipamento: ' + e.message);
    console.error('Erro em addEquipment:', e);
  }
}

function addUser() {
  const username = document.getElementById('user-username').value.trim();
  const password = document.getElementById('user-password').value.trim();
  const type = document.getElementById('user-type').value;

  if (!username || !password) {
    showError('Por favor, preencha todos os campos obrigatórios (Usuário e Senha).');
    return;
  }

  try {
    const users = loadUsers();
    if (users.some(u => u.username === username)) {
      showError('Usuário já existe.');
      return;
    }
    users.push({ username, password, type });
    saveUsers(users);
    showSuccess('Usuário adicionado com sucesso.');
    document.getElementById('user-username').value = '';
    document.getElementById('user-password').value = '';
    document.getElementById('user-type').value = 'operacao';
    populateUserSelect();
  } catch (e) {
    showError('Erro ao adicionar usuário: ' + e.message);
    console.error('Erro em addUser:', e);
  }
}

function removeUser() {
  const username = document.getElementById('user-to-remove').value;
  if (!username) {
    showError('Por favor, selecione um usuário para remover.');
    return;
  }
  if (!confirm(`Tem certeza que deseja remover o usuário "${username}"? Esta ação não pode ser desfeita.`)) {
    return;
  }
  try {
    const users = loadUsers();
    const initialLength = users.length;
    const updatedUsers = users.filter(u => u.username !== username);
    if (updatedUsers.length === initialLength) {
      showError('Usuário não encontrado.');
      return;
    }
    saveUsers(updatedUsers);
    showSuccess('Usuário removido com sucesso.');
    populateUserSelect();
  } catch (e) {
    showError('Erro ao remover usuário: ' + e.message);
    console.error('Erro em removeUser:', e);
  }
}

function renderHistoryRecords() {
  const tbody = document.getElementById('history-records');
  if (!tbody) {
    showError('Elemento history-records não encontrado no DOM.');
    return;
  }
  try {
    const equipments = loadEquipments();
    console.log('Renderizando registros, equipamentos carregados:', equipments.length);
    let records = [];
    equipments.forEach(eq => {
      console.log('Processando equipamento:', eq.name, 'Histórico:', eq.history);
      if (!Array.isArray(eq.history)) {
        console.warn('Histórico inválido para equipamento:', eq.name);
        return;
      }
      eq.history.forEach((event, index) => {
        records.push({
          equipmentId: eq.id,
          eventIndex: index,
          equipmentName: eq.name || 'N/A',
          date: event.date || event.scheduledDate || 'N/A',
          reason: event.reason || event.type || 'N/A',
          type: event.type || 'N/A'
        });
      });
    });
    console.log('Registros encontrados:', records.length);
    tbody.innerHTML = '';
    if (records.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="px-2 py-1 text-center text-gray-600 text-sm">Nenhum registro encontrado.</td></tr>';
      console.log('Nenhum registro para renderizar.');
      return;
    }
    records.forEach(record => {
      const row = document.createElement('tr');
      const recordId = `${record.equipmentId}_${record.eventIndex}`;
      row.innerHTML = `
        <td class="px-2 py-1 border"><input type="checkbox" class="record-checkbox" data-id="${recordId}"></td>
        <td class="px-2 py-1 border">${record.equipmentName}</td>
        <td class="px-2 py-1 border">${record.date}</td>
        <td class="px-2 py-1 border">${record.reason}</td>
        <td class="px-2 py-1 border">${record.type}</td>
        <td class="px-2 py-1 border">
          <button onclick="deleteSingleRecord('${recordId}')" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    console.log('Registros renderizados:', records.length, 'itens');
  } catch (e) {
    showError('Erro ao renderizar registros: ' + e.message);
    console.error('Erro em renderHistoryRecords:', e);
  }
}

function toggleSelectAll() {
  const selectAll = document.getElementById('select-all');
  const checkboxes = document.querySelectorAll('.record-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAll.checked;
  });
}

function deleteSelectedRecords() {
  const checkboxes = document.querySelectorAll('.record-checkbox:checked');
  if (checkboxes.length === 0) {
    showError('Nenhum registro selecionado para exclusão.');
    return;
  }
  if (!confirm(`Tem certeza que deseja excluir ${checkboxes.length} registro(s)? Esta ação não pode ser desfeita.`)) {
    return;
  }
  try {
    const recordIds = Array.from(checkboxes).map(cb => cb.getAttribute('data-id'));
    const equipments = loadEquipments();
    recordIds.forEach(recordId => {
      const [equipmentId, eventIndex] = recordId.split('_').map(Number);
      const equipment = equipments.find(eq => eq.id === equipmentId);
      if (equipment && equipment.history[eventIndex]) {
        equipment.history.splice(eventIndex, 1);
      }
    });
    saveEquipments(equipments);
    showSuccess('Registros excluídos com sucesso.');
    renderHistoryRecords();
  } catch (e) {
    showError('Erro ao excluir registros: ' + e.message);
    console.error('Erro em deleteSelectedRecords:', e);
  }
}

function deleteSingleRecord(recordId) {
  if (!confirm('Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.')) {
    return;
  }
  try {
    const [equipmentId, eventIndex] = recordId.split('_').map(Number);
    const equipments = loadEquipments();
    const equipment = equipments.find(eq => eq.id === equipmentId);
    if (equipment && equipment.history[eventIndex]) {
      equipment.history.splice(eventIndex, 1);
      saveEquipments(equipments);
      showSuccess('Registro excluído com sucesso.');
      renderHistoryRecords();
    } else {
      showError('Registro não encontrado.');
    }
  } catch (e) {
    showError('Erro ao excluir registro: ' + e.message);
    console.error('Erro em deleteSingleRecord:', e);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded disparado, inicializando página');
  renderHistoryRecords();
  populateUserSelect();
});