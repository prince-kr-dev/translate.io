let input = document.querySelector("#iptext");
let translateFrom = "en-GB";
let translateTo = "hi-IN";

async function getTranslate(){
    let text = input.value.trim();
    
    if(text === ""){
        text = "Enter text";
    }
    
    let urlTranslate = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    
    try{
        let response = await axios.get(urlTranslate);
        console.log(response.data.responseData.translatedText);
        return response.data.responseData.translatedText;

    } catch(err){
        console.log("Error", err);
        return err;
    }
}


let output = document.querySelector("#optext");
let translateBtn = document.querySelector("#translateBtn");


translateBtn.addEventListener("click", async ()=>{
    let translation = await getTranslate();
    output.innerHTML = translation;
})



//for dictionary
let inputFprDic = document.querySelector("#ip-div input");
async function getDictionary(){
    let inputWord = inputFprDic.value;
    let urlDictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    if(inputWord == ""){
        inputWord = "no word detected"
    }
    
    try{
        let result = await axios.get(urlDictionary+inputWord);
        // console.log(result.data[0].meanings[0].synonyms[0]);
        
        let wordValue = result.data[0].word;
        let phonecticWord = result.data[0].phonetic;
        let POS = result.data[0].meanings[0].partOfSpeech;
        let definition1 = result.data[0].meanings[0].definitions[0].definition;
        let definition2 = result.data[0].meanings[0].definitions[1].definition;
        let definition3 = result.data[0].meanings[0].definitions[2].definition;
        
        let synonym1 = result.data[0].meanings[0].synonyms[0];
        let synonym2 = result.data[0].meanings[0].synonyms[1];
        let synonym3 = result.data[0].meanings[0].synonyms[2];
        let synonym4 = result.data[0].meanings[0].synonyms[3];
        
        return [
            wordValue,
            phonecticWord,
            POS,
            definition1,
            definition2,
            definition3,
            synonym1,
            synonym2,
            synonym3,
            synonym4
        ];
    } catch(e){
        console.log("Error : ",e);
        return e;
    }
    
}



let closeBtn = document.querySelector("#dictionary #close");
let searchBtn = document.querySelector("#dictionary #search");
let wordh2 = document.querySelector("#word-listen h2");
let phonetich3 = document.querySelector("#dictionary h3");
let posh4 = document.querySelector("#dictionary h4");
let li1 = document.querySelector("#dictionary ul #li1");
let li2 = document.querySelector("#dictionary ul #li2");
let li3 = document.querySelector("#dictionary ul #li3");
let synonymh6 = document.querySelector("#dictionary h6");



searchBtn.addEventListener("click", async ()=>{
    wordh2.innerHTML = await printWordh2();
    phonetich3.innerHTML = await printPhonetich3();
    posh4.innerHTML = await printPOS();
    li1.innerHTML = await printDef1();
    li2.innerHTML = await printDef2();
    li3.innerHTML = await printDef3();
    synonymh6.innerHTML = await printSyno();
})


async function printWordh2() {
    const printWord = await getDictionary();
    return printWord[0];
}
async function printPhonetich3() {
    const printPhoonetic = await getDictionary();
    return printPhoonetic[1];
}
async function printPOS() {
    const printPOS1 = await getDictionary();
    return `Parts of Speech : ${printPOS1[2]}`;
}
async function printDef1() {
    const printdf1= await getDictionary();
    return printdf1[3];
}
async function printDef2() {
    const printdf2= await getDictionary();
    return printdf2[4];
}
async function printDef3() {
    const printdf3= await getDictionary();
    return printdf3[5];
}
async function printSyno() {
    const printsyn= await getDictionary();
    return `Synonyms : ${printsyn[6]}, ${printsyn[7]}, ${printsyn[8]}, ${printsyn[9]}`;
}


let dictBtn = document.querySelector("nav #dBtn");
let dictionaryDiv = document.querySelector("#dictionary");
dictBtn.addEventListener("click", ()=>{
    dictionaryDiv.style.display = "block";
})
closeBtn.addEventListener("click", ()=>{
    dictionaryDiv.style.display = "none";
})