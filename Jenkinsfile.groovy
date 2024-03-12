pipeline {
    agent any
    tools {
        gradle '8.6'
    }
    stages {
        stage('准备参数') {
            steps {
                script {
                    PLATFORM = "${platform}"
                    BUILDTYPE = "${BuildType}"
                    if (BUILDTYPE == "Release") {
                        DEBUG = "false"
                    }
                }
            }
        }
        stage('开始构建') {
            steps {
                echo '项目构建...'
                dir('/Users/huangyusheng/Downloads/Cocos/') {
                    sh 'node cocosbuild.js ${platform} ${DEBUG} ${branch}'
                }
                
            }
        }
        stage('编译打包') {
            when {
                equals expected: 'android', 
                actual: PLATFORM
            }
            steps {
                sh 'echo 安卓打包...'
                dir('/Users/huangyusheng/Downloads/Cocos/cocos-awesome/build/jsb-link/frameworks/runtime-src/proj.android-studio/') {
                    sh 'gradle clean assemble${BuildType}'
                }
            }
        }
    }
}