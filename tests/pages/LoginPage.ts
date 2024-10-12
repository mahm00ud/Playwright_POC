import{type Page, type Locator} from '@playwright/test';
import urls from '../../utils/dataPreparation/environemtsURLs';
import { randomInt } from 'crypto';
import { strict } from 'assert';
import { stringify } from 'querystring';

export class LoginPage{
    //properties
    readonly signinURL : string = urls.customerPortal.production+"/login";
    readonly page : Page;

    //locators
    readonly loginEmailField : Locator;
    readonly loginPasswordField : Locator;
    readonly signupNameField : Locator;
    readonly signupEmailField : Locator;
    readonly signupErrorMsg: Locator;
    readonly loginBtn : Locator;
    readonly signupBtn : Locator;
    readonly loginErrorMsg : Locator;

    //constructor
    constructor(page: Page){
        this.page = page;
        this.loginEmailField = this.page.locator('[name="email"][ data-qa="login-email"]');
        this.loginPasswordField = this.page.locator("[data-qa='login-password']");
        this.signupNameField = this.page.getByPlaceholder("Name");
        this.signupEmailField = this.page.locator('[name="email"][ data-qa="signup-email"]');
        this.signupErrorMsg = this.page.getByText("Email Address already exist!");
        this.loginBtn = this.page.getByRole("button",{name: "login"});
        this.signupBtn = this.page.getByRole("button",{name: "Signup"});
        this.loginErrorMsg = this.page.getByText("Your email or password is incorrect!");
    }


    async goTo(){
        await this.page.goto(this.signinURL);
    }

    async signup(name: string, email: string){
        await this.signupNameField.fill(name);
        await this.signupEmailField.fill(email);
        await this.signupBtn.click();
    }

    async signupWithRetry(name: string){
        let random : number;
        let randomName :string;
        let randomEmail :string 
        do{
            random =randomInt(999);
            randomName = name+random;
            randomEmail = randomName+"@test.com";
            await this.signup(randomName,randomEmail);
        }while(await this.signupErrorMsg.isVisible());
        return [randomName, randomEmail];
    }


    async login(email: string, password: string){
        await this.loginEmailField.fill(email);
        await this.loginPasswordField.fill(password);
        await this.loginBtn.click()
    }
}