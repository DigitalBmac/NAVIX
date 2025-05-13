window.markUnavailability = function() {
  try {
    if (window.userType !== 'operacao') {
      alert('Apenas operação pode marcar indisponibilidade.');
      return;
    }
    const select = document.getElementById('unavailability-select');
    const os = document.getElementById('unavailability-os').value;
    const reason = document.getElementById('unavailability-reason').value;
    const justification = document.getElementById('unavailability-justification').value;
    const responsible = document.getElementById('unavailability-responsible').value;
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    if (!os || !reason || !justification || !responsible) {
      alert('Preencha todos os campos (OS, motivo, justificativa, responsável).');
      return;
    }
    const equipmentId = parseInt(select.value);
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Disponível') {
      alert('Este equipamento não está disponível.');
      return;
    }
    equipment.status = 'Indisponível';
    equipment.history.push({
      type: 'unavailability',
      os: os,
      reason: reason,
      justification: justification,
      responsible: responsible,
      date: new Date().toLocaleString('pt-BR')
    });
    window.saveEquipments(window.equipments);
    alert('Solicitação de retirada de indisponibilidade para ' + equipment.name + ' registrada.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Indisponibilidade marcada:', equipment.name);
  } catch (e) {
    window.showError('Erro ao marcar indisponibilidade: ' + e.message);
  }
};

window.releaseUnavailability = function() {
  try {
    if (window.userType !== 'admin') {
      alert('Apenas administradores podem liberar indisponibilidade.');
      return;
    }
    const select = document.getElementById('release-select');
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    const equipmentId = parseInt(select.value);
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Indisponível') {
      alert('Este equipamento não está indisponível.');
      return;
    }
    equipment.status = 'Disponível';
    equipment.history.push({
      type: 'return',
      responsible: 'Admin',
      date: new Date().toLocaleString('pt-BR')
    });
    window.saveEquipments(window.equipments);
    alert('Indisponibilidade liberada para ' + equipment.name + '.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Indisponibilidade liberada:', equipment.name);
  } catch (e) {
    window.showError('Erro ao liberar indisponibilidade: ' + e.message);
  }
};

window.startMaintenance = function() {
  try {
    if (window.userType !== 'operacao') {
      alert('Apenas operação pode iniciar manutenção.');
      return;
    }
    const select = document.getElementById('maintenance-select');
    const type = document.querySelector('input[name="maintenance-type"]:checked').value;
    const date = document.getElementById('maintenance-date').value;
    const os = document.getElementById('maintenance-os').value;
    const responsible = document.getElementById('maintenance-responsible').value;
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    if (type === 'scheduled' && !date) {
      alert('Informe a data de agendamento.');
      return;
    }
    if (!os || !responsible) {
      alert('Preencha todos os campos (OS, responsável).');
      return;
    }
    const equipmentId = parseInt(select.value);
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Disponível') {
      alert('Este equipamento não está disponível.');
      return;
    }
    if (type === 'immediate') {
      equipment.status = 'Manutenção';
      equipment.history.push({
        type: 'maintenance',
        os: os,
        responsible: responsible,
        date: new Date().toLocaleString('pt-BR')
      });
    } else {
      equipment.history.push({
        type: 'scheduled_maintenance',
        os: os,
        responsible: responsible,
        scheduledDate: new Date(date).toLocaleString('pt-BR')
      });
    }
    window.saveEquipments(window.equipments);
    alert('Manutenção ' + (type === 'immediate' ? 'iniciada' : 'agendada') + ' para ' + equipment.name + '.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Manutenção ' + type + ' para:', equipment.name);
  } catch (e) {
    window.showError('Erro ao iniciar/agendar manutenção: ' + e.message);
  }
};

window.endMaintenance = function() {
  try {
    if (window.userType !== 'operacao') {
      alert('Apenas operação pode retirar manutenção.');
      return;
    }
    const select = document.getElementById('end-maintenance-select');
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    const equipmentId = parseInt(select.value);
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
    alert('Equipamento ' + equipment.name + ' retirado da manutenção com sucesso.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Equipamento retirado da manutenção:', equipment.name);
  } catch (e) {
    window.showError('Erro ao retirar manutenção: ' + e.message);
  }
};

window.startInspection = function() {
  try {
    if (window.userType !== 'operacao') {
      alert('Apenas operação pode iniciar inspeção.');
      return;
    }
    const select = document.getElementById('inspection-select');
    const type = document.querySelector('input[name="inspection-type"]:checked').value;
    const date = document.getElementById('inspection-date').value;
    const os = document.getElementById('inspection-os').value;
    const responsible = document.getElementById('inspection-responsible').value;
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    if (type === 'scheduled' && !date) {
      alert('Informe a data de agendamento.');
      return;
    }
    if (!os || !responsible) {
      alert('Preencha todos os campos (OS, responsável).');
      return;
    }
    const equipmentId = parseInt(select.value);
    const equipment = window.equipments.find(eq => eq.id === equipmentId);
    if (!equipment) {
      alert('Equipamento não encontrado.');
      return;
    }
    if (equipment.status !== 'Disponível') {
      alert('Este equipamento não está disponível.');
      return;
    }
    if (type === 'immediate') {
      equipment.status = 'Inspeção';
      equipment.history.push({
        type: 'inspection',
        os: os,
        responsible: responsible,
        date: new Date().toLocaleString('pt-BR')
      });
    } else {
      equipment.history.push({
        type: 'scheduled_inspection',
        os: os,
        responsible: responsible,
        scheduledDate: new Date(date).toLocaleString('pt-BR')
      });
    }
    window.saveEquipments(window.equipments);
    alert('Inspeção ' + (type === 'immediate' ? 'iniciada' : 'agendada') + ' para ' + equipment.name + '.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Inspeção ' + type + ' para:', equipment.name);
  } catch (e) {
    window.showError('Erro ao iniciar/agendar inspeção: ' + e.message);
  }
};

window.endInspection = function() {
  try {
    if (window.userType !== 'operacao') {
      alert('Apenas operação pode retirar inspeção.');
      return;
    }
    const select = document.getElementById('end-inspection-select');
    if (!select || !select.value) {
      alert('Selecione um equipamento.');
      return;
    }
    const equipmentId = parseInt(select.value);
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
    alert('Equipamento ' + equipment.name + ' retirado da inspeção com sucesso.');
    window.renderEquipmentDetails();
    window.renderOperationActions();
    console.log('Equipamento retirado da inspeção:', equipment.name);
  } catch (e) {
    window.showError('Erro ao retirar inspeção: ' + e.message);
  }
};