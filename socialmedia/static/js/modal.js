document.getElementById("createPostForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var imageInput = document.getElementById("imageUpload");
    var captionInput = document.getElementById("message-text");
    var formData = new FormData(this);

    if (!imageInput.files.length) {
        alert("Please select a picture before submitting your post.");
        return;
    }
});