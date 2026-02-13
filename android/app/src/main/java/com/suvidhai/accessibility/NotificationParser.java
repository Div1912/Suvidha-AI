package com.suvidhai.accessibility;

import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Suvidha AI - Notification Parser
 * Extracts order details from gig platform notifications
 */
public class NotificationParser {
    
    private static final String TAG = "NotificationParser";
    
    // Regex patterns for extracting order details
    private static final Pattern AMOUNT_PATTERN = Pattern.compile("₹\\s*(\\d+(?:,\\d+)*(?:\\.\\d{1,2})?)");
    private static final Pattern DISTANCE_PATTERN = Pattern.compile("(\\d+(?:\\.\\d+)?)\\s*(?:km|KM|Km)");
    private static final Pattern TIME_PATTERN = Pattern.compile("(\\d+)\\s*(?:min|mins|minutes|MIN)");
    
    public NotificationParser() {}
    
    public WritableMap parse(String packageName, String notificationText) {
        if (notificationText == null || notificationText.isEmpty()) {
            return null;
        }
        
        WritableMap result = Arguments.createMap();
        
        // Determine platform
        String platform = getPlatformFromPackage(packageName);
        result.putString("platform", platform);
        result.putString("rawText", notificationText);
        result.putDouble("timestamp", System.currentTimeMillis());
        
        // Extract amount
        Double amount = extractAmount(notificationText);
        if (amount != null) {
            result.putDouble("platformOffer", amount);
        }
        
        // Extract distance
        Double distance = extractDistance(notificationText);
        if (distance != null) {
            result.putDouble("distance", distance);
        }
        
        // Extract time
        Integer time = extractTime(notificationText);
        if (time != null) {
            result.putInt("estimatedTime", time);
        }
        
        // Check if we have enough data for analysis
        boolean hasEnoughData = amount != null && (distance != null || time != null);
        result.putBoolean("canAnalyze", hasEnoughData);
        
        Log.d(TAG, "Parsed notification: " + result.toString());
        
        return result;
    }
    
    private String getPlatformFromPackage(String packageName) {
        if (packageName.contains("swiggy")) return "swiggy";
        if (packageName.contains("zomato")) return "zomato";
        if (packageName.contains("uber")) return "uber";
        if (packageName.contains("ola")) return "ola";
        return "other";
    }
    
    private Double extractAmount(String text) {
        try {
            Matcher matcher = AMOUNT_PATTERN.matcher(text);
            if (matcher.find()) {
                String amountStr = matcher.group(1).replace(",", "");
                return Double.parseDouble(amountStr);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error extracting amount: " + e.getMessage());
        }
        return null;
    }
    
    private Double extractDistance(String text) {
        try {
            Matcher matcher = DISTANCE_PATTERN.matcher(text);
            if (matcher.find()) {
                return Double.parseDouble(matcher.group(1));
            }
        } catch (Exception e) {
            Log.e(TAG, "Error extracting distance: " + e.getMessage());
        }
        return null;
    }
    
    private Integer extractTime(String text) {
        try {
            Matcher matcher = TIME_PATTERN.matcher(text);
            if (matcher.find()) {
                return Integer.parseInt(matcher.group(1));
            }
        } catch (Exception e) {
            Log.e(TAG, "Error extracting time: " + e.getMessage());
        }
        return null;
    }
}
