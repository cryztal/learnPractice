package com.practice.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/get")
public class PageGet extends HttpServlet {
    //private static String index = "index.jsp";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nameValue = request.getParameter("name");
        if (nameValue != null) {
            PrintWriter out = response.getWriter();
            out.println("Name is " + nameValue);
        }
        response.setContentType("text/html;charset=utf-8");
    }
}
