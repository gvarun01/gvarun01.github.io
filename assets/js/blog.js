let isLiked = false;
let isDisliked = false;
let likeCount = 0;
let dislikeCount = 0;


const blogId = window.location.pathname.includes('blog1') ? 'blog1' : 'blog2';

// Load data from local storage when the page loads
window.onload = function () {
    loadLikes(blogId);
    displayComments(blogId);
};

// Function to save like and dislike data to local storage
function saveDataToLocalStorage() {
    let storedData = { likes: likeCount, dislikes: dislikeCount };
    localStorage.setItem(`blog_data_${blogId}`, JSON.stringify(storedData));
}

// Function to toggle like
const toggleLike = () => {
    isLiked = !isLiked;
    likeCount += isLiked ? 1 : -1;

    if (isDisliked) {
        isDisliked = false;
        dislikeCount--;
    }

    updateLikeDislikeCounts();
    saveDataToLocalStorage();
};

// Function to toggle dislike
const toggleDislike = () => {
    isDisliked = !isDisliked;
    dislikeCount += isDisliked ? 1 : -1;

    if (isLiked) {
        isLiked = false;
        likeCount--;
    }

    updateLikeDislikeCounts();
    saveDataToLocalStorage();
};

// Function to update like and dislike counts on the page
const updateLikeDislikeCounts = () => {
    document.getElementById("likeCount").textContent = likeCount;
    document.getElementById("dislikeCount").textContent = dislikeCount;
};

// Comment functionality
function addComment(blogId) {
    let comment = document.getElementById(`user_comment_${blogId}`).value;
    let commentsList = document.getElementById(`comments_list_${blogId}`);

    if (comment.trim() !== '') {
        // Get existing comments from local storage
        let existingComments = JSON.parse(localStorage.getItem('blog_comments_' + blogId)) || [];

        // Add the new comment
        let newComment = { content: comment, timestamp: new Date().toISOString() };
        existingComments.push(newComment);

        // Save updated comments to local storage
        localStorage.setItem('blog_comments_' + blogId, JSON.stringify(existingComments));

        // Display the comments on the page
        displayComments(blogId);

        // Clear the comment input field
        document.getElementById(`user_comment_${blogId}`).value = '';
    }
}

// Function to display comments on the page
function displayComments(blogId) {
    let commentsList = document.getElementById(`comments_list_${blogId}`);
    let existingComments = JSON.parse(localStorage.getItem('blog_comments_' + blogId)) || [];

    // Clear existing comments on the page
    commentsList.innerHTML = '';

    // Display comments from local storage
    existingComments.forEach(function (comment) {
        let newComment = document.createElement('li');
        newComment.className = 'comments-list-item';
        newComment.innerHTML = `<p class="comment-content">${comment.content}</p>`;
        commentsList.appendChild(newComment);
    });
}

// Function to load likes when the page is loaded
function loadLikes(blogId) {
    let storedData = JSON.parse(localStorage.getItem('blog_data_' + blogId)) || { likes: 0, dislikes: 0 };
    likeCount = storedData.likes;
    dislikeCount = storedData.dislikes;
    updateLikeDislikeCounts();
}

// Function to save like and dislike data to local storage
function saveDataToLocalStorage() {
    let storedData = { likes: likeCount, dislikes: dislikeCount };
    localStorage.setItem('blog_data_blog1', JSON.stringify(storedData));
}
