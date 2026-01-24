function rnd(x) {
  if (!isFinite(x)) return x;
  return Math.round(x * 1000) / 1000;
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

function toDeg(rad) {
  return rad * 180 / Math.PI;
}

function normalizeRad(a) {
  while (a <= -Math.PI) a += 2 * Math.PI;
  while (a > Math.PI) a -= 2 * Math.PI;
  return a;
}

function isValidNumber(str) {
  str = str.trim();
  return /^-?\d+(\.\d+)?$/.test(str);
}

document.addEventListener('DOMContentLoaded', () => {
  const radioAlg = document.getElementById('radioAlg');
  const radioExp = document.getElementById('radioExp');
  const btnShow = document.getElementById('btnShow');
  const btnCalc = document.getElementById('btnCalc');
  const btnClear = document.getElementById('btnClear');
  const label1 = document.getElementById('label1');
  const label2 = document.getElementById('label2');
  const result = document.getElementById('result');
  const findLabel = document.getElementById('findLabel');
  const formImage = document.getElementById('formImage');

  const chkArg = document.getElementById('opArg');
  const chkIm = document.getElementById('opIm');
  const chkMod = document.getElementById('opMod');
  const chkOther = document.getElementById('opOther');

  function clearResult() {
    result.textContent = '';
    findLabel.classList.remove('find-warning');
  }

  function markError(el, msg) {
    el.classList.add('input-error');
    el.value = msg;
    el.placeholder = '';
  }

  function restoreField(el) {
    el.classList.remove('input-error');
    el.value = '';
    el.placeholder = el.dataset.placeholder || '';
  }

  function bindInputs() {
    window.input1 = document.getElementById('input1');
    window.input2 = document.getElementById('input2');

    input1.dataset.placeholder = input1.placeholder;
    input2.dataset.placeholder = input2.placeholder;

    function clearOnFocus(e) {
      const el = e.currentTarget;
      if (el.classList.contains('input-error')) {
        restoreField(el);
      }
      clearResult();
    }

    input1.addEventListener('focus', clearOnFocus);
    input2.addEventListener('focus', clearOnFocus);
    input1.addEventListener('click', clearOnFocus);
    input2.addEventListener('click', clearOnFocus);

    input1.addEventListener('input', clearResult);
    input2.addEventListener('input', clearResult);
  }

  function showForm() {
    if (radioAlg.checked) {
      label1.innerHTML = 'Re(z) = <input type="text" id="input1" placeholder="например, 1.5">';
      label2.innerHTML = 'Im(z) = <input type="text" id="input2" placeholder="например, -2">';
      formImage.src = 'alg.png';
    } else {
      label1.innerHTML = 'r (модуль) = <input type="text" id="input1" placeholder="например, 2.5">';
      label2.innerHTML = 'φ (градусы) = <input type="text" id="input2" placeholder="например, 45">';
      formImage.src = 'exp.png';
    }
    bindInputs();
    clearResult();
  }

  btnShow.addEventListener('click', showForm);

  chkArg.addEventListener('focus',clearResult);
  chkIm.addEventListener('focus',clearResult);
  chkMod.addEventListener('focus',clearResult);
  chkOther.addEventListener('focus',clearResult);

  btnClear.addEventListener('click', () => {
    restoreField(input1);
    restoreField(input2);
    chkArg.checked = chkIm.checked = chkMod.checked = chkOther.checked = false;
    clearResult();
  });

  btnCalc.addEventListener('click', () => {
    clearResult();

    const noOpsSelected = !(chkArg.checked || chkIm.checked || chkMod.checked || chkOther.checked);

    if (noOpsSelected) {
      findLabel.classList.add('find-warning');
      result.textContent = 'Ошибка: выберите, что необходимо найти.';

      if (input1.value.trim() === '') {
        markError(input1, 'Введите значение');
      }
      if (input2.value.trim() === '') {
        markError(input2, 'Введите значение');
      }
      return;
    }

    const formType = radioAlg.checked ? 'algebraic' : 'exponential';
    const s1 = input1.value.trim();
    const s2 = input2.value.trim();

    let x, y, r, phiDeg;
    let hasError = false;

    input1.classList.remove('input-error');
    input2.classList.remove('input-error');

    if (formType === 'algebraic') {
      if (!isValidNumber(s1)) {
        markError(input1, 'Некорректное Re');
        hasError = true;
      }
      if (!isValidNumber(s2)) {
        markError(input2, 'Некорректное Im');
        hasError = true;
      }
      if (hasError) {
        result.textContent = 'Введите корректные числа.';
        return;
      }
      x = parseFloat(s1);
      y = parseFloat(s2);
      r = Math.hypot(x, y);
      phiDeg = toDeg(normalizeRad(Math.atan2(y, x)));
    } else {
      if (!isValidNumber(s1)) {
        markError(input1, 'Некорректное r');
        hasError = true;
      } else if (parseFloat(s1) < 0) {
        markError(input1, 'r ≥ 0');
        hasError = true;
      }
      if (!isValidNumber(s2)) {
        markError(input2, 'Некорректное φ');
        hasError = true;
      }
      if (hasError) {
        result.textContent = 'Введите корректные числа.';
        return;
      }
      r = parseFloat(s1);
      phiDeg = parseFloat(s2);
      const phiRad = toRad(phiDeg);
      x = r * Math.cos(phiRad);
      y = r * Math.sin(phiRad);
      phiDeg = toDeg(normalizeRad(phiRad));
    }

    const out = [];

    if (formType === 'algebraic') {
      out.push(`z = ${rnd(x)} ${y >= 0 ? '+' : '-'} ${Math.abs(rnd(y))}i`);
    } else {
      out.push(`z = ${rnd(r)} · e^{i·${rnd(phiDeg)}°}`);
    }

    out.push('');

    if (chkMod.checked) out.push(`|z| = ${rnd(r)}`);
    if (chkArg.checked) out.push(`φ = ${rnd(phiDeg)}°`);
    if (chkIm.checked) out.push(`Im(z) = ${rnd(y)}`);

    if (chkOther.checked) {
      out.push('Представления:');
      if (formType === 'algebraic') {
        out.push(`  Показательная: ${rnd(r)} · e^{i·${rnd(phiDeg)}°}`);
      } else {
        out.push(`  Алгебраическая: ${rnd(x)} ${y >= 0 ? '+' : '-'} ${Math.abs(rnd(y))}i`);
      }
    }

    result.textContent = out.join('\n');
  });

  showForm();
});
