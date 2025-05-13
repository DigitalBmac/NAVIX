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

function renderEquipmentDetails() {
  const equipmentDetails = document.querySelector('#equipment-details .bg-white');
  if (!equipmentDetails) {
    window.showError('Elemento equipment-details não encontrado no DOM.');
    return;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    const equipmentId = parseInt(params.get('id'));
    if (!equipmentId) {
      window.showError('ID do equipamento não fornecido.');
      equipmentDetails.innerHTML = '<p class="text-gray-600 text-center">Equipamento não encontrado.</p>';
      return;
    }

    const equipments = window.loadEquipments();
    const equipment = equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      window.showError('Equipamento não encontrado.');
      equipmentDetails.innerHTML = '<p class="text-gray-600 text-center">Equipamento não encontrado.</p>';
      return;
    }

    let unavailabilityHours = 0;
    let unavailabilityCount = 0;
    let maintenanceCount = 0;
    let inspectionCount = 0;
    let startTime = null;
    if (Array.isArray(equipment.history)) {
      for (const event of equipment.history) {
        if (event.type === 'unavailability' && event.date) {
          startTime = new Date(event.date);
          if (!isNaN(startTime.getTime())) {
            unavailabilityCount++;
          } else {
            console.warn('Data inválida para unavailability em ' + equipment.name + ': ' + event.date);
            startTime = null;
          }
        } else if (event.type === 'return' && event.date && startTime) {
          const endTime = new Date(event.date);
          if (!isNaN(endTime.getTime())) {
            unavailabilityHours += (endTime - startTime) / (1000 * 60 * 60);
            startTime = null;
          }
        } else if (event.type === 'maintenance') {
          maintenanceCount++;
        } else if (event.type === 'inspection') {
          inspectionCount++;
        }
      }
      if (startTime && equipment.status === 'Indisponível') {
        const diff = (new Date() - startTime) / (1000 * 60 * 60);
        unavailabilityHours += diff;
      }
    }

    const statusClass = equipment.status === 'Disponível' ? 'bg-green-500' : equipment.status === 'Indisponível' ? 'bg-red-500' : equipment.status === 'Inspeção' ? 'bg-yellow-500' : 'bg-black';

    let html = '';
    html += '<div class="mb-6">';
    html += '<h2 class="text-2xl font-semibold mb-4">' + window.escapeHtml(equipment.name || 'N/A') + '</h2>';
    html += '<p><strong>Tipo:</strong> ' + window.escapeHtml(equipment.type || 'N/A') + '</p>';
    html += '<p><strong>Status:</strong> <span class="inline-block w-3 h-3 rounded-full mr-2 ' + statusClass + '"></span>' + window.escapeHtml(equipment.status || 'N/A') + '</p>';
    html += '<p><strong>Horímetro:</strong> ' + (equipment.hourmeter || 0) + ' h</p>';
    html += '</div>';

    html += '<div class="mb-6">';
    html += '<h3 class="text-xl font-semibold mb-2">Resumo</h3>';
    html += '<p><strong>Indisponibilidades:</strong> ' + unavailabilityCount + '</p>';
    html += '<p><strong>Manutenções:</strong> ' + maintenanceCount + '</p>';
    html += '<p><strong>Inspeções:</strong> ' + inspectionCount + '</p>';
    html += '<p><strong>Tempo Total de Indisponibilidade:</strong> ' + unavailabilityHours.toFixed(2) + ' h</p>';
    html += '</div>';

    html += '<div class="mb-6">';
    html += '<h3 class="text-xl font-semibold mb-2">Histórico de Ocorrências</h3>';
    const relevantEvents = equipment.history ? equipment.history.filter(event => ['unavailability', 'maintenance', 'inspection'].includes(event.type)) : [];
    if (relevantEvents.length === 0) {
      html += '<p class="text-gray-600">Nenhuma ocorrência registrada.</p>';
    } else {
      relevantEvents.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      });
      html += '<ul class="list-disc pl-5 space-y-2">';
      relevantEvents.forEach(event => {
        const eventType = event.type === 'unavailability' ? 'Indisponibilidade' : event.type === 'maintenance' ? 'Manutenção' : 'Inspeção';
        html += '<li>';
        html += '<strong>Tipo:</strong> ' + eventType + ', ';
        html += '<strong>Data:</strong> ' + window.escapeHtml(event.date || 'N/A') + ', ';
        html += '<strong>OS:</strong> ' + window.escapeHtml(event.os || 'N/A') + ', ';
        html += '<strong>Responsável:</strong> ' + window.escapeHtml(event.responsible || 'N/A');
        if (event.reason) {
          html += ', <strong>Motivo:</strong> ' + window.escapeHtml(event.reason);
        }
        if (event.justification) {
          html += ', <strong>Justificativa:</strong> ' + window.escapeHtml(event.justification);
        }
        html += '</li>';
      });
      html += '</ul>';
    }
    html += '</div>';

    html += '<div class="mb-6">';
    html += '<h3 class="text-xl font-semibold mb-2">Plano de Manutenção</h3>';
    html += '<button onclick="alert(\'Plano de manutenção não disponível.\')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ver Plano de Manutenção</button>';
    html += '</div>';

    equipmentDetails.innerHTML = html;
    console.log('Detalhes do equipamento renderizados:', equipment.name, 'ID:', equipmentId);
  } catch (e) {
    window.showError('Erro ao renderizar detalhes do equipamento: ' + e.message);
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
    renderEquipmentDetails();
  } catch (e) {
    window.showError('Erro ao inicializar página: ' + e.message);
  }
});