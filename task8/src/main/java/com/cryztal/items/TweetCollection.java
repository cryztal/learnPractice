package com.cryztal.items;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class TweetCollection {
    @SerializedName("posts")
    private List<Tweet> tweets = new ArrayList<>();

    private static class TweetCollectionHolder {
        private final static TweetCollection instance = new TweetCollection();
    }

    public static TweetCollection getInstance() {
        return TweetCollectionHolder.instance;
    }


    public Tweet getTweet(Integer id) {
        for (Tweet item : tweets) {
            if (item.getId().equals(id)) {
                return item;
            }
        }
        return null;
    }

    public boolean addTweet(Tweet tweet) {
        if (validateTweet(tweet)) {
            this.tweets.add(tweet);
            return true;
        }
        return false;
    }

    public List<Tweet> addAll(List<Tweet> tweetList) {
        List<Tweet> invalid = new ArrayList<>();
        for (Tweet item : tweetList) {
            boolean res = addTweet(item);
            if (!res) {
                invalid.add(item);
            }
        }
        return invalid;
    }

    public boolean removeTweet(int id) {
        for (int i = 0; i < this.tweets.size(); i++) {
            if (this.tweets.get(i).getId() == id) {
                this.tweets.remove(i);
                return true;
            }
        }
        return false;
    }

    boolean validateTweet(Tweet tweet) {
        return tweet.getId() != null
                && tweet.getCreatedAt() != null
                && tweet.getAuthor() != null
                && tweet.getDescription() != null;
    }

    @Override
    public String toString() {
        return "TweetCollection{" +
                "tweets=" + tweets +
                '}';
    }
}