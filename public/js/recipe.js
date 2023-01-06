const newFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-body').value.trim();
    const recipe_id = event.target.getAttribute('data-id')

    if (text && recipe_id ) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ text, recipe_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/recipe/${recipe_id}`);
        } else {
            alert('Failed to create comment');
        }
    } else {
        alert('Failed to create comment')
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', newFormHandler);