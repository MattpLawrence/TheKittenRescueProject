import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BreakPointsEnum } from "../models/common.enum";
import { ModalClose } from "../models/common.model";

@Injectable({
  providedIn: 'root',
})

export class CommonService{

  constructor() { }

  //subjects
  private breakpointSubject = new BehaviorSubject<BreakPointsEnum>(0)
  private topModalSubject = new BehaviorSubject<ModalClose>({isOpen:false, hasTriggered: false});


  //getters and setters
  getBreakpointSubject = () => {
    return this.breakpointSubject.asObservable();
  }

  setBreakpointSubject = (breakPoint: BreakPointsEnum) => {
    this.breakpointSubject.next(breakPoint)
  }

  getTopModalSubject = () => {
    return this.topModalSubject.asObservable();
  }

  setTopModalSubject = (isOpen: ModalClose) => {
    this.topModalSubject.next(isOpen);
  }


}
