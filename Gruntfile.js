module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 压缩JS代码 
        uglify: {
            options: {
                mangle: {
                    except: ['require']
                },
                compress: {
                    drop_console: true //删除全部console信息
                }
            },
            compressJs: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist'
                }]
            }
        },
        // 压缩css代码 
        cssmin: {
            options: {
                process: function (content, srcpath) {
                    console.log(content);
                    return content.replace(/[sad ]/g, '_');
                }
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.css',
                    dest: 'dist'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true, //清除HTML注释
                    collapseWhitespace: true, //压缩HTML
                    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
                    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                    minifyJS: true, //压缩页面JS
                    minifyCSS: true //压缩页面CSS
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.tpl',
                    dest: 'dist'
                }]
            }
        },

        // 清理字符
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{html,htm,eot,ttf,woff}'],
                        dest: 'dist'
                    }
                ]
            },
            image: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.{png,jpg,jpeg,gif,webp,svg,ico}'],
                        dest: 'dist'
                    }
                ]
            },
            // 替换css内部图片地址
            fixCss: {
                expand: true,
                cwd: 'dist',
                src: '**/*.css',
                dest: 'dist',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/\/src\//g, '/dist/');
                    }
                }
            },
            fixJs: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js'],
                dest: 'dist',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/purchase\/src\/purchase/g, 'purchase/dist/purchase');
                    }
                }
            },
            fixJs2: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js'],
                dest: 'dist',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/cabin\/lib\/vue\/vue.js/g, 'cabin/lib/vue/vue.min.js');
                    }
                }
            }
        },

        // 清空文件
        clean: {
            all: 'dist/*'
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-license');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('build', [
        'clean',
        'copy:html',
        'copy:image',
        // 压缩js
        'uglify',
        // 压缩css
        'cssmin',
        'htmlmin',
        'copy:fixCss'
    ]);

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['build']);

};
