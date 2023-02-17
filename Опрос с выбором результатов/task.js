const urlGet = "https://students.netoservices.ru/nestjs-backend/poll",
    urlPost = "https://students.netoservices.ru/nestjs-backend/poll",
    title = document.querySelector(".poll__title"),
    answers = document.querySelector(".poll__answers");


let xhr = sendRequest();
xhr.open("GET", urlGet);
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

        let resp = xhr.response,
            val = resp.data,
            id = resp.id,
            arrAnswers = val.answers

        title.textContent = val.title

        arrAnswers.forEach(el => {
            const button = document.createElement("button")
            button.classList.add("poll__answer")
            button.textContent = el
            answers.append(button)

        });


        const answer = document.querySelectorAll(".poll__answer"),
            xhrP = sendRequest()
        xhrP.open('POST', urlPost);
        xhrP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        answer.forEach((el, index) => {
            el.addEventListener("click", () => {
                xhrP.send(`vote=${id}&answer=${index}`);
                alert('«Спасибо, ваш голос засчитан!»')
                answers.remove()
            })
        })

        xhrP.onreadystatechange = function () {
            if (xhrP.readyState == 4 && xhrP.status == 201) {
                let response = xhrP.response,
                    statistic = response.stat;

                statistic.forEach(el => {
                    const p = document.createElement("p")
                    p.textContent = `${el["answer"]}: ${el["votes"] / 100}%`
                    title.append(p)
                });
            }
        }
    }
}


function sendRequest() {
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    return request
}
