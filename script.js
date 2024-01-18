const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let totalRepos = 0;

function fetchRepositories() {
    const username = document.getElementById("username").value;
    const repoList = document.getElementById("repo-list");
    const loader = document.getElementById("loader");
    const pagination = document.getElementById("pagination");

    
    repoList.innerHTML = "";
    pagination.innerHTML = "";

   
    loader.style.display = "block";

    
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(userData => {
            totalRepos = userData.public_repos;

            
            fetch(`https://api.github.com/users/${username}/repos?per_page=${ITEMS_PER_PAGE}&page=${currentPage}`)
                .then(response => response.json())
                .then(repositories => {
                    repositories.forEach(repo => {
                        const listItem = document.createElement("li");
                        listItem.textContent = repo.name;
                        repoList.appendChild(listItem);
                    });

                    
                    displayPagination();
                })
                .catch(error => {
                    console.error("Error fetching repositories:", error);
                })
                .finally(() => {
                    
                    loader.style.display = "none";
                });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
}

function displayPagination() {
    const pagination = document.getElementById("pagination");
    const totalPages = Math.ceil(totalRepos / ITEMS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            fetchRepositories();
        });

        pagination.appendChild(pageButton);
    }
}
