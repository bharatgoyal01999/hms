import GoogleFit , { Scopes } from 'react-native-google-fit';

isAuthorized = () => {

    const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ_WRITE,
          Scopes.FITNESS_BODY_READ_WRITE,
        ],
      }
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



