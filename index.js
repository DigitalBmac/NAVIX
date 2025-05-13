document.addEventListener('DOMContentLoaded', () => {
  // Lista de usuários cadastrados (estática, pode ser movida para localStorage)
  const registeredUsers = [
    { username: 'Maria Souza', password: 'senha123', type: 'operacao' },
    { username: 'João Silva', password: 'admin456', type: 'admin' },
    { username: 'Ana Costa', password: 'operacao789', type: 'operacao' }
  ];

  // Preencher datalist com usuários
  const datalist = document.getElementById('usernames');
  if (datalist) {
    registeredUsers.forEach(user => {
      const option = document.createElement('option');
      option.value = user.username;
      datalist.appendChild(option);
    });
    console.log('Datalist preenchido com usuários:', registeredUsers.map(u => u.username));
  } else {
    console.error('Datalist usernames não encontrado');
  }

  // Adicionar evento de duplo clique na logo
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('dblclick', () => {
      console.log('Logo duplo-clicado, redirecionando para developer.html');
      window.location.href = 'developer.html';
    });
  } else {
    console.error('Logo não encontrado');
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      // Validar campos
      if (!username) {
        alert('Por favor, selecione ou digite um usuário.');
        return;
      }
      if (!password) {
        alert('Por favor, digite a senha.');
        return;
      }

      // Verificar usuário e senha
      const user = registeredUsers.find(u => u.username === username && u.password === password);
      if (!user) {
        alert('Usuário ou senha inválidos.');
        return;
      }

      // Salvar no localStorage
      localStorage.setItem('userName', username);
      localStorage.setItem('userType', user.type);
      console.log('Login bem-sucedido:', { username, userType: user.type });

      // Redirecionar para dashboard
      window.location.href = 'dashboard.html';
    });
  } else {
    console.error('Formulário login-form não encontrado');
  }
});