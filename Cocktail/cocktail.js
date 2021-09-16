let selection = document.getElementById('booze');
let list = document.getElementById('list');
selection.addEventListener('change', ()=>{
    let value = selection.options[selection.selectedIndex].value;
    if(value != 'default'){
        list.innerHTML = '';
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + value;
        fetch(url)
            .then(response => response.json()
            ).then(jsonResponse =>{
                console.log(jsonResponse);
                for(let x = 0; x < 5; x++){
                    let randomIndex = Math.floor(Math.random() * (jsonResponse.drinks.length - 1))
                    let name = jsonResponse.drinks[randomIndex].strDrink;
                    let imgUrl = jsonResponse.drinks[randomIndex].strDrinkThumb + '/preview';
                    let id = jsonResponse.drinks[randomIndex].idDrink;
                    let holder = document.createElement('div');
                    holder.innerHTML = `<p class='title'>${name}</p><br/>` +
                                    `<img src='${imgUrl}' alt='${id}' class='link'>`;
                    list.appendChild(holder);
                }
                let links = document.getElementsByClassName('link');

                for(let i = 0; i < links.length; i++){
                    links[i].addEventListener("click",() =>{
                        const drinkId = links[i].alt;
                        console.log(drinkId);
                    })
                }
            }) 
    }
})