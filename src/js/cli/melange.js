import process from "node:process";
import CSS from "./css.js"
import Doc from "./doc.js"

const commands = {
  css: new CSS(),
  docs: new Doc(),
}

const showHelp = () => {
  console.log("usage: melange command [options]")
  console.log()
  console.log("Commands:")
  Object.keys(commands).forEach( (command) => {
    console.log(`  ${command} - ${commands[command].summary()}`)
  })
  console.log()
}

const commandName = process.argv[2]

if ( !commandName             ||
      commandName == "--help" ||
      commandName == "-h"     ||
      commandName == "-help"  ||
      commandName == "help" ) {

  showHelp()
  process.exit(0)

}

const command = commands[commandName]

if ( !command) {
  console.log(`unknown command: ${commandName}`)
  console.log()
  showHelp()
}

const args = process.argv.slice(3)
command.run(args)
