const id = new URLSearchParams(location.search).get('id');
const api_url = `http://localhost:3000/chapters`;


async function loadChapter() {
    const chapter = await getChapterById(id)
    const courNode = document.createElement('div');
    courNode.classList.add('col-md-4', 'mb-4');
    courNode.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${chapter.name}</h5>
                    <p class="card-text">Nombre de leçons : ${chapter.numberLessons}</p>
                    <div class="d-flex gap 2">
                        <button class="btn btn-primary">Retour Accueil</button>
                        <button class="btn btn-danger" data-id=${chapter._id}>Supprimer</button>
                    </div>
                </div>
            </div>
        `;

    courNode.querySelector('.btn-primary').addEventListener('click', async () => {
        location.assign('index.html');
    })

    courNode.querySelector('.btn-danger').addEventListener('click', async () => {
        await deleteChapter(chapter._id);
        location.assign('index.html');
    })

    const courContainer = document.getElementById('cours');
    courContainer.innerHTML = '';
    console.log(courNode);
    courContainer.append(courNode);
}

async function deleteChapter(id) {
    await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
    });
}


async function getChapterById(id) {
    const response = await fetch(`${api_url}/${id}`);
    const result = await response.json();
    return result.data;
}

loadChapter();