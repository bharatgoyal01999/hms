import GoogleFit , { Scopes } from 'react-native-google-fit';

const GoogleApiClientId = "311096852390-hrc5n7d8k8h0es8f7h5ljtjnvgpmhh5b.apps.googleusercontent.com";

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_READ_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_READ_WRITE,
  ],
}

isAuthorized = () => {
    
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            dispatch("AUTH_SUCCESS");
            // Call when authorized
            GoogleFit.startRecording((callback) => {
            // Process data from Google Fit Recording API (no google fit app needed)
          });
  
          } else {
            dispatch("AUTH_DENIED", authResult.message);
          }
        })
        .catch(() => {
          dispatch("AUTH_ERROR");
        })
    
}

function getStepsForAndroid(startDate, endDate) {
  const options = {
      startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
      endDate: new Date(endDate).toISOString() // required ISO8601Timestamp
  };
  return GoogleFit.getDailyStepCountSamples(options)
}

function getWeightForAndroid(startDate, endDate) {
  const opt = {
    unit: "kg", // required; default 'kg'
    startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
    ascending: false // optional; default false
  };
  return GoogleFit.getWeightSamples(opt)
}

function getHeightForAndroid(startDate, endDate) {
  const opt = {
    startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  };
  return GoogleFit.getHeightSamples(opt)
}

function saveWeight(){
  const opt = {
    value: 200,
    date: new Date().toISOString(),
    unit: "pound"
  };
   
  GoogleFit.saveWeight(opt, (err, res) => {
    if (err) throw "Cant save data to the Google Fit";
  });
}

function getHeartRate(startDate, endDate){
  const options = {
    startDate:new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  }
  const callback = ((error, response) => {
    console.log(error, response)
  });
   
   return GoogleFit.getHeartRateSamples(options, callback)
   
}

function getBloodPressure(startDate, endDate){
  const options = {
    startDate:new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  }
  const callback = ((error, response) => {
    console.log(error, response)
  });
   
   GoogleFit.getBloodPressureSamples(options, callback)
}
