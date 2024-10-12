import{type Page, type Locator} from '@playwright/test';

export class HomePage{
    //variables
    readonly signinURL : string = "https://automationexercise.com/";
    readonly page : Page;

    //locators
    readonly logoutBtn : Locator;




    //constructor
    constructor(page){
        this.page = page;
        this.logoutBtn = this.page.getByRole("link",{name: "Logout"})
    }


    //actions
    async goTo(){
        await this.page.goto(this.signinURL);
    }


}