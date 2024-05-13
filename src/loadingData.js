// Function to show loading state
export function showLoadingState() {
    const searchButton = document.getElementById('search-button');
    searchButton.disabled = true;
    searchButton.textContent = 'Loading...';
}

// Function to hide loading state
export function hideLoadingState() {
    const searchButton = document.getElementById('search-button');
    searchButton.disabled = false;
    searchButton.textContent = 'Search';
}