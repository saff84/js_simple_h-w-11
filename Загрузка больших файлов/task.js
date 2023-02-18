const progress = document.getElementById('progress'),
    form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.upload.onprogress = (event) => {
        console.log(`Отправлено ${event.loaded} из ${event.total} байт`)
        progress.value = event.loaded;
    }
    xhr.send(formData);
});

