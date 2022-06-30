import express from "express";
import axios from "axios";
import cors from "cors";


const PORT = process.env.PORT || 8000

const app = express();
app.use(cors());


const ideas = [];
let users;

const getIdea = (users, i) => {
    axios.get('http://itsthisforthat.com/api.php?json')
        .then((res) => {
            //console.log(res.data)
            users[i].idea = res.data;
            let randomNumber = (Math.random() * 100).toFixed(2);
            let time = Math.floor(Math.random() * 24);
            users[i].idea.cost = randomNumber;
            users[i].idea.time = time;
            return res.data;
    })
}
const getIdeas = async(users) => {
    let promises = [];
    for(let i = 0; i < users.length; i++){
        promises.push(getIdea(users, i));
    }
    let res = await Promise.all(promises);
    return res
}
const getUsers = () => {
    axios.get('https://randomuser.me/api/?results=50')
    .then(res => users = res.data.results)
    .then(users => getIdeas(users));

}

getUsers()

app.get('/', (req, res) => {
    res.json(users);
})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});