const Mysql = require('mysql');
const express = require('express');
const body = require('body-parser');
const app2 = express()
const port = 3300

app2.use(body.urlencoded({ extended: false }))
app2.use(body.json())
const connection = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_user',
    multipleStatements: true

})

connection.connect((err) => {
    if (!err) { console.log('connection reussie'); }
})
app2.listen(port)

app2.get('/userinfos/:mail', (req, res) => {
    connection.query('SELECT * FROM users WHERE email=?', [req.params.mail], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            res.json(err)
        }
    })
})
app2.post('/login/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    connection.query('SELECT * FROM users WHERE email=? AND password=?', [email, password], (err, compt, fields) => {
        if (!err) {
            // res.send(compt)
            if (compt.length > 0) {
                connection.query('SELECT email FROM users WHERE email=? AND password=?', [email, password], (err, rowsresults, fields) => {

                        if (!err) {
                            res.send(rowsresults)
                                //res.redirect('/userinfos/' + rowsresults)

                        } else {
                            res.send(err)
                        }

                    })
                    //fin connection


            } else {


                res.send('Mail ou mot de passe incorrect')
            }



        } else {
            res.json(err)
        }
    })
})
app2.post('/inscription/', (req, res) => {
    let nom = req.body.nom;
    let ids = req.body.id;
    let prenom = req.body.prenom;
    let civilite = req.body.civilite;
    let adress = req.body.adress;
    let tel = req.body.tel;
    let email = req.body.email;
    let password = req.body.password;




    connection.query('SELECT * FROM users WHERE email=? ', [email], (err, rows_exist, fields) => {

            if (!err) {

                if (rows_exist.length > 0) {
                    res.send('cet email existe')
                } else {
                    var sql = "INSERT INTO users ( id, nom, prenom, civilite, adress, tel, email, password) VALUES (?,?,?,?,?,?,?,?)";
                    connection.query(sql, [ids, nom, prenom, civilite, adress, tel, email, password], (err, rows, fields) => {
                        if (!err) {
                            res.send('inscription effectue')
                            res.redirect('/login/')
                        }
                    })


                } //fin if rows_exist

            } //fin if err
        }) //fin connection



})