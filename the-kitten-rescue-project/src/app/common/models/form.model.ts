export interface AdoptionForm {
  recipientAddress: string,
  adopterForm: AdopterForm,
  homeForm: HomeForm,
  petForm: PetForm
}
export interface AdoptionFormPost {
  petName: string
  adopterForm: AdopterForm,
  homeForm: HomeForm,
  petForm: PetForm
}

export interface AdopterForm {
  petName: string,
  hasOtherRequest: boolean,
  otherNameRequest?: string,
  adopterFirstName: string,
  adopterLastName: string,
  adopterDOB: string,
  primaryOccupantJob: string,
  adopterPhoneNumber: string,
  adopterEmail: string,
  adopterEmailConfirm: string,
  driversState: string,
  adopterAddressLine1: string,
  adopterAddressLine2?: string,
  adopterCity: string,
  adopterState: string,
  adopterZip: string,
}

export interface HomeForm{
  homeType: string,
  timeOfOccupancy: string,
  numberOfOccupants: string,
  numberOfChildren: string,
  homeEnvironment: string,
  hasSmokers: string,
  hasAllergies: string,
  primaryOccupant: string,
  hasDoggyDoor: string,
  hasOutdoorAccess: string,
  estTimeAlone: string,
  emergencyCareTaker: string,
}

export interface PetForm{
  hasAdopted: string,
  hasCats: string,
  numberOfCats?: string,
  whereKept?: string,
  stillHas?: string,
  reason?: string,
  shownAggression: string,
  hasOtherPets: string,
  petDescription?: string,
  vetName: string,
  vetPhone?: string,
  adoptReason: string,
  willDeclaw: string,
  locationDay: string,
  locationNight: string,
  locationSleep: string,
  movePlans: string,
  returnReason: string,
  hasViolence: string,
  catExperience: string,
  canCommit: string,
  undesirableBehavior: string,
  desirableBehavior: string,
  referenceName: string,
  referencePhone: string,
}