const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://www.mrsoft.by/data.json';

function getData(url) {
    return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        })
        .then(res => res.json())
        .catch(error => {
            return `Error: , ${error}`;
        });
}

function form(data) {
    const inputText = document.querySelector('.input-text');
    const checkbox = document.querySelector('.input-checkbox');
    const wordBtn = document.querySelector('.word-btn');
    const substringBtn = document.querySelector('.substring-btn');
    const output = document.querySelector('.output');

    const filter = (data, length) => {
            let filterText = inputText.value;

            const filteredItems = data.filter(
                (item) => {
                    if (length) {
                        return item.length > filterText
                    } else {
                        return checkbox.checked ? item.toLowerCase().includes(filterText) ||
                            item.toUpperCase().includes(filterText) :
                            item.includes(filterText)
                    }
                }
            );

            const itemsToDisplay = filteredItems || data;
            const result = (items) => {
                    return output.innerHTML = `<ul>${items.map((item) => (
            `<li>${item}</li>`))}</ul>`,
                output.classList.add('data');
        };

        result(itemsToDisplay)
        console.log(filterText)
    };

    wordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filter(data, true)
    })

    substringBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filter(data, false)
    })
}

getData(proxy + url).then((data) => {
    console.log(data);
    form(data.data)
})