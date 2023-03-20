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

chrome.storage.get(["loactionId","startDate","endDate"],(results)=>{
    const {locationId,startDate,endDate}=results;
    if(locationId){
        locationIdElem.value=locationId
    }
    if(startDate){
        startButtonElem.value=startDate
    }
    if(endDate){
        endDateElem.value=endDate
    }
})
