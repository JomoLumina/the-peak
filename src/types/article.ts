export interface Article{
  id: string,
  hasImage?: boolean,
  hasBody?: boolean,
  webTitle?: string,
  fields?: any,
  body?: {
    image?: string,
    title?: string,
    text: string,
  }
  style?:{
    maxWidth: number,
    height: number
  }
}