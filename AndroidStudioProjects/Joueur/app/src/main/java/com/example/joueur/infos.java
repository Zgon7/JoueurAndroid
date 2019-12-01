package com.example.joueur;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.ByteArrayOutputStream;

public class infos extends AppCompatActivity {

    ImageView image;
    TextView fName, lName, age, sport;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_infos);
        Player player = (Player) getIntent().getSerializableExtra("player");

        fName = findViewById(R.id.fName);
        lName = findViewById(R.id.lName);
        age = findViewById(R.id.age);
        sport = findViewById(R.id.sport);
        image = findViewById(R.id.image);

        fName.setText("First Name: "+player.getFname());
        lName.setText("Last Name: "+player.getLname());
        age.setText("Age: "+player.getAge());
        sport.setText("Sport: "+player.getSport());
        image.setImageBitmap(BitmapFactory.decodeByteArray(player.getImage(), 0, player.getImage().length));

    }
    public static byte[] imageViewToByte(ImageView image) {
        Bitmap bitmap = ((BitmapDrawable)image.getDrawable()).getBitmap();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
        byte[] byteArray = stream.toByteArray();
        return byteArray;
    }

    public void okClick(View view) {
        setResult(2);
        finish();
    }
}
