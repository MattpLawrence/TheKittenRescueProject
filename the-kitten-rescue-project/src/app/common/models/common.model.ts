export interface PetDisplay {
  petName: string,
  mainImg: string,
  petId: number
}

export interface CarouselItem {
  id: number,
  imgSource: string,
  isIframe: boolean,
  iframeSrc?: string,
  aHref?: string,
  fullImgSource?: string,
}

export interface SuccessCarouselItem {
  imgSource: string,
  id: number,
  fullImgSource: string,
}

export interface ModalClose {
  isOpen: boolean,
  hasTriggered: boolean,
}

export interface PetBio {
  id: number,
  name: string,
  age: string,
  gender: string,
  status: string, //adoptable?
  size: string,
  tags: string[], // ex: friendly, gentle
  description: string,
  coat: string, //ex medium
  isHouseTrained: boolean,
  hasCurrentShots: boolean,
  isSpayedNeutered: boolean,
  hasSpecialNeeds: boolean,
  colors: string,
  isCatFriendly: boolean | null,
  isDogFriendly: boolean | null,
  isChildFriendly: boolean | null,
  url: string
}