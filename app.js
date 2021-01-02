const fs = require("fs")

// Current working directory
const cwd = process.cwd()
// Get all files in the cwd
const files = fs.readdirSync(cwd)

// Loop through all the files
files.forEach(file => {
     // Regex for valid filenames
     const movieNameRegEx = /^(.*)(S([\d]{1,})E([\d]{1,})).*(\.[\w]{2,})$/

     // check if the file name matches the movie regex
     if (movieNameRegEx.test(file)) {
          const groups = movieNameRegEx.exec(file)

          const movieName = groups[1].split(/[._-]/).join(" ").trim()
          const season = groups[3]
          const episode = groups[4]
          const fileExtention = groups[5]

          const oldMoviePath = `${cwd}/${file}`
          const newMoviePath = `${cwd}/${movieName}/Season-${season}`
          const newMovieName = `/${movieName}-S${season}E${episode}${fileExtention}`

          // Create new file directory if it doesn't exist
          if (!fs.existsSync(newMoviePath)) fs.mkdirSync(newMoviePath, { recursive: true });

          // Copy movie to the the new directory
          fs.copyFile(oldMoviePath, newMoviePath + newMovieName, (err) => {
               if (err) throw err;
               console.log(`[Copied] ${movieName} -  Season ${season} Episode ${episode}`);
          });
     }
})