const fs = require('fs')
const path = require('path')

try {
    const fileNames = fs.readdirSync(`./results/`).filter(file => { if (path.extname(file) === '.json') return file })
    let newObjects = []
    for (fileName of fileNames) {
        let data = JSON.parse(fs.readFileSync(`./results/${fileName}`))
        let [userAgent] = data.userAgents
        let features = data.fixtures
        for (let i = 0; i < features.length; i++) {
            newObjects[i] = newObjects[i] === undefined ? { passed: 0, total: 0, failed: 0, skipped: 0, name: features[i].meta.feature, tests: [] } : newObjects[i]
            let scenarios = data.fixtures[i].tests
            for (scenario of scenarios) {
                scenario.userAgent = userAgent
                newObjects[i].failed = scenario.errs.length > 0 ? newObjects[i].failed + 1 : newObjects[i].failed
                newObjects[i].skipped = scenario.skipped ? newObjects[i].skipped + 1 : newObjects[i].skipped
                newObjects[i].passed = !scenario.skipped && !scenario.errs.length > 0 ? newObjects[i].passed + 1 : newObjects[i].passed
                newObjects[i].total += 1
            }
            newObjects[i].tests.push(...scenarios)
        }
    }
    for (feature of newObjects) {
        feature.tests.sort((a, b) => {
            let userAgentA = a.userAgent.toLowerCase(), userAgentB = b.userAgent.toLowerCase()
            if (userAgentA > userAgentB)
                return -1
            if (userAgentA < userAgentB)
                return 1
            return 0
        })
        fs.writeFileSync(`./results/merged-results/${feature.name}-${Date.now()}.json`, JSON.stringify(feature))
    }
}
catch (e) {
    console.log(e.msg)
}