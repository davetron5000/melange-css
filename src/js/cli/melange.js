import process from "node:process";
import CSS from "./css.js"
import Doc from "./doc.js"
import DocServer from "./doc-server.js"

/*
 * melange new-class class-name-here "property:value" "property:value" --out=filename.css
 *
 * To make this work, the breakpoints are needed in a parseable format.
 */


const commands = {
  css: new CSS(),
  docs: new Doc(),
  "doc-server": new DocServer(),
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

if (!command) {
  console.log(`unknown command: ${commandName}`)
  console.log()
  showHelp()
  process.exit(1)
}

const args = process.argv.slice(3)
command.run(args)
