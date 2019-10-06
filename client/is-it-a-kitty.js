// import Swal from 'sweetalert2/dist/sweetalert2.js'

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

// set global variables
this.theCat = "The fluffly cat will go here";
this.blob = [];
this.type = '';
this.confidence = 0;



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

/**
 *
 */
function isitAKitty() {

    classifier = ml5.imageClassifier('MobileNet');
    // images/
    //lion.jpeg
    src = this.theCat;
    img = document.createElement('img');
    img.src = src;

    classifier.classify(img, gotResult);

}

/**
 * checks the confidence an array of lables/tags
 * @param results
 * @returns {number}
 */
function checkLable(results) {
    //check if it is a
    var confidence = 0;
    var i;

    let cat = 0;
    let bigKitty = 0;
    let notAKitty = 0;

    // let type = "Not A Kitty";

    for (i = 0; i < results.length; i++) {

        // check if label is a kitty
        if (results[i].label === 'tabby, tabby cat'
            || results[i].label === 'Egyptian cat'
            || results[i].label === 'tiger cat') {

            // add confidence to kitty
            cat += results[i].confidence;

        } else if (results[i].label === 'lynx, catamount'
            || results[i].label === 'lion, king of beasts, Panthera leo'
        ) {
            // add confidence to big Kitty
            bigKitty += results[i].confidence;
        } else {
            // add up confidence to big not a kitty
            notAKitty += results[i].confidence;
        }

    } //end for loop

    // set label based on the confidence score
    if (cat > bigKitty && cat > notAKitty ) {

        this.type = "It is a Kitty!";
        this.confidence = cat;

    } else if (bigKitty > notAKitty) {

        this.type = "It's a Big Kitty";
        this.confidence = bigKitty;

    } else {
        this.type = "Not Kitty";
        this.confidence = notAKitty;
    }

    return this.score
}

// A function to run when we get any errors and the results
function gotResult(error, results) {

    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);

        // get the confidence
        let confidence = checkLable(results);

        console.log(confidence);

        // check swal animation popup type
        let swalType = 'success';

        if (this.type === "Not Kitty")
        {
            swalType = 'error';
        }

        // notify of the result
        Swal.fire({
            title: this.type,
            type: swalType,
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: true,
            html:
                'I am ' +
                Math.round(this.confidence * 100) +
                '% sure!',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Nifty!',
            confirmButtonAriaLabel: 'Nifty!',
        })

    }
}
