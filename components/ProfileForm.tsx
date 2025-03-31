"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import userFormValidationSchema from "@/lib/validations"
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname,useRouter } from "next/navigation"

export function ProfileForm({email}:{email:string}) {
    console.log(email)
  const form = useForm<z.infer<typeof userFormValidationSchema>>({
    resolver: zodResolver(userFormValidationSchema),
    defaultValues: {
      name: "",
      email: email,
      collegename: "",
      branch: "",
      year: 1,
    },
  })
  const router = useRouter()
  const pathname = usePathname()
  async function onSubmit(values: z.infer<typeof userFormValidationSchema>) {
    try{
        await updateUser({
            name: values.name,
            email: values.email,
            collegename: values.collegename,
            branch: values.branch,
            year: values.year,
            path:pathname,
        })
        if(pathname === "/profile/edit"){
            router.back()
        }
        else{
            router.push("/")
        }
    }
    catch(error){
        console.log(error)
    }
  }


  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h4 className="text-orange-500 font-medium mb-2">Profile Setup</h4>
            <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
            <p className="text-gray-600 mt-2">Help us personalize your experience</p>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" readOnly type="email" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your email address.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collegename"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">College Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your college name" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  The name of your college.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Branch</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your branch" className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" {...field} />
                </FormControl>
                <FormDescription className="text-gray-600">
                  Your branch of study.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Year</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-600">
                  Your current year of study.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md transition-colors duration-200 hover:cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
