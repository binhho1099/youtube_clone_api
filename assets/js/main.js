let api_key = "AIzaSyBaGov3PIyNPMVYfz5Q94Uj22cAMvTEWFg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'VN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err))

const getChannelIcon = (videoData) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: videoData.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            videoData.channelThmbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(videoData)
        })
}
const video = document.querySelector('.row')
const makeVideoCard = (data) => {
    video.innerHTML += `
        <div class="video col l-3 ">
            <a href="https://youtube.com/watch?v=${data.id}">
                <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
                <div class="video-content">
                    <div class="video-avatar">
                        <img title="${data.snippet.channelTitle}" src="${data.channelThmbnail}" alt="">
                    </div>
                    <div class="video-info">
                        <h3 class="video-tittle">
                            ${data.snippet.title}
                        </h3>
                        <h4 class="video-author" title="${data.snippet.channelTitle}">
                            ${data.snippet.channelTitle}
                        </h4>
                        <h5 class="video-time">
                            <span>
                                6 N
                            </span>
                            lượt xem
                            <span>.</span>
                            <span>${data.snippet.publishedAt}</span>
                            
                        </h5>
                    </div>
                </div>
            </a>
        </div>
    `
}