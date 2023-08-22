{{html clean="false"}}

<body>

<h1>LiveTable Page</h1>

<div id="liveTableContainer">
    <input type="text" id="searchInput" placeholder="Rechercher...">
    <table id="liveTable">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Ville</th>
            </tr>
        </thead>
        <tbody>
            <!-- Les données seront insérées ici via JS -->
        </tbody>
    </table>
    <div id="paginationControls">
        <!-- Les contrôles de pagination seront insérés ici -->
    </div>
</div>

<div id="addUserContainer">
    <h2>Ajouter un utilisateur</h2>
    <input type="text" id="userName" placeholder="Nom">
    <input type="text" id="userEmail" placeholder="Email">
    <input type="text" id="userCity" placeholder="Ville">
    <button id="addUserBtn">Ajouter</button>
</div>
    

</body>

{{/html}}
