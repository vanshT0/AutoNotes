
const puppeteer = require('puppeteer');

const id = "yikov44296@zevars.com";
const pass = "12345678";

// ============================================= ARRAY OF SUBJECTS IN 6th SEM ========================================
const subjects = ['Power Electronics', 'Information Theory and Coding', 'Microwave Engineering', 'Data Communication and Networks', 'Antenna and Wave Propagation', 'Digital Signal Processing']
let arguments = process.argv.slice(2);
let sub = subjects[arguments];

async function main() {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  let tabs = await browser.pages();
  let tab = tabs[0];
  
  // ============================================= Login Page of NotesHub ============================================

  await tab.goto("https://noteshub.co.in/auth");

  // ============================================= Login Credentials =================================================


  await tab.type("#email", id);

  await tab.type("input[placeholder='Password']", pass);

  await tab.click("button[type='submit']");

  // ============================================= Logged In =================================================

// ============================================= Setting Up NotesHub Account =================================================

  // ============================================= Adding Subjects =================================================

  await tab.waitForSelector('.subject-block.add-subject', { visible: true });
  await tab.click('.subject-block.add-subject');

  

  // ============================================= Select University =================================================
  await tab.waitForSelector("p-dropdown[formcontrolname='university']", { visible: true });
  await tab.click("p-dropdown[formcontrolname='university']");
  

  //  await tab.click('li[role="option"]');
  await tab.click('li[aria-label="Guru Gobind Singh Indraprastha University"]');

  // =============================================Select College =================================================

  await tab.waitForSelector("p-dropdown[formcontrolname='college']", { visible: true });
  await tab.click("p-dropdown[formcontrolname='college']");
  
  await tab.click('li[aria-label="Guru Tegh Bahadur Institute of Technology"]');

  // ============================================= Select Course  =================================================
  await tab.waitForSelector("p-dropdown[formcontrolname='course']", { visible: true });
  await tab.click("p-dropdown[formcontrolname='course']");
  await tab.click('li[aria-label="Bachelor of Technology"]');
  
// ============================================= Select Branch =================================================
  await tab.waitForSelector("p-dropdown[formcontrolname='branch']", { visible: true });
  await tab.click("p-dropdown[formcontrolname='branch']");
  await tab.click('li[aria-label="Electronics & Communication Engineering"]');

  // ============================================= Select Semester =================================================
  await tab.waitForSelector("p-dropdown[formcontrolname='semester']", { visible: true });
  await tab.click("p-dropdown[formcontrolname='semester']");
  await tab.click('li[aria-label="6"]');


  // ============================ Select All Subjects according to the respective fields above ==========================

  await tab.waitForSelector("p-multiselect[formcontrolname='user_subjects']", { visible: true });
  await tab.click("p-multiselect[formcontrolname='user_subjects']");


  // all subs
  await tab.waitForSelector(".p-checkbox.p-component.ng-tns-c75-18.ng-star-inserted", { visible: true })
  await tab.click(".p-checkbox.p-component.ng-tns-c75-18.ng-star-inserted");
  // all subs

  // ============================================= All Subjects added =================================================

  // ============================================= Saving InFo==========================================================

  await tab.click('button[icon="pi pi-check"]');

  // ============================= Searching for the Subject whose data the user wants to extract ==============================
  
  await tab.waitForSelector('.my-subjects-wrapper.row.ng-star-inserted', { visible: true });
  await tab.type('input[aria-haspopup="true"]', sub);
  await tab.waitForSelector('li[role="option"]', {visible : true});
  await tab.click('li[role="option"]');

  // ================================= Selecting the category out of E-Books, Notes, Question Papers, Practical Files ===========

  await tab.waitForSelector('p-dropdown[optionlabel="document_category_name"]', { visible: true });
    await tab.click('p-dropdown[optionlabel="document_category_name"]');

    await tab.waitForSelector('li[aria-label="Notes"]', { visible: true });
    await tab.click('li[aria-label="Notes"]');

// ============================================= Opening all the available pdf files into different tabs =================================================
    
    await tab.waitForSelector('.col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted',{visible : true});
    let elements = await tab.$$('.col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted');
    for(let ele = 0 ; ele < elements.length; ele++){
    await elements[ele].click();
    
    }

   
  
}
main();

