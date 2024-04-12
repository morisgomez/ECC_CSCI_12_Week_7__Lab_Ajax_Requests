window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      //Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
   
      //Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);	   
   });
});

/*
///////////////////////////////////
//CODE ABOVE WAS PROVIDED BY EBOOK:
//CODE I HAD TO MODIFY BELOW:
///////////////////////////////////
*/

//function 1:
function fetchQuotes(topic, count) //handler for button takes in text input and # of quotes.
{
   //TODO: Modify to use XMLHttpRequest
   let xhr = new XMLHttpRequest(); //new ajax request.
   xhr.addEventListener("load", responseReceivedHandler); //event listener for ajax request.
   xhr.responseType = "json"; //expecting response via json.
  
   xhr.open("GET", "https://wp.zybooks.com/quotes.php?topic=" + topic + "&count=" + count);
   //url has to be: "https://wp.zybooks.com/quotes.php?topic=love&count=3";
   xhr.send(); //sends request.
} //end fetchQuotes() function.

//TODO: Add responseReceivedHandler() here
//function 2:
function responseReceivedHandler() //handler for response from server.
{
  if (this.status !== 200) //no response.
  {
    alert("Error making HTTP request");
  }
  
  else //yes response. 
    //can go into nested paths to determine special cases of a succesful response: 
    //e.g topic not in data but still a successful response.
    {
      let html = ""; 
      html = html + "<ol>"; //opening tag for ol.
      for(let c = 0; c < this.response.length; c++) //the response is an arr w/ objects as elements.
      {
        html = html + "<li>" + this.response[c].quote + " - " + this.response[c].source + "</li>";
        //this.response[c].quote accesses the c index of the response arr & gets the value of the 'quote' key.
      } //end for loop.
      html = html + "</ol>"; //close ol.
      document.querySelector("#quotes").innerHTML = html; //add final ol inside the div w/ id "quotes".
    }
} //end responseReceivedHandler() function.

/*
[
   {
      "quote": "If I know what love is, it is because of you.",
      "source": "Hermann Hesse"
   },
   {
      "quote": "The opposite of love is not hate, it's indifference.",
      "source": "Elie Wiesel"
   },
   {
      "quote": "Suffering passes, while love is eternal.",
      "source": "Laura Ingalls Wilder"
   }
]
*/