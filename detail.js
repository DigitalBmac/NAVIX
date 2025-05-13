window.renderEquipmentDetails = function() {
  const equipmentList = document.getElementById('equipment-list');
  if (!equipmentList) {
    showError('Elemento equipment-list não encontrado no DOM.');
    return;
  }
  try {
    equipmentList.innerHTML = '';
    for (const eq of window.equipments) {
      const item = document.createElement('div');
      item.className = 'bg-white p-4 rounded-lg shadow-md';
      let lastEvent = 'Nenhum evento';
      if (Array.isArray(eq.history) && eq.history.length > 0) {
        const latest = eq.history[eq.history.length - 1];
        lastEvent = (latest.type || 'Desconhecido') + ' em ' + escapeHtml(latest.date || 'N/A');
      }
      let html = '';
      html += '<div class="flex flex-col space-y-2">';
      html += '<p><strong>Nome:</strong> ' + escapeHtml(eq.name || 'N/A') + '</p>';
      html += '<p><strong>Tipo:</strong> ' + escapeHtml(eq.type || 'N/A') + '</p>';
      html += '<p><strong>Status:</strong> ' + escapeHtml(eq.status || 'N/A') + '</p>';
      html += '<p><strong>Último Evento:</strong> ' + escapeHtml(lastEvent) + '</p>';
      if (window.userType === 'operacao') {
        html += '<div class="flex justify-end space-x-2">';
        if (eq.status === 'Manutenção') {
          html += '<button onclick="endMaintenance(' + eq.id + ')" class="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">';
          html += 'Fim da Manutenção';
          html += '</button>';
        }
        if (eq.status === 'Inspeção') {
          html += '<button onclick="endInspection(' + eq.id + ')" class="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">';
          html += 'Fim da Inspeção';
          html += '</button>';
        }
        html += '</div>';
      }
      html += '</div>';
      item.innerHTML = html;
      equipmentList.appendChild(item);
    }
    console.log('Detalhamento dos equipamentos renderizado:', window.equipments.length, 'itens');
  } catch (e) {
    showError('Erro ao renderizar detalhamento dos equipamentos: ' + e.message);
  }
};

window.endMaintenance = function(equipmentId) {
  try {
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Manutenção') {
      alert('Este equipamento não está em manutenção.');
      return;
    }
    equipment.status = 'Disponível';
    equipment.history.push({
      type: 'return_maintenance',
      responsible: 'Operação',
      date: new Date().toLocaleString('pt-BR')
    });
    window.saveEquipments(window.equipments);
    alert('Equipamento ' + equipment.name + ' finalizado da manutenção com sucesso.');
    window.renderEquipmentDetails();
    console.log('Equipamento finalizado da manutenção:', equipment.name);
  } catch (e) {
    showError('Erro ao finalizar manutenção: ' + e.message);
  }
};

window.endInspection = function(equipmentId) {
  try {
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Inspeção') {
      alert('Este equipamento não está em inspeção.');
      return;
    }
    equipment.status = 'Disponível';
    equipment.history.push({
      type: 'return_inspection',
      responsible: 'Operação',
      date: new Date().toLocaleString('pt-BR')
    });
    window.saveEquipments(window.equipments);
    alert('Equipamento ' + equipment.name + ' finalizado de inspeção com sucesso.');
    window.renderEquipmentDetails();
    console.log('Equipamento finalizado de inspeção:', equipment.name);
  } catch (e) {
    showError('Erro ao finalizar inspeção: ' + e.message);
  }
};

window.renderEquipmentDetails();