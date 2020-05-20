#Task5 пользователей, которые имеют более 3 постов;
select name from 
(select user.name, count(*) as n from post
inner join user
on post.user_id = user.id
group by user.name having n>3) as u;
