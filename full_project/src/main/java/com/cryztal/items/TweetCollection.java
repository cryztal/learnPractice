package com.cryztal.items;


import com.cryztal.service.ITweetCollection;

import javax.servlet.FilterConfig;
import java.util.ArrayList;
import java.util.List;

public class TweetCollection implements ITweetCollection {
    private List<Tweet> tweets = new ArrayList<>();

    @Override
    public List<Tweet> getPage(int offset, int count, FilterConfig filters) {
        List<Tweet> result = new ArrayList<>();
        for (int i = offset; i < count + offset && i < tweets.size(); i++)
            result.add(tweets.get(i));
        return result;
    }

    @Override
    public List<Tweet> getPage(int offset, int count) {
        return getPage(offset, count, null);
    }

    public List<Tweet> getPage(int count) {
        return getPage(0, count, null);
    }

    public List<Tweet> getPage() {
        return getPage(0, 10, null);
    }

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