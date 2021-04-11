pipeline {
  agent none
  environment {
    dockerImage = ''
    registry = 'hcabnettek/react-redux-petstore'
    registryCreds = 'dockerhubid'
  }

  stages {
    stage('Checkout Source') {
      agent { label 'kubepod' }
      steps {
        git url:'https://github.com/hcabnettek/react-redux-petstore.git', branch:'master'
      }
    }

    stage('Build Web App') {
      agent {
        docker {
          image 'node:14.16.1-alpine3.13'
          args '-p 3000:3000'
        }
      }
      steps {
        sh 'yarn install'
      }
      steps {
        sh 'yarn build'
      }
    }

    stage('Build Docker Image') {
      agent { label 'kubepod' }
      steps {
        dockerImage = docker.build registry
      }
    }

    stage('Push Docker Image') {
      agent { label 'kubepod' }
      steps {
        script {
          docker.withRegistry('', registryCreds) {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy App To Cluster') {
      agent { label 'kubepod' }
      steps {
        script {
          kubernetesDeploy(configs: "app_deploy.yml", kubeconfigId: "mykubeconfig")
        }
      }
    }
  }
}
