//api key for using API on openweathermap.org
const API_KEY="9d9bdc8d7da2bea9044677603d0c9744";


const root=document.querySelector('#root');
const form=document.querySelector('form');
const input=document.querySelector('input');
const clearbtn=document.querySelector('#btn-clear'); //clear button that remove all of cards from container


//create a container to save card of weather in its parent root
const container=document.createElement("div");
container.setAttribute("class",'container')
root.appendChild(container)



//add an submit event for create a card 
form.addEventListener('submit',(e)=>{
   
    e.preventDefault()

	//convert input value to a valid city name for url
	let cityName=input.value.trim().charAt(0).toUpperCase()+input.value.slice(1)
     
    //data fetch with url 
    //url consist of cityName and API_KEY for access to data 
     let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
   
   fetch(url)
          .then(response=>response.json())
           .then(data=>{
           	//destructure name of city,country,temperature and description of weather
         	const {weather,name,sys,main}=data 
              
             //#section1 of city and country as title
               let card=document.createElement("div")
	               card.setAttribute("class", "card")

              let title=document.createElement("div")
	              title.setAttribute("class", "title")

              let h1=document.createElement("h1")
	          let span=document.createElement("span")
	 	         
	 	           h1.textContent=name            //city
	 	           span.textContent=sys.country   //country
	 	        
	 	          //h1 and span are cildren of title
	 	           title.appendChild(h1)
		           title.appendChild(span)

          //#section2  of body show temperature as numeric and main of weather as icon
	  let body=document.createElement("div")
	     body.setAttribute("class","body")

         
		  let temp=document.createElement("div")  //temp is container for keep temperature and icon
	          temp.setAttribute("class","temp")

	let tempp=document.createElement("p");
	let temperature=main.temp     //unit of temperature is metric so don't need to any convert 
	tempp.textContent=temperature.toFixed(0)
     
     //add symbol cellcious to temperature
	let cellsymbol=document.createElement("span");
	  cellsymbol.innerHTML=" &#8451"
     
     //create container of icon
	  let icon=document.createElement("div");
	  icon.setAttribute("class","icon")
        //add icon to body
	  let img=document.createElement("img");
	  img.src=`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`//with this API ,access to icon weather with format png or svg
    
   		icon.appendChild(img)

     temp.appendChild(tempp)
     temp.appendChild(cellsymbol)
 
 	body.appendChild(temp)
 	body.appendChild(icon)
        
        //#section3 add description
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
//clear button, clear all card from container
clearbtn.addEventListener("click",()=>{
	while(container.firstChild){
		container.removeChild(container.firstChild)
	}
})


	

        
