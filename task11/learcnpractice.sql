#Создание всех таблиц. Не совсем понятно что имелось ввиду про поле "LIKES" в таблице "USER". 
#У меня получилась еще одна таблица "likes_users" с двумя полями в виде внешних ключей.
CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `post` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`description` varchar(255) NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`photo_link` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `likes_users` (
	`user_id` INT NOT NULL,
	`post_id` INT NOT NULL
);

CREATE TABLE `tags` (
	`id` INT(255) NOT NULL AUTO_INCREMENT,
	`post_id` INT NOT NULL,
	`description` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `post` ADD CONSTRAINT `post_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `likes_users` ADD CONSTRAINT `likes_users_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `likes_users` ADD CONSTRAINT `likes_users_fk1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`);

ALTER TABLE `tags` ADD CONSTRAINT `tags_fk0` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`);
#-------------------------------------------------------------------------------------------------------------
# Заполнение таблиц

insert into `user` (name) values ('Ivanov Ivan');
insert into `user` (name) values ('Petrov Petr');
insert into `user` (name) values ('Semenov Semen');
insert into `user` (name) values ('Sergeev Sergey');
insert into `user` (name) values ('Denisov Denis');

select * from user;
insert into post (post.user_id, post.description, post.photo_link) values (1,'post1','photo1.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (1,'post2','photo2.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (2,'post3','photo3.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (3,'post4','photo4.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (4,'post5','photo5.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (3,'post6','photo6.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (5,'post7','photo7.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (2,'post8','photo8.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (3,'post9','photo9.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (5,'post10','photo10.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (4,'post11','photo11.jpg');
insert into post (post.user_id, post.description, post.photo_link) values (4,'post12','photo12.jpg');
insert into post (post.user_id, post.description, post.photo_link, post.created_at) values (4,'post13','photo13.jpg', '2020-03-01 15:04:45');

UPDATE post
SET post.created_at = '2020-03-01 15:00:45'
WHERE post.id = 12 or post.id = 9 or post.id = 4;

insert into tags (tags.post_id, tags.description) values (1,'post1');
insert into tags (tags.post_id, tags.description) values (1,'user1');
insert into tags (tags.post_id, tags.description) values (2,'post2');
insert into tags (tags.post_id, tags.description) values (2,'user1');
insert into tags (tags.post_id, tags.description) values (3,'post3');
insert into tags (tags.post_id, tags.description) values (3,'user2');
insert into tags (tags.post_id, tags.description) values (4,'post4');
insert into tags (tags.post_id, tags.description) values (4,'user3');
insert into tags (tags.post_id, tags.description) values (5,'post5');
insert into tags (tags.post_id, tags.description) values (5,'user4');
insert into tags (tags.post_id, tags.description) values (6,'post6');
insert into tags (tags.post_id, tags.description) values (6,'user3');
insert into tags (tags.post_id, tags.description) values (7,'post7');
insert into tags (tags.post_id, tags.description) values (7,'user5');
insert into tags (tags.post_id, tags.description) values (9,'post9');
insert into tags (tags.post_id, tags.description) values (9,'user3');
insert into tags (tags.post_id, tags.description) values (10,'post10');

insert into likes_users (likes_users.user_id, likes_users.post_id) values (1,1);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (1,4);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (1,9);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (2,3);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (3,1);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (5,1);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (2,3);
insert into likes_users (likes_users.user_id, likes_users.post_id) values (4,4);



#Запросы с демонстрацией
select post.id, user.id as user_id, post.description, tags.description as hashtags, lu.user_id as user_who_likes from post
left join user
on post.user_id = user.id
left join tags
on tags.post_id = post.id
left join likes_users as lu
on lu.post_id = post.id;
select * from post;