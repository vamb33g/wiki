document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = "https://jsonplaceholder.typicode.com/users"; 
    let users = []; // Liste pour stocker les utilisateurs

    function fetchData(query) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                users = data; // Stocker les utilisateurs récupérés
                renderTable(query);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    function renderTable(query) {
        let rows = '';
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (!query || user.name.includes(query)) {
                rows += '<tr>';
                rows += '<td>' + user.name + '</td>';
                rows += '<td>' + user.email + '</td>';
                rows += '<td>' + user.address.city + '</td>';
                rows += '</tr>';
            }
        }
        document.getElementById("liveTable").getElementsByTagName("tbody")[0].innerHTML = rows;
    }

    // Gérer l'ajout d'un utilisateur
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

            // Envoyer l'utilisateur au serveur
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                // Ajouter l'utilisateur à la liste d'utilisateurs
                users.push(data);

                // Effacer les champs du formulaire
                document.getElementById("userName").value = "";
                document.getElementById("userEmail").value = "";
                document.getElementById("userCity").value = "";

                // Mettre à jour la table
                renderTable(document.getElementById("searchInput").value);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            });
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    });

    // Gérer la recherche
    document.getElementById("searchInput").addEventListener("keyup", function() {
        const query = this.value;
        renderTable(query);
    });
  
    // Charger les données initiales
    fetchData('');
});
