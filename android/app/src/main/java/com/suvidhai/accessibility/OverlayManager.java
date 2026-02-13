package com.suvidhai.accessibility;

import android.content.Context;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;
import android.util.Log;

/**
 * Suvidha AI - Overlay Manager
 * Manages SYSTEM_ALERT_WINDOW overlay for Truth Lens analysis display
 */
public class OverlayManager {
    
    private static final String TAG = "OverlayManager";
    
    private Context context;
    private WindowManager windowManager;
    private View overlayView;
    private boolean isShowing = false;
    
    public OverlayManager(Context context) {
        this.context = context;
        this.windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
    }
    
    public boolean canDrawOverlay() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(context);
        }
        return true;
    }
    
    public void requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + context.getPackageName())
            );
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        }
    }
    
    public void showOverlay(String verdict, String amount, String netEarnings, String reason) {
        if (!canDrawOverlay()) {
            Log.e(TAG, "Cannot draw overlay - permission not granted");
            return;
        }
        
        if (isShowing) {
            hideOverlay();
        }
        
        try {
            WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.O 
                    ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                    : WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT
            );
            
            params.gravity = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
            params.y = 100;
            
            // In production, inflate from XML layout
            // For now, create a simple text view
            TextView textView = new TextView(context);
            textView.setText(String.format(
                "[%s] ₹%s → Net: %s\n%s",
                verdict.toUpperCase(),
                amount,
                netEarnings,
                reason
            ));
            textView.setPadding(32, 16, 32, 16);
            textView.setBackgroundColor(0xE0242424);
            textView.setTextColor(0xFFFFFFFF);
            
            overlayView = textView;
            windowManager.addView(overlayView, params);
            isShowing = true;
            
            // Auto-hide after 10 seconds
            overlayView.postDelayed(this::hideOverlay, 10000);
            
            Log.d(TAG, "Overlay shown");
        } catch (Exception e) {
            Log.e(TAG, "Error showing overlay: " + e.getMessage());
        }
    }
    
    public void hideOverlay() {
        if (overlayView != null && isShowing) {
            try {
                windowManager.removeView(overlayView);
                overlayView = null;
                isShowing = false;
                Log.d(TAG, "Overlay hidden");
            } catch (Exception e) {
                Log.e(TAG, "Error hiding overlay: " + e.getMessage());
            }
        }
    }
    
    public boolean isOverlayShowing() {
        return isShowing;
    }
}
