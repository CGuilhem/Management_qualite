node {
    stage('SCM') {
        checkout scm
    }

    stage('Backend Tests') {
        nodejs('Node') {
            sh '''
                cd mq-back/mq-api
                pnpm install
                pnpm run test
            '''
        }
    }

    stage('SonarQube Analysis') {
        def scannerHome = tool 'SonarScanner';
        withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
        }
    }

    stage('Deployment') {
        script {
            sh '''
                ssh opc@129.151.227.174
                ./deploy-app
            '''
        }
    }
}