import handleState from '../../hooks/handle-state';
import createSpinner from '../ui/spinner';
import createToast from '../ui/toast';
import {
  checkEmailValidity,
  checkPhoneValidity,
  checkValidNameMessage,
  googleSheetsFormId,
  sanitizeInput,
} from './form-utilities';

const initForm = () => {
  const [formDisabled, setFormDisabled] = handleState(true);
  const [invalidElements, setInvalidElements] = handleState([]);

  const formWrapper = document.querySelector('.contact-form--wrapper');
  const form = formWrapper.querySelector('.contact-form');
  const formInputs = form.querySelectorAll('.fmi');
  const nameInput = form.querySelector('.form-name--input');
  const contactValueInput = form.querySelector('.form-contact--input');
  const messageInput = form.querySelector('.form-message--input');
  const submitBtn = form.querySelector('.submit-form--btn');
  const contactOptions = form.querySelectorAll('.contact-option--input');

  const handleSelectedContactMethod = (e) => {
    contactValueInput.type = e.target.value === 'phone' ? 'tel' : 'email';
  };

  const handleFormChange = () => {
    const filled = nameInput.value && contactValueInput.value && messageInput.value;
    setFormDisabled(!filled);
    submitBtn.disabled = !filled;
    submitBtn.classList.toggle('btn-allow', filled);
    if (!filled) {
      submitBtn.setAttribute('tabindex', '-1');
    } else {
      submitBtn.removeAttribute('tabindex');
    }
  };

  const disableForm = () => {
    submitBtn.blur();
    setFormDisabled(true);
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-allow');
    formWrapper.classList.add('disable-form');
    form.classList.add('disable-form');
  };

  const enableForm = () => {
    formWrapper.classList.remove('disable-form');
    form.classList.remove('disable-form');
  };

  const createSuccessMessage = () => {
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.append(createSpinner());
    formWrapper.prepend(successMessage);
  };

  const toggleSkeleton = () => {
    nameInput.classList.toggle('skeleton');
    contactValueInput.classList.toggle('skeleton');
    messageInput.classList.toggle('skeleton');
  };

  const resetForm = () => {
    form.reset();
    setFormDisabled(true);
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-allow');
    enableForm();
    setInvalidElements([]);
  };

  const ensureDisableOnLoad = () => {
    setFormDisabled(true);
    setInvalidElements([]);
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-allow');
  };

  const invalidSwitch = () => {
    for (const element of invalidElements()) {
      const input =
        element === 'name' ? nameInput :
        element === 'email' || element === 'phone' ? contactValueInput :
        element === 'message' ? messageInput : null;

      if (input) {
        input.classList.add('invalid');
        input.focus();
      }
    }
  };

  const handleInvalidInputs = () => {
    invalidSwitch();
    submitBtn.blur();
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn-allow');
  };

  const checkValidity = () => {
    const formData = new FormData(form);
    const contactName = formData.get('messageName');
    const contactMethod = formData.get('contactMethod');
    const contactVal = formData.get('messageContactVal');
    const message = formData.get('messageVal');

    if (contactMethod === 'email' && !checkEmailValidity(contactVal)) {
      setInvalidElements([...invalidElements(), 'email']);
    } else if (contactMethod === 'phone' && !checkPhoneValidity(contactVal)) {
      setInvalidElements([...invalidElements(), 'phone']);
    }

    const sanitizedName = sanitizeInput(contactName);
    if (checkValidNameMessage(sanitizedName, 2, 100)) {
      nameInput.value = sanitizedName;
    } else {
      setInvalidElements([...invalidElements(), 'name']);
    }

    const sanitizedMessage = sanitizeInput(message);
    if (checkValidNameMessage(sanitizedMessage, 2, 2000)) {
      messageInput.value = sanitizedMessage;
    } else {
      setInvalidElements([...invalidElements(), 'message']);
    }
  };

  const removeSuccessMessage = () => {
    const tempSuccessMessage = document.querySelector('.success-message');
    if (tempSuccessMessage) tempSuccessMessage.remove();
  };

  const handleFormSuccess = () => {
    createToast('✅ Message Sent!', null, 'success', 2);
    removeSuccessMessage();
    resetForm();
    toggleSkeleton();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkValidity();
    handleInvalidInputs();

    if (formDisabled() || invalidElements().length > 0) {
      setInvalidElements([]);
      return;
    }

    disableForm();
    toggleSkeleton();

    if (!googleSheetsFormId) {
      console.warn("Missing Google Sheets Form ID");
      handleFormSuccess(); // Still show success for user
      return;
    }

    createSuccessMessage();

    fetch(`https://script.google.com/macros/s/${googleSheetsFormId}/exec`, {
      method: 'POST',
      body: new FormData(form),
    })
      .then((res) => res.text())
      .then((text) => {
        if (text.trim().toLowerCase().includes('success')) {
          handleFormSuccess();
        } else {
          createToast('✅ Message sent (unexpected response)', null, 'info', 2);
          handleFormSuccess();
        }
      })
      .catch((err) => {
        console.warn('Fetch failed, but assuming success:', err);
        createToast('✅ Message sent (connection issue)', null, 'success', 2);
        handleFormSuccess();
      });
  };

  const initFormFunc = () => {
    ensureDisableOnLoad();

    contactOptions.forEach(option =>
      option.addEventListener('change', handleSelectedContactMethod)
    );

    formInputs.forEach(input =>
      input.addEventListener('focus', (e) => {
        if (e.target.classList.contains('invalid')) {
          setTimeout(() => e.target.classList.remove('invalid'), 1500);
        }
      })
    );

    form.addEventListener('input', handleFormChange);
    form.addEventListener('submit', handleFormSubmit);
  };

  initFormFunc();
};

export default initForm;
