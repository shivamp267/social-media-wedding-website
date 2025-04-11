document.getElementById("createPostForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var imageInput = document.getElementById("imageUpload");

    if (!imageInput.files.length) {
        alert("Please select a picture before submitting your post.");
        return;
    }
});