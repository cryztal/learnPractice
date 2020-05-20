'use strict';

class ItemPost {
    set photoLink(value) {
        this._photoLink = value;
    }

    set likes(value) {
        this._likes = value;
    }

    set description(value) {
        this._description = value;
    }

    set hashTags(value) {
        this._hashTags = value;
    }

    get description() {
        return this._description;
    }

    get createdAt() {
        return this._createdAt;
    }

    get author() {
        return this._author;
    }

    get photoLink() {
        return this._photoLink;
    }

    get likes() {
        return this._likes;
    }

    get hashTags() {
        return this._hashTags;
    }

    get id() {
        return this._id;
    }

    static cid = -1;

    getCid() {
        ItemPost.cid += 1;
        return ItemPost.cid;
    }

    constructor({id, description, createdAt, author, photoLink = '', likes = [], hashTags = []}) {
        if (ItemPost.validatePostId({'id': id})) {
            this._id = id; //this.getCid();
        }
        if (ItemPost.validateDescription({'description': description})) {
            this._description = description;
        }
        if (ItemPost.validatePostCreatedAt({'createdAt': createdAt})) {
            this._createdAt = createdAt;
        }
        if (ItemPost.validateAuthor({'author': author})) {
            this._author = author;
        }
        if (ItemPost.validatePhotoLink({'photoLink': photoLink})) {
            this._photoLink = photoLink;
        }
        if (ItemPost.validateLikes({'likes': likes})) {
            this._likes = likes;
        }
        if (ItemPost.validateHashTags({'hashTags': hashTags})) {
            this._hashTags = hashTags;
        }
    }

    static validatePostId(post) {
        return typeof post.id === 'string';
    }

    static validatePostCreatedAt(post) {
        return typeof post.createdAt === 'object';

    }

    static validateDescription(post) {
        return typeof post.description === 'string';

    }

    static validateAuthor(post) {
        return typeof post.author === 'string';

    }

    static validateLikes(post) {
        return typeof post.likes === 'object';
    }

    static validateHashTags(post) {
        if (typeof post.hashTags !== 'object') {
            //console.log("Invalid field hashTags!");
            return false;
        } else {
            for (let i of post.hashTags) {
                if (typeof i !== 'string') {
                    return false;
                }
            }
        }
        return true;
    }

    static validatePhotoLink(post) {
        return typeof post.photoLink === 'string';

    }

    static validatePost(post) {
        return (ItemPost.validatePostId(post) && ItemPost.validatePostCreatedAt(post) && ItemPost.validateDescription(post) && ItemPost.validateAuthor(post) && this.validatePhotoLink(post));
        //return (ItemPost.#validatePostCreatedAt(post) && ItemPost.#validateDescription(post) && ItemPost.#validateAuthor(post) && this.#validatePhotoLink(post));
    }

    editPost(editingPost) {
        let flag = false;
        if (ItemPost.validateDescription(editingPost)) {
            this.description = editingPost.description;
            flag = true;
        }
        if (ItemPost.validatePhotoLink(editingPost)) {
            this.photoLink = editingPost.photoLink;
            flag = true;
        }
        if (ItemPost.validateHashTags(editingPost)) {
            this.hashTags = editingPost.hashTags;
            flag = true;
        }

        if (ItemPost.validateLikes(editingPost)) {
            this.likes = editingPost.likes;
            flag = true;
        }
        return flag;
    }

}

class Posts {
    constructor(posts) {
        this.posts = [];
        if (posts.length > 0) {
            this.addAll(posts);
        }
    }

    edit(id, post) {
        //let index = this.posts.findIndex((post) => post.id === id);
        let editablePost = this.get(id);
        //console.log(this.get(id));
        if (editablePost !== false) {
            //  console.log(editablePost);
            return editablePost.editPost(post);
        }
        return editablePost;
        /*if (index !== -1) {
            let buffPost = this.get(index);
            buffPost.edit(post);
            return true;
        }
        return false;*/
    }

    add(addingPost) {
        let post = new ItemPost(addingPost);
        let res = ItemPost.validatePost(post);
        if (res) {
            this.posts.push(post);
        }
        return res;
    }

    addAll(posts) {
        let res;
        let notValidPost = [];
        for (let item of posts) {
            res = this.add(item);
            if (!res) {
                notValidPost.push(item);
            }
        }
        return notValidPost;
    }

    remove(id) {
        let index = this.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        //console.log("post is not finded");
        return false;
    }

    get(id) {
        let index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) {
            console.log("post not finded");
            return false;
        }
        return this.posts[index];
    }

    getPage(skip, top, filterConfig) {
        let resultPosts = this.posts;
        resultPosts = resultPosts.slice(skip, skip + top);
        resultPosts.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });
        if (filterConfig === undefined) {
            return resultPosts;
        }
        if (ItemPost.validateAuthor(filterConfig)) {
            resultPosts = this.posts.filter(item => item.author === filterConfig.author);
        }
        if (ItemPost.validatePostCreatedAt(filterConfig)) {
            resultPosts = resultPosts.filter(item => item.createdAt === filterConfig.createdAt);
        }
        if (ItemPost.validateHashTags(filterConfig)) {
            resultPosts = resultPosts.filter(function (item) {
                let flag = true;
                for (let i of filterConfig.hashTags) {
                    if (!item.hashTags.includes(i)) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            });
        }
        return resultPosts;
    }

    sayHi() {
        console.log("All systems are started");
    }
}

let templatePosts = [

    {

        id: '1',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },

    {

        id: '2',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Петров Петр',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },
    {

        id: '3',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Семенов Семен',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },
    {

        id: '4',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['nothing']


    },
    {

        id: '5',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'somePhoto.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['else']


    },
    {

        id: '6',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Семенов Семен',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['matter']


    },
    {

        id: '7',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Петров Петр',

        photoLink: 'somePhoto.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },
    {

        id: '8',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },
    {

        id: '9',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']


    },
    {

        id: '10',

        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'Иванов Иван',

        photoLink: 'somePhoto.jpg',

        likes: ['author', 'someone', 'else'],

        hashTags: ['hash', 'is', 'good']

    },
    {

        id: '11',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '12',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '13',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '14',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '15',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '16',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '17',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '18',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '19',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    },
    {

        id: '20',

        description: 'test',

        createdAt: new Date('2020-05-01T22:00:00'),

        author: 'test',

        photoLink: 'test.jpg',

        likes: ['test'],

        hashTags: ['testHash']

    }


];
let postsClass = new Posts(templatePosts);
console.log("check post validation\nvalid:");
console.log(ItemPost.validatePost(postsClass.get('1')));
console.log("invalid:");
console.log(ItemPost.validatePost(1));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");

console.log('checking getPost');
console.log("valid:")
console.log(postsClass.get('1'));
console.log("invalid:");
console.log(postsClass.get('0'));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");

console.log("checking adding post");
console.log("valid:")
console.log(postsClass.add({
    'id': '25',
    'author': 'auth',
    'description': "description",
    'createdAt': new Date('2020-05-01T22:00:00')
}));
console.log("invalid:")
console.log(postsClass.add({'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven'}));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");

console.log("checking editing post");
console.log("valid:");
console.log(postsClass.get('25'));
console.log(postsClass.edit('25', {description: 'hello'}));
console.log(postsClass.get('25'));
console.log("invalid:")
console.log(postsClass.get('1'));
console.log(postsClass.edit('1', {author: 'Mr. Snow'}));
console.log(postsClass.get('1'));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");

console.log("checking removing post");
console.log("valid:");
console.log(postsClass.get('25'));
console.log(postsClass.remove('25'));
console.log(postsClass.get('25'));
console.log("invalid:")
console.log(postsClass.get('0'));
console.log(postsClass.remove('0'));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");

console.log("checking getPosts");
console.log("valid:");
console.log(postsClass.getPage(0, 10, {author: 'Иванов Иван'}));
console.log('second');
console.log(postsClass.getPage(3, 10, {hashTags: ['good']}));
console.log('third');
console.log(postsClass.getPage(5, 10));
console.log("invalid:")
console.log(postsClass.getPage(0, 10, {author: 'Васильев Василий'}));
console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
