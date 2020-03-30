interface IValidationOptions {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
//Validation Function
export function validate(options: IValidationOptions): boolean {
  const { value } = options;
  console.log(`Validating ${options.value}`);
  let isValid = true;
  if (options.required) {
    isValid = isValid && !!value;
  }
  if (options.minLength && typeof value === "string")
    isValid = isValid && value.length >= options.minLength;
  if (options.maxLength && typeof value === "string")
    isValid = isValid && value.length <= options.maxLength;
  if (options.min && typeof value === "number")
    isValid = isValid && value >= options.min;
  if (options.max && typeof value === "number") {
    isValid = isValid && value <= options.max;
  }
  return isValid;
}
