const locationIdElem = document.getElementById("locationId");
const startDateElem = document.getElementById("startDate");
const endDateElem = document.getElementById("endDate");
const startButtonElem = document.getElementById("startButton");
const stopButtonElem = document.getElementById("stopButton");
const runningElem = document.getElementById("running");
const stoppedElem = document.getElementById("stopped");
const locationIdErrorElem = document.getElementById("loacationIdError");
const startDateError = document.getElementById("startDateError");
const endDateError = document.getElementById("endDateError");

const hideElem = (elem) => {
  elem.style.display = "none";
};

const showElem = (elem) => {
  elem.style.display = "";
};

const disableElem = (elem) => {
  elem.disabled = true;
};

const enabledElem = (elem) => {
  elem.disabled = false;
};

const handleOnStartState = () => {
  // Status span
  showElem(runningElem);
  hideElem(stoppedElem);

  // Button
  disableElem(startButtonElem);
  enabledElem(stopButtonElem);

  //Disable Inputs
  disableElem(locationIdElem)
  disableElem(startDateElem)
  disableElem(endDateElem)
};

const handleOnStopState = () => {
  //Status span
  showElem(stoppedElem);
  hideElem(runningElem);

  //Button
  disableElem(stopButtonElem);
  enabledElem(startButtonElem);
};

const perforOnStartValidation = () => {
  if (!locationIdElem.value) {
    showElem(locationIdErrorElem);
  } else {
    hideElem(locationIdErrorElem);
  }

  if (!startDateElem.value) {
    showElem(startDateError);
  } else {
    hideElem(startDateError);
  }

  if (!endDateElem.value) {
    showElem(endDateError);
  } else {
    hideElem(endDateError);
  }

  return locationIdElem.value && startDateElem.value && endDateElem.value

};

startButtonElem.onclick = () => {
  const allFieldIsValid = perforOnStartValidation();
  if (allFieldIsValid) {
    handleOnStartState();
    const prefs = {
      locationId: locationIdElem.value,
      startDate: startDateElem.value,
      endDate: endDateElem.value,
    };
    chrome.runtime.sendMessage({ event: "onStart", prefs });
  }
};
stopButtonElem.onclick = () => {
  handleOnStopState();
  chrome.runtime.sendMessage({ event: "onStop" });
  const endDate = endDateElem.value;
};

chrome.storage.local.get(
  ["loactionId", "startDate", "endDate", "isRunning"],
  (results) => {
    const { locationId, startDate, endDate, isRunning } = results;
    console.log(results);
    if (locationId) {
      locationIdElem.value = locationId;
    }
    if (startDate) {
      startDateElem.value = startDate;
    }
    if (endDate) {
      endDateElem.value = endDate;
    }

    if (isRunning) {
      handleOnStartState();
    } else {
      handleOnStopState();
    }
  }
);
