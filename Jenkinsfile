pipeline {
  agent { label 'kubepod' }

  stages {
    stage('Checkout Source') {
      steps {
        git url:'https://github.com/hcabnettek/react-redux-petstore.git', branch:'master'
      }
    }

    stage('Deploy App') {
      steps {
        script {
          kubernetesDeploy(configs: "app_deploy.yml", kubeconfigId: "mykubeconfig")
        }

        script {
          kubernetesDeploy(configs: "app_service.yml", kubeconfigId: "mykubeconfig")
        }
      }
    }
  }
}
