$(document).ready(() => {
let start = Date.now();
  
    $('#this').keyup(() => {
        let inputValue = $('#this').val().toLocaleLowerCase();
        
        if ((Date.now() - start) > 300) {
           console.log("This is it:" + inputValue);

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
        }
    });

});

