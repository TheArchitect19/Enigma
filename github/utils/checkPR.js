const findLanguage=require('./languages');

function getId(name){
  findLanguage.forEach(language => {
    if(language.name===name){
      console.log(language.id);
      return language.id;
    }
  });
  return "Null";
}

module.exports = {
  checkFiles: async (context) => {
    const { additions, changed_files } = context.payload.pull_request;
    if (additions == 0 || changed_files > 1) {
      console.log(
        "There were no additions or number of changed files are greater than 1, Bot will not run"
      );
      return false;
    }
    return true;
  },
  checkBody: (body) => {
    const regex =
      /Language:\s*(\w+)\s*Sample Input:\s*([\s\S]+?)\s*Sample Output:\s*([\s\S]+)/s;
    const matches = body.match(regex);
    let language;
    let sampleInput;
    let sampleOutput;

    if (matches) {
      language ="Bash (5.0.0)";
      sampleInput = matches[2];
      sampleOutput = matches[3];
      
      
      const id=getId(language);
      

      console.log(languageObject)
      console.log("Language:", language);
      console.log("Sample Input:", sampleInput);
      console.log("Sample Output:", sampleOutput);
    } else {
      console.log("Regex pattern not found in the body.");
    }
    return {
      language,
      sampleInput,
      sampleOutput,
    };
  },
};
