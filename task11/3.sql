#UPDATE post
#SET post.description = 'hello'
#WHERE post.id = 4 or post.id = 3 or post.id = 2;
#UPDATE post
#SET post.description = 'abrakadabrahello'
#WHERE post.id = 13 or post.id = 1 or post.id = 7;
#Task3 постов конкретного пользователя, в описании которых присутствует слово  “hello”;
select * from post
where post.user_id = 4 and post.description like '%hello%';