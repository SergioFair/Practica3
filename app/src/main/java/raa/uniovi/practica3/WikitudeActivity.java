package raa.uniovi.practica3;

import android.Manifest;
import android.app.Activity;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;

import java.io.IOException;

public class WikitudeActivity extends Activity {

    private String key = "KwWUaRJOus03Oubdus7Wrrh4C9l+sHkfRiiKG0KJ8VSSkyFmwthHeQVvvk4Rv99fgxTZMutCpnhj3q2fb2STJsWBPO7GzBL4tylA61QHTQV6ewUO5QumW5rLmEhsW6EsFT5so4at+xw65RJGsyAzsuTwKRoRvmU++tsyNYvb7mFTYWx0ZWRfXyxsk+l6cdtFIZkdfQwgBmN2dAVarIIEZgvYoW1+A9UeUgDN317jgZVwx1VPuFLsc5C/fBFRuJNiYt/bzoFvVbvQKb3e1LuxinA63/JsXLQoolQYpHGy6q0hVo8Aa7TAioxS3rO8ZnS1JDqIHwNsxT8HoDCGDZS8TK813P8zSFhZa82NMVghg8kT66TaOzAD9wKrIi7WItm6Ht8wu4BkmbbKaX7GKlt1EK4FCzfDg+5oa/BSwNpd/jGHR/Bzeq35kN2n+EUSDihxD0ho3OqPzIJtsIOKa1kV7rO6fDNII3foP0yxo5NkhdRbMoPCgBbe9nub+uxA52Iov06dKtNnDx8UXGhuLugKyGC5DeEOLXlO4RvZ/n41b8Lxb91OnNvtyXYIaPZHbQLNPoQnabRgQ4tWO2fuLczxwaw3cSflYB9ZQMoeKTlroF4OKi+UeMfzCP7iyF1s92w7Wq3dzezDYA1AczIyekrm1mXLAjJdOOE4hzYlLHNTn20=";
    protected ArchitectView architectView;
    protected ArchitectStartupConfiguration config;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_wikitude);
        architectView = findViewById(R.id.architectView);
        config = new ArchitectStartupConfiguration();
        config.setLicenseKey(key);
        this.architectView.onCreate(config);
    }

    @Override
    protected void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        if(this.architectView != null){
            architectView.onPostCreate();
        }
        try{
            this.architectView.load("practica3/index.html");
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE
                            , Manifest.permission.ACCESS_COARSE_LOCATION
                            , Manifest.permission.ACCESS_FINE_LOCATION
                            , Manifest.permission.ACCESS_NETWORK_STATE
                            , Manifest.permission.ACCESS_WIFI_STATE
                            , Manifest.permission.BLUETOOTH
                            , Manifest.permission.CAMERA
                            , Manifest.permission.INTERNET},
                    1);
        } catch(IOException e){
            e.printStackTrace();
        }
        super.onPostCreate(savedInstanceState);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        if(this.architectView != null){
            this.architectView.onLowMemory();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if(this.architectView != null){
            this.architectView.onPause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(this.architectView != null){
            this.architectView.onDestroy();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(this.architectView != null){
            this.architectView.onResume();
        }
    }
}
