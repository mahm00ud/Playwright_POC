import { Locator, Page } from "playwright";
import urls from "../../utils/dataPreparation/environemtsURLs";
export class SignupPage{
    //properties
    readonly page: Page;
    readonly signupURL: string = urls.customerPortal.production+"/sinup";

    //locators

    //constructor
    constructor(page: Page){
        this.page= page;
        this.enterAccountInfoText= page.getByText("Enter Account Information");
        this.titleMR = page.getByRole("radio",{name:"Mr."});
        this.titleMRs = page.getByRole("radio",{name:"Mrs."});
        this.nameField = page.locator("#name");
        this.emailField = page.locator("#email");
        this.passwordField = page.locator("#password");
        this.dayDropDown = page.locator("#days")
        this.monthDropDown = page.locator("#months")
        this.yearDropDown = page.locator("#years");
        this.firstNameField = page.locator("#first_name");
        this.lastNameField = page.locator("#last_name");
        this.addressField = page.locator("#address1");
        this.countryDropDown = page.locator("#country");
        this.stateField = page.locator("#state");
        this.cityField = page.locator("#city");
        this.zipcodeField = page.locator("#zipcode");
        this.mobilenumberField = page.locator("#mobile_number");
        this.createAccountBtn= page.getByRole("button",{name:"Create Account"});
        this.accountCreatedMsg = page.getByRole("heading",{name:"Account Created!"})
    }

    //Account Information Locators
    readonly enterAccountInfoText: Locator;
    readonly titleMR: Locator;
    readonly titleMRs: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly dayDropDown: Locator;
    readonly monthDropDown: Locator;
    readonly yearDropDown: Locator;

    //Address Information Locators
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly addressField: Locator;
    readonly countryDropDown: Locator;
    readonly stateField: Locator;
    readonly cityField: Locator;
    readonly zipcodeField: Locator;
    readonly mobilenumberField: Locator;

    readonly accountCreatedMsg: Locator;
    readonly createAccountBtn: Locator;

    async goTO(){
        await this.page.goto(this.signupURL);
    }

    async selectGender(gender: string){
        if(gender.toLowerCase()=="mr"){
            await this.titleMR.click();
        }
        else if(gender.toLowerCase()=="mrs"){
            await this.titleMRs.click();
        }else{
            console.log("You have chosen invalid gender type, please select MR or MRs");
        }
    }

    async getInsertedName(){
        return this.nameField.textContent();
    }

    async getInsertedEmail(){
        return this.emailField.textContent();
    }

    async insertPassword(password: string){
        await this.passwordField.fill(password);
    }

    //Select BOD with these arguments, day from 1-31, month from 1-12, year from 1900 to 2021
    async selectBirthOfDate(day: string, month: string, year: string){
        await this.dayDropDown.selectOption({label: day});
        await this.monthDropDown.selectOption(month);
        await this.yearDropDown.selectOption(year);
    }

    async isEnterAccountInfoVisible(){
        return await this.enterAccountInfoText.isVisible();
    }

    async insertFirstName(firstName: string){
        await this.firstNameField.fill(firstName);
    }

    async insertLastName(lastName: string){
        await this.lastNameField.fill(lastName);
    }

    async insertAddress(address: string){
        await this.addressField.fill(address);
    }

    async selectCountry(country : string){
        await this.countryDropDown.selectOption(country)
    }

    async insertState(state: string){
        await this.stateField.fill(state);
    }

    async insertCity(city: string){
        await this.cityField.fill(city);
    }

    async insertZipCode(zipcode: string){
        await this.zipcodeField.fill(zipcode);
    }

    async insertMobile(mobileNumber: string){
        await this.mobilenumberField.fill(mobileNumber);
    }

    async clickCreateAccountBtn(){
        await this.createAccountBtn.click();
    }


}