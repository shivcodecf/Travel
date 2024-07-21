
{
let articlesBlock = document.querySelector('.articles');
let updateForm = document.querySelector('.update-post-form');

let titleInp = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let id;

articlesBlock.addEventListener('click', async function(e) {
    if (e.target.classList.contains('btn-edit')) {
         id = e.target.parentNode.parentNode.querySelector('.id').value;

        try {
            let response = await fetch(`/posts/` + id);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            let postInfo = await response.json();

            // let titleInp = document.querySelector('#update-title');
            titleInp.value = postInfo.title;

            // let textArea = document.querySelector('#update-text');
            textArea.value = postInfo.text;

            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');

            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
});

updateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/posts/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInp.value,
            text: textArea.value,
            description: textArea.value // This directly assigns the whole text
        })
    }).then((resp) => resp.text())
    .then(() => window.history.go());
})

}
