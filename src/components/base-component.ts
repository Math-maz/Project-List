export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    elementId: string,
    hostElementId: string,
    inserAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      elementId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    this.attach(inserAtStart);
    if (newElementId) {
      this.element.id = newElementId;
    }
  }
  private attach(inserAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      inserAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}
