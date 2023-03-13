export interface PetDisplay{
  petName: string,
  mainImg: string,
  petId: number
}

export interface CarouselItem{
  imgSource: string,
  isIframe: boolean,
  id: number
  iframeSrc?: string,
  aHref?: string,
  fullImgSource?: string,
}

export interface ModalClose{
  isOpen: boolean,
  hasTriggered: boolean,
}