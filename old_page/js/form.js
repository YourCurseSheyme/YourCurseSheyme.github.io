document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact');
    const button = document.querySelector('.submit_button');
    const validators = {
        text: (value) => /^[a-zA-Z\s\-.,!?']+$/.test(value),
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        minLength: (value, min) => value.length >= min
    };

    function DisplayError(input, message) {
        const element = input.nextElementSibling;
        input.classList.add('invalid');
        element.textContent = message;
        element.style.display = 'block';
    }

    function HideError(input) {
        const element = input.nextElementSibling;
        input.classList.remove('invalid');
        element.style.display = 'none';
    }

    function Validate(field) {
        const value = field.value.trim();
        const name = field.name;
        if (field.required && !value) {
            DisplayError(field, 'This field is required');
            return false;
        }
        if (!value) {
            HideError(field);
            return true;
        }
        if (name === 'last_name' && !validators.minLength(value, 2)) {
            DisplayError(field, 'Minimum 2 characters required');
            return false;
        }
        if (name === 'message' && !validators.minLength(value, 15)) {
            DisplayError(field, 'Minimum 15 characters required');
            return false;
        }
        if ((name === 'first_name' || name === 'last_name' || name === 'company' || name === 'message') &&
            !validators.text(value)) {
            DisplayError(field, 'Only English entering allowed');
            return false;
        }
        if (name === 'email' && !validators.email(value)) {
            DisplayError(field, 'Please enter a valid email address');
            return false;
        }
        HideError(field);
        return true;
    }

    function SetSuccess() {
        form.reset();
        button.textContent = 'Success';
        button.classList.add('success');
        button.disabled = true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fields = form.querySelectorAll('.input_field');
        let is_valid = true;

        fields.forEach(field => {
            if (!Validate(field)) {
                is_valid = false;
            }
        });
        if (!is_valid) {
            return;
        }
        const email = form.email.value.trim();
        const subject = `Contact from ${form.first_name.value.trim()} ${form.last_name.value.trim()}`;
        const body = [
            `Company: ${form.company.value.trim()}`,
            '',
            `Message:`,
            form.message.value.trim(),
            '',
            `Contact email: ${email}`
        ].join('%0D%0A');
        window.location.href =
            `mailto:yourcursesheyme@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(email)}`;
        SetSuccess();
    });

    form.querySelectorAll('.input_field').forEach(field => {
        field.addEventListener('input', () => Validate(field));
        field.addEventListener('blur', () => Validate(field));
    });
});