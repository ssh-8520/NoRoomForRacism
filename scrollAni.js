let windowwidth;
let windowheight;

let scrollY = 0;
let relativeScrollY = 0;
let totalScrollHeight = 0;
let currentScene = 0;
let calAnimationVal = 0;

let prevDurations = 0;
let pixelDuration = 0;

let animationKeyframes = [
    { //textBox1
        animationVal:{
            opacity:[1, 0],
            textBox:[0, -300]
        }
    },
    { //bg1
        animationVal:{
            opacity:[1, 0],
            imgBox:[0, -1920]
        }
    },
    { //bg2
        animationVal:{
            opacity:[1, 0],
            imgBox:[0, 1920]
        }
    },
    { //textBox2
        animationVal:{
            opacity:[1, 0],
            textBox:[0, 300]
        }
    },
    { //video in
        animationVal:{
            opacity:[0, 1]
        }
    },
    { //video
        animationVal:{
            time:[0, 3]
        }
    }
]

let elemBody = document.body;

function init()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    render();
    resizeHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
}

function scrollHandler()
{
    scrollY = window.pageYOffset;

    if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight))
    {
        return;
    }

    if(scrollY > pixelDuration + prevDurations)
    {
        prevDurations += pixelDuration;
        currentScene++;
    }
    else if(scrollY < prevDurations)
    {
        currentScene--;
        prevDurations -= pixelDuration;
    }

    relativeScrollY = scrollY - prevDurations;

    render(currentScene);
}

function resizeHandler() //애니메이션 프레임 수를 조정한다.
{
    windowwidth = window.innerWidth;
    windowheight = window.innerHeight;

    totalScrollHeight = 0;
    pixelDuration = windowheight * 0.5;

    for(let i = 0; i < animationKeyframes.length; i++)
    {
        totalScrollHeight += pixelDuration;
    }
    totalScrollHeight += windowHeight;

    elemBody.style.height = totalScrollHeight + 'px';
}

function render(nowState)
{
    let targetElem = document.querySelectorAll('.container');

    switch(nowState)
    {
        case 0:{
            let opacityVal, moveValA, moveValB, moveValC, moveValD;
            let scrollAniElem = targetElem[0].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[0].animationVal.opacity);
            moveValA = calcAni(animationKeyframes[0].animationVal.textBox);
            moveValB = calcAni(animationKeyframes[1].animationVal.imgBox);
            moveValC = calcAni(animationKeyframes[2].animationVal.imgBox);
            moveValD = calcAni(animationKeyframes[3].animationVal.textBox);
            scrollAniElem[0].style.opacity = opacityVal;
            scrollAniElem[1].style.opacity = opacityVal;
            scrollAniElem[2].style.opacity = opacityVal;
            scrollAniElem[3].style.opacity = opacityVal;
            scrollAniElem[0].style.transform = 'translateY(' + moveValA + 'px)';
            scrollAniElem[1].style.transform = 'translateX(' + moveValB + 'px)';
            scrollAniElem[2].style.transform = 'translateX(' + moveValC + 'px)';
            scrollAniElem[3].style.transform = 'translateY(' + moveValD + 'px)';
        }break;
        case 1:{
            let opacityVal;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            opacityVal = calcAni(animationKeyframes[4].animationVal.opacity);
            scrollAniElem[0].style.opacity = opacityVal;
        }break;
        case 2:{
            let timeVal;
            let scrollAniElem = targetElem[1].querySelectorAll('.sa');
            timeVal = calcAni(animationKeyframes[5].animationVal.time);

            let myVideo = document.querySelector('#myVideo');
            myVideo.currentTime = timeVal;
        }break;
    }
}

function calcAni(value)
{
    return(relativeScrollY / pixelDuration) * (value[1] - value[0]) + value[0];
}

init();