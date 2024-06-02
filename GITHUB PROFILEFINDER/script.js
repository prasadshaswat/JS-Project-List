document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const profileDiv = document.getElementById('profile');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();

        if (username) {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const user = await response.json();
                displayProfile(user);
            } catch (error) {
                profileDiv.innerHTML = `<p>${error.message}</p>`;
                profileDiv.style.display = 'block';
            }
        }
    });

    function displayProfile(user) {
        profileDiv.innerHTML = `
            <div class="profile-details">
                <img src="${user.avatar_url}" alt="${user.login}">
                <div class="profile-info">
                    <h2>${user.name || user.login}</h2>
                    <p><i class="fas fa-user"></i><strong>Username:</strong> ${user.login}</p>
                    <p><i class="fas fa-info-circle"></i><strong>Bio:</strong> ${user.bio || 'No bio available'}</p>
                    <p><i class="fas fa-map-marker-alt"></i><strong>Location:</strong> ${user.location || 'No location available'}</p>
                    <p><i class="fas fa-calendar-alt"></i><strong>Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
                    <p><i class="fas fa-code-branch"></i><strong>Public Repos:</strong> ${user.public_repos}</p>
                    <p><i class="fas fa-users"></i><strong>Followers:</strong> ${user.followers}</p>
                    <p><i class="fas fa-user-friends"></i><strong>Following:</strong> ${user.following}</p>
                    <p><i class="fas fa-star"></i><strong>Public Gists:</strong> ${user.public_gists}</p>
                    <p><a href="${user.html_url}" target="_blank"><i class="fab fa-github"></i> View Profile on GitHub</a></p>
                </div>
            </div>
        `;
        profileDiv.style.display = 'block';
    }
});
