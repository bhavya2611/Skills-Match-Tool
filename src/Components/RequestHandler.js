import { sampleData } from "../Assets/sampleData";

export function getDummyData(loginInfo) {
  console.log({ ...loginInfo });

  let totalSkills = [];
  let SkillsNotMatched = new Map();
  let SkillsMatched = new Map();

  sampleData.forEach((jobs) => {
    let skills = [];
    jobs.skills.forEach((skill) =>{
      skills.push(skill+"\n"+jobs.company);

    })
    totalSkills = [...skills, ...totalSkills];
  });

  console.log(totalSkills);

  totalSkills.forEach((skill) => {
    console.log(skill.split("\n")[1]);
    const skillString = skill.split("\n")[1];
    const skillCondition = skill.split("\n")[0];
    const skillCompany = skill.split("\n")[2];
    console.log(skillCondition);
    if (skillCondition == "Match") {
      if (SkillsMatched.has(skillString)) {
        SkillsMatched.set(skillString, { freq: SkillsMatched.get(skillString).freq + 1, company: SkillsMatched.get(skillString).company+","+skillCompany });
      } else {
        SkillsMatched.set(skillString, {freq:1, company:skillCompany});
      }
    } else {
      if (SkillsNotMatched.has(skillString)) {
        SkillsNotMatched.set(
          skillString,
         { freq: SkillsNotMatched.get(skillString).freq + 1, company: SkillsNotMatched.get(skillString).company+","+skillCompany  }
        );
      } else {
        SkillsNotMatched.set(skillString,  {freq:1, company:[skillCompany]});
      }
    }
  });
  console.log(SkillsMatched);
  console.log(SkillsNotMatched);
  let SkillsMatchedArray = [];
  let SkillsNotMatchedArray = [];
  for (const [key, value] of SkillsMatched.entries()) {
    SkillsMatchedArray.push({ skillName: key, skillFrequency: value.freq, company: value.company });
  }

  SkillsMatchedArray.sort(function (a, b) {
    return b.skillFrequency - a.skillFrequency;
  });

  console.log(SkillsMatchedArray);

  for (const [key, value] of SkillsNotMatched.entries()) {
    SkillsNotMatchedArray.push({ skillName: key,  skillFrequency: value.freq, company: value.company  });
  }

  SkillsNotMatchedArray.sort(function (a, b) {
    return b.skillFrequency - a.skillFrequency;
  });

  console.log(SkillsNotMatchedArray);

  let sumSkillsMatched = SkillsMatchedArray.reduce(
    (acc, val) => acc + val.skillFrequency,
    0
  );
  let sumTotal = SkillsNotMatchedArray.reduce(
    (acc, val) => acc + val.skillFrequency,
    sumSkillsMatched
  );
  let scoreTotal = Math.ceil((sumSkillsMatched / sumTotal) * 100) + "%";

  return {
    topSkillsMatched: [...SkillsMatchedArray.slice(0, 5)],
    topSkillsNotMatched: [...SkillsNotMatchedArray.slice(0, 5)],
    score: scoreTotal,
  };
}
