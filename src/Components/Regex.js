export const validOsVersion= new RegExp(/^[a-zA-Z0-9.]+$/); //alphanumeric and '.'
export const validRam= new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).*$/);  //only numbers and alphabets no spl char and cant be null
export const validHdm= new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).*$/);   //only numbers and alphabets no spl char and cant be null
export const validProcessor= new RegExp(/^[a-zA-Z0-9]+$/); //only numbers and alphabets no spl char and cant be null
// export const validDd= new RegExp(/^[a-zA-Z0-9.]+$/);
export const validDd= new RegExp(/^[a-zA-Z0-9]*$/);

