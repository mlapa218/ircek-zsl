async function timer() {
  while (true) {
    $("#time").text(new Date().toLocaleTimeString())
    await new Promise(r=>setTimeout(r,500))
  }
}

timer()
