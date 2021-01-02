const fs = require("fs")

const cwd = process.cwd()
const files = fs.readdirSync(cwd)


files.forEach(file => {
     const regEx = /^(.*)(S([\d]{1,})E([\d]{1,})).*(\.[\w]{2,})$/
     
     // Make sure the file name is valid
     if (regEx.test(file)) {
          const groups = regEx.exec(file)

          const movieName = groups[1].split(/[._-]/).join(" ").trim()
          const season = groups[3]
          const episode = groups[4]
          const fileExt = groups[5]


          const oldMoviePath = `${cwd}/${file}`
          const newMoviePath = `${cwd}/${movieName}/Season-${season}`
          const newMovieName = `/${movieName}-S${season}E${episode}${fileExt}`

          // Create new directory if it doesn't exist
          if (!fs.existsSync(newMoviePath)) {
               fs.mkdirSync(newMoviePath, { recursive: true });
          }

          // Copy movie to the new dir
          fs.copyFile(oldMoviePath, newMoviePath + newMovieName, (err) => {
               if (err) throw err;
               console.log(`[Copied] ${movieName} -  Season ${season} Episode ${episode}`);
          });
     }
})