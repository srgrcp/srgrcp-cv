pipeline {
  agent any

  environment {
    registryCredential = 'ecr:us-east-1:aws-jenkins'
    appRegistry = "841173558556.dkr.ecr.us-east-1.amazonaws.com/srgrcp-cv"
    srgrcpRegistry = "https://841173558556.dkr.ecr.us-east-1.amazonaws.com"
    cluster = "srgrcp-cv"
    service = "srgrcp-cv-staticsite"
  }

  stages {
    stage('Code Analysis') {
      steps {
        script {
          def scannerHome = tool 'sonarscanner4.7'
          withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=srgrcp-cv -Dsonar.projectName=srgrcp-cv"
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

    stage('Remove local docker image') {
      steps {
        sh "docker rmi $appRegistry:$BUILD_NUMBER"
      }
    }

    stage('Deploy To k8s') {
      agent { label 'KOPS' }
        steps {
          script {
            switch(env.GIT_BRANCH) {
              case 'master':
                buildEnv = 'prod'
              break
              default:
                buildEnv = 'dev'
              break
            }
            sh "helm upgrade --install --force srgrcp-cv-helm helm/srgrcp-cv-charts --set-json='image.tag=\"$BUILD_NUMBER\"' --namespace $buildEnv"
          }
        }
    }
  }

  post {
    always {
      discordSend description: "Leeroy Jenkins", title: "${JOB_NAME}${BUILD_DISPLAY_NAME}", link: env.BUILD_URL, webhookURL: env.DISCORD_WEBHOOK
    }
  }
}
