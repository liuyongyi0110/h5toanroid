package com.example.friends.h5toanroid;

import android.app.Activity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;


public class LoginActivity extends Activity implements View.OnClickListener{


    private EditText etUserName;
    private EditText etUserPass;
    private Button btLogin;
    WebView webView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etUserName = (EditText) findViewById(R.id.et_user_name);
        etUserPass = (EditText) findViewById(R.id.et_user_pass);
        btLogin = (Button) findViewById(R.id.bt_login);

        btLogin.setOnClickListener(this);
        initWebView();
    }


    @Override
    public void onClick(View view) {
        if(view == btLogin){  //登录
            login();
        }
    }


    private void login(){
        String name = etUserName.getText().toString().trim();
        String pass = etUserPass.getText().toString().trim();
        if(TextUtils.isEmpty(name) || TextUtils.isEmpty(pass)){
            Toast.makeText(LoginActivity.this, "用户名或密码为空!", Toast.LENGTH_SHORT).show();
            return;
        }

        login(name,pass);


    }

    /**
     * 初始化网页
     */
    private void initWebView(){
        webView = new WebView(this);
        //设置支持js
        webView.getSettings().setJavaScriptEnabled(true);

        //不调用浏览器
        //webView.setWebViewClient(new WebViewClient());
        //支持alert
        webView.setWebChromeClient(new WebChromeClient());

        //添加js调用接口类，通过Android这个字段 调用这个类的方法
        webView.addJavascriptInterface(new JsInterface(),"Android");

        //加载网页
//        webView.loadUrl("http://192.168.2.198:8080/uu_show/view/activity/cardetail.html");
        webView.loadUrl("file:///android_asset/JavaAndJavaScriptCall.html");

    }


    /**
     * 调用网页的javaScript 方法代码
     * @param name 用户名
     * @param pass 密码
     */
    private void login(String name,String pass){
        webView.loadUrl("javascript:javaCallJsLogin("+"'"+name+"'"+","+"'"+pass+"')");
        //以后js通过Android这个字段调用这个JsInt
        setContentView(webView);
    }


    class JsInterface{
        /**
         * 将会被js调用
         * JavascriptInterface 兼容高api
         */
        @JavascriptInterface
        public void showToast(String str){
            Toast.makeText(LoginActivity.this, str, Toast.LENGTH_SHORT).show();
        }
    }

}
