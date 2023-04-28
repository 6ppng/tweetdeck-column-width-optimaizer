// 最小幅 [px]
const MIN_WIDTH = 320;

// マージン [px]
const MARGIN = 2;

// スタイルシート
const stylesheet = document.querySelector('style').sheet;

// いい感じのカラム幅を計算する
const calWidth = async () => {
    console.log('calWidth called');

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // 表示可能エリアの幅
    let areaWdth = document.querySelector(".app-content")?.offsetWidth
    if (!areaWdth) {
        console.log('calWidth return ', null);
        return;
    }

    // const drawerWidth = document.querySelector("body > div.application.js-app.is-condensed.hide-detail-view-inline > div.js-app-content.app-content.is-open > div:nth-child(1) > div > div > div > div > div")?.offsetWidth || 0;
    // areaWdth -= drawerWidth;

    // 表示する列数
    const numColumn = Math.floor(areaWdth / MIN_WIDTH);
    const result = numColumn <= 0 ? areaWdth - MARGIN : areaWdth / numColumn - MARGIN;
    
    console.log('calWidth return ', result);
    return result
}

// スタイルをよしなにする
const fitColumn = async() => {
    console.log('fitColumn called');

    // 既存のカラムのスタイルを削除する
    if (stylesheet.cssRules.length > 0) {
        const targetIndex = Object.entries(stylesheet.cssRules).find(([, css]) => css.selectorText === 'section.column')?.[0]
        if (targetIndex !== undefined) stylesheet.deleteRule(targetIndex);
    }

    // ルール追加
    const width = await calWidth()
    if (width !== null) stylesheet.insertRule(`section.column { width: ${width}px !important; margin-right: ${MARGIN}px !important;}`);

    console.log('fitColumn return');
};

// DeepLの拡張機能のクソみたいな位置をどうにかする
const setDeeplStyle = () => {
    console.log('setDeeplStyle called');
    const styleLink = document.getElementsByClassName('icon-container');
    console.log(styleLink);
    console.log('setDeeplStyle return');
}

// ツイート作成ドロワーオープンイベントに処理を登録する
const addEventToDrawerOpen = () => {
    console.log('addEventToDrawerOpen called');

    const newTweetOpenButton = document.querySelector("body > div.application.js-app.is-condensed > header > div > button");
    if (newTweetOpenButton) {
        newTweetOpenButton.addEventListener('click', fitColumn);
        newTweetOpenButton.addEventListener('click', setDeeplStyle);
        window.removeEventListener('mousemove', addEventToDrawerOpen);
        window.removeEventListener('keydown', addEventToDrawerOpen);
    }

    console.log('addEventToDrawerOpen return');
}

// ツイート作成ドロワークローズイベントに処理を登録する
const addEventToDrawerClose = () => {
    console.log('addEventToDrawerClose called');

    const newTweetCloseButton = document.querySelector("body > div.application.js-app.is-condensed.hide-detail-view-inline > header > div > div.js-compose-controls.attach-compose-buttons > button");
    if (newTweetCloseButton) {
        newTweetCloseButton.addEventListener('click', fitColumn);
        window.removeEventListener('mousemove', addEventToDrawerClose);
        window.removeEventListener('keydown', addEventToDrawerClose);
    }

    console.log('addEventToDrawerClose return');
}

window.addEventListener('load', async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    fitColumn();
})
window.addEventListener('resize', fitColumn);

// window.addEventListener('mousemove', addEventToDrawerOpen);
// window.addEventListener('mousemove', addEventToDrawerClose);
// window.addEventListener('keydown', addEventToDrawerOpen);
// window.addEventListener('keydown', addEventToDrawerClose);
