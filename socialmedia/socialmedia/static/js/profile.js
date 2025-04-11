document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".delete-post").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            
            let postId = this.getAttribute("data-post-id");
            let postCard = this.closest(".image-item");
            let postCountElement = document.querySelector(".h5.me-2"); 
            
            fetch(`/delete/${postId}`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(), 
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    postCard.remove();

                    // Update the post count
                    let currentCount = parseInt(postCountElement.textContent, 10);
                    let newCount = Math.max(0, currentCount - 1);
                    postCountElement.textContent = newCount;

                    // Update "Post" or "Posts" label based on count
                    let postLabel = document.querySelector(".lead.fw-normal.mb-0");
                    postLabel.textContent = newCount === 1 ? "Post" : "Posts";
                } else {
                    alert("Failed to delete post.");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });
});

// Function to get CSRF token
function getCSRFToken() {
    return document.querySelector("[name=csrfmiddlewaretoken]").value;
}
