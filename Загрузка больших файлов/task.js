const progress = document.getElementById('progress'),
    form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.onprogress = (event) => {

        progress.value = event.loaded;
    }
    xhr.send(formData);
});

