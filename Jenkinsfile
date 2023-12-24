pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  environment {
    ARTIFACT_PATH = "versions/${env.BUILD_TAG}"
    registryCredential = 'ecr:us-east-1:aws-jenkins'
    appRegistry = "841173558556.dkr.ecr.us-east-1.amazonaws.com/srgrcp-cv"
    srgrcpRegistry = "https://841173558556.dkr.ecr.us-east-1.amazonaws.com"
  }

  stages {
    stage('Code Analysis') {
      steps {
        script {
          def scannerHome = tool 'sonarscanner4.7'
          withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=srgrcp-cv -Dsonar.projectName=srgrcp-cv -Dsonar.login=sqa_e9873cbffcbb6e40b42e779a628e8d3f5352e2e1"
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Build') {
      steps {
        script {
          dockerImage = docker.build(appRegistry + ":$BUILD_NUMBER", "./")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry(srgrcpRegistry, registryCredential) {
            dockerImage.push("$BUILD_NUMBER")
            dockerImage.push('latest')
          }
        }
      }
    }
  }

  post {
    always {
      discordSend description: "Leeroy Jenkins", title: 'jenkins.gitpushoriginmaster.xyz', link: env.BUILD_URL, webhookURL: 'https://discord.com/api/webhooks/1188324781448245348/W4otbyV52WKhfip3IVciIrWZFmaxdINlM5O4ts7OM8MWHKLjgdWwXNqiJrMVYAeOGaT5'
    }
  }
}
