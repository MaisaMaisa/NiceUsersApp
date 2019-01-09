$(document).ready(() => {
    $('#this').keyup(() => {
        let inputValue = $('#this').val();
        console.log('This is :' + inputValue);
        
        $.ajax({
            type: 'POST',
            url: '/ajax',
            data: {
                name : inputValue
            },
        }).done((response) => {
            $('#listOfNames').empty();
            for(let i in response) {
                $('#listOfNames').append('<li>' + response[i].firstname + response[i].lastname + '</li');
            }
        });
    });

});
