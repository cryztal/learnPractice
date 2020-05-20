#Task6 количества постов каждого пользователя, написанных 1 марта;
select user.name, u.count from user 
left join 
(select user.id, user.name, post.created_at as my_date, count(*) as count from post
inner join user
on post.user_id = user.id
where DATE(post.created_at) = '2020-03-01'
group by name) as u
on u.id = user.id;