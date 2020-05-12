package com.cryztal.servlets;

import com.cryztal.items.TweetCollection;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/tweets/search")
public class PageServlet extends HttpServlet {
    TweetCollection tweetCollection = TweetCollection.getInstance();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.println(TweetCollection.getInstance().toString());
        resp.setContentType("application/json");
    }
}

