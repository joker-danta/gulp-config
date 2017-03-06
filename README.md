# gulp-config
这是自己常用的gulp的一个配置信息，包含scss,less编译,保存自动刷新等功能

# 包含功能如下:
# 1.less,scss编译
# 2.babel编译es6，同时会生成两个文件夹一个是降级后没有压缩的js的代码，还有一个是降级后压缩的js代码
# 3.保存刷新，本地会启动3333端口，如要需要自己修改端口请在gulpfile.js的最后修改端口

# npm install 或者cnpm install之后，运行命令gulp 即可在本地打开3333的端口，src是源文件，dist是编译过后的文件。
# 打开localhost:3333/dist/index.html即可
