package com.cryztal.service;

import com.cryztal.items.Tweet;

import javax.servlet.FilterConfig;
import java.util.List;

public interface ITweetCollection {
    List<Tweet> getPage(int offset, int count, FilterConfig filters);

    List<Tweet> getPage(int offset, int count);
}
