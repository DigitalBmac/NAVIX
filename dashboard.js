window.initialEquipments = [
  { id: 1, name: 'Empilhadeira 01', type: 'Empilhadeira', status: 'Disponível', hourmeter: 1200, history: [] },
  { id: 2, name: 'Empilhadeira 02', type: 'Empilhadeira', status: 'Manutenção', hourmeter: 1500, history: [] },
  { id: 3, name: 'Empilhadeira 03', type: 'Empilhadeira', status: 'Indisponível', hourmeter: 1300, history: [{ type: 'unavailability', os: 'OS001', responsible: 'Maria', reason: 'Falha mecânica', justification: 'Motor superaquecido', date: '08/05/2025 10:00' }] },
  { id: 4, name: 'Empilhadeira 04', type: 'Empilhadeira', status: 'Inspeção', hourmeter: 1400, history: [] },
  { id: 5, name: 'Caminhão 01', type: 'Caminhão', status: 'Disponível', hourmeter: 2000, history: [] },
  { id: 6, name: 'Caminhão 02', type: 'Caminhão', status: 'Indisponível', hourmeter: 2100, history: [{ type: 'unavailability', os: 'OS002', responsible: 'João', reason: 'Pneu furado', justification: 'Pneu dianteiro danificado', date: '08/05/2025 11:30' }] },
  { id: 7, name: 'Caminhão 03', type: 'Caminhão', status: 'Manutenção', hourmeter: 2200, history: [] },
  { id: 8, name: 'Caminhão 04', type: 'Caminhão', status: 'Disponível', hourmeter: 1900, history: [] },
  { id: 9, name: 'Caminhão 05', type: 'Caminhão', status: 'Inspeção', hourmeter: 2300, history: [] },
  { id: 10, name: 'Caminhão 06', type: 'Caminhão', status: 'Indisponível', hourmeter: 2400, history: [{ type: 'unavailability', os: 'OS003', responsible: 'Pedro', reason: 'Falha elétrica', justification: 'Bateria descarregada', date: '08/05/2025 09:15' }] },
  { id: 11, name: 'Guindaste 01', type: 'Guindaste', status: 'Disponível', hourmeter: 800, history: [] },
  { id: 12, name: 'Guindaste 02', type: 'Guindaste', status: 'Manutenção', hourmeter: 900, history: [] },
  { id: 13, name: 'Guindaste 03', type: 'Guindaste', status: 'Indisponível', hourmeter: 850, history: [{ type: 'unavailability', os: 'OS004', responsible: 'Ana', reason: 'Cabo danificado', justification: 'Cabo principal rompido', date: '08/05/2025 14:20' }] },
  { id: 14, name: 'Guindaste 04', type: 'Guindaste', status: 'Inspeção', hourmeter: 950, history: [] },
  { id: 15, name: 'Guindaste 05', type: 'Guindaste', status: 'Disponível', hourmeter: 870, history: [] },
  { id: 16, name: 'Escavadeira 01', type: 'Escavadeira', status: 'Manutenção', hourmeter: 3000, history: [] },
  { id: 17, name: 'Escavadeira 02', type: 'Escavadeira', status: 'Indisponível', hourmeter: 3100, history: [{ type: 'unavailability', os: 'OS005', responsible: 'Carlos', reason: 'Hidráulico', justification: 'Vazamento no sistema', date: '08/05/2025 08:45' }] },
  { id: 18, name: 'Escavadeira 03', type: 'Escavadeira', status: 'Disponível', hourmeter: 3200, history: [] },
  { id: 19, name: 'Escavadeira 04', type: 'Escavadeira', status: 'Manutenção', hourmeter: 3300, history: [] },
  { id: 20, name: 'Escavadeira 05', type: 'Escavadeira', status: 'Inspeção', hourmeter: 3400, history: [] },
  { id: 21, name: 'Escavadeira 06', type: 'Escavadeira', status: 'Disponível', hourmeter: 3500, history: [] },
  { id: 22, name: 'Escavadeira 07', type: 'Escavadeira', status: 'Manutenção', hourmeter: 3600, history: [] },
  { id: 23, name: 'Escavadeira 08', type: 'Escavadeira', status: 'Indisponível', hourmeter: 3700, history: [{ type: 'unavailability', os: 'OS006', responsible: 'Lucas', reason: 'Falha mecânica', justification: 'Braço travado', date: '08/05/2025 12:10' }] }
];

window.equipments = [];

window.showError = function(message) {
  alert(message);
};

window.escapeHtml = function(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

window.loadEquipments = function() {
  try {
    const stored = localStorage.getItem('equipments');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erro ao carregar equipamentos:', e);
    window.showError('Erro ao carregar equipamentos: ' + e.message);
  }
  return window.initialEquipments;
};

window.saveEquipments = function(equipments) {
  try {
    localStorage.setItem('equipments', JSON.stringify(equipments));
  } catch (e) {
    console.error('Erro ao salvar equipamentos:', e);
    window.showError('Erro ao salvar equipamentos: ' + e.message);
  }
};

window.logout = function() {
  try {
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
  } catch (e) {
    console.error('Erro ao fazer logout:', e);
    window.showError('Erro ao fazer logout: ' + e.message);
  }
};

function renderMetrics() {
  const metricsDiv = document.getElementById('metrics');
  if (!metricsDiv) {
    console.error('Elemento metrics não encontrado no DOM.');
    window.showError('Elemento metrics não encontrado no DOM.');
    return;
  }

  const counts = {
    available: window.equipments.filter(eq => eq.status === 'Disponível').length,
    unavailable: window.equipments.filter(eq => eq.status === 'Indisponível').length,
    maintenance: window.equipments.filter(eq => eq.status === 'Manutenção').length,
    inspection: window.equipments.filter(eq => eq.status === 'Inspeção').length
  };

  const metricsHtml = `
    <div class="bg-white p-4 rounded-lg shadow-md">
      <p class="text-lg font-semibold text-green-600">Disponíveis</p>
      <p class="text-2xl">${counts.available}</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <p class="text-lg font-semibold text-red-600">Indisponíveis</p>
      <p class="text-2xl">${counts.unavailable}</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <p class="text-lg font-semibold text-yellow-600">Manutenção</p>
      <p class="text-2xl">${counts.maintenance}</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <p class="text-lg font-semibold text-blue-600">Inspeções</p>
      <p class="text-2xl">${counts.inspection}</p>
    </div>
  `;
  metricsDiv.innerHTML = metricsHtml;
}

document.addEventListener('DOMContentLoaded', function() {
  let userType, userName;
  try {
    userType = localStorage.getItem('userType');
    userName = localStorage.getItem('userName');
  } catch (e) {
    console.error('Erro ao acessar localStorage:', e);
    window.showError('Erro ao acessar dados de usuário.');
    window.location.href = 'index.html';
    return;
  }

  console.log('Tentativa de acesso ao dashboard', { userName, userType });

  if (!userType || !userName) {
    console.warn('Usuário não autenticado, redirecionando para login.');
    window.location.href = 'index.html';
    return;
  }

  console.log(`Usuário logado: ${userName}`);
  const userNameSpan = document.getElementById('user-name');
  if (userNameSpan) {
    userNameSpan.textContent = userName;
  } else {
    console.warn('Elemento user-name não encontrado no DOM.');
  }

  window.equipments = window.loadEquipments();
  renderMetrics();

  if (typeof window.renderEquipmentDetails === 'function') {
    window.renderEquipmentDetails();
  } else {
    console.error('Função renderEquipmentDetails não definida. Verifique se details-render.js foi carregado.');
    window.showError('Erro ao carregar lista de equipamentos.');
  }
});