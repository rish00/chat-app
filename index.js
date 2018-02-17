$(document).ready(function(){    
    var pusher = new Pusher('cc95fa24b41068f04265', {
        cluster: 'ap2',
        encrypted: false
    });

    let channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function(){
        const message = $("#message").val();
        $("#message").val("");

        $(".chat").append(template);

        //send message
        $.post( "http://localhost:5000/message", { message } );
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);

        $(".chat").append(template);
    }
});
