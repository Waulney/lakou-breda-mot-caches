const I18N = {
    fr: {
        subtitle: "Trouvez tous les mots cachés dans la grille",
        wordsToFind: "Mots à trouver",
        level: "Niveau",
        modalSuccessMsg: "Félicitations ! Vous avez découvert tous les mots.",
        nextLevel: "Niveau Suivant ➔",
        completedAll: "Félicitations ! Vous avez terminé tous les 20 niveaux de Lakou Breda !"
    },
    en: {
        subtitle: "Find all the hidden words in the grid",
        wordsToFind: "Words to find",
        level: "Level",
        modalSuccessMsg: "Congratulations! You found all the words.",
        nextLevel: "Next Level ➔",
        completedAll: "Congratulations! You completed all 20 levels of Lakou Breda!"
    }
};

const LEVELS = {
    fr: [
        { title: "1. Histoire & Héritage", words: ["BREDA", "TOUSSAINT", "LOUVERTURE", "HISTOIRE", "MEMOIRE"] },
        { title: "2. Métropole du Nord", words: ["CAP", "HAITI", "NORD", "PATRIMOINE", "HERITAGE"] },
        { title: "3. Service d'Hébergement", words: ["HOTEL", "BUNGALOW", "GITE", "CHAMBRE", "LOGEMENT"] },
        { title: "4. Architecture Ancestrale", words: ["STYLE", "BOIS", "VERANDA", "TRADITION", "CHARME"] },
        { title: "5. Confort & Équipements", words: ["CONFORT", "PROPRE", "SECURITE", "EAUCHAUDE", "SEJOUR"] },
        { title: "6. Cuisine Pratique", words: ["CUISINETTE", "EQUIPE", "AUTONOMIE", "EQUIPEMENT", "REPOS"] },
        { title: "7. Technologie & Connexion", words: ["WIFI", "INTERNET", "TELEVISION", "ECRAN", "RESEAU"] },
        { title: "8. Centre de Conférences", words: ["CONFERENCE", "REUNION", "SEMINAIRE", "SALLE", "AFFAIRES"] },
        { title: "9. Équipement Pro", words: ["PROJECTEUR", "MICRO", "SONO", "TABLEAU", "AIRCON"] },
        { title: "10. Réceptions & Fêtes", words: ["BANQUET", "MARIAGE", "FETE", "ANNIVERSAIRE", "ACCUEIL"] },
        { title: "11. Gastronomie Haïtienne", words: ["GASTRONOMIE", "RESTAURANT", "MENU", "CUISINE", "SAVEUR"] },
        { title: "12. La Ferme Agricole", words: ["FERME", "RECOLTE", "FRAIS", "PRODUIT", "NATURE"] },
        { title: "13. Boissons & Jus", words: ["JUS", "BOISSON", "GLACE", "DELECTABLE", "COCKTAIL"] },
        { title: "14. Cadre & Verdure", words: ["CHALEUREUX", "CADRE", "VERDURE", "PLEINAIR", "DETENTE"] },
        { title: "15. Espace Lakou Fun", words: ["LAKOU", "LUDIQUE", "PARC", "LOISIR", "AMUSEMENT"] },
        { title: "16. Jeux Traditionnels", words: ["DOMINO", "MARELLE", "DAMIER", "LUDO", "JEUX"] },
        { title: "17. Sports & Précision", words: ["PINGPONG", "FLECHETTE", "BILLARD", "BOWLING", "MATCH"] },
        { title: "18. Expérience Familiale", words: ["FAMILLE", "ENFANTS", "AMIS", "PARTAGE", "JOIE"] },
        { title: "19. Équipe & Service", words: ["SERVICE", "EQUIPE", "ACCUEIL", "QUALITE", "SURMESURE"] },
        { title: "20. Vision AyitiZ", words: ["AYITIZ", "VALEUR", "REUSSITE", "VISION", "EXCELLENCE"] }
    ],
    en: [
        { title: "1. History & Heritage", words: ["BREDA", "TOUSSAINT", "LOUVERTURE", "HISTORY", "MEMORY"] },
        { title: "2. The Northern Capital", words: ["CAP", "HAITI", "NORTH", "HERITAGE", "LEGACY"] },
        { title: "3. Accommodation", words: ["HOTEL", "BUNGALOW", "LODGE", "ROOM", "STAY"] },
        { title: "4. Ancestral Style", words: ["STYLE", "WOOD", "VERANDA", "TRADITION", "CHARM"] },
        { title: "5. Comfort & Amenities", words: ["COMFORT", "CLEAN", "SAFETY", "HOTWATER", "REST"] },
        { title: "6. Kitchenette", words: ["KITCHEN", "EQUIPPED", "AUTONOMY", "COOK", "EAT"] },
        { title: "7. Tech & Connection", words: ["WIFI", "INTERNET", "TV", "SCREEN", "NETWORK"] },
        { title: "8. Conference Center", words: ["CONFERENCE", "MEETING", "SEMINAR", "HALL", "BUSINESS"] },
        { title: "9. Pro Equipment", words: ["PROJECTOR", "MIC", "SOUND", "BOARD", "AIRCON"] },
        { title: "10. Banquets & Events", words: ["BANQUET", "WEDDING", "PARTY", "BIRTHDAY", "WELCOME"] },
        { title: "11. Fine Dining", words: ["GASTRONOMY", "RESTAURANT", "MENU", "CUISINE", "FLAVOR"] },
        { title: "12. Agricultural Farm", words: ["FARM", "HARVEST", "FRESH", "PRODUCE", "NATURE"] },
        { title: "13. Drinks & Juices", words: ["JUICE", "DRINK", "ICE", "FRESH", "COCKTAIL"] },
        { title: "14. Relaxing Setting", words: ["WARM", "SETTING", "GREEN", "OUTDOOR", "RELAX"] },
        { title: "15. Lakou Fun Park", words: ["LAKOU", "FUN", "PARK", "LEISURE", "PLAY"] },
        { title: "16. Traditional Games", words: ["DOMINOES", "HOPSCOTCH", "CHECKERS", "LUDO", "GAMES"] },
        { title: "17. Sports & Fun", words: ["PINGPONG", "DARTS", "POOL", "BOWLING", "MATCH"] },
        { title: "18. Family Experience", words: ["FAMILY", "KIDS", "FRIENDS", "SHARE", "JOY"] },
        { title: "19. Team & Service", words: ["SERVICE", "TEAM", "WELCOME", "QUALITY", "CUSTOM"] },
        { title: "20. AyitiZ Vision", words: ["AYITIZ", "VALUE", "SUCCESS", "VISION", "IMPACT"] }
    ]
};

const GRID_SIZE = 10;
let currentLang = 'fr';
let currentLevelIndex = 0;
let gridMatrix = [];
let targetWords = [];
let foundWords = new Set();

// Gestion propre de la sélection linéaire
let startCell = null;
let currentCells = [];
let isSelecting = false;

document.addEventListener('DOMContentLoaded', () => {
    loadLevel(currentLevelIndex);

    document.getElementById('langSelect').addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateUITranslations();
        loadLevel(currentLevelIndex);
    });

    document.getElementById('themeToggleBtn').addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('theme-dark')) {
            body.classList.remove('theme-dark');
            document.getElementById('themeToggleBtn').innerText = '🌙';
        } else {
            body.classList.add('theme-dark');
            document.getElementById('themeToggleBtn').innerText = '☀️';
        }
    });

    document.getElementById('restartLevelBtn').addEventListener('click', () => {
        loadLevel(currentLevelIndex);
    });

    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        document.getElementById('levelModal').classList.add('hidden');
        currentLevelIndex++;
        if (currentLevelIndex < LEVELS[currentLang].length) {
            loadLevel(currentLevelIndex);
        } else {
            alert(I18N[currentLang].completedAll);
            currentLevelIndex = 0;
            loadLevel(0);
        }
    });

    const gridEl = document.getElementById('wordGrid');

    // Début de sélection
    gridEl.addEventListener('pointerdown', (e) => {
        const cell = e.target.closest('.cell');
        if (cell) {
            isSelecting = true;
            startCell = cell;
            updateSelection(cell);
        }
    });

    // Glissement du curseur ou du doigt
    gridEl.addEventListener('pointermove', (e) => {
        if (!isSelecting) return;
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const cell = target ? target.closest('.cell') : null;
        if (cell && gridEl.contains(cell)) {
            updateSelection(cell);
        }
    });

    // Fin de sélection
    window.addEventListener('pointerup', () => {
        if (isSelecting) {
            isSelecting = false;
            checkSelection();
            clearTemporarySelection();
        }
    });
});

function updateUITranslations() {
    const t = I18N[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.innerText = t[key];
    });
}

function loadLevel(index) {
    const level = LEVELS[currentLang][index];
    targetWords = level.words.map(w => w.toUpperCase());
    foundWords.clear();

    const t = I18N[currentLang];
    document.getElementById('levelDisplay').innerText = `${t.level} ${index + 1} / 20`;
    document.getElementById('levelTitle').innerText = level.title;
    document.getElementById('foundCount').innerText = '0';

    buildGrid();
    renderWordList();
}

function buildGrid() {
    gridMatrix = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));

    targetWords.forEach(word => {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            attempts++;
            const dir = Math.floor(Math.random() * 3);
            let row, col;

            if (dir === 0) {
                row = Math.floor(Math.random() * GRID_SIZE);
                col = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));
            } else if (dir === 1) {
                row = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));
                col = Math.floor(Math.random() * GRID_SIZE);
            } else {
                row = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));
                col = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));
            }

            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
                let r = row + (dir === 1 || dir === 2 ? i : 0);
                let c = col + (dir === 0 || dir === 2 ? i : 0);
                if (gridMatrix[r][c] !== '' && gridMatrix[r][c] !== word[i]) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    let r = row + (dir === 1 || dir === 2 ? i : 0);
                    let c = col + (dir === 0 || dir === 2 ? i : 0);
                    gridMatrix[r][c] = word[i];
                }
                placed = true;
            }
        }
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (gridMatrix[r][c] === '') {
                gridMatrix[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    renderGrid();
}

function renderGrid() {
    const gridEl = document.getElementById('wordGrid');
    gridEl.innerHTML = '';

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = gridMatrix[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            gridEl.appendChild(cell);
        }
    }
}

function renderWordList() {
    const listEl = document.getElementById('wordList');
    listEl.innerHTML = '';

    targetWords.forEach(word => {
        const li = document.createElement('li');
        li.classList.add('word-item');
        li.innerText = word;
        li.id = `word-${word}`;
        if (foundWords.has(word)) {
            li.classList.add('found');
        }
        listEl.appendChild(li);
    });
}

// Calcule strictement les cellules en ligne droite (Horizontale, Verticale ou Diagonale)
function updateSelection(endCell) {
    // Nettoyer la sélection précédente
    document.querySelectorAll('.cell.selected').forEach(c => c.classList.remove('selected'));
    currentCells = [];

    const r1 = parseInt(startCell.dataset.row);
    const c1 = parseInt(startCell.dataset.col);
    const r2 = parseInt(endCell.dataset.row);
    const c2 = parseInt(endCell.dataset.col);

    const dr = Math.sign(r2 - r1);
    const dc = Math.sign(c2 - c1);

    const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));

    // Vérifier si la ligne est valide (horizontale, verticale ou diagonale exacte)
    if (r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1)) {
        for (let i = 0; i <= len; i++) {
            const r = r1 + i * dr;
            const c = c1 + i * dc;
            const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c} ‘]`) || document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
            if (cell) {
                cell.classList.add('selected');
                currentCells.push(cell);
            }
        }
    } else {
        // Si ce n'est pas une ligne droite parfaite, on sélectionne uniquement la cellule de départ
        startCell.classList.add('selected');
        currentCells = [startCell];
    }
}

function clearTemporarySelection() {
    document.querySelectorAll('.cell.selected').forEach(c => c.classList.remove('selected'));
    currentCells = [];
    startCell = null;
}

function checkSelection() {
    if (currentCells.length === 0) return;

    const selectedString = currentCells.map(c => c.innerText).join('');
    const reversedString = selectedString.split('').reverse().join('');

    let matchedWord = null;
    if (targetWords.includes(selectedString) && !foundWords.has(selectedString)) {
        matchedWord = selectedString;
    } else if (targetWords.includes(reversedString) && !foundWords.has(reversedString)) {
        matchedWord = reversedString;
    }

    if (matchedWord) {
        foundWords.add(matchedWord);
        currentCells.forEach(c => {
            c.classList.add('found');
        });

        const item = document.getElementById(`word-${matchedWord}`);
        if (item) item.classList.add('found');

        document.getElementById('foundCount').innerText = foundWords.size;

        if (foundWords.size === targetWords.length) {
            setTimeout(() => {
                showModal();
            }, 300);
        }
    }
}

function showModal() {
    const modal = document.getElementById('levelModal');
    const t = I18N[currentLang];
    document.getElementById('modalTitle').innerText = `${t.level} ${currentLevelIndex + 1} !`;
    modal.classList.remove('hidden');
}
