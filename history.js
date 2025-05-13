window.escapeHtml = function(str) {
  if (typeof str !== 'string' || !str) return 'N/A';
  return str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '\'').replace(/\n/g, '').replace(/\r/g, '');
};

window.pendingErrors = [];
window.showError = function(message) {
  if (document.getElementById('error-message')) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 5000);
  } else {
    window.pendingErrors.push(message);
  }
  console.error('Erro:', message);
};

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

window.loadEquipments = function() {
  try {
    const saved = localStorage.getItem('equipments');
    if (!saved) {
      console.log('Nenhum dado no localStorage, usando initialEquipments');
      return initialEquipments;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(eq => eq.id && eq.name && eq.type && eq.status && Array.isArray(eq.history) && typeof eq.hourmeter === 'number')) {
      window.showError('Dados de equipamentos inválidos. Usando dados padrão.');
      return initialEquipments;
    }
    console.log('Equipamentos carregados do localStorage:', parsed.length, 'itens');
    return parsed;
  } catch (e) {
    window.showError('Erro ao carregar equipamentos: ' + e.message);
    return initialEquipments;
  }
};

window.logout = function() {
  localStorage.removeItem('userType');
  console.log('Logout realizado');
  window.location.href = 'index.html';
};

window.renderHistoryList = function() {
  const historyList = document.querySelector('#history-list .bg-white');
  if (!historyList) {
    window.showError('Elemento history-list não encontrado no DOM.');
    return;
  }
  try {
    window.equipments = window.loadEquipments();
    if (!Array.isArray(window.equipments)) {
      window.showError('window.equipments não é um array válido.');
      return;
    }
    historyList.innerHTML = '';
    let html = '';
    const equipmentsWithHistory = window.equipments.filter(eq => Array.isArray(eq.history) && eq.history.length > 0);
    if (equipmentsWithHistory.length === 0) {
      html += '<p class="text-gray-600">Nenhuma ocorrência registrada.</p>';
      historyList.innerHTML = html;
      console.log('Nenhum histórico de ocorrências para renderizar.');
      return;
    }
    for (const eq of equipmentsWithHistory) {
      html += '<div class="mb-4 border-b pb-4">';
      html += '<h3 class="text-lg font-semibold">' + window.escapeHtml(eq.name || 'N/A') + ' (' + window.escapeHtml(eq.type || 'N/A') + ')</h3>';
      let events = eq.history.map(event => ({
        date: event.date || event.scheduledDate || 'N/A',
        reason: event.reason || event.type || 'N/A'
      }));
      events.sort((a, b) => {
        const dateA = a.date !== 'N/A' ? new Date(a.date) : new Date(0);
        const dateB = b.date !== 'N/A' ? new Date(b.date) : new Date(0);
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        return dateB - dateA;
      });
      html += '<ul class="list-disc pl-5 mt-2 space-y-2">';
      for (const event of events) {
        html += '<li>';
        html += '<strong>Data:</strong> ' + window.escapeHtml(event.date) + ', ';
        html += '<strong>Motivo:</strong> ' + window.escapeHtml(event.reason);
        html += '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }
    historyList.innerHTML = html;
    console.log('Histórico de ocorrências renderizado:', equipmentsWithHistory.length, 'equipamentos com eventos');
  } catch (e) {
    window.showError('Erro ao renderizar histórico de ocorrências: ' + e.message);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.pendingErrors.length > 0) {
    window.pendingErrors.forEach(msg => window.showError(msg));
    window.pendingErrors = [];
  }

  const userType = localStorage.getItem('userType');
  if (!userType) {
    console.log('Nenhum usuário logado, redirecionando para index.html');
    window.location.href = 'index.html';
    return;
  }
  console.log('Usuário logado:', userType);

  try {
    window.renderHistoryList();
  } catch (e) {
    window.showError('Erro ao renderizar histórico: ' + e.message);
  }
});