const express = require ('express');
const path = require('path');
const fs = require ('fs');
const ejs = require('ejs');

const app = express ();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/views')));

//this is middleware to handle request body
app.use(express.urlencoded({
    extended:true
}));

//Part 0
//create route 1: renders a page that displays all your users.
//this is a route for default home
app.get('/', (req,res) => {
    console.log('works');
    fs.readFile('./users.json', 'utf8', function(err, data){
        if (err) {
            throw err;
        }
        let obj = JSON.parse(data);
        console.log(obj);
        res.render('route1', {
            obj:obj
        })
    });
});

//Part 1
//Create two more routes:
//- route 2: renders a page that displays a form which is your search bar.

app.get('/route2', (req, res) => {
    //console.log('also works');
    res.render('route2')
});


//- route 3: takes in the post request from your form, then displays matching users on a new page. 
//Users should be matched based on whether either their first or last name contains the input string.

app.post('/route2', (req,res) => {
    let input = req.body.search.toLowerCase();
    //console.log(req.body.search);

    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let obj = JSON.parse(data);
        
        // Empty array to store the match found
        let matchFound = [];
    
        //filter
        obj.filter((user) => {
            let firstName = user.firstname.toLowerCase();
            let lastName = user.lastname.toLowerCase();
            console.log(firstName);

            //check if firstname/lastname is the same as input
            if (firstName.includes(input) || lastName.includes(input)) {
                matchFound.push(user);
            }
        });
        res.render('route3.ejs', {
            key:matchFound
        
        });
    })
});


// Create route 4: renders a page with three inputs on it 

app.get('/route4', (req, res) => {
    res.render('route4');
});
// Create route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. 
//Once that is complete, redirects to the route that displays all your users (from part 0).

app.post('/route4', (req,res) => {
    //let newUser = req.body;
    //console.log(newUser);
     
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) throw err;
     
    let obj = JSON.parse(data);
        console.log(obj);
     
    let newestObj = {
        firstname: req.body.firstName,
        lastname : req.body.lastName,
        email : req.body.email,
        };
     
    
    obj.push(newestObj);
     

    fs.writeFile('users.json', JSON.stringify(obj), (err) => {
        if (err) throw err;
        console.log(obj);
    });

    res.render('route1', {
        obj: obj
    });
});
    
});

app.listen(port, () => console.log(`ears on ${port}`));
