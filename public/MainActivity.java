package com.prida.mobile; // Ganti dengan nama paket Anda

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myWebView = findViewById(R.id.webview);
        WebSettings webSettings = myWebView.getSettings();
        
        // Mengaktifkan fitur yang dibutuhkan PWA & HTML Anda
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true); // Penting untuk LocalStorage
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        myWebView.setWebViewClient(new WebViewClient());
        myWebView.setWebChromeClient(new WebChromeClient());

        // Memuat file HTML dari folder assets
        myWebView.loadUrl("file:///android_asset/index.html");
    }

    // Agar tombol 'Back' di HP tidak langsung keluar aplikasi
    @Override
    public void onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}