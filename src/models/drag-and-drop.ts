//Drag and Drop Interfaces

export interface Draggable {
  dragStartHandler: (e: DragEvent) => void;
  dragEndhandler: (e: DragEvent) => void;
}
export interface DragTarget {
  dragOverHandler: (e: DragEvent) => void;
  dropHandler: (e: DragEvent) => void;
  dragLeaveHandler: (e: DragEvent) => void;
}
