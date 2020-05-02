const puppeteer = require("puppeteer");

const getJobAnalysis = async (
  email,
  password,
  searchQuery,
  location = "India",
  experienceValue = "Any"
) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath:
        "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login");
    await page.waitForSelector('input[name="session_key"]');
    await page.type('input[name="session_key"]', email.toString());
    await page.waitForSelector('input[name="session_password"]');
    await page.type('input[name="session_password"]', password.toString());
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    const cookies = await page.cookies();
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    await page2.goto("https://www.linkedin.com/feed/");
    await page.close();
    await page2.waitForSelector("input.search-global-typeahead__input");
    await page2.type(
      "input.search-global-typeahead__input",
      searchQuery.toString()
    );
    await page2.waitForSelector("button.search-global-typeahead__button");
    await page2.click("button.search-global-typeahead__button");
    await page2.waitForSelector('button[aria-label="View only Jobs results"]');
    await page2.click('button[aria-label="View only Jobs results"]');
    await page2.waitForNavigation();
    await page2.waitForSelector("button.artdeco-toggle__button");
    const input = await page2.$$(".jobs-search-box__text-input");
    let idSelector = input[2]._remoteObject.description;
    const elementHandle = await page2.$(idSelector);
    await elementHandle.click();
    await elementHandle.focus();
    await elementHandle.click({ clickCount: 5 });
    await elementHandle.press("Backspace");
    await elementHandle.type(location.toString());
    await page2.keyboard.press("Enter");
    await page2.waitForNavigation();
    await page2.waitForSelector("button.artdeco-toggle__button");
    await page2.waitForSelector("ul.jobs-search-results__list.artdeco-list");
    if (experienceValue !== "Any") {
      const url = await page2.url();
      console.log(url);
      let firstPart = url.split("?")[0];
      let secondPart = url.split("?")[1];
      let finalUrl = firstPart + "?f_E=" + experienceValue + "&" + secondPart;
      page2.goto(
        finalUrl
      );
      
    }

    await scrollToBottom(page2);
    await scrollToBottom(page2);

    // ("ul.jobs-search-results__list.artdeco-list > li > div > div > div > a");

    let jobsLink = await page2.$$eval(
      "ul.jobs-search-results__list.artdeco-list > li > div > div > div > a",
      (am) => am.filter((e) => e.href).map((e) => e.href)
    );

    let positionNames = await page2.$$eval(
      "ul.jobs-search-results__list.artdeco-list > li > div > div > div > a",
      (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
    );

    console.log(jobsLink);

    if (jobsLink.length === 0) {
      jobsLink = await page2.$$eval(
        "h3.job-card-search__title > a.job-card-search__link-wrapper",
        (am) => am.filter((e) => e.href).map((e) => e.href)
      );

      positionNames = await page2.$$eval(
        "h3.job-card-search__title > a.job-card-search__link-wrapper",
        (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
      );
    }

    let companyNames = await page2.$$eval(
      "div.artdeco-entity-lockup__subtitle",
      (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
    );

    let locationNames = await page2.$$eval(
      "div.artdeco-entity-lockup__caption",
      (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
    );

    let responseObj = [];
    let counter = 0;
    let newskillsList = [];
    let percentDone = parseInt(100 / jobsLink.length);
    let industry = [];

    while (counter < jobsLink.length) {
      try {
        console.log("Done....." + percentDone * counter + "%");
        newskillsList = [];
        await page2.goto(jobsLink[counter]);
        await page2.waitForSelector("li.jobs-ppc-criteria__list-item", {
          timeout: 3000,
        });
        newskillsList = await page2.$$eval(
          "li.jobs-ppc-criteria__list-item",
          (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
        );
        industry = await page2.$$eval(
          "li.jobs-description-details__list-item",
          (am) => am.filter((e) => e.innerText).map((e) => e.innerText)
        );
        responseObj.push({
          position: positionNames[counter],
          company: companyNames[counter],
          location: locationNames[counter],
          skills: newskillsList,
          industry: industry,
        });
        counter++;
      } catch (err) {
        if (err) {
          responseObj.push({
            position: positionNames[counter],
            company: companyNames[counter],
            location: locationNames[counter],
            skills: [],
            industry: industry,
          });
          newskillsList = [];
          counter++;
          continue;
        }
      }
    }

    // await page2.close();
    // await browser.close();

    //console.log(responseObj);
    let totalSkills = [];
    let SkillsNotMatched = new Map();
    let SkillsMatched = new Map();

    responseObj.forEach((jobs) => {
      let skills = [];
      jobs.skills.forEach((skill) => {
        skills.push(skill + "\n" + jobs.company);
      });
      totalSkills = [...skills, ...totalSkills];
    });

    //console.log(totalSkills);

    totalSkills.forEach((skill) => {
      //console.log(skill.split("\n")[1]);
      const skillString = skill.split("\n")[1];
      const skillCondition = skill.split("\n")[0];
      const skillCompany = skill.split("\n")[2];
      //console.log(skillCondition);
      if (skillCondition == "Match") {
        if (SkillsMatched.has(skillString)) {
          SkillsMatched.set(skillString, {
            freq: SkillsMatched.get(skillString).freq + 1,
            company:
              SkillsMatched.get(skillString).company + "," + skillCompany,
          });
        } else {
          SkillsMatched.set(skillString, { freq: 1, company: skillCompany });
        }
      } else {
        if (SkillsNotMatched.has(skillString)) {
          SkillsNotMatched.set(skillString, {
            freq: SkillsNotMatched.get(skillString).freq + 1,
            company:
              SkillsNotMatched.get(skillString).company + "," + skillCompany,
          });
        } else {
          SkillsNotMatched.set(skillString, {
            freq: 1,
            company: skillCompany,
          });
        }
      }
    });
    //console.log(SkillsMatched);
    //console.log(SkillsNotMatched);
    let SkillsMatchedArray = [];
    let SkillsNotMatchedArray = [];
    for (const [key, value] of SkillsMatched.entries()) {
      SkillsMatchedArray.push({
        skillName: key,
        skillFrequency: value.freq,
        company: value.company,
      });
    }

    SkillsMatchedArray.sort(function (a, b) {
      return b.skillFrequency - a.skillFrequency;
    });

    //console.log(SkillsMatchedArray);

    for (const [key, value] of SkillsNotMatched.entries()) {
      SkillsNotMatchedArray.push({
        skillName: key,
        skillFrequency: value.freq,
        company: value.company,
      });
    }

    SkillsNotMatchedArray.sort(function (a, b) {
      return b.skillFrequency - a.skillFrequency;
    });

    //console.log(SkillsNotMatchedArray);

    let sumSkillsMatched = SkillsMatchedArray.reduce(
      (acc, val) => acc + val.skillFrequency,
      0
    );
    let sumTotal = SkillsNotMatchedArray.reduce(
      (acc, val) => acc + val.skillFrequency,
      sumSkillsMatched
    );
    let scoreTotal = Math.ceil((sumSkillsMatched / sumTotal) * 100) + "%";

    console.log("Done.....100%");
    return {
      topSkillsMatched: [...SkillsMatchedArray.slice(0, 5)],
      topSkillsNotMatched: [...SkillsNotMatchedArray.slice(0, 5)],
      score: scoreTotal,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

async function scrollToBottom(page) {
  const distance = 200; // should be less than or equal to window.innerHeight
  const delay = 100;
  await page.waitForSelector("div.jobs-search-results");
  while (
    await page.evaluate(
      () =>
        document.querySelector("div.jobs-search-results").scrollTop +
          window.innerHeight <
        document.querySelector("div.jobs-search-results").scrollHeight
    )
  ) {
    await page.evaluate((y) => {
      document.querySelector("div.jobs-search-results").scrollBy(0, y);
    }, distance);
    await page.waitFor(delay);
  }
}

var express = require("express");
var port = process.env.PORT || 5000;
let app = express();

let cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send(JSON.stringify({ Status: "Server is running" }));
});

app.post("/matchSkills", (req, res) => {
  //console.log(req.body);
  getJobAnalysis(
    req.body.mailId,
    req.body.password,
    req.body.role,
    req.body.location,
    req.body.experience
  ).then((data) => {
    res.json(data);
  }); //Please enter valid mailID, password and postlink here
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
