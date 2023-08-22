document.addEventListener('DOMContentLoaded', function() {
    var apiUrl = "https://jsonplaceholder.typicode.com/users"; 

    function fetchData(query) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Remplir la table avec les données
                let rows = '';
                for (let i = 0; i < data.length; i++) {
                    let user = data[i];
                    if (!query || user.name.includes(query)) {
                        rows += '<tr>';
                        rows += '<td>' + user.name + '</td>';
                        rows += '<td>' + user.email + '</td>';
                        rows += '<td>' + user.address.city + '</td>';
                        rows += '</tr>';
                    }
                }
                document.getElementById("liveTable").getElementsByTagName("tbody")[0].innerHTML = rows;
                
                // Mettez à jour les contrôles de pagination ici si nécessaire
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    // Gérer la recherche
    document.getElementById("searchInput").addEventListener("keyup", function() {
        var query = this.value;
        fetchData(query);
    });

    // Charger les données initiales
    fetchData('');
});
