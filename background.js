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
}

const handleOnStop = () =>{
    console.log("On stop in  background")
}
