(
    async function() {
        var elements = await get_elements(document, 'Highlights');
        await processing(elements);
        elements = await get_elements(document, 'Top 250');
        await processing(elements);
    }
)();

async function processing(elements) {
    var count = elements.length;

    for (var e = 0; e < count; e++) {
        var element = elements[e];

        if (element.text.length > 4) {
            element.text = element.text.substring(0, 4);
        }

        var films_list_id = get_href(element);
        var url = 'https://www.imdb.com/list/' + films_list_id + '/export';
        var user_url = 'https://www.imdb.com/user/ur85058361/ratings/export';

        await fetch(user_url).then(response => response.text()).then(async(user_data) => {
            var user_films = Papa.parse(String(user_data)).data;
            var count_user_films = user_films.length - 2;
           
            await fetch(url).then(response => response.text()).then(async (data) => {
                var films = Papa.parse(String(data)).data;
                var count_films = films.length - 2;
                var found = 0;

                for (var i = 1; i <= count_films; i++) {
                    var film = films[i][1];
                    var isExist = false;

                    for (var j = 1; j <= count_user_films; j++) {
                        var user_film = user_films[j][0];
                        
                        if (user_film == film) {
                            isExist = true;
                            break;
                        }
                    }

                    if (isExist) {
                        found += 1;
                        console.log('Film ' + film + ' Exist');
                    } else {
                        console.log('Film ' + film + ' is not Exist');
                    }
                }

                var result = (found + '/' + count_films);
                element.text += (' (' + result +')');
            });
        });
    }
}

function get_elements(document, list_name) {
    let lists = { "Highlights": 1, "Top 250": 2 };
    var elements = document.getElementsByClassName('article')[0].getElementsByTagName("table")[0]
        .getElementsByTagName("tbody")[0].getElementsByTagName("tr")[lists[list_name]]
        .getElementsByTagName("td")[1].getElementsByTagName("a");
    return elements;
}

function get_href(element) {
    var href = element.getAttribute('href').split('/')[2];
    return href;
}