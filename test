## html final

<input type="text" id="searchInput" placeholder="Rechercher par nom">
<table id="liveTable">
    <thead>
        <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Ville</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <!-- Les données seront insérées ici via JS -->
    </tbody>
</table>
<div id="paginationControls"></div>
<div id="addUserContainer">
    <h2>Ajouter un utilisateur</h2>
    <input type="text" id="userName" placeholder="Nom">
    <input type="text" id="userEmail" placeholder="Email">
    <input type="text" id="userCity" placeholder="Ville">
    <button id="addUserBtn">Ajouter</button>
</div>


## js final

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = "https://jsonplaceholder.typicode.com/users"; 
    let users = [];

    function fetchData(query, pageNum) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                users = data;
                renderTable(query, pageNum);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    function renderTable(query, pageNum) {
        const usersPerPage = 5;
        const startIndex = (pageNum - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const displayedUsers = users.slice(startIndex, endIndex);

        let rows = '';
        for (const user of displayedUsers) {
            if (!query || user.name.includes(query)) {
                rows += '<tr>';
                rows += '<td>' + user.name + '</td>';
                rows += '<td>' + user.email + '</td>';
                rows += '<td>' + user.address.city + '</td>';
                rows += '<td><button class="deleteUser" data-id="' + user.id + '">Supprimer</button></td>';
                rows += '</tr>';
            }
        }
        document.getElementById("liveTable").getElementsByTagName("tbody")[0].innerHTML = rows;

        // Ajoute des écouteurs d'événements pour les boutons de suppression
        const deleteButtons = document.querySelectorAll('.deleteUser');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });

        renderPagination(users.length, usersPerPage, pageNum);
    }

    function renderPagination(totalUsers, usersPerPage, currentPage) {
        const totalPages = Math.ceil(totalUsers / usersPerPage);
        let paginationHtml = '';

        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHtml += '<span>' + i + '</span>';
            } else {
                paginationHtml += '<button class="paginationBtn" data-page="' + i + '">' + i + '</button>';
            }
        }

        document.getElementById('paginationControls').innerHTML = paginationHtml;

        const paginationButtons = document.querySelectorAll('.paginationBtn');
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pageNum = parseInt(this.getAttribute('data-page'));
                renderTable(document.getElementById("searchInput").value, pageNum);
            });
        });
    }

    function handleDelete(event) {
        const userId = event.target.getAttribute('data-id');

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                users = users.filter(user => user.id !== parseInt(userId));
                renderTable(document.getElementById("searchInput").value, 1); // Revenir à la première page après la suppression
            } else {
                throw new Error('Erreur lors de la suppression de l\'utilisateur.');
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    }

    document.getElementById("addUserBtn").addEventListener("click", function() {
        const name = document.getElementById("userName").value;
        const email = document.getElementById("userEmail").value;
        const city = document.getElementById("userCity").value;

        if(name && email && city) {
            const newUser = {
                name: name,
                email: email,
                address: {
                    city: city
                }
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                users.push(data);
                document.getElementById("userName").value = "";
                document.getElementById("userEmail").value = "";
                document.getElementById("userCity").value = "";
                renderTable(document.getElementById("searchInput").value, 1); // Revenir à la première page après l'ajout
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            });
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    });

    document.getElementById("searchInput").addEventListener("keyup", function() {
        const query = this.value;
        renderTable(query, 1); // Revenir à la première page lors de la recherche
    });
  
    fetchData('', 1); // Charger la première page initialement
});



## ajout d'un css

/* Container pour les boutons de pagination */
#paginationControls {
    margin-top: 20px;
    text-align: center;
}

/* Style pour chaque bouton de pagination */
.paginationBtn {
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    color: #333;
    padding: 5px 10px;
    text-decoration: none;
    margin: 0 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* Effet de survol pour les boutons de pagination */
.paginationBtn:hover {
    background-color: #ddd;
}

/* Style pour le numéro de page actif */
#paginationControls span {
    background-color: #007BFF;
    color: #fff;
    padding: 5px 10px;
    margin: 0 3px;
    border: 1px solid #007BFF;
}

/* Style pour les autres éléments de la page */
table {
    width: 100%;
    border-collapse: collapse;
}

table, th, td {
    border: 1px solid #ccc;
}

th, td {
    padding: 8px 12px;
}

th {
    background-color: #f4f4f4;
}

tr:nth-child(even) {
    background-color: #fafafa;
}

#addUserContainer {
    margin-top: 30px;
}

input[type="text"], button {
    margin-bottom: 10px;
}


## ajout de confirm

function handleDelete(event) {
    const userId = event.target.getAttribute('data-id');

    // Afficher la boîte de dialogue de confirmation
    const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if (!isConfirmed) {
        return; // Si l'utilisateur clique sur "Annuler", arrêtez la fonction
    }

    // Si l'utilisateur confirme, continuez la suppression
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            users = users.filter(user => user.id !== parseInt(userId));
            renderTable(document.getElementById("searchInput").value, 1); // Revenir à la première page après la suppression
        } else {
            throw new Error('Erreur lors de la suppression de l\'utilisateur.');
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}
