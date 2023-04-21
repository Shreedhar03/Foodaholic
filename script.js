
document.querySelectorAll('.wait').forEach((element) => {
    element.style.opacity = 0
})

let loader = document.querySelector('.loader')

let loaderFunc1 = () => {
    loader.style.display = "none"
    document.querySelectorAll('.wait').forEach((element) => {
        element.style.opacity = 1
    })
}

let loaderFunc = () => {
    setTimeout(loaderFunc1, 1500)
}


let search = document.querySelector('#search')
let btn = document.querySelector('#btn')
let area = document.querySelector('#area')
let category = document.querySelector('#category')
let title = document.querySelector('#title')
let parent = document.querySelector('#parent')

btn.addEventListener('click', () => {
    API(search.value)
    API_IMG(search.value)
})

const API = (name) => {

    // let name = search.value

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((x) => x.json())
        .then((data) => {
            console.log(data)
            console.log(data.meals[0].strInstructions)

            let area_ = data.meals[0].strArea
            let category_ = data.meals[0].strCategory
            let title__ = data.meals[0].strMeal

            area.innerHTML = area_
            category.innerHTML = category_
            title.innerHTML = title__

            document.querySelector('#instruct').innerHTML = ""
            let recipeArr = data.meals[0].strInstructions.split(".")
            // console.log(recipeArr)

            inst = recipeArr.map((item, key) => {
                console.log(item);

                if (item !== "") {
                    document.querySelector('#instruct').innerHTML += `
                        ${key + 1}) ${item} <br>
                `}
            })


            // document.querySelector('#instruct').innerHTML = data.meals[0].strInstructions

            let i, count = 1;

            let ingredient = "";
            let measure = "";
            let array = []
            for (i in data.meals[0]) {

                if (i.startsWith("strIngredient") && data.meals[0][i]) {

                    ingredient = data.meals[0][i]
                    measure = data.meals[0][`strMeasure` + count];
                    // console.log(ingredient , " : " , measure)
                    count++
                    array.push(` ${measure} ${ingredient}`)

                }

            }


            parent.innerHTML = " ";

            let count1 = 1
            for (let i = 0; i < array.length; i++) {

                parent.innerHTML += (count1 + ") " + (array[i]) + "<br>")
                count1++
            }

            // console.log(array)


        }).catch(() => {
            instruct.innerHTML = " ";
            parent.innerHTML = " ";
            parent.innerHTML = `<h1 class="text-3xl text-white"> ------ </h1>`;
            instruct.innerHTML = `<h1 class="text-3xl">No data found !</h1>`;
            area.innerHTML = `<h1 class="text=2xl"> - </h1>`
            category.innerHTML = `<h1 class="text=2xl"> - </h1>`
            title.innerHTML = `<h1 class="text=2xl"> No data found ! </h1>`
        })

}

const APi = (name) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8aa370316emsh82d4ddf6d2bbd76p19d573jsnbaa2af02c644',
            'X-RapidAPI-Host': 'recipe-generator.p.rapidapi.com'
        }
    };

    fetch('https://recipe-generator.p.rapidapi.com/recipe-generator?ingredients=paneer', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

APi("paneer")

const API_IMG = (name) => {

    const KEY = "CINAhwNAJ9g1xNwnU5X1HE0QfagHb9gLgL9GjoLlJ5g";
    const url = `https://api.unsplash.com/search/photos/?client_id=${KEY}&query=${name}`

    fetch(url)
        .then((x) => x.json())
        .then((data) => {
            // console.log(data)

            let i = Math.floor((Math.random() * 10));
            let path = data.results[i].urls.regular

            document.querySelector('#imgs').innerHTML =
                `
                <img src="${path}" class="w-[450px] h-[300px] rounded-2xl">
            `
        })

}

const RapidAPI = () => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8aa370316emsh82d4ddf6d2bbd76p19d573jsnbaa2af02c644',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    fetch('https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err));
}



API("paneer");
API_IMG("paneer");


const RapidAPI1 = '8aa370316emsh82d4ddf6d2bbd76p19d573jsnbaa2af02c644'