#Task4 списка уникальных имен пользователей;
#Оптимальный вариант
select * from user
group by name;

#Вариант с использованием функции агрегации
select user.name from post
inner join user
on post.user_id = user.id
group by user.name;