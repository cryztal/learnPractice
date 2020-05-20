#Task7 сколько дней назад было опубликован первый пост;
select datediff(now(),min(created_at)) as days from post;