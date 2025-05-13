window.printExtract = function() {
  try {
    const equipmentSelect = document.getElementById('equipment-select');
    const extractOutput = document.getElementById('extract-output');
    if (!equipmentSelect || !extractOutput) {
      throw new Error('Elementos equipment-select ou extract-output não encontrados');
    }
    if (!equipmentSelect.value) {
      alert('Selecione um equipamento.');
      return;
    }
    const equipmentId = parseInt(equipmentSelect.value);
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    console.log('Gerando extrato para:', equipment.name);

    let historyHtml = '';
    if (Array.isArray(equipment.history)) {
      for (const h of equipment.history) {
        if (!h || !h.type || h.type !== 'unavailability') {
          continue;
        }
        let entryHtml = '';
        entryHtml += '<p><strong>Indisponibilidade</strong></p>';
        entryHtml += '<p><strong>OS:</strong> ' + escapeHtml(h.os || 'N/A') + '</p>';
        entryHtml += '<p><strong>Responsável:</strong> ' + escapeHtml(h.responsible || 'N/A') + '</p>';
        entryHtml += '<p><strong>Motivo:</strong> ' + escapeHtml(h.reason || 'N/A') + '</p>';
        entryHtml += '<p><strong>Data:</strong> ' + escapeHtml(h.date || 'N/A') + '</p>';
        historyHtml += '<div class="mb-4 border-b border-gray-300 pb-4">';
        historyHtml += entryHtml;
        historyHtml += '</div>';
      }
    } else {
      historyHtml = '<p class="text-gray-600">Nenhum evento de indisponibilidade registrado.</p>';
    }

    console.log('historyHtml gerado:', historyHtml);
    extractOutput.innerHTML = '';
    extractOutput.innerHTML += '<h3 class="text-lg font-semibold mb-2">Extrato do Equipamento: ' + escapeHtml(equipment.name) + '</h3>';
    extractOutput.innerHTML += '<p><strong>Tipo:</strong> ' + escapeHtml(equipment.type) + '</p>';
    extractOutput.innerHTML += '<p><strong>Status Atual:</strong> ' + escapeHtml(equipment.status) + '</p>';
    extractOutput.innerHTML += historyHtml;
    extractOutput.classList.remove('hidden');
    console.log('Extrato exibido com sucesso');
  } catch (e) {
    showError('Erro ao gerar extrato: ' + e.message);
  }
};

if (window.userType === 'admin') {
  const equipmentSelect = document.getElementById('equipment-select');
  if (!equipmentSelect) {
    showError('Elemento equipment-select não encontrado no DOM.');
  } else {
    try {
      equipmentSelect.innerHTML = '<option value="">Selecione um equipamento</option>';
      for (const eq of window.equipments) {
        const option = document.createElement('option');
        option.value = eq.id;
        option.textContent = eq.name;
        equipmentSelect.appendChild(option);
      }
      console.log('Seletor de equipamentos preenchido:', window.equipments.length, 'opções');
    } catch (e) {
      showError('Erro ao preencher seletor de equipamentos: ' + e.message);
    }
  }
}