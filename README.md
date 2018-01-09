# WiSaw.serverless


## example scripts invocation:

last argument is stage (requred), either test or prod:
```
npm run deploy test
npm run deploy prod

npm run info test
npm run info prod
```

the test scripts are always executing on test stage and never on prod, if tests pass on "test -- it will work on prod for sure:
```
npm run test
```

to run migrations:
```
npm run migrate test
npm run migrate prod
```

to undo one migration:
```
npm run migrate-undo test
npm run migrate-undo prod
```
