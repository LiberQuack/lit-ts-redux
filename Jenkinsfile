def runContainerOn = { user = "root", dockerHost, runExtraArguments ->
    sh """ssh -R 5000:ci_registry:5000 ${user}@${dockerHost} '
            docker container rm -f ${projectName} || echo No container removal needed;
            docker run -d --restart always --name ${projectName} ${runExtraArguments} localhost:5000/${builtImageName};
          '
       """.replaceAll("\n"," ")
}

pipeline {
    agent none
    triggers { bitbucketPush() }
    options { skipDefaultCheckout() }
    stages {
        stage('checkout') {
            agent { node { label 'master' } }
            steps {
                script {
                    remote = scm.userRemoteConfigs[0]
                    checkout([$class: 'GitSCM', branches: scm.branches, userRemoteConfigs: [[refspec: '+refs/heads/*:refs/remotes/origin/*', url: remote.url, credentialsId: remote.credentialsId]]])
                }
            }
        }
        stage('post-checkout') {
            agent { node { label 'master' } }
            steps {
                script {
                    slackUsers = '@tmartins <@UA2N9DKNJ>'
                    userName = (sh(returnStdout: true, script: 'git show --no-patch --format="%an" HEAD')).trim()
                    projectName = (currentBuild?.rawBuild?.project?.parent?.displayName ?: env.JOB_NAME).replaceAll(/\/.*/, '')
                    saveBuildInfo = """printf "Build: $BUILD_DISPLAY_NAME\nDate: `date --utc +"%D %T"` UTC" > build.txt"""
                    builtImageName = "${projectName}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    cmmtsAheadDev = (sh(returnStdout: true, script: "git log origin/master ^origin/develop --no-merges --pretty=format:'%h - %s'")).trim()
                    cmmtsAheadDev && slackSend(channel: '#coddera-ci', color: '#ffbc00', message: "${slackUsers} - *${projectName} has commits in master not present in develop* \n```$cmmtsAheadDev```")
                    cmmtsBehindDev = (sh(returnStdout: true, script: "git log origin/develop ^origin/${env.BRANCH_NAME} --no-merges --pretty=format:'%h - %s'")).trim()
                    cmmtsBehindDev && slackSend(channel: '#coddera-ci', color: '#ffbc00', message: "${slackUsers} - *${projectName} has commits in develop not present in ${env.BRANCH_NAME}* \n```$cmmtsBehindDev```")
                }
            }
        }
        stage('install') {
            agent { docker { image 'node:8' } }
            steps {
                sh 'yarn install'
            }
        }
//        stage('test') {
//            agent { node { label 'master' } }
//            steps {
//                sh 'docker-compose -f docker-compose-test.yml down && docker-compose -f docker-compose-test.yml up --abort-on-container-exit --build -t 30'
//            }
//        }
//        stage('archive') {
//            agent { node { label 'master' } }
//            steps {
//                sh 'docker cp $(docker-compose -f docker-compose-test.yml ps -q chrome):/data/. ./recording'
//                archiveArtifacts "recording/**/*"
//                sh 'rm -rf recording'
//            }
//        }
        stage('docker-img') {
            agent { node { label 'master' } }
            steps { script {
                sh "docker image build -f Dockerfile.jenkins -t localhost:5000/${builtImageName} ."
                sh "docker image build -f Dockerfile.jenkins -t localhost:5000/${projectName}:latest ."
                sh "docker image push localhost:5000/${builtImageName}"
                sh "docker image push localhost:5000/${projectName}:latest"
            }}
        }
        stage('deploy-hml') {
            when { expression { env.BRANCH_NAME in ['master', 'develop'] } }
            agent { node { label 'master' } }
            steps {
                sh saveBuildInfo
                script { runContainerOn('root', 'containers.a5-solutions.local', '-p 3001:80 -e ENVIRONMENT=containers') }
                slackSend channel: '#coddera-ci', color: '#36a64f', message: "*${projectName}* deployado em *hml* ${slackUsers} / referente commit de *${userName}*"
            }
        }
//        stage('deploy-approval') {
//            when { branch "master" }
//            agent none
//            steps {
//                input "Execute production deploy?"
//            }
//        }
//        stage('deploy') {
//            when { branch "master" }
//            agent { node { label 'master' } }
//            steps {
//                sh saveBuildInfo
//                script { runContainerOn('root', 'containers.a5-solutions.local', '-p 3001:80') }
//                slackSend channel: '#coddera-ci', color: '#36a64f', message: "*${projectName}* deployado em *prd* ${slackUsers} / referente commit de *${userName}*"
//            }
//        }
    }
}
