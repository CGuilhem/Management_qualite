pipeline {
    agent any

    stages {

        stage('Code Analysis') {
            steps {
                withSonarQubeEnv(installationName: 'SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Success...'
            echo 'Send status Success to Mail, Telegram, Slack...'
        }
        failure {
            echo 'Failure...'
            echo 'Send status Failure to Mail, Telegram, Slack...'
        }
    }

}