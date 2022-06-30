
const randomUserURL = 'http://localhost:8000/';

export const getUsers = async() => {
    try{
        const res = await fetch(`${randomUserURL}`);
        return res.json();
    }catch(error){
        console.log(error)
    }
}

