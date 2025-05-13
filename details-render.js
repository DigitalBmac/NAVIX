window.renderEquipmentDetails = function() {
  const equipmentList = document.getElementById('equipment-list');
  if (!equipmentList) {
    window.showError('Elemento equipment-list não encontrado no DOM.');
    return;
  }
  if (!Array.isArray(window.equipments)) {
    window.showError('window.equipments não é um array válido.');
    return;
  }
  try {
    equipmentList.innerHTML = '';
    const userType = localStorage.getItem('userType');
    const isOperation = userType === 'operacao';
    const isAdmin = userType === 'admin';
    console.log(`Renderizando cartões para usuário: ${userType}`);

    if (window.equipments.length === 0) {
      equipmentList.innerHTML = '<p class="text-gray-600 text-center">Nenhum equipamento registrado.</p>';
      console.log('Nenhum equipamento para renderizar.');
      return;
    }

    const types = [...new Set(window.equipments.map(eq => eq.type))].sort();
    types.forEach(type => {
      const typeEquipments = window.equipments.filter(eq => eq.type === type);
      let html = '<div class="mb-8">';
      html += `<h3 class="text-xl font-semibold mb-4">${window.escapeHtml(type)}</h3>`;
      html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
      typeEquipments.forEach((eq, index) => {
        let unavailabilityHours = 0;
        let reason = 'N/A';
        let startDate = 'N/A';
        let lastUnavailabilityEvent = null;
        if (Array.isArray(eq.history) && eq.status === 'Indisponível') {
          let startTime = null;
          for (const event of eq.history) {
            if (event.type === 'unavailability' && event.date) {
              const dateParts = event.date.match(/(\d{2}\/\d{2}\/\d{2,4})( \d{2}:\d{2}(:\d{2})?)?/);
              if (dateParts) {
                const year = dateParts[1].match(/\d{2}\/\d{2}\/(\d{2,4})/)[1];
                const fullYear = year.length === 2 ? `20${year}` : year;
                startTime = new Date(dateParts[1].replace(/(\d{2}\/\d{2}\/\d{2,4})/, `$1`).replace(/(\d{2}\/\d{2}\/)\d{4}/, `$1${fullYear}`) + (dateParts[2] || ' 00:00'));
                if (isNaN(startTime.getTime())) {
                  console.warn('Data inválida para unavailability em ' + eq.name + ': ' + event.date);
                  startTime = null;
                } else {
                  reason = event.reason || 'N/A';
                  startDate = dateParts[1].replace(/(\d{2}\/\d{2}\/)\d{4}/, '$1$2') + (dateParts[2] ? dateParts[2].replace(/:00$/, '') : '');
                  lastUnavailabilityEvent = event;
                }
              }
            } else if (event.type === 'return' && event.date && startTime) {
              const dateParts = event.date.match(/(\d{2}\/\d{2}\/\d{2,4})( \d{2}:\d{2}(:\d{2})?)?/);
              if (dateParts) {
                const year = dateParts[1].match(/\d{2}\/\d{2}\/(\d{2,4})/)[1];
                const fullYear = year.length === 2 ? `20${year}` : year;
                const endTime = new Date(dateParts[1].replace(/(\d{2}\/\d{2}\/\d{2,4})/, `$1`).replace(/(\d{2}\/\d{2}\/)\d{4}/, `$1${fullYear}`) + (dateParts[2] || ' 00:00'));
                if (!isNaN(endTime.getTime())) {
                  unavailabilityHours += (endTime - startTime) / (1000 * 60 * 60);
                  startTime = null;
                }
              }
            }
          }
          if (startTime && eq.status === 'Indisponível') {
            const diff = (new Date() - startTime) / (1000 * 60 * 60);
            unavailabilityHours += diff;
          }
        }

        const statusClass = eq.status === 'Disponível' ? 'bg-green-500' : eq.status === 'Indisponível' ? 'bg-red-500' : eq.status === 'Inspeção' ? 'bg-yellow-500' : 'bg-black';
        const isLastInRow = (index + 1) % 3 === 0 || index === typeEquipments.length - 1;
        const isLastInType = index === typeEquipments.length - 1;
        const borderClasses = `border-b border-r border-gray-200 ${isLastInRow ? 'lg:border-r-0' : ''} ${isLastInType ? 'border-b-0' : ''} md:${(index + 1) % 2 === 0 || index === typeEquipments.length - 1 ? 'border-r-0' : ''}`;

        html += `<div class="bg-white p-4 rounded-lg shadow-md relative ${borderClasses}">`;
        html += '<div class="flex flex-col justify-between h-full min-h-[150px]">';
        html += '<div class="space-y-2">';
        html += '<p><strong>Nome:</strong> ' + window.escapeHtml(eq.name || 'N/A') + '</p>';
        html += '<p><strong>Tipo:</strong> ' + window.escapeHtml(eq.type || 'N/A') + '</p>';
        html += '<p><strong>Status:</strong> <span class="inline-block w-3 h-3 rounded-full mr-2 ' + statusClass + '"></span>' + window.escapeHtml(eq.status || 'N/A') + '</p>';
        html += '<p><strong>Horímetro:</strong> ' + (eq.hourmeter || 0) + ' h</p>';
        if (eq.status === 'Indisponível') {
          html += '<p class="text-red-600 font-semibold"><strong>Tempo de Indisponibilidade:</strong> ' + unavailabilityHours.toFixed(2) + ' h</p>';
          html += '<p><strong>Motivo:</strong> ' + window.escapeHtml(reason) + '</p>';
          html += '<p><strong>Início da Indisponibilidade:</strong> ' + window.escapeHtml(startDate) + '</p>';
        }
        html += '</div>';
        html += `<button onclick="window.location.href='equipment-details.html?id=${eq.id}'" class="absolute top-2 right-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600 text-sm">+</button>`;

        if (isOperation) {
          html += '<div class="mt-auto flex justify-center pt-4">';
          html += `<button onclick="openEventOptionsModal(${eq.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Registrar Evento</button>`;
          html += '</div>';
        } else if (isAdmin && eq.status === 'Indisponível' && lastUnavailabilityEvent) {
          html += '<div class="mt-auto flex justify-center pt-4">';
          html += `<button onclick="openApprovalModal(${eq.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Aprovar</button>`;
          html += '</div>';
        }

        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
      html += '</div>';
      equipmentList.insertAdjacentHTML('beforeend', html);
    });

    const modalHtml = `
      <div id="action-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
          <h2 id="modal-title" class="text-lg font-semibold mb-3"></h2>
          <form id="modal-form" class="space-y-3">
            <div id="modal-os-field" class="flex space-x-4">
              <div class="flex-1">
                <label for="modal-os" class="block text-sm font-medium text-gray-700">OS</label>
                <input type="text" id="modal-os" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ex.: OS019">
              </div>
              <div id="modal-responsible-field" class="flex-1">
                <label for="modal-responsible" class="block text-sm font-medium text-gray-700">Responsável</label>
                <input type="text" id="modal-responsible" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ex.: João Silva">
              </div>
            </div>
            <div id="modal-inspector-field" class="hidden">
              <label for="modal-inspector-name" class="block text-sm font-medium text-gray-700">Nome do Inspetor</label>
              <input type="text" id="modal-inspector-name" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ex.: Ana Costa">
            </div>
            <div class="flex space-x-4">
              <div id="modal-date-field" class="flex-1">
                <label for="modal-date" class="block text-sm font-medium text-gray-700">Data</label>
                <input type="text" id="modal-date" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="DD/MM/YY">
              </div>
              <div id="modal-time-field" class="flex-1">
                <label for="modal-time" class="block text-sm font-medium text-gray-700">Hora</label>
                <input type="text" id="modal-time" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="HH:MM">
              </div>
            </div>
            <div id="modal-reason-field" class="hidden">
              <label for="modal-reason" class="block text-sm font-medium text-gray-700">Motivo</label>
              <select id="modal-reason" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option value="Falha Mecânica">Falha Mecânica</option>
                <option value="Falha Elétrica">Falha Elétrica</option>
                <option value="Falha Hidráulica">Falha Hidráulica</option>
                <option value="Ocorrência">Ocorrência</option>
              </select>
            </div>
            <div id="modal-justification-field" class="hidden">
              <label for="modal-justification" class="block text-sm font-medium text-gray-700">Justificativa</label>
              <textarea id="modal-justification" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ex.: Motor superaquecido" rows="3"></textarea>
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" onclick="closeModal()" class="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">Cancelar</button>
              <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
      <div id="approval-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
          <button onclick="closeApprovalModal()" class="absolute top-2 right-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600 text-sm">X</button>
          <h2 class="text-lg font-semibold mb-3">Resumo de Indisponibilidade</h2>
          <div id="approval-details" class="space-y-2 mb-3">
            <!-- Detalhes serão inseridos aqui -->
          </div>
          <div class="flex justify-end space-x-2">
            <button onclick="closeApprovalModal()" class="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">Recusar</button>
            <button onclick="approveUnavailability(window.currentEquipmentId)" class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Aceitar</button>
          </div>
        </div>
      </div>
      <div id="event-options-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
          <button onclick="closeEventOptionsModal()" class="absolute top-2 right-2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-600 text-sm">X</button>
          <h2 class="text-lg font-semibold mb-3">Opções de Registro de Evento</h2>
          <div id="event-options-details" class="space-y-3">
            <!-- Opções serão inseridas aqui -->
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    console.log('Modal HTML adicionado ao DOM');
  } catch (e) {
    window.showError('Erro ao renderizar detalhamento dos equipamentos: ' + e.message);
    console.error('Erro em renderEquipmentDetails:', e);
  }
};

window.openEventOptionsModal = function(equipmentId) {
  const modal = document.getElementById('event-options-modal');
  const details = document.getElementById('event-options-details');
  const equipments = window.loadEquipments();
  const equipment = equipments.find(eq => eq.id === equipmentId);

  if (!equipment) {
    window.showError('Equipamento não encontrado.');
    return;
  }

  if (!Number.isInteger(equipmentId)) {
    console.error('equipmentId inválido:', equipmentId);
    window.showError('ID do equipamento inválido.');
    return;
  }

  const isUnavailabilityDisabled = equipment.status === 'Indisponível' || equipment.status === 'Manutenção' || equipment.status === 'Inspeção';
  const isReturnDisabled = equipment.status !== 'Indisponível' || equipment.status === 'Manutenção' || equipment.status === 'Inspeção';

  console.log(`Botões de indisponibilidade para ${equipment.name}: Registrar=${isUnavailabilityDisabled ? 'desabilitado' : 'habilitado'}, Informar=${isReturnDisabled ? 'desabilitado' : 'habilitado'}`);

  details.innerHTML = `
    <div class="border-t pt-2">
      <h4 class="text-base font-semibold text-red-600 text-center">Indisponibilidade</h4>
      <div class="flex justify-center gap-2 mt-2">
        <button onclick="window.openModal('unavailability', ${equipmentId})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ${isUnavailabilityDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${isUnavailabilityDisabled ? 'disabled' : ''}>Registrar Indisponibilidade</button>
        <button onclick="window.openModal('return', ${equipmentId})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ${isReturnDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${isReturnDisabled ? 'disabled' : ''}>Informar Disponibilidade</button>
      </div>
    </div>
    <div class="border-t pt-2">
      <h4 class="text-base font-semibold text-blue-600 text-center">Inspeção</h4>
      <div class="flex justify-center gap-2 mt-2">
        <button onclick="window.openModal('schedule_inspection', ${equipmentId})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 ${equipment.status !== 'Disponível' ? 'opacity-50 cursor-not-allowed' : ''}" ${equipment.status !== 'Disponível' ? 'disabled' : ''}>Agendar Inspeção</button>
        <button onclick="window.openModal('finalize_inspection', ${equipmentId})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 ${equipment.status !== 'Inspeção' ? 'opacity-50 cursor-not-allowed' : ''}" ${equipment.status !== 'Inspeção' ? 'disabled' : ''}>Informar Término</button>
      </div>
    </div>
    <div class="border-t pt-2">
      <h4 class="text-base font-semibold text-yellow-600 text-center">Manutenção</h4>
      <div class="flex justify-center gap-2 mt-2">
        <button onclick="window.openModal('schedule_maintenance', ${equipmentId})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 ${equipment.status !== 'Disponível' ? 'opacity-50 cursor-not-allowed' : ''}" ${equipment.status !== 'Disponível' ? 'disabled' : ''}>Agendar Manutenção</button>
        <button onclick="window.openModal('finalize_maintenance', ${equipmentId})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 ${equipment.status !== 'Manutenção' ? 'opacity-50 cursor-not-allowed' : ''}" ${equipment.status !== 'Manutenção' ? 'disabled' : ''}>Finalizar Manutenção</button>
      </div>
    </div>
  `;
  console.log('HTML gerado para event-options-details:', details.innerHTML);

  window.currentEquipmentId = equipmentId;
  modal.classList.remove('hidden');
  console.log(`Modal de opções de evento aberto para equipamento ${equipmentId}`);
};

window.closeEventOptionsModal = function() {
  const modal = document.getElementById('event-options-modal');
  modal.classList.add('hidden');
  console.log('Modal de opções de evento fechado');
};

window.openModal = function(action, equipmentId) {
  try {
    console.log(`Botão ${action} clicado para equipamento ${equipmentId}`);
    if (!Number.isInteger(equipmentId)) {
      console.error('equipmentId inválido:', equipmentId);
      window.showError('ID do equipamento inválido.');
      return;
    }

    closeEventOptionsModal();
    console.log('Modal de opções fechado antes de abrir action-modal');

    const modal = document.getElementById('action-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');
    const osField = document.getElementById('modal-os-field');
    const inspectorField = document.getElementById('modal-inspector-field');
    const responsibleField = document.getElementById('modal-responsible-field');
    const dateField = document.getElementById('modal-date-field');
    const timeField = document.getElementById('modal-time-field');
    const reasonField = document.getElementById('modal-reason-field');
    const justificationField = document.getElementById('modal-justification-field');

    console.log('Elementos do action-modal:', { modal, modalTitle, modalForm, osField, inspectorField, responsibleField, dateField, timeField, reasonField, justificationField });

    if (!modal || !modalTitle || !modalForm || !osField || !inspectorField || !responsibleField || !dateField || !timeField || !reasonField || !justificationField) {
      console.error('Campos do action-modal não encontrados:', { modal, modalTitle, modalForm, osField, inspectorField, responsibleField, dateField, timeField, reasonField, justificationField });
      window.showError('Erro ao abrir modal de ação.');
      return;
    }

    modalForm.reset();
    osField.classList.remove('hidden');
    inspectorField.classList.add('hidden');
    responsibleField.classList.remove('hidden');
    dateField.classList.remove('hidden');
    timeField.classList.remove('hidden');
    reasonField.classList.add('hidden');
    justificationField.classList.add('hidden');

    let title = '';
    switch (action) {
      case 'unavailability':
        title = 'Registrar Indisponibilidade';
        reasonField.classList.remove('hidden');
        justificationField.classList.remove('hidden');
        break;
      case 'return':
        title = 'Informar Disponibilidade';
        break;
      case 'schedule_inspection':
        title = 'Agendar Inspeção';
        osField.classList.add('hidden');
        inspectorField.classList.remove('hidden');
        responsibleField.classList.add('hidden');
        break;
      case 'finalize_inspection':
        title = 'Informar Término de Inspeção';
        break;
      case 'schedule_maintenance':
        title = 'Agendar Manutenção';
        reasonField.classList.remove('hidden');
        break;
      case 'finalize_maintenance':
        title = 'Finalizar Manutenção';
        break;
      default:
        console.error(`Ação desconhecida: ${action}`);
        window.showError('Ação inválida.');
        return;
    }
    modalTitle.textContent = title;

    modalForm.onsubmit = function(e) {
      e.preventDefault();
      processModalAction(action, equipmentId);
    };

    modal.classList.remove('hidden');
    console.log(`Action-modal aberto para ação ${action}, equipamento ${equipmentId}`);
  } catch (e) {
    console.error('Erro em openModal:', e);
    window.showError('Erro ao abrir modal de ação: ' + e.message);
  }
};

function closeModal() {
  const modal = document.getElementById('action-modal');
  modal.classList.add('hidden');
  console.log('Action-modal fechado');
}

window.openApprovalModal = function(equipmentId) {
  const modal = document.getElementById('approval-modal');
  const details = document.getElementById('approval-details');
  const equipments = window.loadEquipments();
  const equipment = equipments.find(eq => eq.id === equipmentId);

  if (!equipment) {
    window.showError('Equipamento não encontrado.');
    return;
  }

  const lastUnavailabilityEvent = equipment.history
    .filter(event => event.type === 'unavailability' && event.date)
    .sort((a, b) => {
      const dateA = a.date.match(/(\d{2}\/\d{2}\/\d{2,4} \d{2}:\d{2})/)?.[1]?.replace(/(\d{2}\/\d{2}\/)(\d{2})/, '$1$2') || '';
      const dateB = b.date.match(/(\d{2}\/\d{2}\/\d{2,4} \d{2}:\d{2})/)?.[1]?.replace(/(\d{2}\/\d{2}\/)(\d{2})/, '$1$2') || '';
      return new Date(dateB) - new Date(dateA);
    })[0];

  if (!lastUnavailabilityEvent) {
    window.showError('Nenhum evento de indisponibilidade encontrado.');
    return;
  }

  details.innerHTML = `
    <p><strong>Data e Hora:</strong> ${window.escapeHtml(lastUnavailabilityEvent.date.replace(/(\d{2}\/\d{2}\/\d{2,4})( \d{2}:\d{2}(:\d{2})?)?/, '$1$2').replace(/(\d{2}\/\d{2}\/)\d{4}/, '$1$2').replace(/:00$/, '') || 'N/A')}</p>
    <p><strong>Responsável:</strong> ${window.escapeHtml(lastUnavailabilityEvent.responsible || 'N/A')}</p>
    <p><strong>Justificativa:</strong> ${window.escapeHtml(lastUnavailabilityEvent.justification || 'N/A')}</p>
  `;

  window.currentEquipmentId = equipmentId;
  modal.classList.remove('hidden');
  console.log(`Modal de aprovação aberto para equipamento ${equipmentId}`);
};

window.closeApprovalModal = function() {
  const modal = document.getElementById('approval-modal');
  modal.classList.add('hidden');
  console.log('Modal de aprovação fechado (X ou Recusar)');
};

window.approveUnavailability = function(equipmentId) {
  try {
    const equipments = window.loadEquipments();
    const equipment = equipments.find(eq => eq.id === equipmentId);

    if (!equipment) {
      window.showError('Equipamento não encontrado.');
      return;
    }

    equipment.status = 'Disponível';
    equipment.history.push({
      type: 'return',
      os: 'OS-APPROVAL',
      responsible: 'Admin',
      date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    });

    window.saveEquipments(equipments);
    window.showError('Indisponibilidade aprovada com sucesso.');
    closeApprovalModal();
    window.renderEquipmentDetails();
    console.log(`Aprovação para equipamento ${equipmentId}: Aceitar`);
  } catch (e) {
    window.showError('Erro ao aprovar indisponibilidade: ' + e.message);
    console.error('Erro em approveUnavailability:', e);
  }
};

function processModalAction(action, equipmentId) {
  try {
    const os = document.getElementById('modal-os')?.value.trim();
    const inspectorName = document.getElementById('modal-inspector-name')?.value.trim();
    const responsible = document.getElementById('modal-responsible')?.value.trim();
    const date = document.getElementById('modal-date').value.trim();
    const time = document.getElementById('modal-time').value.trim();
    const reason = document.getElementById('modal-reason')?.value;
    const justification = document.getElementById('modal-justification')?.value.trim();

    if (action !== 'schedule_inspection' && !os && !responsible) {
      window.showError('OS e Responsável são obrigatórios.');
      return;
    }
    if (action === 'schedule_inspection' && !inspectorName) {
      window.showError('Nome do Inspetor é obrigatório.');
      return;
    }
    if (!date) {
      window.showError('Data é obrigatória.');
      return;
    }
    if (!time) {
      window.showError('Hora é obrigatória.');
      return;
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(date)) {
      window.showError('Data deve estar no formato DD/MM/YY.');
      return;
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      window.showError('Hora deve estar no formato HH:MM.');
      return;
    }

    const [day, month, year] = date.split('/').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const inputDate = new Date(2000 + year, month - 1, day, hour, minute);
    if (isNaN(inputDate.getTime())) {
      window.showError('Data ou hora inválida.');
      return;
    }
    const isScheduled = action.includes('schedule');
    if (!isScheduled && inputDate > new Date()) {
      window.showError('Data e hora não podem ser futuras.');
      return;
    }

    const equipments = window.loadEquipments();
    const equipment = equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      window.showError('Equipamento não encontrado.');
      return;
    }

    let event = {};
    if (action === 'schedule_inspection') {
      event.inspectorName = window.escapeHtml(inspectorName);
    } else {
      event.os = window.escapeHtml(os);
      event.responsible = window.escapeHtml(responsible);
    }

    switch (action) {
      case 'unavailability':
        if (equipment.status === 'Indisponível') {
          window.showError('Equipamento já está indisponível.');
          return;
        }
        if (!reason || !justification) {
          window.showError('Motivo e justificativa são obrigatórios.');
          return;
        }
        event.type = 'unavailability';
        event.reason = window.escapeHtml(reason);
        event.justification = window.escapeHtml(justification);
        event.date = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        equipment.status = 'Indisponível';
        break;
      case 'return':
        if (equipment.status !== 'Indisponível') {
          window.showError('Equipamento não está indisponível.');
          return;
        }
        event.type = 'return';
        event.date = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        equipment.status = 'Disponível';
        break;
      case 'schedule_inspection':
        if (equipment.status !== 'Disponível') {
          window.showError('Equipamento deve estar disponível.');
          return;
        }
        event.type = 'scheduled_inspection';
        event.scheduledDate = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        break;
      case 'finalize_inspection':
        if (equipment.status !== 'Inspeção') {
          window.showError('Equipamento não está em inspeção.');
          return;
        }
        equipment.history.push({
          type: 'inspection',
          os: window.escapeHtml(os),
          responsible: window.escapeHtml(responsible),
          date: `${window.escapeHtml(date)} ${window.escapeHtml(time)}`
        });
        event.type = 'return';
        event.date = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        equipment.status = 'Disponível';
        break;
      case 'schedule_maintenance':
        if (equipment.status !== 'Disponível') {
          window.showError('Equipamento deve estar disponível.');
          return;
        }
        if (!reason) {
          window.showError('Motivo é obrigatório.');
          return;
        }
        event.type = 'scheduled_maintenance';
        event.reason = window.escapeHtml(reason);
        event.scheduledDate = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        break;
      case 'finalize_maintenance':
        if (equipment.status !== 'Manutenção') {
          window.showError('Equipamento não está em manutenção.');
          return;
        }
        equipment.history.push({
          type: 'maintenance',
          os: window.escapeHtml(os),
          responsible: window.escapeHtml(responsible),
          date: `${window.escapeHtml(date)} ${window.escapeHtml(time)}`
        });
        event.type = 'return';
        event.date = `${window.escapeHtml(date)} ${window.escapeHtml(time)}`;
        equipment.status = 'Disponível';
        break;
    }

    equipment.history.push(event);
    window.saveEquipments(equipments);
    window.showError('Ação realizada com sucesso.');
    console.log(`Data salva no formato DD/MM/YY: ${date}`);
    console.log(`Hora salva: ${time}`);
    closeModal();
    window.renderEquipmentDetails();
  } catch (e) {
    window.showError('Erro ao processar ação: ' + e.message);
    console.error('Erro em processModalAction:', e);
  }
};