async function getPokemon() {
    const name = document.getElementById('pokemonInput').value.toLowerCase();
    const card = document.getElementById('card');

    if (!name) return alert("Please enter a name!");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("Pokemon not found");

        const data = await response.json();

        // Update UI
        document.getElementById('name').innerText = data.name.toUpperCase();
        document.getElementById('sprite').src = data.sprites.front_default;
        document.getElementById('type').innerText = data.types.map(t => t.type.name).join(', ');
        document.getElementById('height').innerText = data.height;

        card.style.display = 'block';
    } catch (error) {
        alert(error.message);
        card.style.display = 'none';
    }
}

async function loadPokemonList() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        
        const pokemonList = data.results.map(p => p.name).sort();
        
        let listHTML = '<ul>';
        pokemonList.forEach(name => {
            listHTML += `<li onclick="selectPokemon('${name}')" style="cursor: pointer;">${name.charAt(0).toUpperCase() + name.slice(1)}</li>`;
        });
        listHTML += '</ul>';
        
        document.getElementById('pokemonList').innerHTML = listHTML;
        document.getElementById('hint').style.display = 'block';
    } catch (error) {
        console.error('Error loading pokemon list:', error);
    }
}

function selectPokemon(name) {
    document.getElementById('pokemonInput').value = name;
    getPokemon();
}

// Load pokemon list when page loads
window.addEventListener('load', loadPokemonList);