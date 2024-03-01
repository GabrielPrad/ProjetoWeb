document.addEventListener('DOMContentLoaded', function () {
    const clientId = '061ee52f68e04f21a5f48ff98fa0175d';
    const clientSecret = '333e60e6f5fe479fb008e31ceed4c275';
    const apiUrl = 'https://api.spotify.com/v1';

    async function getAccessToken() {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials', 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('061ee52f68e04f21a5f48ff98fa0175d' + ':' + '333e60e6f5fe479fb008e31ceed4c275')
                }
            }
        );
        return response.data.access_token;
    }

    function renderResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (results.length === 0) {
            resultsDiv.innerHTML = 'Nenhum resultado encontrado.';
            return;
        }

        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            if (item.type === 'artist') {
                resultItem.innerHTML = `
                    <img src="${item.images[0].url}" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong><br>
                        Artista
                    </div>
                `;
            } else if (item.type === 'track') {
                resultItem.innerHTML = `
                    <img src="${item.album.images[0].url}" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong><br>
                        Música - ${item.artists[0].name}
                    </div>
                `;
            }

            resultsDiv.appendChild(resultItem);
        });
    }

    window.search = async function () {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();

        if (query === '') {
            alert('Por favor, digite um artista ou música para buscar.');
            return;
        }

        const accessToken = await getAccessToken();

        try {
            const response = await axios.get(`${apiUrl}/search?q=${query}&type=artist,track`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            const artists = response.data.artists.items;
            const tracks = response.data.tracks.items;
            
            const results = [...artists, ...tracks];

            renderResults(results);
        } catch (error) {
            console.error('Erro na busca:', error.message);
        }
    }
});
