/**
 * Client-side form validation (docs/site-spec.md §7 and §9), used by form scripts.
 * Controls opt in with `data-validate`; their messages ride on data attributes
 * (`data-msg-required`, `data-msg-format`, `data-msg-size`, `data-msg-type`), set by
 * the TextField / SelectField / FileField components. Each control's error slot is
 * `#<id>-error`, rendered hidden.
 *
 * An invalid control gets aria-invalid="true", its message shown, and the message id
 * added to aria-describedby (removed again once it's fixed). Without JS, the form
 * falls back to native HTML validation (`required`, `type="email"`).
 */

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Stricter than the browser's check, which accepts "name@company" without a dot.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The error message for a control's current value, or null if it's valid. */
export function validateControl(control: Control): string | null {
  const msg = control.dataset;
  if (control instanceof HTMLInputElement && control.type === 'file') {
    const file = control.files?.[0];
    if (!file) return null;
    const accepted = control.accept
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
    if (accepted.length > 0 && !accepted.includes(extension)) return msg.msgType ?? null;
    if (file.size > Number(msg.maxBytes)) return msg.msgSize ?? null;
    return null;
  }
  const value = control.value.trim();
  if (control.required && value === '') return msg.msgRequired ?? null;
  if (value !== '' && control instanceof HTMLInputElement && control.type === 'email' && !EMAIL.test(value)) {
    return msg.msgFormat ?? null;
  }
  return null;
}

/** Show or clear a control's inline error. */
export function setError(control: Control, message: string | null): void {
  const slot = document.getElementById(`${control.id}-error`);
  if (!slot) return;
  const described = (control.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((id) => id && id !== slot.id);
  if (message) {
    slot.querySelector('[data-error-text]')!.textContent = message;
    slot.hidden = false;
    control.setAttribute('aria-invalid', 'true');
    described.push(slot.id);
  } else {
    slot.hidden = true;
    control.removeAttribute('aria-invalid');
  }
  if (described.length > 0) control.setAttribute('aria-describedby', described.join(' '));
  else control.removeAttribute('aria-describedby');
}

export interface FieldError {
  control: Control;
  message: string;
}

/** Validate every opted-in control in a form; returns the errors in document order. */
export function validateForm(form: HTMLFormElement): FieldError[] {
  const errors: FieldError[] = [];
  for (const control of form.querySelectorAll<Control>('[data-validate]')) {
    const message = validateControl(control);
    setError(control, message);
    if (message) errors.push({ control, message });
  }
  return errors;
}

/**
 * Fill the error summary (an `.error-summary` with a <ul>) and move focus to it.
 * Each item links to its field; following the link scrolls the field's label into
 * view and focuses the control.
 */
export function showSummary(summary: HTMLElement, errors: FieldError[]): void {
  const list = summary.querySelector('ul')!;
  list.replaceChildren(
    ...errors.map(({ control, message }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${control.id}`;
      link.className = 'inline-block py-1';
      link.textContent = message;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        (control.parentElement ?? control).scrollIntoView({ block: 'start' });
        control.focus({ preventScroll: true });
      });
      item.append(link);
      return item;
    }),
  );
  summary.hidden = false;
  summary.focus();
}
