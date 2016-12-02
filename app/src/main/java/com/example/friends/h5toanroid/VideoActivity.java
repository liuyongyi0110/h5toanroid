package com.example.friends.h5toanroid;


import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

public class VideoActivity extends Activity {
    private WebView wvVideo;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);

        wvVideo = (WebView) findViewById(R.id.wv_video);

        wvVideo.getSettings().setJavaScriptEnabled(true);

        wvVideo.setWebChromeClient(new WebChromeClient());

        //js通过android这个字段调用JsInterface 里面的代码
        wvVideo.addJavascriptInterface(new JsInterface(), "android");

        wvVideo.loadUrl("file:///android_asset/JSCallJavaVideoActivity.htm");

    }


    class JsInterface {
        /**
         * 将会被js调用
         * JavascriptInterface 兼容高api
         *
         * @param id    视频id
         * @param path  视频路径
         * @param title 视频标题
         */
        @JavascriptInterface
        public void playVideo(int id, String path, String title) {

            if (!TextUtils.isEmpty(path)) {
                Toast.makeText(VideoActivity.this, path, Toast.LENGTH_SHORT).show();
                //调用播放器，注意这里调用系统自带播放器将会播放失败
                Intent intent = new Intent();
                intent.setDataAndType(Uri.parse(path), "video/*");
                startActivity(intent);
            } else {
                Toast.makeText(VideoActivity.this, "视频链接为空!", Toast.LENGTH_SHORT).show();
            }
        }
    }


}
