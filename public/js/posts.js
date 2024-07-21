async function getPosts() {

    try {
        const response = await fetch('/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }



}
