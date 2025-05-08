const fs = require('fs/promises');

const express = require('express');

const app = express();

app.use(express.json());

// middleware to parse request body into JSON, if we dont write this line in code, body recieved in request will be considered as undefined 

// helper function to get all notes at '/notes' when GET request from client side

async function GetNotes(){
    const data = await fs.readFile('notes.json','utf-8');
    // console.log(data);
    return JSON.parse(data);
}; 

// helper function to save new notes at '/notes' when POST request from client side

async function SaveNote(note){
    const notes = await GetNotes();
    notes.push(note);
    await fs.writeFile('notes.json',JSON.stringify(notes,null,2),'utf-8')
}

// helper function to delete note as per id mentioned in the route params at '/notes/:id' when DELETE request from client side


async function RemoveNote(id){
  
    const notes = await GetNotes();

    const NoteIdx = notes.findIndex( n => n.id === id);

    notes.splice(NoteIdx,1);

    await fs.writeFile('notes.json',JSON.stringify(notes,null,2),'utf-8');

    // yaha ek doubt yeh aaya ki yaar, splice karliya jab, which basically is removing that note of that particular id from file, toh yeh writeFile kyu kar rahe hai yaha pe
   // because splice => But this is only inside JavaScript memory (RAM) →
  //  our notes.json file on disk is still unchanged! → it still has the old data → unless you explicitly save new data to file.

//   If we don’t write it back to file, the deletion is temporary →
//   server restarts → or someone else reads file → old data is still there! 
//  To persist the change permanently in file storage → we must:
  
//   Modify array in memory
//  Write updated array back to file (overwrite old file)

}

app.get('/notes',async (req,res)=>{
    console.log(`request made at URL : ${req.url} at time : ${new Date().toLocaleString()}`)
    const data = await GetNotes();
    res.status(200).json({data});
})

app.post('/notes',async(req,res)=>{

    const notes = await GetNotes();

    // console.log(req.body)

    const {Title, Content} = req.body;

    const newNote = {
        id: notes.length > 0 ? parseInt(notes[notes.length - 1].id)+1 : 1,
        Title,
        Content
    }

    await SaveNote(newNote);

    res.status(201).json({message:"Note Created Successfully !",Note:newNote});

})

app.delete('/notes/:id',async(req,res)=>{

    const id = parseInt(req.params.id);

    const notes = await GetNotes();

    const noteExists = notes.find( n => n.id === id );

    if(!noteExists){
        return res.status(404).json({error:"This note doesnt exist !"});
    }

    // ab yaha pe apan ko ek silly sa doubt yeh aaya ki yaar, yeh if block ke andar return statement use kar rahe hai , bahar kyu nahi, because very simple
    // jab yeh if block mein jaaye, we want ki code iske aage fir execute na ho, agar yaha return nahi lagaya, toh code if ke bahar nikalke aage ki lines
    // execute karne lagega aur iss case mein hiyega yeh ki pehle 404 response bheja fir 200 bhejega, error aajayega ki headers once sent cannot be sent again

    // We return res.status(404)... inside if → because it immediately exits function after sending 404, preventing further code (and second response) from running.
     
    await RemoveNote(id);
    res.status(200).json({message:`Note with id:${id} deleted Successfully !`});
})


app.listen(8080,()=>{
    console.log('Server started at PORT : 8080')
});