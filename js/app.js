//if user adds a note
shownNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);//converts the strings into array
    }
    // notesObj.push(addTxt.value); old 
    myobj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesObj));//converts arrays into string
    addTxt.value = '';
    addTitle.value = '';
    // console.log("This is the note",notesObj);
    shownNotes();
})

//functions to show element from local storage
function shownNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);//converts the strings into array
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        //+= ka mtlb append hota jayega
        html += `
        <div class="noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note${index+1}:${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
                `;
    });
    let notesEln = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEln.innerHTML = html;
    }
    else {
        notesEln.innerHTML = "Nothing to show here WOOOHOOO "
    }
}

//function to delete a note
function deleteNote(index) {
    // console.log('deleted this node',index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);//splice kahan se start krna hai yeh first parameter batayega uske baad kitne element remove krna hai vo second element batayega
    localStorage.setItem('notes', JSON.stringify(notesObj));
    shownNotes();
}


//searching the note
let search = document.getElementById('searchTxt');
search.addEventListener('input', function (e) {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})