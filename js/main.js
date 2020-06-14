/*
    1、歌曲搜索接口
    请求地址：https://autumnfish.cn/search
    请求方法：get
    请求参数：keywords(查询关键字)
    响应内容：歌曲搜索结果

    2、歌曲url获取接口
    请求地址：https://autumnfish.cn/song/url
    请求方法：get
    请求参数：id(查询关键字)
    响应内容：歌曲url地址

    3、歌曲url获取接口
    请求地址：https://autumnfish.cn/song/detail
    请求方法：get
    请求参数：ids(歌曲id)
    响应内容：歌曲详情，包括封面信息

    4、热门评论获取
    请求地址：https://autumnfish.cn/comment/hot?type=0
    请求方法：get
    请求参数：id(歌曲id)
    响应内容：歌曲的热门评论

    5、mv地址获取
    请求地址：https://autumnfish.cn/mv/url
    请求方法：get
    请求参数：id(mvid,为0表示没有)
    响应内容：mv的地址
*/

var app = new Vue({
    el: "#app",
    data: {
        //查询关键字
        query: "",
        //歌曲数组
        musicList: [],
        //歌曲地址
        musicUrl: "",
        //歌曲封面
        musicCover: "./img/none.png",
        //歌曲评论
        hotComments: [],
        //动画播放状态
        isPlaying: false,
        //遮罩层的显示状态
        isShow: false,
        //MV地址
        mvUrl: ""
    },
    methods: {
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (response) {
                    that.musicList = response.data.result.songs;
                }, function (err) {
                    console.log(err)
                });
        },

        palyMusic: function (musicId) {
            var that = this;
            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.data[0].url;
                }, function (err) {
                    console.log(err)
                });
            //获取歌曲详情图片
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function (err) {
                    console.log(err)
                });
            //获取评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    that.hotComments = response.data.hotComments;
                }, function (err) {
                    console.log(err)
                });
        },
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        },
        playMV: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (response) {
                    document.getElementsByClassName("myaudio")[0].pause();
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }, function (err) {
                    console.log(err);
                });
        },
        hide: function () {
            this.isShow = false;
            this.mvUrl = "";
        }
    }
});