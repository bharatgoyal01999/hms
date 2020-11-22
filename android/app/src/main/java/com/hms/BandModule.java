package com.hms;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;
import java.util.HashMap;

import com.yucheng.ycbtsdk.YCBTClient;
import com.yucheng.ycbtsdk.Response.BleDataResponse;


public class BandModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    BandModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "BandData";
    }

     YCBTClient.initClient(this,true);
     YCBTClient.connectBle("FC:E4:21:37:8B:54", new BleConnectResponse() {
        @Override
        public void onConnectResponse(int code) {

            YCBTLog.e("connectBle code " + code);
            if (code == Constants.CODE.Code_OK){

            }
            else if (code == Constants.CODE.Code_Failed){

            }
        }
    });


                @ReactMethod
                public void measure(
                Promise promise) {
                    try {
                        YCBTClient.healthHistoryData(0x0506,  new BleDataResponse(){
                            @Override

                            public void onDataResponse(int code, float ratio, HashMap resultMap) {
                            }}) //HR
                        promise.resolve(resultMap);
                    } catch (IllegalViewOperationException e) {
                        promise.reject(E_LAYOUT_ERROR, e);
                    }
                }


    //    YCBTClient.healthHistoryData(0x0508,  new BleDataResponse())  //BP
     //   YCBTClient.healthHistoryData(0x0509,  new BleDataResponse())  //oxygen and temp



}