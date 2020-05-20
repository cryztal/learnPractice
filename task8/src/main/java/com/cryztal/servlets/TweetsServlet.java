package com.cryztal.servlets;

import com.cryztal.items.Tweet;
import com.cryztal.items.TweetCollection;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet("/tweets")
public class TweetsServlet extends HttpServlet {
    TweetCollection tweetCollection = TweetCollection.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        int id = Integer.parseInt(req.getParameter("id"));
        Tweet tweet = tweetCollection.getTweet(id);
        //System.out.println("tweetCollection is " + tweetCollection);
        Gson json = new Gson();
        System.out.println("tweet is " + new Gson().toJson(tweet));
        String param;
        if (tweet != null) {
            param = tweet.toString();
        } else {
            param = "invalid id";
        }
        out.println(param);
        resp.setContentType("application/json");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        int id = Integer.parseInt(req.getParameter("id"));
        String description = req.getParameter("description");
        String author = req.getParameter("author");
        String photoLink = req.getParameter("photoLink");
        String createdAt = new Date().toString();
        Tweet tweet = new Tweet(id, description, createdAt, author, photoLink);
        String param;
        if (tweetCollection.addTweet(tweet)) {
            param = "true";
        } else {
            param = "false";
        }
        out.println(param);
        resp.setContentType("text/html;charset=utf-8");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        int id = Integer.parseInt(req.getParameter("id"));
        String param;
        if (tweetCollection.removeTweet(id))
            param = "true";
        else {
            param = "false";
        }
        out.println(param);
        resp.setContentType("text/html;charset=utf-8");
    }
}
