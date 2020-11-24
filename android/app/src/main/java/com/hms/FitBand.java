package com.hms;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

// import com.example.ycblesdkdemo.model.ConnectEvent;
import com.yucheng.ycbtsdk.AITools;
import com.yucheng.ycbtsdk.Response.BleConnectResponse;
import com.yucheng.ycbtsdk.Response.BleScanResponse;
import com.yucheng.ycbtsdk.Constants;
import com.yucheng.ycbtsdk.YCBTClient;
import com.yucheng.ycbtsdk.Response.BleDataResponse;
import com.yucheng.ycbtsdk.Response.BleRealDataResponse;
import java.util.HashMap;

public class FitBand extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    public FitBand (ReactApplicationContext reactContext) {
        
        super(reactContext); 
        this.reactContext=reactContext;
        //required by React Native
        
    }
    // private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";

    // private static final String DURATION_SHORT_KEY = "SHORT";
    // private static final String DURATION_LONG_KEY = "LONG";

   
    
    @Override
    
    public String getName() {
        return "FitBand";
    }

    

    @ReactMethod
    public void sayHi(Callback errorCallback, Callback successCallback) {
        try {
            System.out.println("Greetings from Java");
            YCBTClient.initClient(this.reactContext,true);
            successCallback.invoke("YCBTClient");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
   
    @ReactMethod
    public void CheckConnectionState(Callback errorCallback, Callback successCallback){
        try {

            
            // successCallback.invoke("Callback : Greetings from Java");
          int bleState=YCBTClient.connectState();
          if (bleState == Constants.BLEState.Connected){ //connected success
                    successCallback.invoke("Device is connected");
          }
          else{
            successCallback.invoke("Device is Not-connected");
          }
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }


    @ReactMethod 
    public void StartLiveScanning(Callback errorCallback, Callback ondataresponse , Callback hashMap ){

       AITools aiTools = new AITools();
                aiTools.Init();

                YCBTClient.appEcgTestStart(new BleDataResponse() {
                    @Override
                    public void onDataResponse(int code, float ratio, HashMap resultMap) {
                                ondataresponse.invoke(code);
                    }
                }, new BleRealDataResponse() {
                    @Override
                    public void onRealDataResponse(int dataType, HashMap dataMap) {
                            hashMap.invoke(dataMap);
                    }
                });

}}
