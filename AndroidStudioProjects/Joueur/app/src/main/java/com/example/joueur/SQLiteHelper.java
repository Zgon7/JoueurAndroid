package com.example.joueur;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class SQLiteHelper extends SQLiteOpenHelper {

    public SQLiteHelper(Context context) {
        super(context, "playerDB.sqlite", null, 1);
        this.query("Create table if not exists playertest(firstname varchar, lastname varchar, age varchar, sport varchar, image blob)");
    }

    public void query(String sql)
    {
        SQLiteDatabase db = getReadableDatabase();
        db.execSQL(sql);
    }

    public void insertPlayer(Player player)
    {
        SQLiteDatabase db = getWritableDatabase();
        String sql = "Insert into playertest values (?, ?, ?, ?, ?)";
        db.execSQL(sql, new Object[] {player.getFname(), player.getLname(), player.getAge(), player.getSport(), player.getImage()});
    }

    public Cursor getPlayers(String sql)
    {
        SQLiteDatabase db = getWritableDatabase();
        return  db.rawQuery(sql, null);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}