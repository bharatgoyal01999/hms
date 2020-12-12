import GoogleFit , { Scopes} from 'react-native-google-fit';

const GoogleApiClientId = "311096852390-hrc5n7d8k8h0es8f7h5ljtjnvgpmhh5b.apps.googleusercontent.com";



export async function isAuthorized  () {
  console.log(Scopes)
  var options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
  
    ]
  }
  try{
    await   GoogleFit.authorize(options)
        .then(authResult => {
          console.log(authResult)
          if (authResult.success) {
            console.log("AUTH_SUCCESS");
           
  
          } else {
            console.log("AUTH_DENIED", authResult.message);
          }
        })
        .catch(() => {
          dispatch("AUTH_ERROR");
        })}
        catch{(err)=>{console.log("err is", err)}}
    
}

export function getStepsForAndroid(startDate, endDate) {
  const options = {
      startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
      endDate: new Date(endDate).toISOString() // required ISO8601Timestamp
  };
  return GoogleFit.getDailyStepCountSamples(options)
}

export function getWeightForAndroid(startDate, endDate) {
  const opt = {
    unit: "kg", // required; default 'kg'
    startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
    ascending: false // optional; default false
  };
  return GoogleFit.getWeightSamples(opt)
}

export function getHeightForAndroid(startDate, endDate) {
  const opt = {
    startDate: new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  };
  return GoogleFit.getHeightSamples(opt)
}

export function saveWeight(){
  const opt = {
    value: 200,
    date: new Date().toISOString(),
    unit: "pound"
  };
   
  GoogleFit.saveWeight(opt, (err, res) => {
    if (err) throw "Cant save data to the Google Fit";
  });
}

export function getHeartRate(startDate, endDate){
  const options = {
    startDate:new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  }
  const callback = ((error, response) => {
    console.log(error, response)
  });
   
   return GoogleFit.getHeartRateSamples(options, callback)
   
}

export function getBloodPressure(startDate, endDate){
  const options = {
    startDate:new Date(startDate).toISOString(), // required ISO8601Timestamp
    endDate: new Date(endDate).toISOString(),
  }
  const callback = ((error, response) => {
    console.log(error, response)
  });
   
   GoogleFit.getBloodPressureSamples(options, callback)
}
