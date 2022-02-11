// https://quotes-react.netlify.app/
// https://type.fit/api/quotes



const quoteContainer= document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');

//fn initilization
let apiQuotes= [];

//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


//show new quote
//calling of fn
function newQuote(){
    loading();
    //pick a random  quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //  console.log(quote);
    
    //if the author is none
    if(!quote.author){
        document.getElementById('author').textContent= "Unknown";
    }else{
        document.getElementById('author').textContent = quote.author;
    }

//if quote lenght is long
if(quote.text.length>120){
    document.getElementById('quote').classList.add('long-quote');
}else{
    document.getElementById('quote').classList.remove('long-quote');
}

    document.getElementById('quote').textContent = quote.text;
    // document.getElementById('author').textContent = quote.author;
    // quoteText.textContent = quote.text;
    // authorText.textContent = quote.author;

    // console.log(quote.author);
    // console.log(quote.text);
    complete();
}

//set quote hide loader



// get quote from api
async function getQuote(){
    loading();
const apiUrl='https://type.fit/api/quotes';
try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes[12]);
}catch(error){
    //catch eror here
}
}


//tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${document.getElementById('author').textContent} - ${document.getElementById('quote').textContent}`;
    window.open(twitterUrl, '_blank')
}

//event listener
document.getElementById('new-quote').addEventListener('click', newQuote);
document.getElementById('twitter').addEventListener('click', tweetQuote);


//on load
//returning fn
getQuote();

