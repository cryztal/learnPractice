#insert into post(user_id, description,photo_link) values(1,'post1','photo1.jpg');
#insert into post(user_id, description,photo_link) values(1,'post2','photo2.jpg');
#insert into post(user_id, description,photo_link) values(1,'post3','photo3.jpg');
#insert into post(user_id, description,photo_link) values(1,'post4','photo4.jpg');

#Task8 имен пользователей, опубликовавших более 3-х постов сегодня. 
select name from 
(select name, day(created_at), count(*) as count from post
inner join user
on user.id = post.user_id
where day(created_at) = day(now()) 
group by name) as t1
where t1.count>3;