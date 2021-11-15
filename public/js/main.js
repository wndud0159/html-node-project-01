emailjs.init("user_zvqrtyCDCSrNPEP6Vbw99");
const onEmailSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)

    axios.post('/create', {
        name: e.target[0].value,
        email: e.target[1].value,
    }).then(response => {
        if(response.data.error) {
            console.log(response.data.message)
            document.querySelector("#message").value = response.data.message
            return
        }
        document.querySelector('#isButton').style.display = 'none'
        document.querySelector('#isNotButton').style.display = 'block'
        var templateParams = {
            to_name: response.data.list.name,
            from_name: '빅웨이브',
            iback_modified: `https://waitinglist.iback.co/waitinglist?id=${response.data.list.id}`,
            iback_share: `https://waitinglist.iback.co/waitinglist?id=${response.data.list.id}`,
            to_email: response.data.list.email
        };
        
        emailjs.send('iback', 'template_u2ara8p', templateParams)
            .then(function(res) {
                console.log('SUCCESS!', res.status, res.text);
                window.location.replace(`/waitinglist?id=${response.data.list.id}`);
            }, function(error) {
                console.log('FAILED...', error);
                window.location.replace(`/waitinglist?id=${response.data.list.id}`);
            });
    }).catch(error => {
        console.log("create error: ", error)
    })
}

const form = document.getElementById('form');
form.addEventListener('submit', onEmailSubmitHandler);


