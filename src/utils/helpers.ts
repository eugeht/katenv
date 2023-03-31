/**
 * Image loader promise
 * 
 * @param src 
 * @returns 
 */
export const loadImage = ( src: string ) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = () => {
      // Empty pixel
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }
  })
}



/**
 * Delay 
 * 
 * @param ms 
 * @returns 
 */
export const sleep = ( ms: number) => new Promise(r => setTimeout( r, ms ) )



/**
 * Random int
 * 
 * @param min 
 * @param max 
 * @returns 
 */
export const rand = ( min: number, max: number) => Math.random() * ( max - min) + min | 0



/**
 * Random float
 * 
 * @param min 
 * @param max 
 * @returns 
 */
export const randFloat = ( min: number, max: number) => Math.random() * ( max - min) + min



/**
 * Debounce 
 * @param func 
 * @param timeout 
 * @returns 
 */
export const debounce = (func: Function, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { 
      func.apply({}, args); 
    }, timeout);
  };
}