const mysqlDatabase = require('./mysqlDatabase');
const express = require('express');


const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

// feteching all the notes

app.get("/notes", async (req, res) => {
    const notes = await mysqlDatabase.getNotes();
    res.render("notes.ejs", {
        notes,
    });
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    try {
      const note = await mysqlDatabase.getNote(id)
      res.send(note)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

// creating a note

app.get("/", (req, res) => {
    console.log("inside create note method---------");
    res.render("createNote.ejs")
})

// adding a note to database

app.post("/addingNote", async (req, res) => {
    const data = req.body
    console.log("new data    ",data);
    await mysqlDatabase.addNote(data)
    
    res.redirect("/notes")
})

app.post("/deleteNote", (req, res) => {
    console.log("request", req.body.id)
    const {id} = req.body
    console.log("id----------->>  ", id);
    mysqlDatabase.deleteNote(id)
    res.redirect("/notes")
})
  

// listing to port

app.listen(port, () => {
    console.log("Listing at port    ",port);
})

