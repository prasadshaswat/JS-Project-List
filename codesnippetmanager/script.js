let snippets = [];

// Function to render snippets in the UI
function renderSnippets(filteredSnippets = snippets) {
    const snippetList = document.getElementById('snippet-list');
    snippetList.innerHTML = ''; // Clear previous content

    filteredSnippets.forEach((snippet, index) => {
        const snippetItem = document.createElement('div');
        snippetItem.classList.add('border', 'p-4', 'rounded-md', 'bg-gray-800', 'shadow-md', 'mb-4');

        snippetItem.innerHTML = `
            <div class="snippet-content">
                <pre><code>${snippet.code}</code></pre>
                <p class="text-gray-400"><strong>Tags:</strong> ${snippet.tags.join(', ')}</p>
            </div>
            <div class="snippet-actions mt-2 flex justify-end">
                <button onclick="prepareEditSnippet(${index})" class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
                    <i class="bi bi-pencil-square"></i> Edit
                </button>
                <button onclick="deleteSnippet(${index})" class="bg-red-600 text-white py-1 px-2 rounded-md">
                    <i class="bi bi-trash"></i> Delete
                </button>
                <button onclick="rememberSnippet(${index})" class="bg-green-600 text-white py-1 px-2 rounded-md">
                    <i class="bi bi-heart-fill"></i> Remember
                </button>
            </div>
        `;

        snippetList.appendChild(snippetItem);
    });
}

// Function to add a new snippet
function addSnippet(code, tags) {
    snippets.push({ code, tags });
    renderSnippets();
}

// Function to prepare editing an existing snippet
function prepareEditSnippet(index) {
    const snippet = snippets[index];
    document.getElementById('snippet-code').value = snippet.code;
    document.getElementById('snippet-tags').value = snippet.tags.join(',');

    const submitBtn = document.querySelector('#snippet-form button[type="submit"]');
    submitBtn.textContent = 'Update Snippet';
    submitBtn.dataset.mode = 'edit';
    submitBtn.dataset.index = index;
}

// Function to edit an existing snippet
function editSnippet(index, code, tags) {
    snippets[index].code = code;
    snippets[index].tags = tags;
    renderSnippets();

    // Reset form button text and mode
    const submitBtn = document.querySelector('#snippet-form button[type="submit"]');
    submitBtn.textContent = 'Add Snippet';
    delete submitBtn.dataset.mode;
    delete submitBtn.dataset.index;
}

// Function to delete a snippet
function deleteSnippet(index) {
    snippets.splice(index, 1);
    renderSnippets();
}

// Function to remember a snippet
function rememberSnippet(index) {
    const rememberedSnippets = JSON.parse(localStorage.getItem('rememberedSnippets')) || [];
    rememberedSnippets.push(snippets[index]);
    localStorage.setItem('rememberedSnippets', JSON.stringify(rememberedSnippets));
    alert('Snippet remembered!');
}

// Event listener for form submission
document.getElementById('snippet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const code = document.getElementById('snippet-code').value.trim();
    const tags = document.getElementById('snippet-tags').value.trim().split(',').map(tag => tag.trim());

    // Check if code is not empty
    if (code === '') {
        alert('Please enter a code snippet.');
        return;
    }

    const submitBtn = document.querySelector('#snippet-form button[type="submit"]');
    if (submitBtn.dataset.mode === 'edit') {
        const snippetIndex = parseInt(submitBtn.dataset.index);
        editSnippet(snippetIndex, code, tags);
    } else {
        addSnippet(code, tags);
    }

    // Clear form fields
    document.getElementById('snippet-code').value = '';
    document.getElementById('snippet-tags').value = '';

    // Re-render snippets after adding/editing
    renderSnippets();
});
