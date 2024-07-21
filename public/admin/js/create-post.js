let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');  
let createImageFile = document.querySelector('#create-image-file');

createForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let text = createText.value;
  // let data = new FormData();

  // data.append('title',createTitle.value);
  // data.append('country',createCountry.value);
  // data.append('imageUrl', createImageUrl.value);
  // data.append('text',text);
  // data.append('description',text.substring(0, text.indexOf('.') + 1));


  fetch('/posts', {

     method: 'POST',
     headers:{
      'Content-Type':'application/json'

    },

    body: JSON.stringify({
      title:createTitle.value,
      country:createCountry.value,
      imageUrl:createImageUrl.value,
      text:text,
      description:text.substring(0, text.length),
    })
    
    }).then((response)=>response.text()).then((data)=>window.history.go());

  })

  
