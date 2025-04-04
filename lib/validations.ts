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
    mobile:z.string().min(10, {
        message: "Mobile number must be at least 10 characters.",
    }),
    address:z.string().min(3, {
        message: "Address must be at least 3 characters.",
    }),
    city:z.string().min(3, {
        message: "City must be at least 3 characters.",
    }),
    state:z.string().min(3, {   
        message: "State must be at least 3 characters.",
    }),
    gender:z.string().min(3, {  
        message: "Gender must be at least 3 characters.",
    }),
    dob:z.string().min(3, {  
        message: "Date of Birth must be at least 3 characters.",
    }),
    district:z.string().min(3, {
        message: "District must be at least 3 characters.",
    }),
    profileimage:z.string().optional(),
  })
  export default userFormValidationSchema;