// import Swal from 'sweetalert2/dist/sweetalert2.js'

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;


function tags (tag)
{

    let type = "Not A Kitty";

    switch(tag) {
        case 'tabby, tabby cat':
            // code block
            return 1;
            type = "It's A Kitty";
            break;
        case 'lion, king of beasts, Panthera leo':
            // code block
            return 2;
            type = "It's a Big Kitty";
            break;
    }

    return 0;
    return type;
}


function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file[0].files[0]);
    reader.onload = () => {
        callback(reader.result);
    };
}

document.getElementById("file").onchange = function() {
    upload()
};

this.theCat = "The fluffy cat will go in this garbage code here";
this.blob = [];

/**
 *
 */
function upload()
{
    // get the file as a blob
    var file = $("#file")[0].files[0];
    console.log(file);

    // set the file blob to be global
    this.blob = file;

    // check if file type is png, jpg, or jpeg
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'  )
    {
        // store the url in a temporary url
        var objectURL = URL.createObjectURL(file);

        // display the image
        document.querySelector("#image").src = objectURL;

        this.theCat = objectURL;

        console.log(this.theCat);

    }
    // else no image provide

    // set image to null
    document.querySelector("#image").src = objectURL;

    // return false
    return false
}

function isitAKitty() {



    classifier = ml5.imageClassifier('MobileNet');
    // images/
    //lion.jpeg
    src = this.theCat;
    img = document.createElement('img');
    img.src = src;

    classifier.classify(img, gotResult);

}

//checks the confidence an array of lables/tags
function checkLable(results) {
    //check if it is a
    var confidence = 0;
    var i;

    let cat = 0;
    let bigKitty = 0;
    let notAKitty = 0;

    // let type = "Not A Kitty";

    for (i = 0; i < results.length; i++) {

        // check if lable is a kitty
        if (results[i].label === 'tabby, tabby cat'
            || results[i].label === 'Egyptian cat'
            || results[i].label === 'tiger cat') {

            // code block
            console.log(results[i].confidence);
            cat += results[i].confidence;
            // type = "It's A Kitty";

        } else if (results[i].label === 'tiger cat' || results[i].label === 'lion, king of beasts, Panthera leo' )
        {

            console.log(results[i].confidence);
            bigKitty += results[i].confidence;
        }


        // text += "The number is " + i + "<br>";
        //  if (results[i].label == tag) {
        //    confidence += results[i].confidence
        // }
    } //end for loop



    return cat
}

// A function to run when we get any errors and the results
function gotResult(error, results) {

    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);

        let confidence = checkLable(results);

        console.log(confidence);

        Swal.fire({
            title: 'It is A Kitty',
            type: 'success',
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Nifty!',
            confirmButtonAriaLabel: 'Nifty!',
        })

        // console.log("test");

        // document.getElementById('confidence').innerHTML = confidence;
        // document.getElementById('answer').innerHTML = "It is a Kitty!"
        // document.getElementById('answer').innerHTML = "Nope not a Kitty"

    }
}
