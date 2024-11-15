const api_url = 'http://localhost:3000/chapters';
const form = document.querySelector('form');

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



async function renderChapters() {
    const cours = await getAllChapters();
    if (!cours) return;
    const coursContainer = document.getElementById('cours');
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

renderChapters();