const API_KEY="9d9bdc8d7da2bea9044677603d0c9744";
const sample={
	"coord":{
		"lon":-0.1257,
		"lat":51.5085
	},
	"weather":[
	{
		"id":803,
		"main":"Clouds",
		"description":"broken clouds",
		"icon":"04d"
	}
	],
	"base":"stations",
	"main":{
		"temp":276.86,
		"feels_like":273.35,
		"temp_min":275.4,
		"temp_max":277.21,
		"pressure":991,
		"humidity":87
	},
	"visibility":10000,
	"wind":{
		"speed":4.12,
		"deg":320
	},
	"clouds":{
		"all":75
	},
	"dt":1638003293,
	"sys":{
		"type":1,
		"id":1414,
		"country":"GB",
		"sunrise":1637998702,
		"sunset":1638028701
	},
	"timezone":0,
	"id":2643743,
	"name":"London"
	,"cod":200
}
//access to roo form input and submit button
const root=document.querySelector('#root');
const form=document.querySelector('form');
const input=document.querySelector('input');
const clearbtn=document.querySelector('#btn-clear'); //clear all of card from container
const container=document.createElement("div");

//create a container to save card of weather in its parent root
container.setAttribute("class",'container')
root.appendChild(container)



//add an submit event for create a card 
form.addEventListener('submit',(e)=>{
    e.preventDefault()
	//convert input value to a valid city name for url
	let cityName=input.value.trim().charAt(0).toUpperCase()+input.value.slice(1)
     
    //data fetch from openweathermap.org
     let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
   
   fetch(url)
   .then(res=>res.json())
   .then(data=>{
   	const {weather,name,sys,main}=data
              
            //   console.log("weather :",weather[0].main)
            //  console.log('description : ',weather[0].description)
            // console.log('country : ',sys.country)
            // console.log("city",name);

let card=document.createElement("div")
	card.setAttribute("class", "card")

    let title=document.createElement("div")
	title.setAttribute("class", "title")

  let h1=document.createElement("h1")
	let span=document.createElement("span")
	 	 h1.textContent=name
	 	 span.textContent=sys.country
	 	 title.appendChild(h1)
		 title.appendChild(span)

let temperature=main.temp
		
	let body=document.createElement("div")
	body.setAttribute("class","body")

		let temp=document.createElement("div")
	temp.setAttribute("class","temp")

	let tempp=document.createElement("p");
	tempp.textContent=temperature.toFixed(0)

	let cellsymbol=document.createElement("span");
	  cellsymbol.innerHTML=" &#8451"

	  let icon=document.createElement("div");
	  icon.setAttribute("class","icon")

	  let img=document.createElement("img");
	  img.src=`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    
   		icon.appendChild(img)

     temp.appendChild(tempp)
     temp.appendChild(cellsymbol)
 
 	body.appendChild(temp)
 	body.appendChild(icon)

	  let description=document.createElement("div");
	  description.setAttribute("class","description")

	  let descp=document.createElement("p");
	descp.textContent=weather[0].description


     description.appendChild(descp)

     card.appendChild(title)
     card.appendChild(body)
     card.appendChild(description)
     container.appendChild(card)


   }).catch(err=>console.error(err))

	e.preventDefault()
	input.value=""
})

clearbtn.addEventListener("click",()=>{
	while(container.firstChild){
		container.removeChild(container.firstChild)
	}
})


	

        
//  console.log(cityName);        
// console.log("weather :",sample.weather[0].main)
// console.log('description : ',sample.weather[0].description)
// console.log('country : ',sample.sys.country)