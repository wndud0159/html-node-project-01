


const fnSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(event.target[0].value)

    axios.post('/bigwavvAdmin', {password: event.target[0].value})
        .then(response => {
            if(response.data.error) {
                alert(response.data.message)
                return window.location.replace('/')
            }
            console.log(response)
            form.classList.add('hidden')
            waitinglistform.classList.remove('hidden')
            response.data.list.forEach((element) => {
                waitinglist.innerHTML += `
                <div class="flex justify-center items-center text-lg border-b border-gray-500 px-3 py-3">
                <div class="border-r border-gray-500 flex-1 text-center">${element.name}</div>
                <div class=" w-8/12 text-center">${element.email}</div>
                </div>
            `
            }) 
        }).catch(error => {
            console.log('axios post error : ', error)
        })
}

const form = document.querySelector("#form")
const waitinglist = document.querySelector("#waitinglist")
const waitinglistform = document.querySelector('#waitinglistform')
form.addEventListener('submit', fnSubmitHandler)

