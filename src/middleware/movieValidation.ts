import { body } from "express-validator";

export const movieCreateValidation = () => {
    return [
        body("title")
        .isString()
        .withMessage("Title is required")
        .isLength({min: 5})
        .withMessage("Title must be at least 5 characters long"),
        body("rating")
        .isNumeric()
        .withMessage("Must be a number")
        .custom((value: number) => {
            if (value < 0 || value > 10) {
                throw new Error("Rating must be between 0 and 10")
            }
            return true
        }),
        body("description").isString().withMessage("Description is required"),
        body("director").isString().withMessage("Director is required"),
        body("poster").isURL().withMessage("Poster URL is required"),

    ]
}

