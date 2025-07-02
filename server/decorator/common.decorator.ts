import { registerDecorator, ValidationOptions, buildMessage, ValidateBy, ValidationArguments } from 'class-validator'

/**自定义装饰器**/
export function IsCustomize(option: {
    validate(value: any, args: ValidationArguments): Promise<boolean> | boolean
    message(prefix: string, args: ValidationArguments): string
}) {
    return ValidateBy({
        name: 'isCustomize',
        validator: {
            validate: option.validate,
            defaultMessage: buildMessage(option.message)
        }
    })
}

/**自定义时间格式验证**/
export function IsDateCustomize(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isDateCustomize',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
                    return typeof value === 'string' && regex.test(value)
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property}必须是有效的日期时间格式: YYYY-MM-DD HH:mm:ss`
                }
            }
        })
    }
}
