const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#recipe-name').value.trim();
    const ingredients = document.querySelector('#ing-list').value.trim();
    const instructions = document.querySelector('#recipe-inst').value.trim();

    if (name && ingredients && instructions) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, ingredients, instructions }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create recipe');
        }
    } else {
        alert('Failed to create recipe')
    }
};

document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);