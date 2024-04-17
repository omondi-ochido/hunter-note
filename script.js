function saveNote() {
    const content = document.getElementById('note-content').value;
    localStorage.setItem('note', content);
    alert('Note saved successfully!');
}

function downloadNote() {
    const content = localStorage.getItem('note');
    if (content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'note.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } else {
        alert('No note to download!');
    }
}

function highlightKeywords() {
    const textarea = document.getElementById('note-content');
    let text = textarea.value;

    // Define arrays of keywords to highlight
    const bibleBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
    const majorCharacters = ['Jesus', 'Moses', 'Abraham', 'David', 'Solomon', 'Peter', 'Paul', 'Mary', 'Joseph', 'John the Baptist'];
    const godNames = ['God', 'Lord', 'Yahweh'];

    // Highlight Bible books
    bibleBooks.forEach(book => {
        const regex = new RegExp('\\b' + book + '\\b', 'gi');
        text = text.replace(regex, '<span class="bible-book">' + book + '</span>');
    });

    // Highlight major characters
    majorCharacters.forEach(character => {
        const regex = new RegExp('\\b' + character + '\\b', 'gi');
        text = text.replace(regex, '<span class="major-character">' + character + '</span>');
    });

    // Highlight occurrences of 'God', 'Lord', 'Yahweh'
    godNames.forEach(name => {
        const regex = new RegExp('\\b' + name + '\\b', 'gi');
        text = text.replace(regex, '<span class="god-name">' + name + '</span>');
    });

    textarea.innerHTML = text;
}

window.onload = function() {
    highlightKeywords(); // Call highlightKeywords when the page loads

    // Save note button click event
    document.getElementById('save-btn').addEventListener('click', saveNote);

    // Download note button click event
    document.getElementById('download-btn').addEventListener('click', downloadNote);

    // Highlight keywords whenever the content of the text area changes
    document.getElementById('note-content').addEventListener('input', highlightKeywords);

    // Highlight keywords when the "Highlight Keywords" button is clicked
    document.getElementById('highlight-btn').addEventListener('click', highlightKeywords);
};
function downloadNote() {
    const content = localStorage.getItem('note');
    if (content) {
        // Get current date and time
        const dateTime = new Date().toISOString().replace(/:/g, '-');
        
        // Create a Blob with content and filename including the date and time
        const blob = new Blob([content], { type: 'text/plain' });
        const filename = 'note_' + dateTime + '.txt';

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Create a link element and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } else {
        alert('No note to download!');
    }
}

