package com.example.joueur;


import java.io.Serializable;
import java.util.Arrays;

public class Player implements Serializable {
    private String fname, lname, age, sport;
    private byte[] image;

    public Player(String fname, String lname, String age, String sport, byte[] image) {
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.sport = sport;
        this.image = image;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return
                "fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", age='" + age + '\'' +
                ", sport='" + sport + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}

