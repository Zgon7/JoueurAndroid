package com.example.joueur;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import android.view.View;
import android.widget.AdapterView;

import android.widget.ListView;

import android.widget.Toast;


import java.util.ArrayList;

public class PlayerList extends AppCompatActivity {


    ListView gridView;
    ArrayList<Player> list;
    PlayerListAdapter adapter = null;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player_list);

        gridView = findViewById(R.id.list);
        list = new ArrayList<>();
        adapter = new PlayerListAdapter(this, R.layout.item, list);
        gridView.setAdapter(adapter);

        // get all players from sqlite
        Cursor cursor = MainActivity.sQLiteHelper.getPlayers("SELECT * FROM playertest");
        list.clear();
        while (cursor.moveToNext()) {
            String fname = cursor.getString(0);
            String lname = cursor.getString(1);
            String age = cursor.getString(2);
            String sport = cursor.getString(3);
            byte[] image = cursor.getBlob(4);

            list.add(new Player(fname, lname, age, sport, image));
        }
        adapter.notifyDataSetChanged();

       gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
           @Override
           public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
               Player item = (Player) gridView.getItemAtPosition(position);
               Intent intent = new Intent(PlayerList.this, infos.class);
               intent.putExtra("player", item);
               startActivityForResult(intent, 2);

           }
       });

    }








    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        if(requestCode == 888){
            if(grantResults.length >0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, 1);
            }
            else {
                Toast.makeText(getApplicationContext(), "You don't have permission to access file location!", Toast.LENGTH_SHORT).show();
            }
            return;
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }



}



