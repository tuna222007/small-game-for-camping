const colors = ['#2c3e50', '#e74c3c', '#1a1a1a', '#07ceba '];
const listGift = [
    {
        name: 'upsize',
        percent: 65 / 100,
        image: './assets/img/upsize.jpg',
    },
    {
        name: 'discount',
        percent: 25 / 100,
        image: './assets/img/discount.jpg',
    },
    {
        name: 'jackpot',
        percent: 5 / 100,
        image: './assets/img/jackpot.jpg',
    },
    {
        name: 'missed',
        percent: 5 / 100,
        image: './assets/img/missed.png',
    },
];
(() => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.wheel');
    const btnSpin = $('.spin-btn');
    let timer = 7000; // Thời gian cho mỗi lần quay
    let isRotating = false; // Đang quay hay không?
    let currentRotate = 0;
    const giftSize = listGift.length;
    const rotate = 360 / giftSize;
    const skewY = 90 - rotate; // Độ nghiêng của 1 item
    const renderGift = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');
            itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
            itemGift.innerHTML = `
                <p class="text-item" style="
                    background-color: ${colors[index % colors.length]};
                    transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                ">
                    <b>${item.name}</b>
                </p>
                <img class="wheel-img" src="${item.image}"
                    style="
                        left: ${rotate / 4}px;
                        bottom: ${rotate / 2}px;
                        transform: skewY(${skewY}deg)
                    " />
            `;
            wheel.appendChild(itemGift);
        })
    }
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    }
    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list = [];
        listGift.forEach((item, index) => {
            currentPercent += item.percent;
            randomNumber <= currentPercent && list.push({
                ...item, index
            });
        });
        return list[0];
    }
    const showGift = (gift) => {
        setTimeout(() => {
            isRotating = false;
            Swal.fire({
                title: 'Chúc mừng bạn đã trúng',
                imageUrl: gift.image.replace(/(\.[^.]+)$/, 'full$1'),
                imageHeight: 350
            })
        }, timer);
    }
    const spinner = () => {
        isRotating = true;
        const gift = getGift(Math.random());
        currentRotate += 360 * 10;
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    }
    btnSpin.addEventListener('click', () => {
        !isRotating && spinner();
    });
    renderGift();
})();
function resize() {
    var width = $(window).width();
    document.documentElement.style.setProperty('--size', width > 600 ? "500px" : (width / 1.1 - 32) + "px");
}
resize();