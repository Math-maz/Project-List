import { Component } from "./base-component";
import { projectState } from "../state/project-state";
import { AutoBind } from "../decorators/autobind";
import { validate } from "../util/validation";
import { IUserInput } from "../models/project";
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descripInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputEl = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descripInputEl = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
  }
  configure() {
    this.element.addEventListener("submit", this.handleSubmit);
  }
  renderContent() {}
  private clearInputs() {
    this.titleInputEl.value = "";
    this.descripInputEl.value = "";
    this.peopleInputEl.value = "";
  }
  private fetchUserInput(): IUserInput | void {
    const title = this.titleInputEl.value;
    const description = this.descripInputEl.value;
    const people = +this.peopleInputEl.value;
    if (
      // title.trim().length === 0 ||
      // description.trim().length === 0 ||
      // people.trim().length === 0
      !validate({ value: title, required: true }) ||
      !validate({ value: description, required: true, minLength: 5 }) ||
      !validate({ value: people, required: true, min: 2 })
    ) {
      alert("Input not valid, please try again");
      return;
    } else {
      return { title: title, description: description, people: people };
    }
  }
  @AutoBind
  private handleSubmit(e: Event) {
    e.preventDefault();
    const userInput = this.fetchUserInput();
    if (typeof userInput === "object") {
      const { title, description, people } = userInput;
      projectState.addProject(title, description, people);
      console.log(userInput);
      this.clearInputs();
    }
  }
}
