# WiSaw.serverless


example scripts invocation:

last argument is stage (requred), either dev or prod
  npm run deploy dev
  npm run deploy prod

  npm run info dev
  npm run info prod

the test scripts are always executing on dev stage and never on prod, if tests pass on dev -- it will work on prod for sure
  npm run test
