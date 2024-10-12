import { LoginPage } from "../tests/pages/LoginPage";
import { HomePage } from "../tests/pages/HomePage";
import { Page } from "@playwright/test";
import { SignupPage } from "../tests/pages/SignupPage";

export class ObjectManager{

readonly page :Page;
readonly homePage: HomePage;
readonly loginPage: LoginPage;
readonly signupPage: SignupPage;

    constructor(page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.signupPage = new SignupPage(page);
    }

}