const locationIdElem = document.getElementById("locationId");
const startDateElem = document.getElementById("startDate");
const endDateElem = document.getElementById("endDate");
const startButtonElem = document.getElementById("startButton");
const stopButtonElem = document.getElementById("stopButton");
const runningElem = document.getElementById("running")
const stoppedElem = document.getElementById("stopped")


const hideElem = (elem) =>{
    elem.style.display="none"
}

const showElem = (elem) =>{
    elem.style.display=""
}

const disableElem = (elem) =>{
    elem.disabled = true
}

const enabledElem = (elem) => {
    elem.disabled=false
}

const handleOnStartState = () =>{
    // Status span
    showElem(runningElem)
    hideElem(stoppedElem)

    // Button
    disableElem(startButtonElem)
    enabledElem(stopButtonElem)
}

const handleOnStopState = () =>{
    //Status span
    showElem(stoppedElem)
    hideElem(runningElem)

    //Button
    disableElem(stopButtonElem)
    enabledElem(startButtonElem)
} 


startButtonElem.onclick = () =>{
    handleOnStartState();
    const prefs ={
       locationId : locationIdElem.value,
       startDate: startDateElem.value,
       endDate: endDateElem.value
    }
    chrome.runtime.sendMessage({event:'onStart',prefs})
    
}
stopButtonElem.onclick = () =>{
    handleOnStopState();
    chrome.runtime.sendMessage({event:'onStop',})
    const endDate = endDateElem.value;
}

chrome.storage.local.get(["loactionId","startDate","endDate","isRunning"],(results)=>{
    const {locationId,startDate,endDate,isRunning}=results;
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

    if(isRunning){
        handleOnStartState()
    }else{
        handleOnStopState()
    }

})

