let fs = require('fs');
const path = require('path');
fs.open(path.join(__dirname, 'file.txt'), 'w', (error) => {
    console.log('Hello!')
    if (error) {
        throw new Error(error)
    } else {
        console.log('File created successfully!\n' +
            'Enter text to write to file\n(Write \"exit\" for exit)')
    }
    process.stdin.on('data', (data) => {
        if (data.toString().trim() === 'exit') {
            console.log('Bye!')
            process.exit(0)
        } else {
            fs.appendFile(path.join(__dirname, 'file.txt'), data, (error) => {
                if (error) {
                    throw new Error(error)
                }
            })
        }
    })
}
)