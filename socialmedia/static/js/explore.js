document.addEventListener("DOMContentLoaded", function() {
    // Handle post likes
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", function() {
            let postId = this.getAttribute("data-post-id");
            let likeCountElement = document.getElementById(`like-count-${postId}`);

            fetch(`/like-post/${postId}`, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => response.json())
            .then(data => {
                likeCountElement.innerHTML = 
                    data.likes === 1 ? `Liked by 1 person` : `Liked by ${data.likes} people`;
            })
            .catch(error => console.error("Error:", error));
        });
    });

    // Handle adding comments via AJAX
    document.querySelectorAll(".comment-form").forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            
            let postId = this.getAttribute("data-post-id");
            let commentText = this.querySelector(".comment-input").value;
            let csrfToken = this.querySelector("input[name='csrfmiddlewaretoken']").value;
            
            fetch(`/add-comment/${postId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": csrfToken
                },
                body: `comment_text=${encodeURIComponent(commentText)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    let commentsList = document.getElementById(`comments-list-${postId}`);
                    let newComment = document.createElement("li");
                    newComment.setAttribute("id", `comment-${data.id}`);
                    newComment.innerHTML = `
                        <strong>
                            <a href="/profile/${data.user}" style="text-decoration: none; color: black;">
                                @${data.user}:
                            </a>
                        </strong> ${data.text}
                        <button class="delete-comment-btn" data-comment-id="${data.id}" style="background: none; border: none; cursor: pointer; color: #fec2cb;">
                            <i class="fa-solid fa-trash"></i>
                        </button>`;
                    commentsList.appendChild(newComment);
                    this.querySelector(".comment-input").value = "";
                }
            })
            .catch(error => console.error("Error adding comment:", error));
        });
    });

    // Handle deleting comments via AJAX
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-comment-btn") || event.target.closest(".delete-comment-btn")) {
            let button = event.target.closest(".delete-comment-btn");
            let commentId = button.getAttribute("data-comment-id");
            
            fetch(`/delete-comment/${commentId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": document.querySelector("input[name='csrfmiddlewaretoken']").value
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById(`comment-${commentId}`).remove();
                }
            })
            .catch(error => console.error("Error deleting comment:", error));
        }
    });
});
