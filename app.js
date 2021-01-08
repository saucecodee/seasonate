const fs = require("fs")

// Current working directory
const cwd = process.cwd()

// Get all files in the cwd
let files
try {
     files = fs.readdirSync(cwd)
} catch (error) {
     console.log("Error reading files\n", error)
}


// Loop through all the files
files.forEach(file => {
     // Regex for valid file names
     const movieNameRegEx = new RegExp(/^(.*)(S([\d]{1,})E([\d]{1,})).*(\.[\w]{2,})$/, "i")

     // check if the file name matches the movie name regex
     if (movieNameRegEx.test(file)) {
          const groups = movieNameRegEx.exec(file)

          const movieName = toPascalCase(groups[1])
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

               // Delete the file after copying
               try {
                    fs.unlinkSync(oldMoviePath)
               } catch (error) {
                    console.log(`Couldn't delete file @ ${oldMoviePath}`)
               }
          });
     }
})

// Converts the movie name to Pascal case
function toPascalCase(str) {
     let result = ""

     str.split(/[._-]/).forEach(word => {
          result += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
     });

     return result.trim()
}