import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { AdoptStepperViewEnum, BreakPointsEnum } from "../models/common.enum";
import { ModalClose } from "../models/common.model";
import { AdopterForm, AdoptionForm, HomeForm, PetForm } from "../models/form.model";

@Injectable({
  providedIn: 'root',
})

export class CommonService{

  constructor() { }

  //subjects
  private breakpointSubject = new BehaviorSubject<BreakPointsEnum>(0);
  private topModalSubject = new BehaviorSubject<ModalClose>({isOpen:false, hasTriggered: false});
  private adoptStepSubject = new BehaviorSubject<AdoptStepperViewEnum>(0);
  private adopterFormSubject = new BehaviorSubject<AdopterForm | undefined>(undefined);
  private homeFormSubject = new BehaviorSubject<HomeForm | undefined>(undefined);
  private petFormSubject = new BehaviorSubject<PetForm | undefined>(undefined);
  private adoptionFormSubject = new ReplaySubject<AdoptionForm | undefined>(undefined);



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

  getAdoptStepSubject = () => {
    return this.adoptStepSubject.asObservable();
  }

  setAdoptStepSubject = (step: AdoptStepperViewEnum) => {
    this.adoptStepSubject.next(step);
  }

  getAdopterFormSubject = () => {
    return this.adopterFormSubject.asObservable();
  }

  setAdopterFormSubject = (form: AdopterForm) => {
    this.adopterFormSubject.next(form);
  }

  getHomeFormSubject = () => {
    return this.homeFormSubject.asObservable();
  }

  setHomeFormSubject = (form: HomeForm) => {
    this.homeFormSubject.next(form);
  }

  getPetFormSubject = () => {
    return this.petFormSubject.asObservable();
  }

  setPetFormSubject = (form: PetForm) => {
    this.petFormSubject.next(form);
  }

  getAdoptionFormSubject = () => {
    return this.adoptionFormSubject.asObservable();
  }

  setAdoptionFormSubject = (form: AdoptionForm) => {
    this.adoptionFormSubject.next(form);
  }


}
