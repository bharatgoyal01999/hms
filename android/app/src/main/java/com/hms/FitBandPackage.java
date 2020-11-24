package com.hms;


 
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yucheng.ycbtsdk.YCBTClient;
import com.hms.FitBand;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import com.yucheng.ycbtsdk.YCBTClient;
public class FitBandPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        
        return Collections.emptyList();
    }
 
    @Override
    public List<NativeModule> createNativeModules(
         ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FitBand(reactContext));
        return modules;
    }

}
