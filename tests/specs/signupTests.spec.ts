import { test, expect, type Page, selectors } from '@playwright/test';
import { ObjectManager } from '../../utils/ObjectManager';
import signupData from '../../utils/dataPreparation/signupData.json'
import { randomInt } from 'crypto';


let objManager: ObjectManager;

let name: string;
let email: string;

function sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

test.describe('Signup Test Cases', ()=>{

    test.beforeEach(async ({page}, testinfo)=>{
        console.log(`Running ${testinfo.title}`);
        objManager = new ObjectManager(page);
        await objManager.loginPage.goTo();
    });

    test('Insert valid email and Navigate from Login page to Sign up page', async () =>{
        let nameAndEmail :string[]= await objManager.loginPage.signupWithRetry(signupData.name);  
        const isVisible = await  objManager.signupPage.isEnterAccountInfoVisible();
        expect(isVisible);
        console.log("Sign up page is loaded successfully "+ isVisible);
    });

    test.only('Verify successful signup and user is logged in', async () =>{
        let nameAndEmail :string[]= await objManager.loginPage.signupWithRetry(signupData.name);  
        const isVisible = await  objManager.signupPage.isEnterAccountInfoVisible();
        expect(isVisible);
        console.log("Sign up page is loaded successfully "+ isVisible);
        let insertedName =await objManager.signupPage.getInsertedName();
        await expect(objManager.signupPage.nameField).toHaveValue(nameAndEmail[0]);
        await expect(objManager.signupPage.emailField).toHaveValue(nameAndEmail[1]);

        await objManager.signupPage.insertPassword(signupData.password);
        await objManager.signupPage.selectBirthOfDate("9","12","1994");

        await objManager.signupPage.insertFirstName(nameAndEmail[0]);
        await objManager.signupPage.insertLastName(nameAndEmail[0]+"_LastName");
        await objManager.signupPage.insertAddress(signupData.address);
        await objManager.signupPage.selectCountry(signupData.countries[randomInt(3)]);
        await objManager.signupPage.insertCity(signupData.city);
        await objManager.signupPage.insertState(signupData.state);

        await objManager.signupPage.insertZipCode(signupData.zipcode);
        await objManager.signupPage.insertMobile(signupData.mobileNumber);
        await objManager.signupPage.clickCreateAccountBtn();

        await expect(objManager.signupPage.accountCreatedMsg).toHaveText("Account Created!");       
    });
});