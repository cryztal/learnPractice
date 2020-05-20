package com.cryztal.servlets;

import com.cryztal.items.TweetCollection;
import com.cryztal.service.ITweetCollection;
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
    ITweetCollection tweetCollection = TweetCollection.getInstance();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        int offset = 0;
        int count = 10;
        try {
            offset = Integer.parseInt(req.getParameter("offset"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            count = Integer.parseInt(req.getParameter("count"));
        } catch (
                Exception e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        out.println(gson.toJson(tweetCollection.getPage(offset, count)));
        resp.setContentType("application/json");
    }
}

