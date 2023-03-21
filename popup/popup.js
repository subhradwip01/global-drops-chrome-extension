const locationIdElem = document.getElementById("locationId");
const startDateElem = document.getElementById("startDate");
const endDateElem = document.getElementById("endDate");
const startButtonElem = document.getElementById("startButton");
const stopButtonElem = document.getElementById("stopButton");

startButtonElem.onclick = () =>{
    const prefs ={
       locationId : locationIdElem.value,
       startDate: startDateElem.value,
       endDate: endDateElem.value
    }
    chrome.runtime.sendMessage({event:'onStart',prefs})
    
}
stopButtonElem.onclick = () =>{
    chrome.runtime.sendMessage({event:'onStop',})
    const endDate = endDateElem.value;
}

chrome.storage.local.get(["loactionId","startDate","endDate","isRunning"],(results)=>{
    const {locationId,startDate,endDate}=results;
    console.log(results)
    if(locationId){
        locationIdElem.value=locationId
    }
    if(startDate){
        startDateElem.value=startDate
    }
    if(endDate){
        endDateElem.value=endDate
    }

    console.log("Running Status: ",results.isRunning);
})
