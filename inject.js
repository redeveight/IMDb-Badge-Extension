(
    function() {
        var elements = get_elements(document);
        var count = elements.length;

        for (var i = 0; i < count; i++) {
            var element = elements[i];

            if (element.text.length > 4) {
                element.text = element.text.substring(0, 4);
            }

            element.text += ' (75%)';

            console.log(get_href(element));
        }
        //read_file();
    }
)();

function get_elements(document) {
    var elements = document.getElementsByClassName('article')[0].getElementsByTagName("table")[0]
        .getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1]
        .getElementsByTagName("td")[1].getElementsByTagName("a");
    return elements;
}

function get_href(element) {
    var href = element.getAttribute('href').split('/')[2];
    return href;
}

function read_file() {
    fetch('https://www.imdb.com/user/ur85058361/ratings/export').then(response => response.text()).then(text => console.log(text.split('\n')[1].split(',')[1]))
    //return " (70%)";
}