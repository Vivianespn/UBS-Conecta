document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  const forms = document.querySelectorAll('.wizard-form');
  const btnPrevious = document.querySelector('.btn-previous');
  const btnSubmit = document.querySelector('.btn-submit');

  let currentStep = 0;

  // Função para exibir o formulário da etapa atual
  function showStep(index) {
    forms.forEach((form, i) => {
      form.classList.toggle('active', i === index);
    });
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });
    btnPrevious.style.display = index === 0 ? 'none' : 'inline-block';
    btnSubmit.textContent = index === forms.length - 1 ? 'Enviar' : 'Avançar';
  }

  // Validação de campos obrigatórios e de senha
  function validateStep(index) {
    const fields = forms[index].querySelectorAll(
      'input[required], select[required], textarea[required]'
    );
    let isValid = true;
    let missingFields = [];
    let senha = true;

    fields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        missingFields.push(field.previousElementSibling.textContent);
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      alert('Preencha os campos obrigatorios');
    }

    // Validação de senha
    const passwordField = forms[index].querySelector('input[type="password"]');
    const confirmPasswordField = forms[index].querySelector(
      'input[name="confirm-password"]'
    );
    if (passwordField && confirmPasswordField) {
      if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordField.classList.add('is-invalid');
        missingFields.push('Confirme a senha');
        senha = false;
      } else {
        confirmPasswordField.classList.remove('is-invalid');
      }
    }

    if (!senha) {
      alert('As senhas não são iguais');
    }

    return isValid && senha;
  }

  // Atualizar resumo final
  function updateSummary() {
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach((input) => {
        const summaryField = document.querySelector(
          `dd[data-for="${input.id}"]`
        );
        if (summaryField) {
          summaryField.textContent = input.value.trim() || 'Não informado';
        }
      });
    });
  }

  // Navegação dos botões
  btnSubmit.addEventListener('click', () => {
    if (currentStep < forms.length - 1) {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        // Atualiza o resumo quando chegar na última etapa
        if (currentStep === forms.length - 1) {
          updateSummary();
        }
      }
    } else {
      if (validateStep(currentStep)) {
        // Capturar todos os dados do formulário
        const formData = {};
        forms.forEach((form) => {
          const inputs = form.querySelectorAll('input, select, textarea');
          inputs.forEach((input) => {
            formData[input.name] = input.value.trim();
          });
        });

        // Salvar os dados no localStorage como JSON
        localStorage.setItem('formData', JSON.stringify(formData));

        alert('Formulário enviado com sucesso!');
        window.location.href = 'cadastro_concluido.html';
      }
    }
  });

  btnPrevious.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // Inicializar
  showStep(currentStep);
});
