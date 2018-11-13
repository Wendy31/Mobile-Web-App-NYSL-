// hide text first
document.getElementById("more1").style.display = "none";
document.getElementById("more2").style.display = "none";

// then function to 
function showReadMoreReadLess(id_dots, id_moreText, id_btnText) { // passing id names as params. 

    // apply function to selected IDs
    var dots = document.getElementById(id_dots);
    var moreText = document.getElementById(id_moreText);
    var btnText = document.getElementById(id_btnText);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

// no need to call function. Because called in HTML

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}