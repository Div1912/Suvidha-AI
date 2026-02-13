package com.suvidhai.accessibility;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.Notification;
import android.content.Intent;
import android.os.Bundle;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Suvidha AI - Truth Lens Accessibility Service
 * 
 * Monitors notifications from gig platforms (Swiggy, Zomato, Uber, Ola)
 * Parses order details and sends to React Native for analysis
 */
public class TruthLensService extends AccessibilityService {
    
    private static final String TAG = "TruthLensService";
    private static final String EVENT_NAME = "TruthLensNotification";
    
    // Supported platform package names
    private static final String[] GIG_PACKAGES = {
        "in.swiggy.android",
        "com.application.zomato",
        "com.ubercab.driver",
        "com.olacabs.customer"
    };
    
    private static ReactContext reactContext;
    private NotificationParser notificationParser;
    
    public static void setReactContext(ReactContext context) {
        reactContext = context;
    }
    
    @Override
    public void onCreate() {
        super.onCreate();
        notificationParser = new NotificationParser();
        Log.d(TAG, "TruthLens Service created");
    }
    
    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        
        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        info.eventTypes = AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED;
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.notificationTimeout = 100;
        info.packageNames = GIG_PACKAGES;
        
        setServiceInfo(info);
        Log.d(TAG, "TruthLens Service connected");
    }
    
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (event == null || event.getEventType() != AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED) {
            return;
        }
        
        String packageName = event.getPackageName() != null ? event.getPackageName().toString() : "";
        
        // Only process gig platform notifications
        if (!isGigPlatformPackage(packageName)) {
            return;
        }
        
        CharSequence text = event.getText() != null && !event.getText().isEmpty() 
            ? event.getText().get(0) 
            : null;
            
        if (text == null) {
            return;
        }
        
        String notificationText = text.toString();
        Log.d(TAG, "Gig notification received from: " + packageName);
        
        // Parse notification
        WritableMap parsedData = notificationParser.parse(packageName, notificationText);
        
        if (parsedData != null) {
            sendToReactNative(parsedData);
        }
    }
    
    private boolean isGigPlatformPackage(String packageName) {
        for (String gigPackage : GIG_PACKAGES) {
            if (packageName.contains(gigPackage) || gigPackage.contains(packageName)) {
                return true;
            }
        }
        return false;
    }
    
    private void sendToReactNative(WritableMap data) {
        if (reactContext != null && reactContext.hasActiveCatalystInstance()) {
            try {
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(EVENT_NAME, data);
                Log.d(TAG, "Notification sent to React Native");
            } catch (Exception e) {
                Log.e(TAG, "Error sending to React Native: " + e.getMessage());
            }
        }
    }
    
    @Override
    public void onInterrupt() {
        Log.d(TAG, "TruthLens Service interrupted");
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "TruthLens Service destroyed");
    }
}
