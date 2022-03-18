import './style.css'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

document.getElementById('save_button').addEventListener('click', () => {
    const canvas = document.getElementById('portrait')
    var img = canvas.toDataURL()
    console.log(img)
    var blob = dataURItoBlob(img)

    let file = [new File([blob], "filename.png", {type: "image/png"})];

    console.log(navigator)

    if (navigator.share) {
        console.log('he')
      navigator.share({
        title: 'Trinity of Terror Tour',
        text: `I'm going to the Trinity of Terror Tour!`,
        files: file
      })
        .then(() => {
          console.log('successful share')
        })
        .catch((error) => console.log(error));
    }
})

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
    }