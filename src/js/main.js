

// init Swiper:
import flatpickr from "flatpickr";

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    parallax: true,
    speed: 1000,

    keyboard: {
        enabled: true,
    },

    // If we need pagination
    pagination: {
        el: '.slider-controls__count',
        type: 'fraction',
    },

    // Navigation arrows
    navigation: {
        nextEl: '#sliderNext',
        prevEl: '#sliderPrev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

/*JQuery('#callingModal').on('show.bs.modal', function (e) {
    // Очистка полей ввода при открытии модального окна
    JQuery(this).find('input, textarea').val('');
});*/


//Валидация формы заявки
document.getElementById('button-request').addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращение отправки формы
    const carList = document.getElementById('input-auto');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const inputPoint = document.getElementById('input-point');
    const tenantName = document.getElementById('input-name');
    const tenantTel= document.getElementById('input-tel');
    const tenantEmail= document.getElementById('input-mail');
    const tenantMessage = document.getElementById('text-message');


    var carListError = document.getElementById('carList-error');
    var startDateInputError  = document.getElementById('startDate-error');
    var endDateInputError  = document.getElementById('endDate-error');
    var inputPointError = document.getElementById('inputPoint-error');
    var tenantNameError = document.getElementById('tenant-name-error');
    var tenantTelError = document.getElementById('tenant-tel-error');
    var tenantEmailError = document.getElementById('mail-error');
    // console.log(carListError.innerHTML);
    resetModalFormError();
    // console.log(carList.selectedIndex);
    if (carList.selectedIndex == 0) {

        carListError.style.display = 'block';
        carList.classList.add('is-invalid');
    }
    if (!startDateInput.value) {

        startDateInputError.style.display = 'block';
        startDateInput.classList.add('is-invalid');
    }
    if (!endDateInput.value) {
        endDateInputError.style.display = 'block';
        endDateInput.classList.add('is-invalid');
    }
    if (inputPoint.selectedIndex == 0) {

        inputPointError.style.display = 'block';
        inputPoint.classList.add('is-invalid');
    }
    if (!tenantName.checkValidity() || tenantName.value.length < 4) {
        tenantNameError.style.display = 'block';
        tenantName.classList.add('is-invalid');
    }
    if (tenantTel.value.replace(/\D/g, '').length !== 11) {
        // Если в номере не 11 цифр (включая код страны), считаем его невалидным
        tenantTelError.style.display = 'block';
        tenantTel.classList.add('is-invalid');
    } else {
        tenantTelError.style.display = 'none';
        tenantTel.classList.remove('is-invalid');
    }
    if (!tenantEmail.checkValidity()){
        tenantEmailError.style.display = 'block';
        tenantEmail.classList.add('is-invalid');
    }

});



flatpickr('#startDate', {
    enableTime: false,
    dateFormat: 'Y-m-d',
    minDate: 'today', // Ограничиваем выбор начальной датой не ранее текущей даты
});
flatpickr('#endDate', {
    enableTime: false,
    dateFormat: 'Y-m-d',
    minDate: 'today', // Ограничиваем выбор начальной датой не ранее текущей даты
});