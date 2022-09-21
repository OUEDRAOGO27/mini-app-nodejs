const express = require('express')
const app = express()
const port = 8081
app.get('/', (req, res) => res.send('simple server :)'))
app.get('/app/:referPage', (req, res) => {
    const referencePage = req.params.referPage

    if (referencePage == 'Inscription') {
        res.send(' inscription')
    }
    if (referencePage == 'Authentification') {
        res.send(' Authentification')
    }
    if (referencePage == 'UserInfos') {
        res.send(' infos utilisateur')
    }



})
app.listen(port)