function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }
async function getinfo() {
    const id = getParameterByName('id');
    if(id) {
        await axios.get(`/waitinglist/${id}`)
        .then(response => {
            if(response.data.error) {
                console.log(response.data.message)
                return
            }
            document.querySelectorAll("#name")[0].innerHTML = response.data.list.name
            document.querySelectorAll("#name")[1].value = response.data.list.name
            document.querySelector("#email").value = response.data.list.email
        }).catch(error => {
            console.log('get waitinglist error : ', error)
        })

    } else {
        window.location.replace('/');
    }
}
getinfo();


Kakao.init('27c3bac20c362a640406590367df687d');
Kakao.Link.createDefaultButton({
    container: '#kakaoShare',
    objectType: 'feed',
    content: {
    title: '아이백',
    description: '곧 출시될 아이백 서비스의 웨이팅 리스트에 등록하세요!',
    imageUrl: 'https://waitinglist.iback.co/iback_main_image03.png',
    link: {
        mobileWebUrl: 'https://waitinglist.iback.co',
        webUrl: 'https://waitinglist.iback.co',
    },
    },
    buttons: [
    {
        title: '웹으로 보기',
        link: {
        mobileWebUrl: 'https://waitinglist.iback.co',
        webUrl: 'https://waitinglist.iback.co',
        },
    },
    ],
})
        


        