async function getPosts() {

    try {
        const response = await fetch('http://localhost:3003/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }



}
