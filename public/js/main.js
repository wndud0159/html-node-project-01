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
        window.location.replace(`/waitinglist?id=${response.data.list.id}`);
    }).catch(error => {
        console.log("create error: ", error)
    })
}

const form = document.getElementById('form');
form.addEventListener('submit', onEmailSubmitHandler);
