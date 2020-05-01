import { sampleData } from "../Assets/sampleData";

export function getDummyData(loginInfo) {
  console.log({ ...loginInfo });

  let totalSkills = [];
  let SkillsNotMatched = new Map();
  let SkillsMatched = new Map();

  sampleData.forEach((jobs) => {
    totalSkills = [...jobs.skills, ...totalSkills];
  });

  console.log(totalSkills);

  totalSkills.forEach((skill) => {
    console.log(skill.split("\n")[1]);
    const skillString = skill.split("\n")[1];
    const skillCondition = skill.split("\n")[0];
    console.log(skillCondition);
    if (skillCondition == "Match") {
      if (SkillsMatched.has(skillString)) {
        SkillsMatched.set(skillString, SkillsMatched.get(skillString) + 1);
      } else {
        SkillsMatched.set(skillString, 1);
      }
    } else {
      if (SkillsNotMatched.has(skillString)) {
        SkillsNotMatched.set(
          skillString,
          SkillsNotMatched.get(skillString) + 1
        );
      } else {
        SkillsNotMatched.set(skillString, 1);
      }
    }
  });
  console.log(SkillsMatched);
  console.log(SkillsNotMatched);
  let SkillsMatchedArray = [];
  let SkillsNotMatchedArray = [];
  for (const [key, value] of SkillsMatched.entries()) {
    SkillsMatchedArray.push({ skillName: key, skillFrequency: value });
  }

  SkillsMatchedArray.sort(function (a, b) {
    return b.skillFrequency - a.skillFrequency;
  });

  console.log(SkillsMatchedArray);

  for (const [key, value] of SkillsNotMatched.entries()) {
    SkillsNotMatchedArray.push({ skillName: key, skillFrequency: value });
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
