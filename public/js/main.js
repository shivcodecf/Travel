let callMeForm = document.querySelector('.call-me-form');




document.addEventListener('DOMContentLoaded', async function() {

    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = ''; 
    
    posts.forEach((post) => {
        let postHTML =  `<div class="col col-ho">
        <div class="card card-main"> 
          <img src="${post.imageURL}" class="card-img-top card-all" alt="${post.title}">
    <div class="card-body card-bdy">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.description}</p>
      <a href="/landmark?id=${post.id}" class='btn btn-primary'>Details</button></a>
    </div>
          </div>
        </div> `
        articles.insertAdjacentHTML('beforeend', postHTML); // Correct method for inserting HTML string
    });
    
});

callMeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let phoneInp = callMeForm.querySelector('input');
  fetch('http://localhost:3003/callback-requests', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          phoneNumber: phoneInp.value
      })
  }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible!'));
})

let emailRequestForm = document.querySelector('.email-request-form');


emailRequestForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // let phoneInp = callMeForm.querySelector('input');
  fetch('http://localhost:3003/emails', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         name: document.querySelector('#name').value,
          email:document.querySelector('#email').value,
         text: document.querySelector('#message').value,
      })
  }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible!'));
})


