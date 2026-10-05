export const validate = (validatorFn) => {
    return (req, res, next) => {

        console.log('BODY:', req.body)
        const {isValid, errors} = validatorFn(req.body);

        if(!isValid) {
            return res.status(400).json({
                success: false,
                errors
            })
        }

        next();
    }
}