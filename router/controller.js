const express = require('express');
const registration =require("../model/registration")
const router = express.Router();
const bcrypt = require('bcrypt')


router.get('/', (req, res)=>{
    res.render("index")
})

router.get('/login',  (req, res)=>{
    res.render("login");
    });

    router.post('/login', async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
    
        try { 
            var user = await registration.findOne({ email });
             
            if (!user) {
                res.redirect('/login');
            }console.log(user)
            user.comparePassword(password,(error,match)=>{
                if(!match){
                    res.redirect("/");
                }
                res.redirect("/");
            });
        } catch (error) {
            console.log(error);
       }
    })

    router.get('/signup', (req, res)=> {
        res.render("signup");
    });
    router.post('/signup', (req, res) => {
        var register = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            address: req.body.address   
        };
        var addpost = new registration(register);
        addpost.save()
            .then(() =>
                res.json('register successfully'))
            .catch(err => res.status(400).json('error' + err));
    });
router.get('/csv1', (req,res)=>{
    res.render("csv1")
})
    
        router.get('/', async (req, res) => {
            try {
              const data = await registration.find({}); 
          
              const createCsvWriter = require('csv-writer').createObjectCsvWriter;
              const csvWriter = createCsvWriter({
                path: 'data.csv',
                header: [
        
                  { id: 'Name', title: 'Name' },
                  { id: 'Age', title: 'Age' },
                  { id: 'Subject', title: 'Subject' },
                ],
              });
          
              
              csvWriter.writeRecords(data)
                .then(() => {
                  console.log('CSV file created successfully');
                  res.download('data.csv'); 
                });
            } catch (error) {
              console.error('Error exporting to CSV:', error);
              res.status(500).send('Internal Server Error');
            }
           });



  module.exports = router;
