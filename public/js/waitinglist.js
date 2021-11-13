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
                    document.querySelector("#name").value = response.data.list.name
                    document.querySelector("#email").value = response.data.list.email
                }).catch(error => {
                    console.log('get waitinglist error : ', error)
                })

            } else {
                window.location.replace('/');
            }
        }
        getinfo();

        function copy() {
            var obj = document.getElementById("ibackURL");
            var range = document.createRange();
            range.selectNode(obj.childNodes[0]); //텍스트 정보를 Range 객체에 저장
            var sel = window.getSelection();
            sel.removeAllRanges(); //기존 선택정보 삭제
            sel.addRange(range); //텍스트 정보 선택
            document.execCommand("copy"); //복사
            sel.removeRange(range); //선택 정보 삭제

            // document.querySelector("#message").value = 'Copied! 링크를 공유하세요!'
            alert('복사 되었습니다. 친구에게 링크를 공유해보세요!')
        }

const copyButton = document.getElementById('copyButton')

copyButton.addEventListener("click", copy)
        