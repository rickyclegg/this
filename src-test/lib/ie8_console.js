(function () {
    if (!window.console) {
        window.console = {
            log: function (msg) {
                var pElement = document.createElement('p');
                pElement.innerText = msg;
                document.body.appendChild(pElement);
            }
        };

        window.console.log('Using IE Console!');
    }
}());