$(document).ready(function () {
    const API_URL = 'http://localhost:3000/Cars';
    function getCars() {
        $.ajax ({
            url: API_URL,
            method: 'GET',
            success: function (response) {
                console.log(response)
            },
            error: function(xhr, status, error) {
                console.log(error)
            }
        })
    }
    getCars();
});