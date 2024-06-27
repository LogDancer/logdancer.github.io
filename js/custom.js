// 处理 .jp-InputArea-prompt 元素
const jpInputPrompt = document.querySelectorAll('.jp-InputArea-prompt');
jpInputPrompt.forEach(function (element) {
    element.textContent = element.textContent.replace(/\s+/g, '');
});

const jpOutputArea = document.querySelectorAll('.jp-OutputArea-output');
jpOutputArea.forEach(function (container) {
    const preElement = container.querySelector('pre');
    // 设置 pre 的样式，距离顶部 20 px
    preElement.style.marginTop = '30px';
    // 双击隐藏
    preElement.title = "双击隐藏";

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.innerHTML = `
            <div style="margin-top: 10px;">
                <span class="notice" hidden>Copied!</span>
                <svg t="1719016259565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1515" width="16" height="16"><path d="M943.4112 454.7072c-14.1312 0-25.6 11.4688-25.6 25.6v101.3248c0 64.9728-32.6144 124.416-84.6336 159.744 0.8704-8.448 1.3312-16.896 1.3312-25.4464V437.2992c0-134.7072-109.568-244.2752-244.2752-244.2752H311.6032c-8.3456 0-16.6912 0.4096-24.9856 1.28a193.05984 193.05984 0 0 1 159.5392-84.3776h278.6816c106.4448 0 193.0752 86.5792 193.0752 193.0752 0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6c0-134.656-109.568-244.2752-244.2752-244.2752H446.1056c-89.5488 0-171.776 48.9472-214.6304 127.6928a41.69216 41.69216 0 0 0-5.0688 21.4528c-94.8736 28.5184-164.1984 116.6336-164.1984 220.672v306.3808c0 127.0272 103.3728 230.4 230.4 230.4h306.3808c101.6832 0 188.1088-66.2016 218.624-157.7984 91.0848-37.4272 151.4496-126.5152 151.4496-225.8944V480.3072c-0.0512-14.1312-11.52-25.6-25.6512-25.6z m-344.4224 459.4176H292.608c-98.816 0-179.2-80.384-179.2-179.2V428.544c0-98.816 80.384-179.2 179.2-179.2h306.3808c98.816 0 179.2 80.384 179.2 179.2v306.3808c0 15.3088-1.9456 30.1056-5.5296 44.288l-0.1536 0.4608c-0.4096 1.1264-0.7168 2.2528-0.9216 3.3792-21.1456 75.52-90.4704 131.072-172.5952 131.072z" fill="#ea9518" p-id="1516"></path><path d="M943.4112 359.7312c-14.1312 0-25.6 11.4688-25.6 25.6v17.92c0 14.1312 11.4688 25.6 25.6 25.6s25.6-11.4688 25.6-25.6v-17.92c0-14.1824-11.4688-25.6-25.6-25.6z" fill="#ea9518" p-id="1517"></path></svg>
            </div>
            `;
    copyButton.title = '复制';

    // 复制按钮点击事件

    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(preElement.textContent).then(function () {
            // 清掉 span 中的 hidden 属性，并与 2 秒钟后自动添加
            spanElem = copyButton.querySelector('span');
            spanElem.removeAttribute('hidden');
            setTimeout(() => {
                spanElem.setAttribute('hidden', '');
            }, 2000);
        }, function (err) {
            alert('复制失败: ', err);
        });
    });

    // 创建折叠按钮
    const collapseButton = document.createElement('button');
    // 折叠图标
    collapseSvg = `
            <svg t="1719016177388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11846" width="16" height="16"><path d="M894.233 607.982c16.51 0 29.893 13.383 29.893 29.893 0 16.274-13.004 29.51-29.187 29.885l-0.706 0.008H692.044l250.2 250.201c11.675 11.674 11.675 30.601 0 42.275-11.488 11.49-30.002 11.672-41.714 0.548l-0.56-0.548-250.204-250.203 0.002 201.164c0 16.273-13.004 29.51-29.187 29.885l-0.706 0.008c-16.274 0-29.51-13.004-29.885-29.188l-0.008-0.705V607.982h304.251z m-459.564 0v303.763c0 16.51-13.384 29.893-29.893 29.893-16.274 0-29.51-13.004-29.885-29.187l-0.009-0.706-0.001-204.956-241.819 242.84c-11.65 11.698-30.577 11.738-42.275 0.089-11.513-11.465-11.735-29.978-0.635-41.713l0.546-0.562 238.665-239.675H130.086c-16.274 0-29.51-13.004-29.885-29.187l-0.008-0.706c0-16.274 13.004-29.51 29.187-29.885l0.706-0.008h304.583z m507.53-513.27c11.514 11.464 11.735 29.977 0.636 41.712l-0.546 0.562-245.485 246.52h197.24c16.274 0 29.51 13.005 29.885 29.189l0.008 0.705c0 16.274-13.004 29.51-29.187 29.885l-0.706 0.008H589.982V138.888c0-16.51 13.383-29.893 29.893-29.893 16.274 0 29.51 13.004 29.885 29.187l0.008 0.706-0.003 207.127L899.925 94.8c11.649-11.699 30.576-11.738 42.275-0.089z m-824.301-1.033l0.572 0.53 0.56 0.547 255.817 255.816 0.002-211.684c0-16.274 13.004-29.51 29.188-29.885l0.705-0.008c16.274 0 29.51 13.004 29.885 29.187l0.008 0.706v303.893h-304.55c-16.509 0-29.892-13.384-29.892-29.893 0-16.274 13.004-29.51 29.187-29.885l0.706-0.008 192.632-0.002L76.756 137.031c-11.675-11.674-11.675-30.601 0-42.275 11.303-11.304 29.406-11.663 41.142-1.077z" fill="#ea9518" p-id="11847"></path></svg>
            `;
    // 展开图标
    expandSvg = `
                <svg t="1719015804831" class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9430" width="16" height="16"><path d="M858.112 65.664 545.664 65.664c-17.664 0-32 14.336-32 32s14.336 32 32 32l242.752 0L521.024 397.12c-12.032 12.032-12.032 31.36 0 43.392 11.968 11.968 31.36 11.968 43.328 0l269.376-269.376 0 246.592c0 17.664 14.336 32 32 32s32-14.336 32-32l0-320C897.664 76.352 878.016 65.664 858.112 65.664zM105.216 897.664l312.512 0c17.664 0 32-14.336 32-32s-14.336-32-32-32L174.912 833.664l267.456-267.456C454.4 554.24 454.4 534.848 442.368 522.88c-11.968-11.968-31.36-11.968-43.328 0l-269.376 269.376L129.664 545.664c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 320C65.664 888 81.344 897.664 105.216 897.664z" p-id="9431" fill="#ea9518"></path></svg>
            `;
    collapseButton.className = "collapse-button";
    collapseButton.innerHTML = collapseSvg;
    collapseButton.title = '折叠';
    // 设置折叠按钮的样式，距离顶部 -5 px
    // collapseButton.style.fontSize = '25px';

    const originalContent = preElement.innerHTML;
    const placeholder = document.createElement('span');
    placeholder.innerHTML = "<span style='color: gray; font-style: italic; cursor: pointer;'>输出已折叠,单击显示...</span>";

    // 折叠按钮点击事件
    collapseButton.addEventListener('click', function () {
        if (preElement.dataset.hidden !== "true") {
            preElement.dataset.originalContent = preElement.innerHTML;
            preElement.innerHTML = "";
            preElement.appendChild(placeholder);
            preElement.dataset.hidden = "true";
            preElement.setAttribute('title', '');
            collapseButton.innerHTML = expandSvg; // 切换为展开图标
            collapseButton.title = '展开';
        } else {
            preElement.innerHTML = preElement.dataset.originalContent;
            preElement.dataset.hidden = "false";
            collapseButton.innerHTML = collapseSvg; // 切换为折叠图标
            collapseButton.title = '折叠';
        }
    });

    // 添加单击事件
    placeholder.addEventListener('click', function () {
        if (preElement.dataset.hidden === "true") {
            preElement.innerHTML = preElement.dataset.originalContent;
            preElement.dataset.hidden = "false";
            collapseButton.innerHTML = collapseSvg; // 切换为折叠图标
            collapseButton.title = '折叠';
        }
    });

    // 添加双击隐藏
    preElement.addEventListener('dblclick', function () {
        if (preElement.dataset.hidden !== "true") {
            preElement.dataset.originalContent = preElement.innerHTML;
            preElement.innerHTML = "";
            preElement.appendChild(placeholder);
            preElement.dataset.hidden = "true";
            preElement.setAttribute('title', '');
            collapseButton.innerHTML = expandSvg; // 切换为展开图标
            collapseButton.title = '展开';
        } else {
            preElement.innerHTML = preElement.dataset.originalContent;
            preElement.dataset.hidden = "false";
            collapseButton.innerHTML = collapseSvg; // 切换为折叠图标
            collapseButton.title = '折叠';
        }
    });

    // Initial state
    preElement.dataset.hidden = "false";

    // 将按钮添加到按钮容器中
    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(collapseButton);

    // 将按钮容器添加到 pre 的父容器中
    container.appendChild(buttonContainer);
});
// 删除所有 .jp-Collapser 元素
const jpCollapsers = document.querySelectorAll('.jp-Collapser');
jpCollapsers.forEach(function (element) {
    element.remove();
});