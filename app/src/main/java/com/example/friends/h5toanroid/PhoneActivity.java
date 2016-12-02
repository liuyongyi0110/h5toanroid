package com.example.friends.h5toanroid;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;


public class PhoneActivity extends Activity {
    private WebView wvVideo;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);

        wvVideo = (WebView) findViewById(R.id.wv_video);

        wvVideo.getSettings().setJavaScriptEnabled(true);

        wvVideo.setWebChromeClient(new WebChromeClient());

        //添加js调用类
        wvVideo.addJavascriptInterface(new JsInterface(),"Android");

        wvVideo.loadUrl("file:///android_asset/JSCallJavaPhoneActivity.htm");

    }


    /**
     * JavaScript调用Android的方法类
     */
    class JsInterface{

        /**
         * 被js调用，用于加载联系人数据源
         */
        @JavascriptInterface
        public void showcontacts(){

            Log.e("线程",Thread.currentThread()+"");
            //这里要在主线程执行哦
            wvVideo.post(new Runnable() {
                @Override
                public void run() {
                    String json = "[{\"name\":\"天平\", \"phone\":\"18600012345\"}]";
                    // 调用JS中的方法
                    wvVideo.loadUrl("javascript:showInfo('" + json + "')");
                }
            });

        }

        /**
         * js调用，拨打电话
         * @param phone 手机号码
         */
        @JavascriptInterface
        public void call(String phone) {
            Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phone));
//            if (ActivityCompat.checkSelfPermission(PhoneActivity.this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
//                return;
//            }
            startActivity(intent);

        }
    }


}
