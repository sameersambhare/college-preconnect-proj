import {z} from 'zod'
const userFormValidationSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email:z.string().email(),
    collegename:z.string().min(3, {
        message: "College name must be at least 3 characters.",
    }),
    branch:z.string().min(3, {
        message: "Branch must be at least 3 characters.",
    }),
    year:z.number().min(1, {
        message: "Year must be at least 1.",
    }),
  })
  export default userFormValidationSchema;