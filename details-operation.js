window.renderOperationActions = function() {
  const operationActions = document.getElementById('operation-actions');
  const unavailabilitySelect = document.getElementById('unavailability-select');
  const releaseSelect = document.getElementById('release-select');
  const maintenanceSelect = document.getElementById('maintenance-select');
  const endMaintenanceSelect = document.getElementById('end-maintenance-select');
  const inspectionSelect = document.getElementById('inspection-select');
  const endInspectionSelect = document.getElementById('end-inspection-select');
  if (!operationActions || !unavailabilitySelect || !releaseSelect || !maintenanceSelect || !endMaintenanceSelect || !inspectionSelect || !endInspectionSelect) {
    window.showError('Elementos de ações de operação não encontrados no DOM.');
    return;
  }
  try {
    operationActions.classList.remove('hidden');
    if (window.userType === 'admin') {
      document.getElementById('tab-maintenance').classList.add('hidden');
      document.getElementById('tab-inspection').classList.add('hidden');
      document.getElementById('mark-unavailability').classList.add('hidden');
      document.getElementById('release-unavailability').classList.remove('hidden');
      releaseSelect.innerHTML = '<option value="">Selecione um equipamento</option>';
      const unavailableEquipments = window.equipments.filter(eq => eq.status === 'Indisponível');
      unavailableEquipments.forEach(eq => {
        const option = document.createElement('option');
        option.value = eq.id;
        option.textContent = window.escapeHtml(eq.name || 'N/A') + ' (' + window.escapeHtml(eq.type) + ')';
        releaseSelect.appendChild(option);
      });
      showTab('unavailability');
    } else if (window.userType === 'operacao') {
      document.getElementById('tab-maintenance').classList.remove('hidden');
      document.getElementById('tab-inspection').classList.remove('hidden');
      document.getElementById('mark-unavailability').classList.remove('hidden');
      document.getElementById('release-unavailability').classList.add('hidden');
      const types = [...new Set(window.equipments.map(eq => eq.type))];
      const selects = [unavailabilitySelect, maintenanceSelect, endMaintenanceSelect, inspectionSelect, endInspectionSelect];
      selects.forEach(select => {
        select.innerHTML = '<option value="">Selecione um equipamento</option>';
        types.forEach(type => {
          const optgroup = document.createElement('optgroup');
          optgroup.label = window.escapeHtml(type);
          const equipments = window.equipments.filter(eq => eq.type === type);
          equipments.forEach(eq => {
            const option = document.createElement('option');
            option.value = eq.id;
            option.textContent = window.escapeHtml(eq.name || 'N/A') + ' (' + window.escapeHtml(eq.status) + ')';
            if (select === unavailabilitySelect && eq.status !== 'Disponível') {
              option.disabled = true;
            } else if (select === maintenanceSelect && eq.status !== 'Disponível') {
              option.disabled = true;
            } else if (select === endMaintenanceSelect && eq.status !== 'Manutenção') {
              option.disabled = true;
            } else if (select === inspectionSelect && eq.status !== 'Disponível') {
              option.disabled = true;
            } else if (select === endInspectionSelect && eq.status !== 'Inspeção') {
              option.disabled = true;
            }
            optgroup.appendChild(option);
          });
          select.appendChild(optgroup);
        });
      });
      showTab('unavailability');
    }
    const maintenanceDate = document.getElementById('maintenance-date');
    const inspectionDate = document.getElementById('inspection-date');
    const maintenanceRadios = document.querySelectorAll('input[name="maintenance-type"]');
    const inspectionRadios = document.querySelectorAll('input[name="inspection-type"]');
    maintenanceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        maintenanceDate.classList.toggle('hidden', radio.value === 'immediate');
      });
    });
    inspectionRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        inspectionDate.classList.toggle('hidden', radio.value === 'immediate');
      });
    });
    console.log('Ações de operação renderizadas:', { userType: window.userType, equipments: window.equipments.length });
  } catch (e) {
    window.showError('Erro ao renderizar ações de operação: ' + e.message);
  }
};

window.showTab = function(tab) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(t => {
    t.classList.remove('text-gray-800', 'border-gray-800');
    t.classList.add('text-gray-500', 'border-transparent');
  });
  contents.forEach(c => c.classList.add('hidden'));
  const tabButton = document.getElementById('tab-' + tab);
  if (tabButton && !tabButton.classList.contains('hidden')) {
    tabButton.classList.remove('text-gray-500', 'border-transparent');
    tabButton.classList.add('text-gray-800', 'border-gray-800');
  }
  const tabContent = document.getElementById(tab + '-actions');
  if (tabContent) {
    tabContent.classList.remove('hidden');
  }
  console.log('Aba ' + tab + ' exibida');
};

window.renderOperationActions();