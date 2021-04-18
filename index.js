function onClickFunction(id) {
    document.getElementById('card').innerHTML = ''
    let apikey = "tnjPbDzEtpgAJujnl5bvp9NfSDVVSpta";
    let url = `https://api.nytimes.com/svc/topstories/v2/${id}.json?api-key=${apikey}`;
    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            createCards(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function createCards(data) {
    for (let i = 0; i < data.results.length; i++) {


        let card = createElement('div', 'card mt-3');
        let row = createElement('div', 'row')
        let div = createElement('div', 'col-md-8');
        let cardbody = createElement('div', 'card-body');
        let cardtitle = createElement('p', 'card-title');
        cardtitle.innerText = data.results[i].section.toUpperCase();
        let cardtext = createElement('span', 'card-text');
        cardtext.innerText = data.results[i].title;
        let carddate = createElement('p', 'date-card')
        carddate.setAttribute('style', 'height: 7px')

        carddate.innerText = getDate(new Date(data.results[i].created_date));
        let summary = createElement('p', 'summary');
        summary.innerText = data.results[i].abstract;
        let a = createElement('a');
        a.innerText = "continue reading"
        a.setAttribute('href', data.results[i].short_url);
        a.setAttribute('target', '_blank')
        let div2 = createElement('div', 'col-md-4');
        let img = createElement('img', 'img-thumbnail img-fluid');
        img.setAttribute('style', 'height: 264px')
        img.setAttribute('src', data.results[i].multimedia[4].url)
            // img.setAttribute('height', '300px');
            // img.setAttribute('weight', '300px')



        cardbody.append(cardtitle, cardtext, carddate, summary, a);
        div2.append(img);
        div.append(cardbody)
        row.append(div, div2);
        card.append(row)
        document.getElementById('card').append(card);

    }

    function createElement(elementName, elementClass = "", elementId = "") {
        let elem = document.createElement(elementName);
        elem.setAttribute("class", elementClass);
        elem.setAttribute("id", elementId);
        return elem;

    }

    function getDate(date) {

        let month = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[month] + ' ' + date.getDate();
    }
}