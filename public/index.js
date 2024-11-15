const api_url = 'http://localhost:3000/chapters';
const form = document.querySelector('form');
const chapters = await getAllChapters();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const entries = formData.entries();
    const chapter = Object.fromEntries(entries);

    if (isValidForm(chapter)) {
        const chapterJson = JSON.stringify(chapter);
        await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: chapterJson
        });
        await renderChapters();
    }
})

const searchInput = document.getElementById('search');

console.log(searchInput);

searchInput.addEventListener('change', async (e) => {
    console.log('searching');
    const searchTerm = e.target.value;
    console.log(searchTerm);
    await searchChapters(searchTerm);
});

async function searchChapters(name) {
    if (name === "" || name == null) {
        await renderChapters(chapters);
    }
    try {
        const response = await fetch(`${api_url}/search/${name}`);
        const result = await response.json();
        await renderChapters(result.data);
    } catch (error) {
        console.error('Error searching chapters:', error);
    }
}



async function getAllChapters() {
    try {
        const response = await fetch(api_url);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}


function isValidForm(chapter) {
    if (!chapter.name || !chapter.numberLessons) {
        alert('Veuillez remplir tous les champs');
        return false;
    }
    return true;
}


async function renderChapters(cours) {

    const coursContainer = document.getElementById('cours');
    if (!cours || cours === []) {
        coursContainer.innerHTML = '<h2>Aucun cours trouvé</h2>';
    }
    const coursNodes = cours.map(cour => {
        const courNode = document.createElement('div');
        courNode.classList.add('col-md-4', 'mb-4');
        courNode.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${cour.name}</h5>
                    <p class="card-text">Nombre de leçons : ${cour.numberLessons}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-danger" data-id=${cour._id}>Supprimer</button>
                        <button class="btn btn-primary" data-id=${cour._id}>Voir</button>
                    </div>
                </div>
            </div>
        `;
        return courNode;
    });

    coursNodes.forEach(courNode => {
        courNode.querySelector('.btn-danger').addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            await deleteChapter(id);
            await renderChapters();
        });
    })

    coursNodes.forEach(courNode => {
        courNode.querySelector('.btn-primary').addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            location.assign(`chapter.html?id=${id}`);
        });
    })

    coursContainer.innerHTML = '';
    coursContainer.append(...coursNodes);
}

async function deleteChapter(id) {
    await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
    });
    await renderChapters();
}

renderChapters(chapters);