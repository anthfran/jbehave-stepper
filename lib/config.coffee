meta = #Key
  define: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey"
  key:
    switch process.platform
      when "darwin" then "⌘"
      when "linux" then "Super"
      when "win32" then "❖"

module.exports =
  general:
    order: 1
    type: "object"
    properties:
      paths:
        order: 1
        title: "JAVA Source Path"
        type: "string"
        default: "**/src/**/*.java"
        description: "Files in this path will be searched"
