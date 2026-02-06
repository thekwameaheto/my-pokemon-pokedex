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