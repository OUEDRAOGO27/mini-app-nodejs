const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

//Connexion à la BDD

const connexion =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3308,
    database: 'mini-app-node'
});

// Tester la connexion

connexion.connect((error)=>{
    if(!error){
        console.log('Connexion réussie');
    }else{
        console.log('Erreur de connexion: ' +error);
    }
});

app.listen(3000);

//Route de user list

app.get('/profil/:id', (req,res)=>{
    const GetData = "SELECT * FROM inscription where id = ?";
    connexion.query(GetData, [req.params.id], (error, data, row)=>{
        if(error){
            console.log('erreur :' +error);
        }else{
            res.send(data);
        }
    });
});

// Route pour register
app.post('/register', (req, res)=>{
    
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const civilite = req.body.civilite;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const motdepasse = req.body.motdepasse;

    if(nom == "" || prenom == "" || civilite == "" || telephone== "" || email =="" || adresse == "" || motdepasse == ""){
        console.log("Veuillez renseigner tous les champs");
    }else{
        const sql = "INSERT INTO inscription (nom,prenom,civilite,telephone,email,adresse,motdepasse) VALUES(nom,prenom,civilite,telephone,email,adresse,motdepasse)";
        connexion.query(sql, (error,data)=>{
            if(error){
                console.log('Erreur :' +error);
            }else{
                res.redirect('/profil/:id');
            }
        });
    }
});

app.get('/login', (req,res)=>{
    const email = req.body.email;
    const motdepasse = req.body.motdepasse;

    const UserAuthentificate = "SELECT * FROM inscription WHERE email = ? and motdepasse = ?";
    connexion.query(UserAuthentificate, [email,motdepasse], (error, result, fields)=>{
        if(result.length > 0){
            res.redirect('/profil/:id');
        }else{
            res.redirect('/register');
        }
        res.end();
    });
});