async function getCallbackRequests() {
    return await fetch('http://localhost:3003/callback-requests')
                    .then((response) => response.json())
                    .then((data) => data);
}


let requestsBlock = document.querySelector('#v-pills-callback');

requestsBlock.addEventListener('click', function(e) {
    
    if(e.target.classList.contains('btn-remove')) {
         e.preventDefault();
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3003/callback-requests/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})