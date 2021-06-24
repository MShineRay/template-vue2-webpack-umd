# 单元测试题模板--听力题(选择题)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 上线日志


时间|版本|上线文件|上线功能
-------|------|------|------
 |  | |



## 规范

1. **不允许**变更目录规范
2. **不允许**修改配置文件
3. 文件要放置到争取的目录

	```
	.
	├── README.md
	├── dist/
	├── package-lock.json         -- 不能删除
	├── package.json              -- 仅可改动name、version、author三个属性
	├── public/                   -- `run serve`使用<https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9> **不允许**私自修改
	│   ├── currentScript.js
	│   ├── demo.html
	│   └── index.html
	├── src                       -- 源码目录
	│   ├── App.vue               -- 组件源文件 **不允许**更改名字
	│   ├── mixin.js              -- 组件公共方法、配置 **不允许**私自修改
	│   ├── utils/                -- 工具包 **不允许**私自修改
	│   ├── assets/               -- 项目依赖的静态文件（项目中的图片默认全部内联，小于**4Kb**的静态文件不应该使用CDN）
	│   ├── components/           -- 组件目录（公共组件放置到发布到`npm`中）
	│   └── main.js 
	├── babel.config.js           -- babel配置文件 **不允许**私自修改
	└── vue.config.js             -- 配置文件 **不允许**私自修改
	```
4. 不允许使用`console.log`debug

	需要debug的代码引入`./utils/debug`模块，命名空间为`ut:`。
	
	``` js 
	const debug = require('./utils/debug')('ut:mixin');
	
	debug('[message] msg: %s, type: %s', msg, type);
	```
	
	浏览器开启debug在控制台执行后面的代码`localStorage.debug = 'ut:*'`。
	
	详细参考 debug node_modules
    chrome 浏览器 在控制台console 设置 Default levels 选择 Verbose，转成 All levels
5. 包名

	包名前缀统一为`ut`开头。中划线或者下划线命名将统一转换为驼峰。编译后的模块名为包名的驼峰形式。
	
	例如本项目`ut-sample`编译后的名字为`utSample`。可通过`window.utSample`访问。
	

## 问题

1. build entry 入口问题

    <https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/index.js#L47>
    
	源码中已经写死，要么是build模式下需要手动指定`entry`为`./src/main.js`，否则默认为`src/App.vue`

2. `demo.html`定制问题

    <https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/resolveLibConfig.js#L21>
    <https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/resolveLibConfig.js#L69>

	源码中已经写死，在非Vue文件中使用`demo-lib-js.html`作为母版。
    
3. 输出文件名问题

	<https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/commands/build/resolveLibConfig.js#L118>

	`configureWebpack.output.filename`并不会起作用，合并后会被`entryName`覆盖掉。要想指定输出文件名可以通过编译参数`--filename`设置。

4. `configureWebpack.output.library`配置重写后`demo.html`引用的`libName`不一致问题

	<https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/resolveLibConfig.js#L76>
	<https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/resolveLibConfig.js#L22>
	<https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/resolveLibConfig.js#L108>

	重写`library`后并不会影响`libName`的值，源码中编译HTML时取值始终为`libName`。
5. 支持的听力题型
  - 1102: "picture", //听声选图片 
  - 1202: "word", //听声选单词
  - 1208: "underlineWord", //听音选划线单词
  - 1402: "sentence", //听声选句子
  - 1502: "audio", //听音选音
  - 1203: "word", //看图听声选单词
6. 数据结构

  - **1102**：听声选图片
```
{
 "id": "254184",
 "uuid": "46310617-0eb9-4237-b9b1-6bd019e748cb",
 "unit_id": "772151",
 "grade": "1",
 "notice": "Listen to the audio and choose the correct answer.", //一般是英文提示
 "title": "听声选图片", //中文提示
 "content": "{\"audio\":\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"}", //题目的内容
 "section": "[\"http://a.jpg\",\"http://b.jpg\"]", //选择题的选项内容
 "answer": "http://a.jpg", //选择题标准答案
 "type": "1102", //支持的题型
 "period": "unit",
 "board": "词汇掌握",
 "points_id": "18014"
}
```

  - **1202**：听声选单词
```
{
 "id": "254184",
 "uuid": "46310617-0eb9-4237-b9b1-6bd019e748cb",
 "unit_id": "772151",
 "grade": "1",
 "notice": "Listen to the audio and choose the correct answer.", //一般是英文提示
 "title": "听声选单词", //中文提示
 "content": "{\"audio\":\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"}", //题目的内容
 "section": "[\"word\",\"world\"]", //选择题的选项内容
 "answer": "world", //选择题标准答案
 "type": "1202", //支持的题型
 "period": "unit",
 "board": "词汇掌握",
 "points_id": "18014"
}
```
  - **1208**：听声选划线单词
```
{
 "id": "254184",
 "uuid": "46310617-0eb9-4237-b9b1-6bd019e748cb",
 "unit_id": "772151",
 "grade": "1",
 "notice": "Listen to the audio and choose the correct answer.", //一般是英文提示
 "title": "听声选划线单词", //中文提示
 "content": "{\"audio\":\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"}", //题目的内容
 "section": "[\"<i>w</i>ord\",\"wo<i>r</i>ld\"]", //选择题的选项内容
 "answer": "<i>w</i>orld", //选择题标准答案
 "type": "1208", //支持的题型
 "period": "unit",
 "board": "词汇掌握",
 "points_id": "18014"
}
```
  - **1402**：听声选句子
```
{
 "id": "254184",
 "uuid": "46310617-0eb9-4237-b9b1-6bd019e748cb",
 "unit_id": "772151",
 "grade": "1",
 "notice": "Listen to the audio and choose the correct answer.", //一般是英文提示
 "title": "：听声选句子", //中文提示
 "content": "{\"audio\":\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"}", //题目的内容
 "section": "[\"hello word\",\"hello world\"]", //选择题的选项内容
 "answer": "hello world", //选择题标准答案
 "type": "1402", //支持的题型
 "period": "unit",
 "board": "词汇掌握",
 "points_id": "18014"
}
```
  - **1502**：听音选音
```
{
 "id": "254184",
 "uuid": "46310617-0eb9-4237-b9b1-6bd019e748cb",
 "unit_id": "772151",
 "grade": "1",
 "notice": "Listen to the audio and choose the correct answer.", //一般是英文提示
 "title": "听录音，选择正确答案", //中文提示
 "content": "{\"audio\":\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"}", //题目的内容
 "section": "[\"http://51talking-ccs-test.oss-cn-beijing.aliyuncs.com/bba34cee-83b1-4842-8be1-172a00562c7e.mp3\",\"http://video.51talk.com/na_web/coursereview/201712/1514542715.mp3\"]", //选择题的选项内容
 "answer": "http://51talking-ccs-test.oss-cn-beijing.aliyuncs.com/bba34cee-83b1-4842-8be1-172a00562c7e.mp3", //选择题标准答案
 "type": "1502", //支持的题型
 "period": "unit",
 "board": "词汇掌握",
 "points_id": "18014"
}
```

  - **1203**：听音选音
```
{
"id": 251832,
"uuid": "3c95540066c211eb8b94a16e391e981c",
"level_tag_id": 3,
"grade": 0,
"grade_correct": 0,
"notice": "看图听声选单词——难题",
"title": "看图听声选单词——难题，\n看图听声选单词——难题，答案A",
"title_len": 28,
"content": "{\"picture\":\"http://51talking-ccs-test.oss-cn-beijing.aliyuncs.com/70d21f8e-786c-4134-880c-afba00ce7405.jpg\",\"audio\":\"http://51talking-ccs-test.oss-cn-beijing.aliyuncs.com/41e06acf-993f-41ff-a964-eb742062baf4.mp3\"}",
"section": "[\"AAA\",\"BBB\",\"CCC\",\"DDD\"]",
"section_count": 4,
"section_maxlen": 3,
"answer": "AAA",
"answer_key": "{\"analysis_cn\":\"啊啊  啊啊  啊啊\",\"analysis_en\":\"aaaaaaa\"}",
"type": 1203,
"tag": "",
"source": "add",
"sid": 0,
"adapter": 1,
"rev_order": 1,
"ability": "reading",
"ability_tag_uuid": "3035f440ce344f057167f5c18260a7b9",
"topic_uuid": "b4ecef0cddb26a56738f467511269a5d",
"knowledge_uuid": "f12538acdee6800456cb805446852632",
"points_uuid": "96d76ee09afbd03592c4c862427e3592",
"points_attach": "",
"created_at": 1612426999104,
"updated_at": 1612510495294,
"disable": 0,
"del_flag": 0,
"board": "句子理解",
"training": "",
"service_type": "unit",
"classroom_knowledge": "啊啊1  啊啊1 啊啊1",
"video_analysis_url": "http://51talking-ccs-test.oss-cn-beijing.aliyuncs.com/503897d5-e4aa-4650-9708-978fb6c73990.mp4",
"example": "aaaaaaa",
"can_do_id": 63,
"can_do": "aaa",
"is_shadow": "0",
"shadow_question_id": "251834,251836,251835",
"difficulty_level": 2,
"difficulty_question_id": "251829"
}
```

## reference
- [ut-listen-question](http://vcs.51talk.com/ccs/ut-listen-question)
- [kg 知识图谱管理系统--题库模块](http://kg.51talk.com/questions/list)
- mode设置： test：答题模式  result：查看结果模式
- [kg 知识图谱管理系统--题库模块](http://kg.51talk.com/questions/list)
- [蓝湖-单元测试](https://lanhuapp.com/web/#/item/project/stage?pid=0108abf1-c17f-4517-aa34-1c0d5314774c)
- [组卷系统](http://console.ccs.51talk.com/)
	- 上传模板
- [上线流程等](http://vcs.51talk.com/ccs/ccs-ng/blob/feature/new-audio-upload/docs/%E4%B8%8A%E7%BA%BF%E6%B5%81%E7%A8%8B.md)
- [需求文档](https://wiki.51talk.com/pages/viewpage.action?pageId=54203620)
