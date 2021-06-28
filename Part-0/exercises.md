# title 0.4 New Note

note over browser: User enters "Hello world" into text input and clicks on save button to submit
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note, DATA note: Hello world
note over server: Server receives request and accesses the body to get the data.
note over server: Server creates new note object and adds it to notes array
server-->browser: URL Redirect
note over browser: URL Redirect instructs browser to do new HTTP GET request to the location /exampleapp/notes
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code

note over browser: Remaining sequence described in description of exercise 0.4


# title 0.5 Single page app

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js
note over browser: Browser executes code in spa.js which requests JSON data from server
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: {data}
note over browser: Browser executes event handler which renders notes to display


# title 0.6 New Note 

note over browser: User enters "Hello world" into text input and clicks on save button to submit
note over browser: The submit event handler in the browser is called
note over browser: The event handler creates new note and adds it to note list, note list is rerendered
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note over server: Server receives POST request which contains new note as JSON-data
note over server: The content-type header tells the server how to correctly parse the data
server-->browser: Status code 201
note over server: Server creates new note object and adds it to notes array