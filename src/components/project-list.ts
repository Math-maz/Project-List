import { ProjectItem } from "./project-item.js";
import { Component } from "./base-component.js";
import { DragTarget } from "../models/drag-and-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.element.id = `${this.type}-project`;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.add("droppable");
    }
  }
  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }
  @AutoBind
  dropHandler(e: DragEvent) {
    const projectId = e.dataTransfer!.getData("text/plain");
    console.log();
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }
  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === "active") return prj.status === ProjectStatus.Active;
        else return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
