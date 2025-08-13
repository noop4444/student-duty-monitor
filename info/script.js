document.addEventListener("DOMContentLoaded", function () {
    const dutyCheckboxes = document.querySelectorAll('.duty-checkbox');
    const absentCheckboxes = document.querySelectorAll('.absent-check');

    dutyCheckboxes.forEach(dutyCheckbox => {
        const id = dutyCheckbox.dataset.id;

        // Load saved duty state
        const savedDuty = localStorage.getItem("duty_" + id);
        if (savedDuty === "true") {
            dutyCheckbox.checked = true;
        }

        dutyCheckbox.addEventListener("change", () => {
            if (dutyCheckbox.checked) {
                // Uncheck absent checkbox
                const absentCheckbox = document.querySelector('.absent-check[data-id="' + id + '"]');
                absentCheckbox.checked = false;
                localStorage.removeItem("absent_" + id);
            }
            localStorage.setItem("duty_" + id, dutyCheckbox.checked);
        });
    });

    absentCheckboxes.forEach(absentCheckbox => {
        const id = absentCheckbox.dataset.id;

        // Load saved absent state
        const savedAbsent = localStorage.getItem("absent_" + id);
        if (savedAbsent === "true") {
            absentCheckbox.checked = true;
        }

        absentCheckbox.addEventListener("change", () => {
            if (absentCheckbox.checked) {
                // Uncheck duty checkbox
                const dutyCheckbox = document.querySelector('.duty-checkbox[data-id="' + id + '"]');
                dutyCheckbox.checked = false;
                localStorage.removeItem("duty_" + id);
            }
            localStorage.setItem("absent_" + id, absentCheckbox.checked);
        });
    });
});

function checkAll() {
    const checkboxes = document.querySelectorAll('.duty-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        localStorage.setItem("duty_" + checkbox.dataset.id, true);

        // Uncheck corresponding absent checkbox
        const absentCheckbox = document.querySelector('.absent-check[data-id="' + checkbox.dataset.id + '"]');
        if (absentCheckbox) {
            absentCheckbox.checked = false;
            localStorage.removeItem("absent_" + checkbox.dataset.id);
        }
    });
}

function resetDuties() {
    const dutyCheckboxes = document.querySelectorAll('.duty-checkbox');
    const absentCheckboxes = document.querySelectorAll('.absent-check');

    dutyCheckboxes.forEach(cb => {
        cb.checked = false;
        localStorage.removeItem("duty_" + cb.dataset.id);
    });

    absentCheckboxes.forEach(cb => {
        cb.checked = false;
        localStorage.removeItem("absent_" + cb.dataset.id);
    });
}
