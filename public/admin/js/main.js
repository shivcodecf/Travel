document.addEventListener('DOMContentLoaded', async function() {
    addPosts();
    addCallbackRequests();
    addEmails();
}); 










 addPostBtn.addEventListener('click',function(){

    let articlesTab=document.getElementById('v-pills-articles');

    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createTab=document.getElementById('v-pills-create-post');

    createTab.classList.add('show');
    createTab.classList.add('active');


})


async function addPosts(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = ''; 
    let i=1;

    
    posts.forEach((post) => {
        let postHTML = `<article class="d-flex justify-content-between article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value ="${post.id}">
            <div class="name">${post.title}</div>
            <div class="date">${post.date}</div>
            <div class="country">${post.country}</div>
            <div class="edit"><button class="btn btn-link btn-edit">Edit</button></div>
            <div class="remove"><button class="btn btn-link btn-remove">x</button></div>
        </article>`;
        
        articles.insertAdjacentHTML('beforeend', postHTML); // Correct method for inserting HTML string
    });
}




async function addCallbackRequests(){
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-callback');
    requestsBlock.innerHTML = ''; 
    let i=1;

    
    requests.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value ="${request.id}">
            <div class="name w60">${request.phoneNumber}</div>
            <div class="date w30">${request.date}</div>
           
            <div class="remove w5"><button class="btn btn-link btn-remove">x</button></div>
        </article>`;
        
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML); // Correct method for inserting HTML string
    });
}



async function addEmails() {
    let requests = await getEmails();
    let requestsBlock = document.querySelector('#v-pills-mails');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${request.id}">
            <div class="name w30">${request.name}</div>
            <div class="email w30">${request.email}</div>
            <div class="date w30">${request.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
            <div class="text w100">${request.text}</div>
        </article>`;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}



let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock.addEventListener('click', function(e) {
    
    if(e.target.classList.contains('btn-remove')) {
         e.preventDefault();
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    }
})


async function getEmails() {
    return await fetch('/emails')
                    .then((response) => response.json())
                    .then((data) => data);
}

let logOutBtn = document.querySelector('.log-out-btn');

logOutBtn.addEventListener('click',function(){
  

document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

window.location.href="/";
})


