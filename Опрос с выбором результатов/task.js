const urlGet = "https://students.netoservices.ru/nestjs-backend/poll",
    urlPost = "https://students.netoservices.ru/nestjs-backend/poll",
    title = document.querySelector(".poll__title"),
    answers = document.querySelector(".poll__answers");


let xhr = new XMLHttpRequest();
xhr.open("GET", urlGet);
xhr.send();

xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {

        let a = JSON.parse(xhr.responseText),
            val = a.data,
            id = a.id,
            arrAnswers = val.answers

        title.textContent = val.title
        const button = document.createElement("button")
        button.classList.add(".poll__answer")

        arrAnswers.forEach(el => {
            answers.insertAdjacentHTML("beforeend", `
            <button class="poll__answer">
            ${el}
          </button>
            `)

        });


        const answer = document.querySelectorAll(".poll__answer"),
            xhrP = new XMLHttpRequest;
        xhrP.open('POST', urlPost);
        xhrP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        answer.forEach((el, index) => {
            el.addEventListener("click", () => {
                xhrP.send(`vote=${id}&answer=${index}`);
                alert('«Спасибо, ваш голос засчитан!»')
                answers.remove()
            })
        })

        xhrP.addEventListener("readystatechange", () => {
            if (xhrP.readyState === xhrP.DONE) {
                let response = JSON.parse(xhrP.responseText),
                    stastic = response.stat;

                stastic.forEach(el => {
                    title.insertAdjacentHTML("beforeend", `
                    <p>
                    ${el["answer"]}: ${el["votes"] / 100}%
                  </p>
                    `)

                });
            }
        })
    }
})

