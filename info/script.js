document.addEventListener("DOMContentLoaded", function () {
    const dutyCheckboxes = document.querySelectorAll('.duty-checkbox');
    const absentCheckboxes = document.querySelectorAll('.absent-check');

    dutyCheckboxes.forEach(dutyCheckbox => {
        const id = dutyCheckbox.dataset.id;
        const day = dutyCheckbox.dataset.day;

        const savedDuty = localStorage.getItem(day + "_duty_" + id);
        if (savedDuty === "true") {
            dutyCheckbox.checked = true;
        }

        dutyCheckbox.addEventListener("change", () => {
            if (dutyCheckbox.checked) {
                const absentCheckbox = document.querySelector('.absent-check[data-day="' + day + '"][data-id="' + id + '"]');
                absentCheckbox.checked = false;
                localStorage.removeItem(day + "_absent_" + id);
            }
            localStorage.setItem(day + "_duty_" + id, dutyCheckbox.checked);
        });
    });

    absentCheckboxes.forEach(absentCheckbox => {
        const id = absentCheckbox.dataset.id;
        const day = absentCheckbox.dataset.day;

        const savedAbsent = localStorage.getItem(day + "_absent_" + id);
        if (savedAbsent === "true") {
            absentCheckbox.checked = true;
        }

        absentCheckbox.addEventListener("change", () => {
            if (absentCheckbox.checked) {
                const dutyCheckbox = document.querySelector('.duty-checkbox[data-day="' + day + '"][data-id="' + id + '"]');
                dutyCheckbox.checked = false;
                localStorage.removeItem(day + "_duty_" + id);
            }
            localStorage.setItem(day + "_absent_" + id, absentCheckbox.checked);
        });
    });
});

function checkAll() {
    const checkboxes = document.querySelectorAll('.duty-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        const day = checkbox.dataset.day;
        localStorage.setItem(day + "_duty_" + checkbox.dataset.id, true);

        const absentCheckbox = document.querySelector('.absent-check[data-day="' + day + '"][data-id="' + checkbox.dataset.id + '"]');
        if (absentCheckbox) {
            absentCheckbox.checked = false;
            localStorage.removeItem(day + "_absent_" + checkbox.dataset.id);
        }
    });
}

function resetDuties() {
    const dutyCheckboxes = document.querySelectorAll('.duty-checkbox');
    const absentCheckboxes = document.querySelectorAll('.absent-check');

    dutyCheckboxes.forEach(cb => {
        cb.checked = false;
        localStorage.removeItem(cb.dataset.day + "_duty_" + cb.dataset.id);
    });

    absentCheckboxes.forEach(cb => {
        cb.checked = false;
        localStorage.removeItem(cb.dataset.day + "_absent_" + cb.dataset.id);
    });
}
