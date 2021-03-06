package com.cryztal.items;


import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Tweet {
    @SerializedName("id")
    private Integer id;
    @SerializedName("description")
    private String description;
    @SerializedName("createdAt")
    private String createdAt;
    @SerializedName("author")
    private String author;
    @SerializedName("photoLink")
    private String photoLink;
    @SerializedName("HashTags")
    private List<String> hashTags;
    @SerializedName("likes")
    private List<String> likes;

    public Integer getId() {
        return id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public Tweet(int id, String description, String Date, String author, String photoLink, List<String> hashTags, List<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = Date;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.likes = likes;
    }

    public Tweet(int id, String description, String Date, String author, String photoLink) {
        this.id = id;
        this.description = description;
        this.createdAt = Date;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = new ArrayList<>();
        this.likes = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Tweet{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", author='" + author + '\'' +
                ", photoLink='" + photoLink + '\'' +
                ", hashTags=" + hashTags +
                ", likes=" + likes +
                '}';
    }
}
