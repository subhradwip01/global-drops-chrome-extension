const ALARM_JOB_NAME = "DROP_ALARM"
chrome.runtime.onMessage.addListener(data=>{
    const { event , prefs} = data;
    switch(event){
        case 'onStart' :
            handleOnStart(prefs)
            break;
        case 'onStop' :
            handleOnStop()
            break;
        default : 
             
    }
})

const handleOnStart = (prefs) =>{
    console.log(prefs)
    chrome.storage.local.set(prefs)
    setRunningStatus(true);
    createAlarm();
}

const handleOnStop = () =>{
    console.log("On stop in  background")
    setRunningStatus(false)
    stopAlarm();
}


//Running status setup
const setRunningStatus = (isRunning) =>{
    chrome.storage.local.set({isRunning})
}

//Alarm creation
const createAlarm = () =>{
    console.log("Alarm creation");
    //checking if the alarm is exist if exist we will not create any new alarm or we will create
    chrome.alarms.get(ALARM_JOB_NAME,isExist=>{
        if(!isExist){
        chrome.alarms.create(ALARM_JOB_NAME,
            {periodInMinutes: 1.0}
        )
        }
    })
    
}

// Stop alarm
const stopAlarm = () =>{
    console.log("Alarm stopped")
    chrome.alarms.clearAll();
}

//Triggering the alarm on a specific time
chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log('alarm called');
});