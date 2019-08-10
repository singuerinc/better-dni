workflow "ci" {
  resolves = ["benchmark"]
  on = "push"
}

action "install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
  env = {
    NODE_ENV = "production"
  }
}

action "build" {
  uses = "nuxt/actions-yarn@master"
  args = "build"
  needs = ["install"]
  env = {
    NODE_ENV = "production"
  }
}

action "test" {
  uses = "nuxt/actions-yarn@master"
  args = "test"
  needs = ["build"]
  env = {
    NODE_ENV = "production"
  }
}

action "benchmark" {
  uses = "nuxt/actions-yarn@master"
  needs = ["test"]
  args = "benchmark"
  env = {
    NODE_ENV = "production"
  }
}
