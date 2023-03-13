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

export interface PetBio{
  id:number,
  name:string,
  age: string,
  gender: string,
  status: string,
  size: string,
  tags: string[],
  description: string,
  coat: string | undefined,

}