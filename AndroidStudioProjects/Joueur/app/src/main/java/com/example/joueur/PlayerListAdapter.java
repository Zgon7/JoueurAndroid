package com.example.joueur;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class PlayerListAdapter extends BaseAdapter {

    private Context context;
    private  int layout;
    private ArrayList<Player> playersList;

    public PlayerListAdapter(Context context, int layout, ArrayList<Player> playersList) {
        this.context = context;
        this.layout = layout;
        this.playersList = playersList;
    }

    @Override
    public int getCount() {
        return playersList.size();
    }

    @Override
    public Object getItem(int position) {
        return playersList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    private class ViewHolder{
        ImageView imageView;
        TextView fName, lName;
    }

    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {

        View row = view;
        ViewHolder holder = new ViewHolder();

        if(row == null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            row = inflater.inflate(layout, null);

            holder.fName = row.findViewById(R.id.fName);
            holder.lName = row.findViewById(R.id.lName);
            holder.imageView = (ImageView) row.findViewById(R.id.image);
            row.setTag(holder);
        }
        else {
            holder = (ViewHolder) row.getTag();
        }

        Player player = playersList.get(position);

            holder.fName.setText(player.getFname());
            holder.lName.setText(player.getLname());


        byte[] playerImage = player.getImage();
        Bitmap bitmap = BitmapFactory.decodeByteArray(playerImage, 0, playerImage.length);
        holder.imageView.setImageBitmap(bitmap);

        return row;
    }
}
