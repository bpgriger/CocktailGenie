let selection = document.getElementById('booze');
let list = document.getElementById('list');
let recipe = document.getElementById('recipe');
selection.addEventListener('change', ()=>{
    recipe.innerHTML = '';
    let value = selection.options[selection.selectedIndex].value;
    if(value != 'default'){
        list.innerHTML = '';
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + value;
        fetch(url)
            .then(response => response.json()
            ).then(jsonResponse =>{
                console.log(jsonResponse);
                for(let x = 0; x < 3; x++){
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
                        recipe.innerHTML = '';
                        const drinkId = links[i].alt;
                        const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;
                        fetch(url)
                            .then(response => response.json()
                            ).then(jsonResponse =>{
                                console.log(jsonResponse);
                                let container = document.createElement('div');
                                container.classList.add('recipe');

                                for(let x = 1; x < 16; x++){
                                    let ingredient = jsonResponse.drinks[0]['strIngredient' + x];
                                    let measure = jsonResponse.drinks[0]['strMeasure' + x];
                                    if(!measure){
                                        measure = 'To taste';
                                    }
                                    container.innerHTML += `${ingredient} - ${measure}<br />`;
                                    if(!jsonResponse.drinks[0]['strIngredient' + (x + 1)]){
                                        break;
                                    }
                                }
                                container.innerHTML += `<br/>${jsonResponse.drinks[0].strInstructions}`;
                                recipe.appendChild(container);


                                
                            })
                    })
                }
            }) 
    }
})