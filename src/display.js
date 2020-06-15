const location = document.querySelector('.location')
const temperature = document.querySelector('.temperature')
const conditions = document.querySelector('.conditions')
const gif = document.querySelector('.gif')
const submitButton = document.querySelector('.submitButton')



const display = () =>{

    const getInput = () =>{
        console.log('button pressed')
    }

    const setListeners = () => {
        console.log('setting lisenters')
        submitButton.addEventListener('click',getInput,false)
    }

    return {setListeners};
}

const displayUI = display();

export default displayUI