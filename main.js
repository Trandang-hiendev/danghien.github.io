const roleCode = document.querySelectorAll(".cir");
const audio = document.querySelector(".audio");
const updateRoles = () => {
    const roleCodeLength = roleCode.length;
    for (let i = 0; i < roleCodeLength; i++) {
        const indexNum = i % 4;
        roleCode[i].classList.add(`active${indexNum}`);
    }
};
const currentHour = new Date().getHours();
const night = document.querySelector("#night");
const thingKing = document.querySelector(".youThingKing");
let userData = null;
const proflieDefaut = "1114889680484315206";
let response;
const songLink = document.querySelector(".songlink");
const songImg = document.querySelector("#songimg");
const songName = document.querySelector("#songname");
const singer = document.querySelector("#singer");
const album = document.querySelector("#album");
const blackPink = document.querySelector("#blackpink");
const listeningtoSpotify = document.querySelector(".playagames");
const allowedArtists = ["BLACKPINK", "JENNIE", "ROSÉ", "LISA", "JISOO"];
const vng = document.querySelector(".vng");
const gobalName = document.querySelector("#gobalname");
const displayName = document.querySelector("#displayname");
const userAvt = document.querySelector("#userAvt");
const statusElement = document.querySelector("#statusimg");
updateRoles();
const isDayTime = () => {
    return currentHour >= 7 && currentHour < 19;
};
const updateTheme = () => {
    const isDay = isDayTime();
    night.disabled = isDay;
};
updateTheme();
setInterval(updateTheme, 300000);
thingKing.innerHTML = "chào bạn mình là Hiển frontend Developer ";
const fetchData = async () => {
    try {
        response = await fetch(`https://api.lanyard.rest/v1/users/${proflieDefaut}`);
        const data = await response.json();
        userData = data;
        updateStatus();
        getAvtUser();
        getCaption();
        spotify();
        getAName();
        updateTheme();
    } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
    }
};
const spotify = () => {
    if (!userData || !userData.data || !userData.data.spotify) {
        listeningtoSpotify.style.display = "none";
        blackPink.disabled = true;
        return;
    }
    listeningtoSpotify.style.display = "block";
    const spotifyData = userData.data.spotify;
    songName.innerHTML = `${spotifyData.song}`;
    songImg.setAttribute("src", `${spotifyData.album_art_url}`);
    singer.innerHTML = `by ${spotifyData.artist}`;
    songLink.setAttribute("href", `https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
    if (allowedArtists.includes(spotifyData.artist)) {
        blackPink.disabled = false;
    } else {
        blackPink.disabled = true;
    }
    album.innerHTML = `On ${spotifyData.album}`;
};
const displayVngRole = () => {
    if (proflieDefaut !== "1114889680484315206") {
        vng.style.display = "none";
    } else {
        vng.style.display = "flex";
    }
};
displayVngRole();
const getAName = () => {
    if (userData && userData.data && userData.data.discord_user) {
        const user = userData.data.discord_user;
        gobalName.innerHTML = user.global_name;
        displayName.innerHTML = user.display_name;
    }
};
const getCaption = () => {
    const captionElement = document.querySelector("#caption");
    if (userData && userData.data && userData.data.spotify == null) {
        if (userData && userData.data && userData.data.activities && userData.data.activities.length > 0) {
            const activity = userData.data.activities[0];
            let customIcon = "";
            if (activity.emoji && activity.emoji.name) {
                customIcon = activity.emoji.name;
            }
            captionElement.innerHTML = `${customIcon} ${activity.state}`;
        } else {
            captionElement.innerHTML = "";
        }
    } else {
        if (userData && userData.data && userData.data.activities && userData.data.activities.length > 0) {
            const activity = userData.data.activities[0];
            let customIcon = "";
            if (activity.emoji && activity.emoji.name) {
                customIcon = activity.emoji.name;
            }
            captionElement.innerHTML = `${customIcon} ${activity.state}`;
        } else {
            captionElement.innerHTML = "";
        }
    }
};
const updateStatus = () => {
    const statusList = {
        mobile: {
            offline: "./svg/offline-mobile.svg",
            online: "./svg/online-mobile.svg",
            idle: "./svg/idle-mobile.svg",
            dnd: "./svg/dnd-mobile.svg",
        },
        desktop: {
            offline: "./svg/offline.svg",
            online: "./svg/online.svg",
            idle: "./svg/idle.svg",
            dnd: "./svg/dnd.svg",
            streeming: "./svg/streaming.svg",
        },
    };
    const isMobileActive = userData.data.active_on_discord_mobile == true;
    const isDesktopActive = userData.data.active_on_discord_desktop == true || userData.data.active_on_discord_mobile == true;
    if (isMobileActive) {
        statusElement.setAttribute("src", statusList.mobile[userData.data.discord_status]);
    } else if (isDesktopActive) {
        statusElement.setAttribute("src", statusList.desktop[userData.data.discord_status]);
    } else {
        statusElement.setAttribute("src", "./svg/offline.svg");
    }
};
const getAvtUser = () => {
    userAvt.setAttribute("src", `https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}?size=1024`);
};
const warning = () => {
    console.log(" %c DỪNG LẠI !!!!", "font-size: 50px; color: red;");
    console.log("thằng nào đồn ác bảo mày nhập cái của nợ gì vào đây để hack trang của chị mày à ??  bới ảo đi em");
    console.log("%c dán mã bậy bạ vào đây có ngày pay  fb hay mấy cái acc game rồi lại đi chữi tk dev :)),", "color:red");
    console.log("nếu không biết mình đang làm gì thì làm ơn tắt cái tab console đi ba ");
};
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
warning();
setInterval(fetchData, 3000);
window.onload = fetchData;
const gif = document.querySelector(".ilovevng").addEventListener("click", () => {
    song.play();
});
const song = document.querySelector(".song");