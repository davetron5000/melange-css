import http          from "node:http"
import fs            from "node:fs"
import path          from "node:path"
import { parseArgs } from "node:util"

export default class DocServer {
  summary() { return "Runs a basic web server to view docs locally" }
  run(args) {
    const {
      values,
      positionals
    } = parseArgs({
      args: args,
      options: {
        dir: {
          type: "string",
        },
        port: {
          type: "string",
        },
        help : {
          type: "boolean",
          short: "h",
        }
      },
      strict: true,
    })
    if (values.help) {
      console.log("Usage: melange doc-server [options]")
      console.log()
      console.log("OPTIONS")
      console.log()
      console.log("  --dir DIR - where the doc .html files are")
      console.log("  --port PORT - what port to run on (default is 9999)")
      console.log("  --help    - show this message")
      console.log()
    }
    else {
      if (!values.dir) {
        console.log("missing --dir")
        process.exit(1)
      } 
      values.dir = values.dir.replace(/\/$/,"")
      if (values.port) {
        values.portNumber = parseInt(values.port)
      }
      else { 
        values.portNumber = 9999
      }
      if (!fs.existsSync(values.dir)) {
        console.log(`${dir} does not exist`)
        process.exit(1)
      }
    }
    (new Server(values.dir, values.portNumber)).start()
  }
}

class Server {
  constructor(dir, port) {
    this.port = port
    this.server = http.createServer((request, response) => {
      console.log(`request for -+--> ${request.url} received.`)

      let filePath
      if (request.url.endsWith("/")) {
        filePath = dir + request.url + "index.html"
      }
      else {
        filePath = dir + request.url
      }
      console.log(`             |`)
      console.log(`             +--> ${request.url} will use ${filePath}`)

      var extname = path.extname(filePath)
      var contentType = "text/html"
      switch (extname) {
        case ".js":
          contentType = "text/javascript"
          break
        case ".css":
          contentType = "text/css"
          break
        case ".json":
          contentType = "application/json"
          break
        case ".png":
          contentType = "image/png"
          break      
        case ".jpg":
          contentType = "image/jpg"
          break
        case ".wav":
          contentType = "audio/wav"
          break
      }

      fs.readFile(filePath, function(error, content) {
        if (error) {
          if(error.code == "ENOENT"){
            response.writeHead(404)
            response.end(`${filePath} not found`)
          }
          else {
            response.writeHead(500)
            response.end(`Error was ${error.code}`)
          }
        }
        else {
          response.writeHead(200, { "Content-Type": contentType })
          response.end(content, "utf-8")
        }
      })

    })
  }

  start() {
    this.server.listen(this.port)
    console.log(`Server running at http://127.0.0.1:${this.port}/`)
  }
}
