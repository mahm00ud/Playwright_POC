import { test, expect, type Page } from '@playwright/test';
import { ObjectManager } from '../../utils/ObjectManager';
import customerUser from '../../utils/dataPreparation/customerUsers.json'


let objManager: ObjectManager;

const validUsername = process.env.VALID_USERNAME!;
const validPassword = process.env.VALID_PASSWORD!;

test.beforeEach(async ({page}, testinfo)=>{
    console.log(`Running ${testinfo.title}`);
    objManager = new ObjectManager(page);
    await objManager.loginPage.goTo();
});


test.describe('Login Test Cases', ()=>{
    
    //This test uses data from environmentVariables file
    test('Valid Login', async () =>{
        await objManager.loginPage.login(customerUser.validCustomer.username,customerUser.validCustomer.password);
        await expect(objManager.homePage.logoutBtn).toBeVisible();
    });
    
    //This test uses data from customerUser.json file
    test('Invalid Login', async () =>{
        await objManager.loginPage.login(customerUser.invalidCustomer.username,customerUser.invalidCustomer.password);
        await expect(objManager.loginPage.loginErrorMsg).toBeVisible();
    });
    
});

test.afterEach(async({page}, testinfo)=>{
    console.log(`Finished ${testinfo.title} with status ${testinfo.status}`);
    if(testinfo.status !== testinfo.expectedStatus){
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    }
    // await page.close();
});
