// this file is only used by tests executor
import * as read from 'read-yaml'

export default read.sync('.env.test.yml')
